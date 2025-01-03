const Order = require("../models/orderModel");
const User = require("../models/userModel");

exports.getAllUsers = async (page, limit) => {
  const skip = (page - 1) * limit;

  const users = await User.find({ role: "user" })
    .skip(skip)
    .limit(limit)
    .select("-password");
  const totalUsers = await User.countDocuments({ role: "user" });
  
  return {
    users,
    totalUsers,
  };
};

exports.getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

exports.getTotalUsers = async()=> {
  const totalUsers =  await User.countDocuments()
  return totalUsers
};

exports.getUserByMonth = async(month , year)=> {
  const startMonth = new Date(year, month-1, 1)
  const endMonth = new Date(year,month,0,23,59,59);
  return await User.find({
    createdAt: {$gte: startMonth, $lte: endMonth}
  })
}

exports.userBlockAndUnblock = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  user.isBlocked = !user.isBlocked;
  await user.save();
  return user;
};

exports.getAllOrders = async (page, limit) => {
  const skip = (page - 1) * limit;
  const orders = await Order.find().skip(skip).limit(limit).populate("userId");
  const totalOrder = await Order.countDocuments();
  return {
    orders,
    totalOrder
  };
};

