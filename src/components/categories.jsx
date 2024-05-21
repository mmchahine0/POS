import React from 'react';
import '../styles/categories.css';

const Categories = ({ img, name, stock, selected }) => {
  return (
    <button className={`cat-box ${selected ? 'selected' : ''}`}>
      <img src={img} alt={name} className="icon" />
      <div>
        <div className='cat-name'>{name}</div>
        <div className='cat-stock'>{stock} Menu in Stock</div>
      </div>
    </button>
  );
};

export default Categories;
