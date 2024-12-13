import React from 'react';
import './Admin.css';
const Admin = () => {
  return (
    <div className="admin">
      <Link to={'/addproduct'} style={{ textDecoration: 'none' }}>
        <div className="admin-item">
          <button className="admin-button">Add Product</button>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{ textDecoration: 'none' }}>
        <div className="admin-item">
          <button className="admin-button">List Products</button>
        </div>
      </Link>
      <Link to={'/removeproduct'} style={{ textDecoration: 'none' }}>
        <div className="admin-item">
          <button className="admin-button">Update Product</button>
        </div>
      </Link>
    </div>
  );
}

export default Admin;