const Category = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ message: "Category name is required" });

    const check = await Category.findOne({ name });
    if (check)
      return res
        .status(400)
        .json({ message: "Category name is already exist" });

    const newCategory = await Category.create({ name });

    return res
      .status(200)
      .json({ message: "Category created successfully", data: newCategory });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    if (categories.length < 1)
      return res.status(404).json({ message: "No categories found" });

    return res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
