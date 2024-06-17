const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  createOrder,
  updateOrder,
  checkoutOrder,
} = require("../controllers/orderController");

router.post("/create", createOrder);
router.get("/getAll", getAllOrders);
router.patch("/update/:id", updateOrder);
router.patch("/checkout/:id", checkoutOrder);
// router.delete("/delete/:id", deleteCategory);

module.exports = router;
