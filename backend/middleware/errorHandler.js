const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error";
  if (error.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((value) => value.message)
      .join(", ");
  }
  res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;
