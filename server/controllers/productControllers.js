import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @Description Fetch all products
// @routes GET/api/products
// @access public

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @Description Fetch single products
// @routes GET/api/products/:id
// @access public

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @Description Delete Product
// @routes DELETE/api/products/:id
// @access Private/Admin

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const removeProduct = await product.remove();
    res.json({ message: "Product removed" });
    return removeProduct;
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
