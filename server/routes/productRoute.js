const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
} = require("../controllers/productController");

router.post("/create", createProduct);
router.get("/getAll", getAllProducts);

module.exports = router;
