
const mongoose = require("mongoose");

const productSchema =new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String },
  category: { type: String},
  description: { type: String },
  stock: {type: Number},
  isDeleted: { type: Boolean, default: false },
  deletedAt:{type: Date, default: null}
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
