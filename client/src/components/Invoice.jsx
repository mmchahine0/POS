import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faNoteSticky,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../styles/invoice.css";

const Invoice = ({
  selectedProducts,
  addToInvoice,
  removeFromInvoice,
  userId,
}) => {
  const [paymentOption, setPaymentOption] = useState("");
  const [showPayLaterPopup, setShowPayLaterPopup] = useState(false);
  const [showCheckOutPopup, setShowCheckOutPopup] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [printInvoice, setPrintInvoice] = useState(false);
  const user = userId;

  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option);
  };

  const handlePlaceOrder = () => {
    if (paymentOption === "Paylater") {
      setShowPayLaterPopup(true);
    } else if (paymentOption === "Cash Payment") {
      setShowCheckOutPopup(true);
    } else {
      console.error("Invalid payment option selected.");
    }
  };

  const handleClosePopup = () => {
    setShowPayLaterPopup(false);
    setShowCheckOutPopup(false);
  };

  const handleCheckoutPayLater = async () => {
    try {
      const orderData = {
        userId: user,
        orderItems: selectedProducts.map((product) => ({
          product: product._id,
          amount: product.quantity,
          price: product.price * product.quantity,
        })),
        paymentMethod: "Pay Later",
        customerInfo: {
          name: customerName,
          phoneNumber: customerPhone,
        },
        status: "Pending",
        taxPrice: calculateTotal() * 0.1,
        isPaid: false,
      };

      await axios.post("http://127.0.0.1:4000/order/create", orderData);
      handleClosePopup();
    } catch (error) {
      console.error(
        "Error creating Pay Later order:",
        error.response?.data || error.message
      );
    }
  };

  const handleCheckoutCash = async () => {
    try {
      const orderData = {
        userId: user,
        orderItems: selectedProducts.map((product) => ({
          product: product._id,
          amount: product.quantity,
          price: product.price * product.quantity,
        })),
        paymentMethod: "Cash Payment",
        customerInfo: {
          name: customerName,
          phoneNumber: null,
        },
        status: "Completed",
        taxPrice: calculateTotal() * 0.1,
        isPaid: true,
      };

      await axios.post("http://127.0.0.1:4000/order/create", orderData);

      handleClosePopup();
    } catch (error) {
      console.error(
        "Error during Cash Payment checkout:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const calculateTotal = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return (
    <div className="invoice">
      <div className="main-details">
        <div className="invoice-products-container">
          <h2>Invoice</h2>
          {selectedProducts.map((product) => (
            <div key={product._id} className="invoice-product">
              <img src={product.img} alt={product.name} />
              <div className="invoice-product-details">
                <div className="invoice-product-info">
                  <h3>{product.name}</h3>
                  <p style={{ color: "gray" }}>{product.quantity}x</p>
                </div>
                <div className="invoice-product-quantity">
                  <button onClick={() => removeFromInvoice(product)}>
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <button onClick={() => addToInvoice(product)}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <p>
                  <span style={{ color: "gray" }}>$</span>
                  {product.price * product.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="payment-summary">
          <h3>Payment Summary</h3>
          <div className="payment-summary-item">
            <p>Sub Total</p>
            <p style={{ color: "black" }}>
              <span style={{ color: "gray" }}>$</span>
              {calculateTotal()}
            </p>
          </div>
          <div className="payment-summary-item">
            <p>Tax</p>
            <p style={{ color: "black" }}>
              <span style={{ color: "gray" }}>$</span>
              {(calculateTotal() * 0.1).toFixed(2)}
            </p>
          </div>
          <hr />
          <div className="payment-summary-item">
            <p>Total Payment</p>
            <p style={{ color: "black" }}>
              <span style={{ color: "gray" }}>$</span>
              {(calculateTotal() * 1.1).toFixed(2)}
            </p>
          </div>
          <div className="payment-method">
            <div className="payment-options">
              <button
                className={`payment-option ${
                  paymentOption === "Cash Payment" ? "active" : ""
                }`}
                onClick={() => handlePaymentOptionChange("Cash Payment")}
              >
                <FontAwesomeIcon
                  style={{ fontSize: "30px", padding: "5px" }}
                  icon={faWallet}
                />
                <br />
                Cash Payment
              </button>
              <button
                className={`payment-option ${
                  paymentOption === "Paylater" ? "active" : ""
                }`}
                onClick={() => handlePaymentOptionChange("Paylater")}
              >
                <FontAwesomeIcon
                  style={{ fontSize: "30px" }}
                  icon={faNoteSticky}
                />
                <br />
                Paylater
              </button>
            </div>
          </div>

          <button
            className="payment-option"
            style={{
              width: "97%",
              marginTop: "20px",
              backgroundColor: "#007bff",
              color: "white",
            }}
            onClick={handlePlaceOrder}
          >
            {paymentOption === "Paylater"
              ? "Pay Later Order"
              : "Checkout Order"}
          </button>
        </div>
      </div>

      {showPayLaterPopup && (
        <div className="pay-later-popup">
          <div className="pay-later-popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <h3>Pay Later Order Details</h3>
            <div>
              <label>Customer Name:</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <label>Customer Phone Number:</label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
            <div>
              <label>Date and Time of Receiving the Order:</label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
            </div>
            <div className="invoice-products-container">
              <h4>Selected Items</h4>
              {selectedProducts.map((product) => (
                <div
                  key={product._id}
                  className="invoice-product"
                  style={{
                    marginTop: "-10px",
                    marginBottom: "-10px",
                    paddingTop: "-10px",
                    paddingBottom: "-10px",
                  }}
                >
                  <div className="invoice-product-details">
                    <div className="invoice-product-info">
                      <h4>{product.name}</h4>
                      <p>
                        <span style={{ color: "gray" }}>$</span>
                        {product.price * product.quantity}
                      </p>
                    </div>
                    <p>{product.quantity}x</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p>Total Amount to Pay: ${(calculateTotal() * 1.1).toFixed(2)}</p>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={printInvoice}
                  onChange={() => setPrintInvoice(!printInvoice)}
                  style={{ margin: "10px" }}
                />
                Print Invoice
              </label>
            </div>
            <button onClick={handleCheckoutPayLater}>Checkout Order</button>
          </div>
        </div>
      )}
      {showCheckOutPopup && (
        <div className="pay-later-popup">
          <div className="pay-later-popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <h3>Cash Payment Order Details</h3>
            <div>
              <label>Customer Name:</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="invoice-products-container">
              <h4>Selected Items</h4>
              {selectedProducts.map((product) => (
                <div
                  key={product._id}
                  className="invoice-product"
                  style={{
                    marginTop: "-10px",
                    marginBottom: "-10px",
                    paddingTop: "-10px",
                    paddingBottom: "-10px",
                  }}
                >
                  <div className="invoice-product-details">
                    <div className="invoice-product-info">
                      <h4>{product.name}</h4>
                      <p>
                        <span style={{ color: "gray" }}>$</span>
                        {product.price * product.quantity}
                      </p>
                    </div>
                    <p>{product.quantity}x</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p>Total Amount to Pay: ${(calculateTotal() * 1.1).toFixed(2)}</p>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={printInvoice}
                  onChange={() => setPrintInvoice(!printInvoice)}
                  style={{ margin: "10px" }}
                />
                Print Invoice
              </label>
            </div>
            <button onClick={handleCheckoutCash}>Checkout Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
