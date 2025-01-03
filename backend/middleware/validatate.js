const {
  userValidationSchema,
  loginValidationSchema,
  productValidationSchema,
} = require("../helpers/joiValidation");

const validateUserRegistration = (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }
  next();
};

const validateUserLogin = (req, res, next) => {
  const { error } = loginValidationSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }
  next();
};

const validateProducts = (req, res, next) => {
  const { error } = productValidationSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateProducts,
};