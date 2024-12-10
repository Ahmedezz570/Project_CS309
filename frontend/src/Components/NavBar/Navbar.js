import React from 'react'
import './Navbar.css';
const Navbar = () => {
  return (
   
    <nav>
      <h1> striker </h1>
      <ul>
        <li><a href="../../Pages/Shop.js">Home</a></li>
        <li><a href="../../Pages/Special.js">special</a> </li>
        <li><a href="../../Pages/Tranning.js">training</a>  </li>
        <li><a href="../../Pages/Login.js"> login</a>  </li>
        <li><a href="../../Pages/Register.js"> Register </a>  </li>
      </ul>
    </nav>

  )
}

export default Navbar;