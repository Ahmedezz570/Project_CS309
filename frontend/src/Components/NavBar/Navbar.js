import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
const Navbar = ({ handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 
    if (handleLogout) {
      handleLogout(); 
      
    }
  };

  return (
    <nav className="navbar">
      <h1>Striker</h1>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`navbar-links ${isMenuOpen ? 'show' : ''}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/allproduct">Products</a></li>
        <li><a href="/special">Special</a></li>
        <li><a href="/tranning">Training</a></li>
        {isLoggedIn ? (
          <>
          <li><a href="/cart"><i className="fa-solid fa-cart-shopping"></i></a></li>
          <li><a href="/profile"><i className="fa-solid fa-user"></i></a></li> 
          <Link to="/" >
               <button className="logout-button" onClick={handleLogoutClick}>
                Logout
              </button>
              </Link>
            
              
          </>
        ) : (
          <>
            <li><a href="/login">Login</a></li>
            
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
