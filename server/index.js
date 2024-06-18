const express = require("express");
const DB = require("./database").connectDB;
const app = express();
const cors = require('cors');


const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute");
const categoryRoutes = require("./routes/categoryRoute");
const orderRoutes = require("./routes/orderRoute");

DB();

app.use(express.json());
app.use(express.static("uploads"));

port = process.env.PORT || 4050;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

// routes
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/order", orderRoutes);
