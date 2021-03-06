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
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");      // Set the view engine as ejs

// Connect the database
connectDB();

// Make the encription method
app.use(bodyParser.urlencoded({extended: "true"}));
app.use(bodyParser.json({extended: "true"}));


// Get routers from the file
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server Connected to http://localhost:${PORT}`);
})