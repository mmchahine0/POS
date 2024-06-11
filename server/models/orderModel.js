const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        amount: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Cash Payment", "Pay Later"],
    },
    customerInfo: {
      name: { type: String },
      phoneNumber: { type: String },
    },
    status: {
      type: String,
      required: true,
      enum: ["inprogress", "complete"],
    },
    // paymentResult: {
    //   id: { type: String },
    //   status: { type: String },
    //   update_time: { type: String },
    //   email_address: { type: String },
    // },
    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
