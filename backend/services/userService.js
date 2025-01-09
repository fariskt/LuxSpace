const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

const registerUserService = async ({ name, email, password }) => {
  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new Error("User already exists");
  }
    const user = await User.create({ name, email, password });
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
};

const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  
  if (!user) {    
    throw new Error("Invalid email or password");
  }
  if (user.isBlocked === true) {
    throw new Error("Your account is blocked, Please contact the admin");
  }
  const passmatch = await bcrypt.compare(password, user.password);
  if (!passmatch) {    
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });
  const refreshToken = generateRefreshToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });  

  return {
    accessToken,
    refreshToken,
    user: { name: user.name, email: user.email, role: user.role , isBlocked: user.isBlocked},
  };
};

module.exports = {
  registerUserService,
  loginUserService,
};
