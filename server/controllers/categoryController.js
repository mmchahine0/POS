const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name)
      return res.status(400).json({ message: "Category name is required" });

    const check = await Category.findOne({ name });
    if (check)
      return res
        .status(400)
        .json({ message: "Category name is already exist" });

    const newCategory = await Category.create({
      name,
      image: req.file ? req.file.filename : "default.png",
    });

    return res
      .status(200)
      .json({ message: "Category created successfully", data: newCategory });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    const categoriesWithProducts = await Promise.all(
      categories.map(async (category) => {
        const products = await Product.find({ category: category._id });
        return {
          ...category._doc,
          products,
          stock: products.length,
        };
      })
    );
    if (categories.length < 1)
      return res.status(404).json({ message: "No categories found" });

    return res.status(200).json({
      message: "Categories fetched successfully",
      data: categoriesWithProducts,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category)
      return res.status(400).json({ message: "Category not found" });

    const check = await Category.findOne({ name });
    if (check)
      return res
        .status(400)
        .json({ message: "Category name is already exist" });

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
        image: req.file ? req.file.filename : category.image,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const updatedCategory = await Category.findByIdAndDelete(id, { name });
    if (!updatedCategory)
      return res.status(400).json({ message: "Category not found" });

    return res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
