import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
const Admin = () => {
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
     
    </div>
  );
}

export default Admin;