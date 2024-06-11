const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    // adjective: {
    //   type: String,
    //   required: true,
    // },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    // image: {
    //   type: String,
    //   required: [true, "Product image is required"],
    // },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    // category: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
