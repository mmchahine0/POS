const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username || !req.body.password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ username, status: false });
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
      .json({ message: "Login successfully", data: others });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length < 1)
      return res.status(400).json({ message: "No users found" });

    return res
      .status(200)
      .json({ message: "Users fetched successfully ", data: users });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, role, status } = req.body;
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
      status,
    });

    const { password, ...others } = newUser._doc;
    return res
      .status(200)
      .json({ message: "User created successfully", data: others });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { username, password, role, status } = req.body;
  const { id } = req.params;
  try {
    if (username) {
      const user = await User.findOne({ username, _id: { $ne: id } });
      if (user)
        return res.status(400).json({ message: "Username must be unique" });
    }

    if (role && role !== "admin" && role !== "user")
      return res.status(400).json({ message: "Role must be admin or user" });

    let hashedPassword;
    if (password) hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        password: hashedPassword,
        role,
        status,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "User updated successfully", data: newUser });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
