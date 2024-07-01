const Tax = require("../models/taxModel");

exports.getTax = async (req, res) => {
  try {
    const tax = await Tax.find();
    if (tax.length < 1)
      return res.status(404).json({ message: "Tax not found" });

    return res.status(200).json({
      message: "Tax fetched successfully",
      data: tax,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createTax = async (req, res) => {
  const { taxPrice } = req.body;
  try {
    const tax = await Tax.create({ taxPrice });

    return res
      .status(200)
      .json({ message: "Tax created successfully", data: tax });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateTax = async (req, res) => {
  const { id } = req.params;
  const { taxPrice } = req.body;
  try {
    const tax = await Tax.findByIdAndUpdate(id, { taxPrice }, { new: true });

    return res
      .status(200)
      .json({ message: "Tax updated successfully", data: tax });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
