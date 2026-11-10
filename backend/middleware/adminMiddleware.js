const isAdmin = (req, res, next) => {
  const user = req.user;  
  if (user && user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied, Only admin can access" });
  }
};

module.exports = isAdmin;
