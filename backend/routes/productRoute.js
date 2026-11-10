const express = require("express");
const { getProducts,getProductById, updateProduct, deleteProduct,uploadProduct, getAllCategories} = require("../controller/product-controller");
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/adminMiddleware");
const upload = require("../middleware/UploadFile");

const router = express.Router();

//admin routes
router.post("/", verifyToken, isAdmin,upload.single("img"), uploadProduct);
router.put("/:productId", verifyToken, isAdmin,upload.single("img"), updateProduct);
router.delete("/:productId", verifyToken, isAdmin, deleteProduct);

//user routes
router.get("/", getProducts);
router.get("/categories", getAllCategories);
router.get("/:productId", getProductById);

module.exports = router;
