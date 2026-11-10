const express = require("express");
const { createOrder, getOrderById , cancelOrder, verifyPayment} = require("../controller/order-controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/create-order",verifyToken, createOrder);
router.post("/verify-payment", verifyToken, verifyPayment);
router.get("/:userId" ,verifyToken, getOrderById)
router.put("/:orderId/cancel", verifyToken,cancelOrder)


module.exports = router;
