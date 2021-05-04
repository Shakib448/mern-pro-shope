import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  UpdateUserProfile,
  getUsers,
  deleteUser,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, admin, getUsers);
router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, UpdateUserProfile);
router.delete("/:id", protect, admin, deleteUser);
export default router;
