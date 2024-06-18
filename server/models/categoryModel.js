const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
      enum: ['breakfast', 'lunch', 'dinner', 'soup', 'desserts', 'sideDish', 'appetizer', 'beverages'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
