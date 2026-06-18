const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const managerMiddleware = require("../middleware/managerMiddleware");

const {
  createProduct,
  getProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post(
    "/",
    protect,
    managerMiddleware,
    createProduct
);
router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductById);
router.put(
    "/:id",
    protect,
    managerMiddleware,
    updateProduct);
router.delete(
    "/:id",
    protect,
    managerMiddleware,
     deleteProduct);

module.exports = router;