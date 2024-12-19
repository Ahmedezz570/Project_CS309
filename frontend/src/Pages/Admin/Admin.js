import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
const Admin = () => {
  const handleLogout = () => {
   
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    
  };
  return (
    <div className="admin">
      <Link to={'/addproduct'} style={{ textDecoration: 'none' }}>
        <div className="admin-item">
          <button className="admin-button">Add Product</button>
        </div>
      </Link>
      <Link to={'/productlist'} style={{ textDecoration: 'none' }}>
        <div className="admin-item">
          <button className="admin-button">List Products</button>
        </div>
      </Link>
      <Link to={'/productlist'} style={{ textDecoration: 'none' }}>
        <div className="admin-item">
          <button  onClick={handleLogout} className="admin-button">Logout</button>
        </div>
      </Link>
     
    </div>
  );
}

export default Admin;