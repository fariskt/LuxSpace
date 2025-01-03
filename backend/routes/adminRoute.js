const express = require("express");
const isAdmin = require("../middleware/adminMiddleware");
const verifyToken = require("../middleware/verifyToken");
const { getUsers, getUserbyId, blockAndUnblockUser, getAllUserOrders, getTotalUsersByMonth, getTotalUsers } = require("../controller/admin-controller");
const router = express.Router();

router.get("/users",verifyToken, isAdmin, getUsers);
router.get("/users/:id", verifyToken, isAdmin, getUserbyId);
router.get("/total-users",verifyToken,isAdmin, getTotalUsers);
router.get("/users-by-month",verifyToken,isAdmin,getTotalUsersByMonth)
router.put("/users/:id/block", verifyToken, isAdmin, blockAndUnblockUser);
router.get("/orders", verifyToken, isAdmin, getAllUserOrders)

module.exports = router;
