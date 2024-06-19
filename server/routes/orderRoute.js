const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  createOrder,
  updateOrder,
  checkoutOrder,
  getOrderById,
} = require("../controllers/orderController");

router.post("/create", createOrder);
router.get("/getAll", getAllOrders);
router.get("/getOne/:id", getOrderById);
router.patch("/update/:id", updateOrder);
router.patch("/checkout/:id", checkoutOrder);

module.exports = router;
