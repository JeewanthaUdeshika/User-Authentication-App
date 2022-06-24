/**
 * This is the main file of the server
 */

import express from "express";
import { connectDB } from "./database.js";
import dotenv from "dotenv";

dotenv.config({path: 'config.env'});    // Make source to dotenv file

// Get Express object
const app = express();

const PORT = process.env.PORT || 8080;

// Connect the database
connectDB();

app.listen(PORT, () => {
    console.log(`Server Connected to http://localhost:${PORT}`);
})