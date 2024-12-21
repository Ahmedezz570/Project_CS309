import React, { useEffect, useState } from 'react';
import './CSS/national.css';
import Navbar from '../Components/NavBar/Navbar';
import SearchBar from './SearchBar'; 
import { Link } from 'react-router-dom'; 
import Footer from '../Components/Footer/Footer';

const National = () => {
  const [products, setProducts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    fetch('http://localhost:4000/products/national') 
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <div className="all-products-container">
          <Navbar/>

      <SearchBar
        placeholder="Search by your product name ......"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm} 
      />

     
      <div className="all-cards">
        {filteredProducts.map((product, index) => (

          <div className="one-card" key={index}>
               
            <img src={product.image } alt={product.name || 'Product'} />
            <div className="text">
            <Link to={`/product/${product.id}`}> View product  </Link>
            </div>
            
          </div>
        ))}
      </div>
      <Footer />

    </div>
  );
};

export default National;
