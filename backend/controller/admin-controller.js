const asyncErrorhandler = require("../middleware/asyncErorHandler");
const adminService = require("../services/adminService");

//total users by month
//dashboard

const getTotalUsers = asyncErrorhandler(async (req, res) => {
  const totalUsers = await adminService.getTotalUsers();
  res
    .status(200)
    .json({
      success: true,
      message: "Fetched total Uses",
      data: { totalUsers },
    });
});

const getTotalUsersByMonth = asyncErrorhandler(async (req, res) => {
  const { month, year } = req.query;
  if (!month || !year) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter month and year" });
  }
  const users = await adminService.getUserByMonth(Number(month), Number(year));
  if(!users){
    return res.status(404).json({message: `No users registered in ${month}/${year}`})
  }
  res
    .status(200)
    .json({
      success: true,
      message: `User registered in ${month < 10 ? '0'+ month : month}/${year} fetched successfully`,
      data: { total: users.length, users },
    });
});

const getUsers = asyncErrorhandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const users = await adminService.getAllUsers(page, limit);
  res.status(200).json({
    success: true,
    message: "User fetched from database",
    data: users,
  });
});

const getUserbyId = asyncErrorhandler(async (req, res) => {
  const { id } = req.params;
  const user = await adminService.getUserById(id);
  res
    .status(200)
    .json({ success: true, message: "User by Id fetched success", data: user });
});

const blockAndUnblockUser = asyncErrorhandler(async (req, res) => {
  const { id } = req.params;
  const editedUser = await adminService.userBlockAndUnblock(id);
  res
    .status(200)
    .json({
      sucess: true,
      message: "User blocked/Unblocked Success",
      data: editedUser,
    });
});

//generate income ,by month
//total order by month

const getAllUserOrders = asyncErrorhandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const orders = await adminService.getAllOrders(page, limit);
  res
    .status(200)
    .json({ sucess: true, message: "fetched all Users orders", data: orders });
});

module.exports = {
  getUsers,
  getUserbyId,
  blockAndUnblockUser,
  getAllUserOrders,
  getTotalUsers,
  getTotalUsersByMonth,
};
