const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    if (!name || !description || !price /* || !image || !category */)
      return res.status(400).json({ message: "All fields are required" });

    const check = await Product.findOne({ name });
    if (check)
      return res.status(400).json({ message: "Product name is already exist" });

    const newProduct = await Product.create({
      name,
      description,
      price,
      image,
      category,
    });

    return res
      .status(200)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalProducts = await Product.countDocuments();
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate("category", "name");
    //   .skip(skip)
    //   .limit(limit);
    if (products.length < 1)
      return res.status(404).json({ message: "No products found" });

    return res.status(200).json({
      message: "Products fetched successfully",
      data: products,
      pagination: {
        totalProducts: totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
        pageProductLimit: limit,
      },
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
