import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/categories.css";

const Categories = ({ icon, name, stock, selected }) => {
  return (
    <button className={`cat-box ${selected ? "selected" : ""}`}>
      <FontAwesomeIcon icon={icon} className="icon" />
      <div>
        <div className="cat-name">{name}</div>
        <div className="cat-stock">{stock} Items in Menu</div>
      </div>
    </button>
  );
};

export default Categories;
