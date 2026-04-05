import express from "express";
import { register, login } from "../controllers/auth.js";

// Routes for user authentication: register and login
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
