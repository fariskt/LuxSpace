const asyncErrorhandler = require("../middleware/asyncErorHandler");
const Cart = require("../models/cartModel");

// get cart of user
const getCartById = asyncErrorhandler(async (req, res) => {
  const { userId } = req.params;
  const cart = await Cart.findOne({ userId: userId }).populate(
    "products.productId",
    "-stock -description -deletedAt -isDeleted"
  );
  if (!cart) {
    return res.status(200).json({ cart: [], totalAmount: 0 });
  }

  //totalamount
  cart.totalAmount = cart.products.reduce((total, item) => {
    const priceOfProduct = item.productId?.price || 0;
    return total + item.quantity * priceOfProduct;
  }, 0);

  res
    .status(200)
    .json({ success: true, message: "Cart fetched successful", data: cart });
});

//add to cart
const addToCart = asyncErrorhandler(async (req, res) => {
  const { userId } = req.params;
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
const updateCartQuantity = asyncErrorhandler(async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  const updatedCart = await Cart.findOneAndUpdate(
    { userId, "products.productId": productId },
    { $set: { "products.$.quantity": quantity } },
    { new: true }
  );

  if (!updatedCart) {
    return res.status(404).json({ message: "Cart or product not found" });
  }

  res.status(200).json({
    message: "Cart updated successfully",
    success: true,
    data: updatedCart,
  });
});

//delete from cart
const deleteCartById = asyncErrorhandler(async (req, res) => {
  const { cartId } = req.params;
  const { productId } = req.body;
  const updatedCart = await Cart.findByIdAndUpdate(
    cartId,
    { $pull: { products: { productId } } },
    { new: true }
  );
  if (!updatedCart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  res
    .status(200)
    .json({
      success: true,
      message: "Product removed from cart",
      data: updatedCart,
    });
});

module.exports = {
  addToCart,
  getCartById,
  updateCartQuantity,
  deleteCartById,
};
