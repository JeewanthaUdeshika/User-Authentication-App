/**
 * This file contains all the middlewares made to authorizations
 */

import jws from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({path: 'config.env'});    // Make source to dotenv file

const jwtSecret = process.env.jwtSecret;

// Authorization for the admin
export const adminAuth = (res, req, next) => {
    // Get the given cookie
    const token = req.cookies.JWT;

    // Check there is token given
    if (token){
        jwtSecret.verify(token, jwtSecret, (err, decordedToken) => {
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
    const token = req.cookies.JWT;

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