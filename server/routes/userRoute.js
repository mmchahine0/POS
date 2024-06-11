const express = require("express");
const router = express.Router();

const { login, createUser } = require("../controllers/userController");

router.post("/create", createUser);
router.post("/login", login);

module.exports = router;
