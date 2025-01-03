const asyncErrorhandler = require("../middleware/asyncErorHandler");
const Product = require("../models/productModel");

const getProducts = asyncErrorhandler(async (req, res) => {
  const { page = 1, limit = 10, name, order = "asc", category } = req.query;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const sortOrder = order === "asc" ? 1 : -1;

  const filter = {};
  if (category && category !== "all") {
    filter.category = category;
  }
  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  const totalProducts = await Product.countDocuments(filter);
  const pageLength = Math.ceil(totalProducts / limitNumber);

  const products = await Product.find(filter)
    .sort({ price: sortOrder })
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

  res.status(200).json({
    success: true,
    totalProducts,
    pageLength,
    currentPage: pageNumber,
    data: products,
  });
});

const getProductByCategory = asyncErrorhandler(async (req, res) => {
  const { categoryName } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const product = await Product.find({ category: categoryName })
  .skip((page - 1) * limit)
  .limit(limit);
  
  if (!product) {
    return res
    .status(404)
    .json({ success: false, message: "Product not found" });
  }
  const totalProducts =  await Product.countDocuments({category: categoryName});
  const pageLength = Math.ceil(totalProducts / limit);

  res.status(200)
    .json({
      success: true,
      message: "Product fetched suceessfully",
      data: product,
      totalProducts,
      currentPage: page,
      pageLength
    });
});

const getProductById = asyncErrorhandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ message: `product with id ${productId} not found` });
  }
  res.json({
    success: true,
    message: "Product fetched success",
    data: product,
  });
});

//admin only
const updateProduct = asyncErrorhandler(async (req, res) => {
  const { productId } = req.params;  
  const product = await Product.findByIdAndUpdate(
    { _id: productId, isDeleted: false },
    { ...req.body },
    { new: true }
  );

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  res.status(200)
    .json({ success: true, message: "Product updated Successful", data: product });
});

//admin  only
const deleteProduct = asyncErrorhandler(async (req, res) => {
  const { productId } = req.params;

  const productToDelete = await Product.findByIdAndUpdate(
    productId,
    {
      isDeleted: true,
      deletedAt: new Date(),
    },
    { new: true }
  );
  if (!productToDelete)
    return res.status(404).json({ message: "product not found" });
  res.json({
    success:true,
    message: "product deleted successfully",
    data: productToDelete,
  });
});

//admin only
const uploadProduct = asyncErrorhandler(async (req, res) => {
  const productToUpload = req.body;

  if (req.file && req.file.path) {
    productToUpload.img = req.file.path;
  }

  const existingProduct = await Product.findOne({ name: productToUpload.name });
  if (existingProduct) {
    return res.status(400).json({
      success: false,
      message: "Product with the same name already exists.",
    });
  }

  const newProduct = new Product(productToUpload);
  const savedProduct = await newProduct.save();
  res.status(201).json({success: true, message: "Product created successful",data:savedProduct});
});

module.exports = {
  getProducts,
  getProductByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProduct,
};
