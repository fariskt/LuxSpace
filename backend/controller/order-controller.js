const razorpay = require("../config/razorpay");
const asyncErrorhandler = require("../middleware/asyncErorHandler");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const crypto = require("crypto");

const createOrder = asyncErrorhandler(async (req, res) => {
  const { userId, products, shippingAddress,paymentMethod, totalAmount } = req.body;

  const razorpayOrder = await razorpay.orders.create({
    amount: totalAmount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });  

  const newOrder = await Order.create({
    userId,
    products,
    shippingAddress,
    totalAmount,
    paymentMethod,
  });  
  await Cart.updateOne({ userId: userId }, { $set: { items: [] } });
  
  res.status(201).json({
    success: true,
    orderId: newOrder._id,
    razorpayOrderId: razorpayOrder.id,
    totalAmount,
  });
});

const verifyPayment = asyncErrorhandler(async (req, res) => {
  const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

  const body = razorpayOrderId + "|" + razorpayPaymentId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpaySignature) {
    await Order.findOneAndUpdate(
      { razorpayOrderId },
      {
        paymentStatus: "completed",
        razorpayPaymentId,
        razorpaySignature,
      }
    );
    res.status(200).json({ success: true , message: "Payment success" });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

// get user order by id
const getOrderById = asyncErrorhandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  const order = await Order.find({ userId: userId }).populate(
    "products.productId"
  );
  if (order.length === 0) {
    return res.status(200).json({ message: "No order is found for this user" });
  }
  res.status(200).json({
    success: true,
    message: "User order fetched successful",
    data: order,
  });
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
  cancelOrder,
  verifyPayment,
};
