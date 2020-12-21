import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import "colors";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 5000;

const app = express();

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

// Not found api
app.use(notFound);
// errorHandler
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`Server is running on http://localhost:${PORT}`.yellow.bold)
);
