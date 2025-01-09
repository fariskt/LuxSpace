const asyncErrorhandler = require("../middleware/asyncErorHandler");
const WishList = require("../models/wishListModel");

const getUserWishList = asyncErrorhandler(async (req, res) => {
  const { userId } = req.params;

  const wishList = await WishList.findOne({ userId: userId }).populate(
    "products.productId"
  );
  if (!wishList) {
    return res
      .status(404)
      .json({ success: false, message: "Wishlist not found" });
  }
  res
    .status(200)
    .json({
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
    wishList = new WishList({ userId: userId, products: [] });
  }
  
  const existWishList = wishList.products.find(product=> product.productId.toString() === productId.toString());
  if(existWishList){
    return res.status(400).json({message: "Product already exists in wishlist"})
  }

  wishList.products.push({productId});
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
    { userId: userId },
    { $pull: { products: { productId: productId } } },
    { new: true }
  );
  if (!wishlist) {
    return res.status(404).json({ message: "Wishlist not found" });
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
