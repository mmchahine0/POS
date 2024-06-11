import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Orders.css";

// Dummy data
const dummyOrders = Array.from({ length: 40 }, (_, index) => ({
  _id: `order${index + 1}`,
  createdAt: new Date(2023, 5, index + 1).toISOString(),
  customerInfo: { name: `Customer ${index + 1}` },
  isPaid: index % 2 === 0,
  status:
    index % 3 === 0
      ? "paylater"
      : index % 3 === 1
      ? "cash payment"
      : "inprogress",
  totalPrice: (index + 1) * 100,
}));

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Orders");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(14);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
              <span style={{ fontSize: "1.0rem", fontWeight: "500" }}>
                Filter
              </span>
            </div>
            <div className="icons" onClick={() => handlePopUp()}>
              <FontAwesomeIcon icon={faCalendarDays} />
              <span style={{ fontSize: "1.0rem", fontWeight: "500" }}>
                Calendar
              </span>
            </div>
          </div>
        </div>
        <div className="orders">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th onClick={() => handleSort("createdAt")}>Date Ordered</th>
                <th onClick={() => handleSort("customerInfo.name")}>
                  Customer
                </th>
                <th onClick={() => handleSort("isPaid")}>Payment</th>
                <th onClick={() => handleSort("status")}>Status</th>
                <th onClick={() => handleSort("totalPrice")}>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.customerInfo.name}</td>
                  <td>{order.isPaid ? "Paid" : "Unpaid"}</td>
                  <td>{order.status}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    {/* <button onClick={() => generatePDF(order)}>
                      Print PDF
                    </button> */}
                  </td>
                </tr>
              ))}
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
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <div className="date-picker">
              <label>Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
              />
            </div>
            <div className="date-picker">
              <label>End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
              />
            </div>
            <button className="reset-button" onClick={handleResetDates}>
              Reset Dates
            </button>
            <button
              className="reset-button"
              style={{ marginLeft: "10px" }}
              onClick={handleClosePopup}
            >
              Set Dates
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
