import express from "express";
import { loginUser, registerUser, logoutUser, acceptInvite } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/accept-invite', acceptInvite);
router.post("/logout", logoutUser);

export default router;