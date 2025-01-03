const asyncErrorhandler = require("../middleware/asyncErorHandler");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const createOrder = asyncErrorhandler(async (req, res) => {
  const { userId } = req.params;
  const { shippingAddress } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart || !cart.products || cart.products.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }
  let totalAmount = 0;

  for (const cartItem of cart.products) {
    const product = await Product.findById(cartItem.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.stock < cartItem.quantity) {
      return res
        .status(400)
        .json({ message: `Not enough stock, Only ${product.stock} product left` });
    }
    product.stock -= cartItem.quantity;
    await product.save();
    totalAmount += product.price * cartItem.quantity;
  }

  const newOrder = new Order({
    userId: userId,
    products: cart.products,
    shippingAddress,
    totalAmount,
  });

  const savedOrder = await newOrder.save();
  await Cart.findOneAndUpdate({ userId }, { $set: { products: [] } });

  res.status(201).json({
    status: true,
    message: "Order placed successfully",
    data: savedOrder,
  });
});

// get user order by id
const getOrderById = asyncErrorhandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  const order = await Order.find({ userId: userId }).populate("products.productId");
  if (order.length === 0) {
    return res.status(404).json({ message: "No order is found for this user" });
  }
  res.status(200).json({
    success: true,
    message: "User order fetched successful",
    data: order,
  });
});

const updateOrder = asyncErrorhandler(async (req, res) => {
  const { orderStatus, paymentStatus } = req.body;
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.userId,
    {
      orderStatus,
      paymentStatus,
      updatedAt: Data.now(),
    },
    { new: true }
  );
  if (!updatedOrder) {
    return res.status(404).json({ message: "order not found" });
  }
  res.json(200).json({success: true, message: "Order Updated Successfully", data: updatedOrder });
});

const cancelOrder = asyncErrorhandler(async (req, res) => {
  const { orderId } = req.params;
  const orderToCancel = await Order.findById(orderId);
  if (!orderToCancel) {
    return res.status(404).json({ message: "order not found" });
  }
  if (orderToCancel.orderStatus !== "pending") {
    return res.status(400).json({ message: "Order cannot be cancelled" });
  }
  orderToCancel.orderStatus = "cancelled";
  await orderToCancel.save();
  res.status(200).json({ sucess: true, message: "order cancelled" });
});

module.exports = {
  createOrder,
  getOrderById,
  updateOrder,
  cancelOrder,
};
