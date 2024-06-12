import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faCalendarDays,
  faPrint,
  faArrowsUpDown,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Orders.css";
import { CSVLink } from "react-csv";

// Dummy data
const dummyOrders = Array.from({ length: 40 }, (_, index) => ({
  _id: `order${index + 1}`,
  createdAt: new Date(2023, 5, index + 1).toISOString(),
  customerInfo: { name: `Customer ${index + 1}` },
  isPaid: index % 2 === 0,
  status: index % 3 === 0 ? "paylater" : "cash payment",
  totalPrice: (index + 1) * 100,
}));

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Orders");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(13);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const handlePopUp = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleResetDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  useEffect(() => {
    // Initially load orders
    setOrders(dummyOrders);
  }, []);

  useEffect(() => {
    // Reset to page 1 whenever search query or selected type changes
    setCurrentPage(1);
  }, [searchQuery, selectedType]);

  // Filtering and searching logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearchQuery = order.customerInfo.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      selectedType === "All Orders" ||
      order.status === selectedType.toLowerCase();
    const matchesDateRange =
      !startDate ||
      !endDate ||
      (new Date(order.createdAt) >= startDate &&
        new Date(order.createdAt) <= endDate);
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

  const handleSelectOrder = (orderId) => {
    setSelectedOrders((prevSelectedOrders) => {
      if (prevSelectedOrders.includes(orderId)) {
        return prevSelectedOrders.filter((id) => id !== orderId);
      } else {
        return [...prevSelectedOrders, orderId];
      }
    });
  };

  const csvData = currentOrders
    .filter((order) => selectedOrders.includes(order._id))
    .map((order) => ({
      orderId: order._id,
      dateOrdered: new Date(order.createdAt).toLocaleDateString(),
      customer: order.customerInfo.name,
      payment: order.isPaid ? "Paid" : "Unpaid",
      status: order.status,
      price: `$${order.totalPrice.toFixed(2)}`,
    }));

  return (
    <div className="screen-container">
      <Sidebar />
      <div className="container-wrapper">
        <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="check-type-container">
          <div className="types">
            {["All Orders", "Paylater", "Cash Payment"].map((type) => (
              <div
                key={type}
                className={`type ${selectedType === type ? "selected" : ""}`}
                onClick={() => handleTypeClick(type)}
              >
                <span style={{ fontSize: "1.1rem", fontWeight: "500" }}>
                  {type}
                </span>
              </div>
            ))}
          </div>
          <div className="filters">
            <div className="icons">
              <FontAwesomeIcon icon={faFilter} />
              <span style={{ fontSize: "1.1rem", fontWeight: "500" }}>
                Filter
              </span>
            </div>
            <div className="icons" onClick={handlePopUp}>
              <FontAwesomeIcon icon={faCalendarDays} />
              <span style={{ fontSize: "1.1rem", fontWeight: "500" }}>
                Calendar
              </span>
            </div>
            <CSVLink
              data={csvData}
              filename={"selected_orders.csv"}
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
                  borderLeft: order.isPaid
                    ? "3px solid green"
                    : "3px solid red",
                  borderRadius: "5px",
                };

                let statusStyle = { borderRadius: "5px" };
                if (order.status === "paylater") {
                  statusStyle.borderLeft = "3px solid orange";
                } else if (order.status === "cash payment") {
                  statusStyle.borderLeft = "3px solid purple";
                } else {
                  statusStyle.backgroundColor = "transparent";
                }

                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.customerInfo.name}</td>
                    <td style={paymentStyle}>
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </td>
                    <td style={statusStyle}>{order.status}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order._id)}
                        onChange={() => handleSelectOrder(order._id)}
                        className="check-box"
                      />
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
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Select Date Range</h3>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
            />
            <div className="popup-buttons">
              <button onClick={handleClosePopup}>Close</button>
              <button onClick={handleResetDates}>Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
