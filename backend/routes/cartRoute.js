const express = require("express");
const { addToCart, deleteCartById,getCartById, updateCartQuantity } = require("../controller/cart-controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router({ mergeParams: true });

router.get("/:userId",verifyToken, getCartById);
router.post("/:userId", verifyToken, addToCart);
router.patch("/:userId", verifyToken, updateCartQuantity);
router.put("/:cartId", verifyToken, deleteCartById);

module.exports = router;
