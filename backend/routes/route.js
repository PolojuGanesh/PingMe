import express from "express";
import RegisterUser from "../controllers/controller.register.js";
import LoginUser from "../controllers/controller.login.js";
import ResetPassword from "../controllers/controller.reset.js";

const router = express.Router();

// create new user
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.patch("/reset-password", ResetPassword);

export default router;
