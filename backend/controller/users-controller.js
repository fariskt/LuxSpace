const asyncErrorhandler = require("../middleware/asyncErorHandler");
const jwt = require("jsonwebtoken");
const {registerUserService ,loginUserService} = require("../services/userService");
const { generateAccessToken } = require("../utils/generateToken");
const User = require("../models/userModel");

const registerUser = asyncErrorhandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await registerUserService({ name, email, password });
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

const loginUser = asyncErrorhandler(async (req, res) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken, user } = await loginUserService({ email,password });

  if (user.isBlocked === true) {
    res.clearCookie("refreshToken");
    return res.status(403).json({
      success: false,
      message: "Your account has been blocked by admin",
    });
  }

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // development (http)
    maxAge: 7 * 24 * 60 * 1000, // 7 days
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: user,
    accessToken
  });
});

const getLoginedUser = asyncErrorhandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.status(200)
    .json({ success: true, message: "User data fetched successfully", user });
});

const refreshTokenHandler = asyncErrorhandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, message: "Refresh token not found" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

    const newAccessToken = generateAccessToken({
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    });

    res.status(200).json({ message: "Token refreshed successfully" , accessToken: newAccessToken });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired refresh token"});
  }
});

const logoutUser = asyncErrorhandler(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false, // development
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false, //development
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
});


module.exports = {
  registerUser,
  loginUser,
  getLoginedUser,
  refreshTokenHandler,
  logoutUser,
};
