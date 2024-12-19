import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SingleItem.css';


const SingleItem = () => {
  const [products, setProducts] = useState([]);
  const { productId } = useParams();

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const product = products.find((e) => e.id === Number(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="item-container">
    <h1>{product.name}</h1>
    <img src={product.image} alt={product.title} />
    <p>{product.description}</p>
    <p className='old'> ${product.old_price}</p>
    <p className='new'> ${product.new_price}</p>
    <p>Category: {product.category}</p>    
    <div className="button-container">
      <button
        className="buy-now-button"
      >
        Add to cart
      </button>
    </div>

  </div>
  
  );
};

export default SingleItem;
