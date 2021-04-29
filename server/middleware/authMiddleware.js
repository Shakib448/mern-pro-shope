import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken.id).select("-password");

      // next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, no token found");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  next();
});

export { protect };
