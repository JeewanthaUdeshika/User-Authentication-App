/**
 * This file contains all the functions for the routes
 */

import { User } from "../model/user.js"; // Get the user model from the model
import bycript from "bcrypt";           // Module for the encrypt passwords
import jwt from "jsonwebtoken";         // To user authentication process
import dotenv from "dotenv";

dotenv.config({path: 'config.env'});    // Make source to dotenv file

const jwtsecret = process.env.jwtSecret;

// function for the register route
export const register = async (req, res) => {
    // Getting the username and password from the body
    const {username, password} = req.body;

    // Checkimg the password length
    if (password.length < 6) {
        return res.status(400).send({message: "Password less than 6 chars"});
    }
    try{
        // encrypt the password
        bycript.hash(password, 10).then(async hash =>{
            await User.create({
                username,
                password: hash  // Store the encrypted password in the database
            })
            .then(user => {
                const maxAge = 3 * 60 * 60; // Expiration time 3hrs
                // Generating token to send
                const token = jwt.sign(
                    {id: user.__id, username, role: user.role},
                    jwtsecret,
                    {
                        expiresIn: maxAge   // 3hrs in sec
                    }
                );

                // Sending a cookie to the user
                res.cookie("JWT", token, {
                    httpOnly: true,
                    maxAge: maxAge*1000     // 3hrs in ms
                });
                res.status(208).send({message: "User successfully created", user});
            })
        })
    }
    catch(err){
        res.status(401).send({message: "User not created", error: err.message});
    }
}

// Function for the login
export const login = async (req, res) => {
    const {username, password} = req.body;
    // Getting the username and password from the request
    if (!username || !password) {
        return res.status(400).send({
            message: "Username or Password not present"
        })
    }

    // If username and password present
    try{
        // find in the database
        const user = await User.findOne({username});

        if (!user){
            res.status(401).send({
                message: "Login not successfull",
                error: "User not found"
            })
        }
        else{
            // Compare the password with hashed one
            bycript.compare(password, user.password).then(result =>{
              if (result){
                const maxAge = 3*60*60;     // time that cookie lasts

                // Make the token
                const token = jwt.sign(
                    {id: user.__id, username:user.username, role: user.role },
                    jwtsecret,
                    {
                        expiresIn: maxAge
                    }
                );

                // Send it as cookie
                res.cookie("JWT", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000,
                });
                
                res.status(200).send({
                    message: "Login Successfull",
                    user: user.__id
                });
              }
              else{
                res.status(400).send({
                    message: "Username or Password incorrect"
                })
              }  
            })
        }
    }
    catch (error){
        res.status(400).send({
            message: "An error occured",
            error: error.message
        })
    }


}

// Function for the update the user role
export const update = async (req, res) => {
    // Getting the role and id from the body
    const {role, id} = req.body;

    // Verify the role and id present
    if (role && id) {
        // Check the user added role is admin
        if (role == "admin"){
            await User.findById(id)
            .then(user =>{
                // Verify the user is not admin
                if (user.role !== "admin"){
                    user.role = role;
                    user.save(err => {
                        // If there is error in save
                        if (err) {
                            res.status(400).send({
                                message: "An error occured",
                                error: err.message
                            });
                            process.exit(1);
                        }

                        // If there is no error
                        res.status(201).send({message: "Update successfully"});
                    })
                }
                else{
                    res.status(400).send({message: "User is already  admin"});
                }
            })
            .catch(error => {
                res.status(400).send({
                    message: "An error occured",
                    error: error.message
                });
            })
        }
        
    }
}


// Function for the delete specific user from the database
export const deleteUser = async (req, res) => {
    // Get the id of the user to delete
    const {id} = req.body;

    await User.findById(id)
    .then(user=>{
        user.remove()
    })
    .then(user=>{
        res.status(201).send({message: "User Removed", user});
    })
    .catch(error =>{
        res.status(400).send({message: "An error occured", error: error.message})
    })
}