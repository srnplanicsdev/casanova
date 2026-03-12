import express from "express";
const router = express.Router();
import { register, login, refreshAccessToken } from "../controller/auth/authController.js";
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-access-token", refreshAccessToken);
export default router;