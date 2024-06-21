import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faArrowsUpDown,
  faFileInvoice,
  faTimesCircle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Orders.css";
import { CSVLink } from "react-csv";

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Orders");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(12);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCheckConfirmationPopup, setShowCheckConfirmationPopup] =
    useState(false);
  const [showCancelConfirmationPopup, setShowCancelPopup] = useState(false);
  const [showInvoicePopup, setShowInvoicePopup] = useState(false);
  const [order, setOrder] = useState("");
  const [printInvoice, setPrintInvoice] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4000/order/getAll");
        const ordersArray = response.data.data;
        setOrders(ordersArray);
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleResetDates = () => {
    setStartDate(null);
    setEndDate(null);
  };
  const handleClosePopup = () => {
    setShowCancelPopup(false);
    setShowCheckConfirmationPopup(false);
    setShowInvoicePopup(false);
  };

  useEffect(() => {
    // Reset to page 1 whenever search query or selected type changes
    setCurrentPage(1);
  }, [searchQuery, selectedType]);

  // Filtering and searching logic
  const filteredOrders = orders.filter((item) => {
    const matchesSearchQuery =
      item.customerInfo &&
      item.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      selectedType === "All Orders" || item.status === selectedType;
    const matchesDateRange =
      !startDate ||
      !endDate ||
      (new Date(item.createdAt) >= startDate &&
        new Date(item.createdAt) <= endDate);
    return matchesSearchQuery && matchesType && matchesDateRange;
  });

  // Sorting logic
  const sortedOrders = filteredOrders.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Calculate the current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  const handleCancelOrder = (orderId) => {
    setOrder(orderId);
    setShowCancelPopup(true);
  };

  const handleCheckoutOrder = (orderId) => {
    setOrder(orderId);
    setShowCheckConfirmationPopup(true);
  };

  const handlePrintOrder = async (orderId) => {
    setOrder(orderId);
    try {
      const response = await axios.get(
        `http://127.0.0.1:4000/order/getOne/${orderId}`
      );
      setOrderDetails(response.data.data);
      console.log(response.data.data);
      setShowInvoicePopup(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const handleCheckout = async () => {
    const id = order;
    try {
      const response = await axios.patch(
        `http://127.0.0.1:4000/order/checkout/${id}`
      );
      const updatedOrder = response.data.data;

      setOrders((prevOrders) =>
        prevOrders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );

      handleClosePopup();
    } catch (error) {
      console.error("Error checking out the order:", error);
    }
  };

  const handleCancel = async () => {
    // const id = order;
    // try {
    //   const response = await axios.patch(
    //     `http://127.0.0.1:4000/order/cancel/${id}`
    //   );
    //   const updatedOrder = response.data.data;
    //   setOrders((prevOrders) =>
    //     prevOrders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
    //   );
    handleClosePopup();
    // } catch (error) {
    //   console.error("Error checking out the order:", error);
    // }
  };

  const csvData = orders.map((order) => ({
    orderId: order._id,
    dateOrdered: new Date(order.createdAt).toLocaleDateString(),
    customer: order.customerInfo ? order.customerInfo.name : "N/A",
    payment: order.isPaid ? "Paid" : "Paylater",
    status: order.status.charAt(0).toUpperCase() + order.status.slice(1), // Capitalize first letter
    price: `$${order.totalPrice.toFixed(2)}`,
  }));

  return (
    <div className="screen-container">
      <Sidebar />
      <div className="container-wrapper">
        <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="check-type-container">
          <div className="types">
            {["All Orders", "Pending", "New", "Completed", "Canceled"].map(
              (type) => (
                <div
                  key={type}
                  className={`type ${selectedType === type ? "selected" : ""}`}
                  onClick={() => handleTypeClick(type)}
                >
                  <span style={{ fontSize: "1.1rem", fontWeight: "500" }}>
                    {type}
                  </span>
                </div>
              )
            )}
          </div>
          <div className="filters">
            <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="date-picker"
                onFocus={(e) => e.target.setAttribute("readonly", true)}
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
                className="date-picker"
                onFocus={(e) => e.target.setAttribute("readonly", true)}
              />
              <button className="buttons" onClick={handleResetDates}>
                Reset
              </button>
            </div>
          </div>
          <div className="filters">
            <CSVLink
              data={csvData}
              filename={"orders.csv"}
              style={{ textDecoration: "none" }}
            >
              <div className="icons">
                <FontAwesomeIcon icon={faPrint} />
                <span style={{ fontSize: "1.1rem", fontWeight: "500" }}>
                  Print CSV
                </span>
              </div>
            </CSVLink>
          </div>
        </div>
        <div className="orders">
          <table>
            <thead>
              <tr>
                <th style={{ cursor: "default" }}>Order ID</th>
                <th onClick={() => handleSort("createdAt")}>
                  Date Ordered <FontAwesomeIcon icon={faArrowsUpDown} />
                </th>
                <th onClick={() => handleSort("customerInfo.name")}>
                  Customer <FontAwesomeIcon icon={faArrowsUpDown} />
                </th>
                <th onClick={() => handleSort("isPaid")}>
                  Payment <FontAwesomeIcon icon={faArrowsUpDown} />
                </th>
                <th onClick={() => handleSort("status")}>
                  Status <FontAwesomeIcon icon={faArrowsUpDown} />
                </th>
                <th onClick={() => handleSort("totalPrice")}>
                  Price <FontAwesomeIcon icon={faArrowsUpDown} />
                </th>
                <th style={{ cursor: "default" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => {
                const paymentStyle = {
                  backgroundColor: order.isPaid
                    ? "rgba(0, 128, 0, 0.1)"
                    : "rgba(255, 0, 0, 0.1)",
                  color: order.isPaid ? "green" : "red",
                  borderRadius: "10px",
                  padding: "5px 10px",
                  textAlign: "center",
                };

                let statusStyle = {
                  borderRadius: "10px",
                  textAlign: "center",
                  padding: "5px 10px",
                };
                if (order.status === "Pending") {
                  statusStyle.color = "orange";
                  statusStyle.backgroundColor = "rgba(255, 165, 0, 0.1)";
                } else if (order.status === "New") {
                  statusStyle.color = "purple";
                  statusStyle.backgroundColor = "rgba(0, 0, 255, 0.1)";
                } else if (order.status === "Completed") {
                  statusStyle.color = "green";
                  statusStyle.backgroundColor = "rgba(0, 128, 0, 0.1)";
                } else if (order.status === "Canceled") {
                  statusStyle.color = "red";
                  statusStyle.backgroundColor = "rgba(255, 0, 0, 0.1)";
                }

                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      {order.customerInfo ? order.customerInfo.name : "N/A"}
                    </td>
                    <td style={paymentStyle}>
                      {order.isPaid ? "Paid" || "Cash Payment" : "Paylater"}
                    </td>
                    <td style={statusStyle}>
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td className="action-icons">
                      <FontAwesomeIcon
                        icon={faFileInvoice}
                        title="Print Order"
                        className="action-icon"
                        onClick={() => handlePrintOrder(order._id)}
                      />
                      {order.status !== "Completed" && (
                        <>
                          <FontAwesomeIcon
                            icon={faTimesCircle}
                            title="Cancel Order"
                            className="action-icon"
                            style={{ marginLeft: "15px" }}
                            onClick={() => handleCancelOrder(order._id)}
                          />
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            title="Checkout Order"
                            className="action-icon"
                            style={{ marginLeft: "15px" }}
                            onClick={() => handleCheckoutOrder(order._id)}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(filteredOrders.length / ordersPerPage) },
              (_, index) => (
                <button key={index + 1} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
      {showCheckConfirmationPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <label>Are you sure you want to Checkout {order} ?</label>
            <button onClick={handleCheckout}>Checkout Order</button>
            <button
              style={{ color: "white", backgroundColor: "red" }}
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showCancelConfirmationPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <label>Are you sure you want to Delete {order} ?</label>
            <button onClick={handleCancel}>Delete Order</button>
            <button
              style={{ color: "white", backgroundColor: "red" }}
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showInvoicePopup && orderDetails && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <h2>Invoice of Order: {orderDetails._id}</h2>
            <p className="p-order">
              Date Ordered:{" "}
              {new Date(orderDetails.createdAt).toLocaleDateString()}
            </p>
            <p className="p-order">
              Customer: {orderDetails.customerInfo.name}
            </p>
            <p className="p-order">
              Phone Number: {orderDetails.customerInfo.phoneNumber}
            </p>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product.name}</td>
                    <td>{item.amount}</td>
                    <td>${item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="p-order">
              Total Price: ${orderDetails.totalPrice.toFixed(2)}
            </p>
            <button onClick={handleClosePopup}>Print</button>
            <button
              style={{ color: "white", backgroundColor: "red" }}
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
