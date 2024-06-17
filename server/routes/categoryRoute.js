const express = require("express");
const multer = require("multer");

const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/category");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "+" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/getAll", getAllCategories);
router.post("/create", upload.single("image"), createCategory);
router.patch("/update/:id", upload.single("image"), updateCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
