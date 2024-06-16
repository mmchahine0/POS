const express = require("express");
const router = express.Router();

const {
  login,
  createUser,
  getAllUsers,
  updateUser,
} = require("../controllers/userController");

router.get("/getAll", getAllUsers);
router.post("/create", createUser);
router.post("/login", login);
router.patch("/update/:id", updateUser);

module.exports = router;
