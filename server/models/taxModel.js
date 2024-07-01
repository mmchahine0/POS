const mongoose = require("mongoose");

const taxSchema = mongoose.Schema(
  {
    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tax", taxSchema);
