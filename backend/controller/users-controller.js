const asyncErrorhandler = require("../middleware/asyncErorHandler");
const jwt = require("jsonwebtoken");
const {
  userValidationSchema,
  loginValidationSchema,
} = require("../helpers/joiValidation");
const {
  registerUserService,
  loginUserService,
} = require("../services/userService");
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
  const { accessToken, refreshToken, user } = await loginUserService({  email, password });

  if (user.isBlocked === true) {
    res.clearCookie("refreshToken");
    return res.status(403).json({
      success: false,
      message: "Your account has been blocked by admin",
    });
  }

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

 return res.status(200).json({
    success: true,
    message: "Login successful",
    accessToken,
    data: user,
  });
});

//user blocked
const refrehTokenHandler = asyncErrorhandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res
      .status(400)
      .json({ success: false, message: "Refresh token missing" });
  }

  jwt.verify(refreshToken,process.env.REFRESH_JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403)
          .json({ success: false, message: "Invalid refresh token" });
      }

      const currentUser = await User.findById(user._id);
      if (!currentUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      if (currentUser.isBlocked === true) {
        res.clearCookie("refreshToken");
        return res.status(403)
          .json({
            success: false,
            message: "Your account has been blocked by Admin",
          });
      }

      const newAccessToken = generateAccessToken({
        id: user._id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        accessToken: newAccessToken,
      });
    }
  );
});

const logoutUser = asyncErrorhandler(async (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ success: true, message: "user logout successful" });
});

module.exports = {
  registerUser,
  loginUser,
  refrehTokenHandler,
  logoutUser,
};
