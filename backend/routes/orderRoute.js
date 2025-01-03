const express = require("express");
const { createOrder, getOrderById ,updateOrder, cancelOrder} = require("../controller/order-controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/:userId", verifyToken, createOrder);
router.get("/:userId" ,verifyToken, getOrderById)
router.put("/:userId", verifyToken, updateOrder);
router.post("/:orderId/cancel", verifyToken,cancelOrder)


module.exports = router;
