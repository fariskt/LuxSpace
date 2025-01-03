const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const accessToken = req.header("Authorization")?.replace("Bearer ", "");
  if (!accessToken) {
    return res.status(403).json({ success: false, message: "Token is required" });
  }

  jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
