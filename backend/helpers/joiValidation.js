const Joi = require("joi");

const userValidationSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.min": "Name should be at least 3 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password should be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password should be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

const productValidationSchema = Joi.object({
  name:Joi.string().min(3).required().messages({
    "string.min": "Product name should be at least 3 characters",
    "any.required": "Name is required"
  }),
  color: Joi.string().required().messages({
    "any.required": "Color is required"
  }),
  price: Joi.number().positive().required().messages({
    "number.positive": "Price should be positive number",
    "any.required": "Price is required"
  }),
  img: Joi.string().uri().optional().messages({
    'string.uri': 'Please provide a valid image URL if uploaded',
  }),
  category:Joi.string().required().messages({
    "any.required": "Product category is required"
  }),
  stock: Joi.number().positive().required().messages({
    "number.positive": "stock should be positive number",
    "any.required": "stock is required"
  }),
  description:Joi.string().required().messages({
    "any.required": "Product description is required"
  })
})


module.exports = {
  userValidationSchema,
  loginValidationSchema,
  productValidationSchema
};
