/**
 * This file contains all the middlewares made to authorizations
 */

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";

dotenv.config({path: 'config.env'});    // Make source to dotenv file

const jwtSecret = process.env.jwtSecret;

// Authorization for the admin
export const adminAuth = (req, res, next) => {
    // Get the given cookie
    const token = req.cookies.jwt;

    // Check there is token given
    if (token){
        jwt.verify(token, jwtSecret, (err, decordedToken) => {
            // If there is an error
            if (err){
                return res.status(401).send({message: "Not authorized"})
            }
            else{
                // If the user is not an admin
                if (decordedToken.role != "admin"){
                    return res.status(401).send({message: "Not Authoriized"})
                }
                else{
                    next()
                }
            }
        })
    }
    else{
        return res.status(401).send({message: "Not authorized, token not available"})
    }
}

// Authorization for the basic user
export const userAuth = (res, req, next) => {
    // Get the given cookie
    const authHeader = req.headers['accessToken'];
    const token = authHeader && authHeader.split(' ')[1];

    // Check there is token given
    if (token){
        jwtSecret.verify(token, jwtSecret, (err, decordedToken) => {
            // If there is an error
            if (err){
                return res.status(401).send({message: "Not authorized"})
            }
            else{
                // If the user is not an admin
                if (decordedToken.role != "Basic"){
                    return res.status(401).send({message: "Not Authoriized"})
                }
                else{
                    next()
                }
            }
        })
    }
    else{
        return res.status(401).send({message: "Not authorized, token not available"})
    }
}


/* // Protect function to check
export const protect = async (req, res, next) => {

} */

export const refreshToken = (req, res, next) => {
    // Get the given cookie
    const prevToken = req.cookies.jwt;

    // Check there is token given
    if (prevToken){
        jwt.verify(prevToken, jwtSecret, (err, user) => {
            // If there is an error
            if (err){
                return res.status(401).send({message: "Not authorized"})
            }
            else{
                // Clear the current cookie
                res.clearCookie('jwt');
                req.cookies[`${user}`] = "";

                // Create a new token
                const token = jwt.sign(
                    {id: user.__id, username:user.username, role: user.role },
                    jwtSecret,
                    {
                        expiresIn: "2hr"
                    }
                );
                

                // Send it as cookie
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000,
                    secure: false
                });

                req.id = user.id;
                next();
            }
        })
    }
    else{
        return res.status(401).send({message: "Not authorized, token not available"})
    }
}