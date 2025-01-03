const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { getUserWishList, createWishList, removeWishlist } = require('../controller/wishlist-controller');
const router = express.Router();

router.get("/:userId",verifyToken, getUserWishList)
router.post("/:userId", verifyToken, createWishList)
router.patch("/:userId/",verifyToken, removeWishlist)

module.exports = router