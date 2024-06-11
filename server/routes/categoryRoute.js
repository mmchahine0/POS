const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  createCategory,
} = require("../controllers/categoryController");

router.post("/create", createCategory);
router.get("/getAll", getAllCategories);

module.exports = router;
