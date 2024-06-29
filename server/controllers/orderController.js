const Order = require("../models/orderModel");
const Product = require("../models/productModel");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "username role");
    if (orders.length < 1)
      return res.status(404).json({ message: "No orders found" });

    return res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
      .populate("user", "username role")
      .populate({
        path: "orderItems.product",
        select: "name price description",
      });
    if (!order) return res.status(404).json({ message: "Order not found" });

    return res
      .status(200)
      .json({ message: "Order fetched successfully", data: order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// exports.createOrder = async (req, res) => {
//   try {
//     const {
//       userId,
//       orderItems,
//       paymentMethod,
//       customerInfo,
//       status,
//       taxPrice,
//     } = req.body;
//     if (
//       !userId ||
//       // !orderItems ||
//       // !paymentMethod ||
//       !customerInfo ||
//       // !status ||
//       !taxPrice
//     )
//       return res.status(400).json({ message: "All fields are required" });

//     const order = await Order.create({
//       user: userId,
//       //   orderItems: detailedOrderItems,
//       // paymentMethod,
//       customerInfo,
//       taxPrice,
//     });

//     return res.status(200).json({ data: order });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

exports.createOrder = async (req, res) => {
  let order,
    detailedOrderItems = [];
  // orderTotalPrice = 0;
  try {
    const {
      userId,
      orderItems,
      paymentMethod,
      customerInfo,
      status,
      taxPrice,
      totalPrice,
      isPaid,
      paidAt,
      deliveryDate,
    } = req.body;

    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product)
        return res
          .status(404)
          .json({ message: `Product with ID ${item.product} not found` });

      if (!product.isavailable)
        return res.status(400).json({
          message: `${product.name} is not available`,
        });

      if (product.quantity < item.amount)
        return res.status(400).json({
          message: `${product.name} out of stock!! Quantity remaining ${product.quantity} in stock`,
        });
    }

    detailedOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item.product);

        const price = product.price;
        const amount = item.amount;
        const totalPrice = price * amount;

        product.quantity -= amount;
        if (product.quantity === 0) product.isavailable = false;
        await product.save();

        return {
          product: item.product,
          amount: amount,
          price: totalPrice,
        };
      })
    );

    if (paymentMethod == "Cash Payment") {
      order = await Order.create({
        user: userId,
        orderItems: detailedOrderItems,
        paymentMethod,
        customerInfo,
        status: "Completed",
        taxPrice,
        totalPrice,
        isPaid: true,
        paidAt,
        deliveryDate,
      });
    } else if (paymentMethod == "Pay Later") {
      order = await Order.create({
        user: userId,
        orderItems: detailedOrderItems,
        paymentMethod,
        customerInfo,
        status: "Pending",
        taxPrice,
        totalPrice,
        // isPaid: false,
        paidAt,
        deliveryDate,
      });
    }
    return res
      .status(200)
      .json({ message: "Order created successfully", data: order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  // let detailedOrderItems = [];
  // orderTotalPrice = 0;
  try {
    const {
      // orderItems,
      paymentMethod,
      customerInfo,
      status,
      taxPrice,
      isPaid,
      deliveryDate,
    } = req.body;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // if (orderItems) {
    //   detailedOrderItems = await Promise.all(
    //     orderItems.map(async (item) => {
    //       const product = await Product.findById(item.product);
    //       if (!product)
    //         return res
    //           .status(404)
    //           .json({ message: `Product with ID ${item.product} not found` });

    //       const price = product.price;
    //       const amount = item.amount;
    //       const totalPrice = price * amount;

    //       // product.quanity -= amount;
    //       // await product.save();

    //       // orderTotalPrice += totalPrice;
    //       return {
    //         product: item.product,
    //         amount: amount,
    //         price: totalPrice,
    //       };
    //     })
    //   );
    // }

    const updateOrder = await Order.findByIdAndUpdate(
      order._id,
      {
        // orderItems: detailedOrderItems,
        paymentMethod,
        customerInfo,
        taxPrice,
        status,
        // totalPrice: orderTotalPrice,
        isPaid,
        deliveryDate,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Order updated successfully", data: updateOrder });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.checkoutOrder = async (req, res) => {
  const { id } = req.params;
  try {
    // const {  status, isPaid } = req.body;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const updateOrder = await Order.findByIdAndUpdate(
      order._id,
      {
        status: "Completed",
        isPaid: true,
        paidAt: Date.now(),
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Order completed successfully", data: updateOrder });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
