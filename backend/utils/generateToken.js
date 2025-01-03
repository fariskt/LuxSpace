const jwt = require("jsonwebtoken");

//create accessstoken
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.ACCESS_JWT_SECRET,
    { expiresIn: "10m" }
  );
};

//refresh token ...
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
