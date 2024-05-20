import React from 'react';
import '../styles/invoice.css';

const Invoice = ({ selectedProducts }) => {
  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);
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
                        <p>{product.quantity}x</p>
                    </div>
                    <p>${product.price * product.quantity}</p>
                </div>
            </div>
        ))}
        </div>
        
            <div className="payment-summary">
                <h3>Payment Summary</h3>
                <div className="payment-summary-item">
                    <p>Sub Total</p>
                    <p style={{color:"black"}}>${calculateTotal()}</p>
                </div>
                <div className="payment-summary-item">
                    <p>Tax</p>
                    <p style={{color:"black"}}>${(calculateTotal() * 0.1).toFixed(2)}</p>
                </div>
                <hr />
                <div className="payment-summary-item">

                    <p>Total Payment</p>
                    <p style={{color:"black"}}>${(calculateTotal() * 1.1).toFixed(2)}</p>
                </div>
                <div className="payment-method">
            <div className="payment-method-options">
            <div className="payment-method-option">
                <input type="radio" id="cash" name="payment" value="cash" />
                <label htmlFor="cash">Cash</label>
            </div>
            <div className="payment-method-option">
                <input type="radio" id="later" name="payment" value="credit" />
                <label htmlFor="later">Pay Later</label>
            </div>
            </div>
            <button className="payment-button">Pay</button>
        </div>
            </div>
    </div>
    </div>

  );
};

export default Invoice;
