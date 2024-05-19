import React from 'react';
import '../styles/categories.css';

const Categories = ({ img, name, stock }) => {
  return (
    <botton className="cat-box">
      <img src={img} alt={name} className="icon" />
      <div>
        <div className='cat-name'>{name}</div>
        <div className='cat-stock'>{stock} Menu in Stock</div>
      </div>
    </botton>
  );
};

export default Categories;
