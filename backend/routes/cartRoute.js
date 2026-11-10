const express = require("express");
const { addToCart, getCartById, increaseQuantity, decreaseQuantity, removeCartItem } = require("../controller/cart-controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router({ mergeParams: true });

router.get("/:userId",verifyToken, getCartById);
router.post("/", verifyToken, addToCart);
router.patch("/increase", verifyToken, increaseQuantity);
router.patch("/decrease", verifyToken, decreaseQuantity);
router.put("/remove", verifyToken, removeCartItem);

module.exports = router;
