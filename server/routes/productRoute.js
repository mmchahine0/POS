const express = require("express");
const multer = require("multer");

const {
  getAllProducts,
  createProduct,
  getProductsByCategory,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/product");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "+" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.get("/getAll", getAllProducts);
router.get("/getByCategory/:id", getProductsByCategory);

router.post("/create", upload.single("image"), createProduct);
router.patch("/update/:id", upload.single("image"), updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
