import React from "react";
import "../styles/products.css";
import { useState, useEffect } from "react";

export const Product = ({
  product,
  quantity,
  addToInvoice,
  removeFromInvoice,
}) => {
  const [id, setId] = useState("add");
  useEffect(() => {
    if (quantity === 0) {
      setId("add");
    } else {
      setId("added");
    }
  }, [quantity]);
  return (
    <div className="product">
      <div className="main">
        <img src={product.img} alt={product.name} />
        <div className="product-info">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
      </div>
      <div className="price-quantity">
        <p>
          $<span>{product.price}</span>
        </p>
        <div className="actions">
          <button id="remove" onClick={removeFromInvoice}>
            -
          </button>
          <span>{quantity}</span>
          <button id={id} onClick={addToInvoice}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
