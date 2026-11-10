const express = require("express");
const { registerUser, loginUser, logoutUser, refreshTokenHandler, getLoginedUser } = require("../controller/users-controller");
const { validateUserLogin, validateUserRegistration } = require("../helpers/validatate");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/register",validateUserRegistration, registerUser)
router.post("/login", validateUserLogin, loginUser)
router.get("/me", verifyToken, getLoginedUser)
router.post("/refresh-token", refreshTokenHandler)
router.post("/logout", logoutUser)

module.exports = router;
