import asyncHandler from "express-async-handler";

// @Description Fetch all products
// @routes GET/api/products
// @access public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  res.send({ email, password });
});

export { authUser };
