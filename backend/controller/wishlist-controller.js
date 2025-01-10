const asyncErrorhandler = require("../middleware/asyncErorHandler");
const WishList = require("../models/wishListModel");

const getUserWishList = asyncErrorhandler(async (req, res) => {
  const { userId } = req.params;

  const wishList = await WishList.findOne({ userId: userId }).populate(
    "items.productId"
  );
  if (!wishList) {
    return res
      .status(404)
      .json({ success: false, message: "No wishlist for this user" });
  }
  res.status(200).json({
    success: true,
    message: "Wishlist fetched successfully",
    data: wishList,
  });
});

const createWishList = asyncErrorhandler(async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  let wishList = await WishList.findOne({ userId: userId });
  if (!wishList) {
    wishList = new WishList({ userId: userId, items: [] });
  }

  const existWishList = wishList.items.find(
    (product) => product.productId.toString() === productId
  );

  if (existWishList) {
    return res
      .status(400)
      .json({ message: "Product already exists in wishlist" });
  }

  wishList.items.push({ productId });
  await wishList.save();
  return res.status(201).json({
    success: true,
    message: "Wishlist created successfully",
    data: wishList,
  });
});

const removeWishlist = asyncErrorhandler(async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;
  

  const wishlist = await WishList.findOneAndUpdate(
    { userId },
    { $pull: { items: { _id: productId } } },
    { new: true }
  );

  if (!wishlist) {
    return res.status(404).json({ message: "wishlist not found" });
  }  

  return res.status(200).json({
    success: true,
    message: "Product removed from wishlist",
    data: wishlist,
  });
});

module.exports = {
  getUserWishList,
  createWishList,
  removeWishlist,
};
