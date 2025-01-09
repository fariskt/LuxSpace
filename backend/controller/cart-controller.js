const asyncErrorhandler = require("../middleware/asyncErorHandler");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// get cart of user
const getCartById = asyncErrorhandler(async (req, res) => {
  const {userId}  = req.params;  
  const cart = await Cart.findOne({ userId: userId }).populate(
    "products.productId",
    "-stock -description -deletedAt -isDeleted"
  );
  if (!cart) {
    return res.status(200).json({ cart: [], totalAmount: 0 });
  }

  //totalamount
  const totalAmount = cart.products.reduce((total, item) => {
    const priceOfProduct = item.productId?.price || 0;
    return total + item.quantity * priceOfProduct;
  }, 0);

  res.status(200).json({ success: true, message: "Cart fetched successful", data: {cart, totalAmount }});
});

//add to cart
const addToCart = asyncErrorhandler(async (req, res) => {
  const  userId  = req.user.id;
  const { productId, quantity } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "ProductId is required" });
  }

  let cart = await Cart.findOne({ userId: userId });
  if (!cart) {
    cart = new Cart({ userId: userId, products: [] });
  }

  const existingItem = cart.products.find(
    (item) => item.productId.toString() === productId
  );

  if (existingItem) {
    return res.status(400).json({ message: "Product already exists in cart" });
  }

  cart.products.push({ productId, quantity });
  await cart.save();
  return res.json({
    success: true,
    message: "Product added to the cart",
    data: cart,
  });
});

//update cart quantity
const increaseQuantity = asyncErrorhandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const cart = await Cart.findOne({ userId, "products.productId": productId });

  if (!cart) {
    return res.status(404).json({ message: "Cart or product not found" });
  }

  const product = cart.products.find((p) => p.productId.toString() === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  const newQuantity = product.quantity + 1;

  const updatedCart = await Cart.findOneAndUpdate(
    { userId, "products.productId": productId },
    { $set: { "products.$.quantity": newQuantity } },
    { new: true }
  );

  const updatedProduct = updatedCart.products.find(
    (p) => p.productId.toString() === productId
  );

  if (!updatedProduct) {
    return res.status(500).json({ message: "Failed to retrieve updated product" });
  }

  res.status(200).json({
    message: "Product quantity updated successfully",
    success: true,
    data: updatedProduct,
  });
});


const decreaseQuantity = asyncErrorhandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;  

  const cart = await Cart.findOne({ userId, "products.productId": productId });
  if (!cart) {
    return res.status(404).json({ message: "Cart or product not found" });
  }

  const product = cart.products.find((p) => p.productId.toString() === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  const newQuantity = product.quantity > 1 ? product.quantity - 1 : 1;

  const updatedCart = await Cart.findOneAndUpdate(
    { userId, "products.productId": productId },
    { $set: { "products.$.quantity": newQuantity } },
    { new: true }
  );

  res.status(200).json({
    message: "Cart updated successfully",
    success: true,
    data: updatedCart,
  });
});


//delete from cart
const removeCartItem = asyncErrorhandler(async (req, res) => {
  const userId = req.user.id
  const { productId } = req.body;

  const cart = await Cart.findOne({ userId, "products.productId": productId });
  if (!cart) {
    return res.status(404).json({ message: "Cart or product not found" });
  }

  const product = cart.products.find((p) => p.productId.toString() === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  const updatedCart = await Cart.findOneAndUpdate(
    { userId},
    { $pull: { products: { productId: productId } } },
    { new: true }
  );
  
  if (!updatedCart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  res.status(200)
    .json({
      success: true,
      message: "Product removed from cart",
      data: updatedCart,
    });
});

module.exports = {
  addToCart,
  getCartById,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
};
