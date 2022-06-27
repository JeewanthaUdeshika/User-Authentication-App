/**
 * This File contains all the routes in the app
 */

import express from "express";
import { deleteUser, getUser, login, register, update } from "./auth.js";
import { adminAuth, userAuth } from "../Middleware/auth.js";

// Get router from the express
const router = express.Router();

// Router for the register
router.post("/api/user/register", register);

// Router for the login
router.post("/api/user/login", login);

// Router for the update
router.post("/api/user/update", adminAuth, update);     // Only admins can update

// Router for the delete user
router.post("/api/user/delete", adminAuth, deleteUser); // Only admins can delete

// Router for the homepage
router.get("/", (req, res) =>  res.render("home"));

// Router for the register page
router.get("/register", (req, res) =>  res.render("register"));

// Router for the login page
router.get("/login", (req, res) =>  res.render("login"));

// Rouuter for the get user details
router.get("/user", adminAuth, getUser);


export default router;