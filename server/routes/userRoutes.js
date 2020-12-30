import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  UpdateUserProfile,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, UpdateUserProfile);
export default router;
