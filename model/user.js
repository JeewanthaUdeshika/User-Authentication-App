/**
 * This file contains all the user side blueprtint of the document
 */
import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    role: {
        type: String,
        default: "Basic",
        required: true,
    },
})

export const User = mongoose.model("user", userSchema);