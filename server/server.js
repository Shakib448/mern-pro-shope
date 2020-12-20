import express from "express";

import dotenv from "dotenv";

import products from "./data/product.js";

const PORT = process.env.PORT || 5000;

const app = express();

dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));
