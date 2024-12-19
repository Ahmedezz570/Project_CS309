import React, { useEffect, useState } from 'react';
import "./CSS/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch('http://localhost:4000/cart', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setCartItems(Object.values(data.cart || {})); 
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/delete/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.productId !== productId)
        );
        console.log(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {loading ? (
        <p>Loading cart...</p>
      ) : cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.productId}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h2 className="cart-item-name">{item.name}</h2>
                <p className="cart-item-price">Price: ${item.new_price}</p>
                <p className="cart-item-category">
                  Category: {item.category}
                </p>
                <button
                  className="cart-item-remove"
                  onClick={() => handleRemove(item.productId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
