const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  const { role } = req.query;
  let products;
  try {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (role === "admin") {
      products = await Product.find();
    } else {
      const currentDay = daysOfWeek[new Date().getDay()];
      products = await Product.find({
        isavailable: true,
        quantity: { $gt: 0 },
        $or: [
          { weeklyAvailability: { $in: [currentDay] } },
          {
            weeklyAvailability: { $in: ["Monday to Sunday"] },
          },
        ],
      })
        .sort({ createdAt: -1 })
        .populate("category", "name");
    }

    if (products.length < 1)
      return res.status(404).json({ message: "No products found" });

    return res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// exports.getProductsByCategory = async (req, res) => {
//   // const page = parseInt(req.query.page) || 1;
//   // const limit = parseInt(req.query.limit) || 10;
//   // const skip = (page - 1) * limit;
//   const categoryId = req.params.id;
//   try {
//     // const totalProducts = await Product.countDocuments({
//     //   category: categoryId,
//     // });
//     const products = await Product.find({
//       category: categoryId,
//       isavailable: true,
//       quantity: { $gt: 0 },
//     })
//       .sort({ createdAt: -1 })
//       .populate("category", "name");
//     // .skip(skip)
//     // .limit(limit);
//     if (products.length < 1)
//       return res.status(404).json({ message: "No products found" });

//     return res.status(200).json({
//       message: "Products fetched successfully",
//       data: products,
//       // pagination: {
//       //   totalProducts: totalProducts,
//       //   totalPages: Math.ceil(totalProducts / limit),
//       //   currentPage: page,
//       //   pageProductLimit: limit,
//       // },
//     });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quanity,
      weeklyAvailability,
      isavailable,
    } = req.body;
    if (!name || !description || !price || !category /* || !image  */)
      return res.status(400).json({ message: "All fields are required" });

    const check = await Product.findOne({ name });
    if (check)
      return res.status(400).json({ message: "Product name is already exist" });

    const newProduct = await Product.create({
      name,
      description,
      price,
      image: req.file ? req.file.filename : "default.png",
      category,
      quanity,
      weeklyAvailability,
      isavailable,
    });

    return res
      .status(200)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  let newProduct;
  try {
    if (name) {
      const check = await Product.findOne({ name, _id: { $ne: id } });
      if (check)
        return res
          .status(400)
          .json({ message: "Product name is already exist" });
    }

    const product = await Product.findById(id);

    if (req.file) {
      newProduct = await Product.findByIdAndUpdate(
        id,
        {
          ...req.body,
          image: req.file ? req.file.filename : product.image,
        },
        { new: true }
      );
    }

    newProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

    return res
      .status(200)
      .json({ message: "Product updated successfully", data: newProduct });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
};
