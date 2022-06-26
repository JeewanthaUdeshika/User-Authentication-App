/**
 * This is the main file of the server
 */

import express from "express";
import { connectDB } from "./database.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";   // Package for use custo middleswares

import routes from "./Auth/routes.js";

dotenv.config({path: 'config.env'});    // Make source to dotenv file

// Get Express object
const app = express();

const PORT = process.env.PORT || 8080;

// Connect the database
connectDB();

// Make the encription method
app.use(bodyParser.urlencoded({extended: "true"}));
app.use(bodyParser.json({extended: "true"}));
app.use(cookieParser());

// Get routers from the file
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server Connected to http://localhost:${PORT}`);
})