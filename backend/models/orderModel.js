const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    orderStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    shippingAddress: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: Number, required: true },
      address: { type: String, required: true },
      location: { type: String, required: true },
    },
    paymentMethod: { type: String, enum: ["COD", "online"], required: true },
    razorpayOrderId: {
      type: String,
      // required: true,
    },
    razorpayOrderId:{
      type: String,
      // required: true,
    },
    razorpayPaymentId: {
      type: String,
      // required: true,
    },
    razorpaySignature: {
      type: String,
      // required: true,
    },
    totalAmount: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
