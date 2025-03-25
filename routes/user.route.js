import express from "express";
import { authenticateUser, isAdmin } from "../middlewares/auth.middleware.js";
import { getAllUsers, getMyProfile, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", authenticateUser, isAdmin, getAllUsers); 
router.get("/me", authenticateUser, getMyProfile);
router.put("/:id", authenticateUser, updateUser); 

export default router;
