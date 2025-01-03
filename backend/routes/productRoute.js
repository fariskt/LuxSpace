const express = require("express");
const { getProducts,getProductById, updateProduct, 
  deleteProduct,
   uploadProduct
  ,getProductByCategory
} = require("../controller/product-controller");
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/adminMiddleware");
const { validateProducts } = require("../middleware/validatate");

const router = express.Router();

//admin routes
router.post("/", verifyToken, isAdmin,validateProducts, uploadProduct);
router.put("/:productId", verifyToken, isAdmin,validateProducts, updateProduct);
router.delete("/:productId", verifyToken, isAdmin, deleteProduct);

//user routes
router.get("/", getProducts);
router.get("/:productId", getProductById);
router.get("/category/:categoryName", getProductByCategory)

module.exports = router;
