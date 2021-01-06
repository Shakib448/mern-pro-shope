import express from "express";
import {
  addOrderItems,
  getOrderById,
} from "../controllers/orderControllers.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/:id", protect, getOrderById);

export default router;
