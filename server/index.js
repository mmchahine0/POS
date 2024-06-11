const express = require("express");
const DB = require("./database").connectDB;
const app = express();

const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute");
const categoryRoutes = require("./routes/categoryRoute");

DB();

app.use(express.json());

port = process.env.PORT || 4050;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

// routes
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
