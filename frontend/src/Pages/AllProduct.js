import React, { useEffect, useState } from 'react';
import './CSS/AllProduct.css';
import SearchBar from './SearchBar'; 


const AllProduct = () => {
  const [products, setProducts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    fetch('http://localhost:4000/allproducts') 
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <div className="all-products-container">
     
      <SearchBar
        placeholder="Search by your category ......"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm} 
      />

     
      <div className="all-cards">
        {filteredProducts.map((product, index) => (
          <div className="one-card" key={index}>
            <img src={product.image } alt={product.name || 'Product'} />
            <div className="text">
              <a href={`/product/${product.id}`}>View product</a>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default AllProduct;
