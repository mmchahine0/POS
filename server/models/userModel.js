const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "cashier", "stockManager", "kitchenManager"],
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
