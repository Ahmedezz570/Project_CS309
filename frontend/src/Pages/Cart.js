import React, { useState } from "react";
import "./CSS/Cart.css";

const Cart = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Item 1", price: 10, quantity: 1 },
    { id: 2, name: "Item 2", price: 15, quantity: 2 },
  ]);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, increment) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + increment) }
          : item
      )
    );
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAddToCart = (item) => {
    const exists = cartItems.find((cartItem) => cartItem.id === item.id);
    if (exists) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="login-container">
        {isLoggedIn ? (
          <button className="login-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
      {cartItems.length === 0 ? (
        <p className="cart-empty-message">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">${item.price}</span>
                <div className="cart-item-controls">
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity">{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h3 className="cart-total">Total: ${total}</h3>
        </div>
      )}
      {isLoggedIn ? (
        <div className="add-items">
          <h2>Products</h2>
          <button
            className="add-to-cart-button"
            onClick={() => handleAddToCart({ id: 3, name: "Item 3", price: 20 })}
          >
            Add "Item 3" to Cart
          </button>
          <button
            className="add-to-cart-button"
            onClick={() => handleAddToCart({ id: 4, name: "Item 4", price: 30 })}
          >
            Add "Item 4" to Cart
          </button>
        </div>
      ) : (
        <p className="login-warning">Please login to add items to the cart.</p>
      )}
    </div>
  );
};

export default Cart;
