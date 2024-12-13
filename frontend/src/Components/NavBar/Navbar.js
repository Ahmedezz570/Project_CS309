import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ isLoggedIn, handleLogin, handleLogout }) => {
  return (
    <nav className="navbar">
      <h1>Striker</h1>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
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
            <li><a href="/register">Register</a></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;