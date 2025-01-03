const express = require("express");
const { registerUser, loginUser, refrehTokenHandler, logoutUser } = require("../controller/users-controller");
const { validateUserLogin, validateUserRegistration } = require("../middleware/validatate");
const router = express.Router();

router.post("/register",validateUserRegistration, registerUser)
router.post("/login", validateUserLogin, loginUser)
router.get("/refresh-token",refrehTokenHandler)
router.post("/logout", logoutUser)

module.exports = router;
