import React, { useEffect, useState } from 'react';
import "./CSS/Cart.css";
import Navbar from '../Components/NavBar/Navbar';
import Footer from '../Components/Footer/Footer';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState({});

  useEffect(() => {
        fetchCart();
  }, []);

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

    const handleIncrement = async (productId) => {
      try {
        setUpdateLoading(prev => ({ ...prev, [productId]: true }));
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/add/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setCartItems(Object.values(data.cart || {}));
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error incrementing quantity:', error);
      } finally {
        setUpdateLoading(prev => ({ ...prev, [productId]: false }));
      }
    };
  
    const handleDecrement = async (productId, currentQuantity) => {
      if (currentQuantity <= 1) {
        return handleRemove(productId);
      }
  
      try {
        setUpdateLoading(prev => ({ ...prev, [productId]: true }));
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/delete/cart', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        });
  
        if (response.ok) {
          await fetchCart();
        } else {
          const data = await response.json();
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error decrementing quantity:', error);
      } finally {
        setUpdateLoading(prev => ({ ...prev, [productId]: false }));
      }
    };


  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/remove/cart', {
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

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.new_price * item.quantity, 0);
  };

  return (

    <>
    <Navbar />
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
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleDecrement(item.productId, item.quantity)}
                    disabled={updateLoading[item.productId]}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity || 1}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleIncrement(item.productId)}
                    disabled={updateLoading[item.productId]}
                  >
                    +
                  </button>
                </div>                               
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
      {cartItems.length > 0 && (
        <div className="cart-total">
          <p className="cart-total-label">Total:</p>
          <p className="cart-total-amount">${calculateTotal()}</p>
        </div>
      )}
    </div>
       <Footer />
    </>
  );
};

export default Cart;
