const express = require("express");
const isAdmin = require("../middleware/adminMiddleware");
const verifyToken = require("../middleware/verifyToken");
const { getUsers, getUserbyId, blockAndUnblockUser, getAllUserOrders, getAdminDashboardDetails } = require("../controller/admin-controller");
const router = express.Router();

router.get("/users",verifyToken, isAdmin, getUsers);
router.get("/user/:id", verifyToken, isAdmin, getUserbyId);
router.get("/dashboard", verifyToken, isAdmin, getAdminDashboardDetails)
router.put("/user/:id/block", verifyToken, isAdmin, blockAndUnblockUser);
router.get("/orders", verifyToken, isAdmin, getAllUserOrders)

module.exports = router;
