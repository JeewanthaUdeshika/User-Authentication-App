/**
 * This file contains all the functions for the routes
 */

import { User } from "../model/user.js"; // Get the user model from the model

// function for the register route
export const register = async (req, res) => {
    // Getting the username and password from the body
    const {username, password} = req.body;

    // Checkimg the password length
    if (password.length < 6) {
        return res.status(400).send({message: "Password less than 6 chars"});
    }
    try{
        await User.create({
            username,
            password
        })
        .then(user => {
            res.status(208).send({message: "User successfully created", user});
        })}
    catch(err){
        res.status(401).send({message: "User not created", error: err.message})
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
        const user = await User.findOne({username, password});

        if (!user){
            res.status(401).send({
                message: "Login not successfull",
                error: "User not found"
            })
        }
        else{
            res.status(200).send({
                message: "Login Successfull",
                user
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

/* // Function for the update the user role
export const update = (req, res) => {
    // Getting the role and id from the body
    
} */