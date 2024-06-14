const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username || !req.body.password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword)
      return res.status(400).json({ message: "Invalid credentials." });

    const { password, ...others } = user._doc;
    return res
      .status(200)
      .json({ message: "Login successfully", user: others });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, role } = req.body;
    if (!username || !req.body.password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ username });
    if (user)
      return res.status(400).json({ message: "Username must be unique" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    const { password, ...others } = newUser._doc;
    return res
      .status(200)
      .json({ message: "User created successfully", user: others });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
