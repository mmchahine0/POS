const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    isavailable: {
      type: Boolean,
      default: true,
    },
    weeklyAvailability: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
      default: "default.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
