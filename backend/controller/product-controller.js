const asyncErrorhandler = require("../middleware/asyncErorHandler");
const Product = require("../models/productModel");

const getProducts = asyncErrorhandler(async (req, res) => {
  const { page = 1, limit = 10, name, category } = req.query;

  const filter = { isDeleted: { $ne: true } }; //match for isdelete
  if (category && category !== "all") filter.category = category;
  if (name) filter.name = { $regex: name, $options: "i" };

  const totalProducts = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.status(200).json({
    success: true,
    totalProducts,
    pageLength: Math.ceil(totalProducts / limit),
    currentPage: parseInt(page),
    data: products,
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
  const updates = { ...req.body };

  if (req.file?.path) {
    updates.img = req.file.path;
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId, isDeleted: false },
     updates,
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found or already deleted.",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updatedProduct,
  });
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
  let productToUpload = req.body;
  
  if (!productToUpload.name || !productToUpload.price || !productToUpload.stock) {
    return res.status(400).json({
      success: false,
      message: "Product name, price, and stock are required."
    });
  }

  if (req.file && req.file.path) {
    productToUpload.img = req.file.path;
  }

  const existingProduct = await Product.findOne({ name: productToUpload.name });
  if (existingProduct) {
    return res.status(400).json({
      success: false,
      message: "Product with the same name already exists."
    });
  }

  const newProduct = new Product(productToUpload);
  const savedProduct = await newProduct.save();

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: savedProduct
  });
});

const getAllCategories = asyncErrorhandler(async (req, res) => {
  // Using aggregation to get one product from each category
  const categories = await Product.aggregate([
    { $group: { _id: "$category", product: { $first: "$$ROOT" } } } // Group by category and pick the first product in each category
  ]);

  if (categories.length === 0) {
    return res.status(404).json({ success: false, message: "No categories found" });
  }

  // Extract only the product data (without the category grouping)
  const products = categories.map(item => item.product);

  res.status(200).json({ success: true, data: products });
});


module.exports = {
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProduct,
  getAllCategories
};
