const mongoose = require("mongoose");
const asyncErrorhandler = require("../middleware/asyncErorHandler");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// Get cart of user
const getCartById = asyncErrorhandler(async (req, res) => {
  const { userId } = req.params;

  const cart = await Cart.findOne({ userId: userId }).populate(
    "items.productId",
    "-description -deletedAt -isDeleted"
  );

  if (!cart) {
    return res.status(200).json({ cart: [], totalAmount: 0 });
  }

  // total amount
  const totalAmount = cart.items.reduce((total, item) => {
    const priceOfProduct = item.productId?.price || 0;
    return total + item.quantity * priceOfProduct;
  }, 0);

  res.status(200).json({
    success: true,
    message: "Cart fetched successfully",
    data: { cart, totalAmount },
  });
});

// Add to cart
const addToCart = asyncErrorhandler(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "ProductId is required" });
  }

  let cart = await Cart.findOne({ userId: userId });

  if (!cart) {
    cart = new Cart({ userId: userId, items: [] });
  }

  // Check if the product already exists in the cart
  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (existingItem) {
    return res.status(400).json({ message: "Product already exists in cart" });
  }

  cart.items.push({ productId: productId, quantity });

  await cart.save();

  return res.json({
    success: true,
    message: "Product added to the cart",
    data: cart,
  });
});

// Update cart quantity: Increase
const increaseQuantity = asyncErrorhandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const cart = await Cart.findOne({ userId: userId });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const product = cart.items.find((item) => item._id.toString() === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  product.quantity += 1;

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Product quantity increased successfully",
    data: cart,
  });
});

// Update cart quantity: Decrease
const decreaseQuantity = asyncErrorhandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const cart = await Cart.findOne({ userId: userId });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const product = cart.items.find((item) => item._id.toString() === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  product.quantity = product.quantity > 1 ? product.quantity - 1 : 1;

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Product quantity decreased successfully",
    data: cart,
  });
});

// Remove from cart
const removeCartItem = asyncErrorhandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { _id: productId } } }, // Remove the specific item
    { new: true }
  );

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }  
  
  res.status(200).json({
    success: true,
    message: "Product removed from cart successfully",
    data: cart,
  });
});

module.exports = {
  getCartById,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
};
