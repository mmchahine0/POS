const express = require("express");

const {
  getTax,
  updateTax,
  createTax,
} = require("../controllers/taxController");
const router = express.Router();

router.get("/get", getTax);
router.post("/create", createTax);
router.put("/update/:id", updateTax);

module.exports = router;
