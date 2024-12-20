import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SingleItem.css';
import Reviews from '../reviews';

const SingleItem = () => {
  const [products, setProducts] = useState([]);
  const { productId } = useParams();

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));

    const token = localStorage.getItem('token');

  }, []);

  const product = products.find((e) => e.id === Number(productId));

  const AddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login');
        return;
      }

      const response = await fetch('http://localhost:4000/add/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('success Add to cart');
      } else {
        alert(`Error ${data.message}`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart:', error);
    }
  };

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <div className="item-container">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p className="old"> ${product.old_price}</p>
      <p className="new"> ${product.new_price}</p>
      <p>Category: {product.category}</p>
      <div className="button-container">
        <button className="buy-now-button" onClick={AddToCart}>
          Add to cart
        </button>
      </div>
      <div className='Review'>
      <Reviews productId={productId} email={localStorage.getItem("email")} />
    </div></div>
  );
};

export default SingleItem;
