const asyncErrorhandler = require("../middleware/asyncErorHandler");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");


const getAdminDashboardDetails = asyncErrorhandler(async (req, res) => {
  const [totalUsers, totalOrders, totalProducts, totalIncome] = await Promise.all([
    User.countDocuments({ role: "user" }),
    Order.countDocuments(),
    Product.countDocuments({ isDeleted: false }),
    Order.aggregate([{ $group: { _id: null, totalIncome: { $sum: "$totalAmount" } } }]),
  ]);

  const income = totalIncome.length > 0 ? totalIncome[0].totalIncome : 0;

  res.status(200).json({
    success: true,
    data: {
      totalIncome: income,
      totalOrders,
      totalProducts,
      totalUsers,
    },
    message:"Dashboard fetched successfully",
  });
});



// const getTotalUsersByMonth = asyncErrorhandler(async (req, res) => {
//   const { month, year } = req.query;
//     if (!month || !year) {
//     return res.status(400).json({ success: false, message: "Please enter month and year" });
//     }
//     const startMonth = new Date(year, month - 1, 1);
//     const endMonth = new Date(year, month, 0, 23, 59, 59);
//     const users =  await User.find({createdAt: { $gte: startMonth, $lte: endMonth }, });

//   if(!users){
//     return res.status(404).json({message: `No users registered in ${month}/${year}`})
//   }
  
//   res.status(200)
//     .json({
//       success: true,
//       message: `User registered in ${month < 10 ? '0'+ month : month}/${year} fetched successfully`,
//       data: { total: users.length, users },
//     });
// });

const getUsers = asyncErrorhandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const users = await User.find({ role: "user" }).skip(skip).limit(limit).select("-password");
  const totalUsers = await User.countDocuments({ role: "user" });

  res.status(200).json({
    success: true,
    message: "User fetched from database",
    data: {users, totalUsers},
  });
});

const getUserbyId = asyncErrorhandler(async (req, res) => {
  const { id } = req.params;  
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({success :false, message: "No user found"})
  }
  res.status(200)
    .json({ success: true, message: "User by Id fetched success", data: user });
});

const blockAndUnblockUser = asyncErrorhandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({success :false, message: "No user found"})
  }
  user.isBlocked = !user.isBlocked;
  await user.save();
  
  res.status(200)
    .json({
      sucess: true,
      message: "User blocked/Unblocked Success",
      data: user,
    });
});

const getAllUserOrders = asyncErrorhandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const orders = await Order.find({isDeleted:false}).skip(skip).limit(limit).populate("products.productId");
  if(!orders){
    return res.status(404).json({message: "No orders found" , success: false})
  }
  res.status(200)
    .json({ sucess: true, message: "fetched all Users orders", data: orders});
});

module.exports = {
  getAdminDashboardDetails,
  getUsers,
  getUserbyId,
  blockAndUnblockUser,
  getAllUserOrders,
};
