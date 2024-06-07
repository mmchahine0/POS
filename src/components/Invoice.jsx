import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import "../styles/invoice.css";

const Invoice = ({ selectedProducts }) => {
  const [paymentOption, setPaymentOption] = useState("Cash Payment");
  const [showPayLaterPopup, setShowPayLaterPopup] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [printInvoice, setPrintInvoice] = useState(false);

  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option);
    if (option === "Cash Payment") {
      setPrintInvoice(false);
    }
  };

  const handlePlaceOrder = () => {
    if (paymentOption === "Paylater") {
      setShowPayLaterPopup(true);
    } else {
      // Handle Cash Payment Order
      console.log("Checkout order with details:", {
        totalAmount: (calculateTotal() * 1.1).toFixed(2),
        printInvoice,
      });
    }
  };

  const handleClosePopup = () => {
    setShowPayLaterPopup(false);
  };

  const handleCheckout = () => {
    // Handle the checkout process for Pay Later
    console.log("Checkout order with details:", {
      customerName,
      customerPhone,
      dateTime,
      totalAmount: (calculateTotal() * 1.1).toFixed(2),
      printInvoice,
    });
    // Close the popup
    handleClosePopup();
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
            <div key={product.id} className="invoice-product">
              <img src={product.img} alt={product.name} />
              <div className="invoice-product-details">
                <div className="invoice-product-info">
                  <h3>{product.name}</h3>
                  <p style={{ color: "gray" }}>{product.quantity}x</p>
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
          {paymentOption === "Cash Payment" && (
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
          )}
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
            <button onClick={handleCheckout}>Checkout Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
