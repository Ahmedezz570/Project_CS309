import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ id, name, image }) => { 
  return (
    <div className="one-card">
      <img src={image } alt={name || 'Product'} />
      <div className="text">
        <Link to={`/product/${id}`}>View product</Link> 
      </div>
    </div>
  );
};

export default Item;
