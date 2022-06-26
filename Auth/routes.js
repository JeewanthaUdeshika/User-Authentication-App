/**
 * This File contains all the routes in the app
 */

import express from "express";
import { login, register } from "./auth.js";

// Get router from the express
const router = express.Router();

// Router for the register
router.post("/api/user/register", register);

// Router for the login
router.post("/api/user/login", login);

export default router;