import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ isLoggedIn, handleLogin, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="navbar">
      <h1>Striker</h1>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`navbar-links ${isMenuOpen ? "show" : ""}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/allproduct">Products</a></li>
        <li><a href="/special">Special</a></li>
        <li><a href="/tranning">Training</a></li>
        {isLoggedIn ? (
          <>
            <li><a href="/cart">Cart</a></li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/cart"><i class="fa-solid fa-cart-shopping"></i></a></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;