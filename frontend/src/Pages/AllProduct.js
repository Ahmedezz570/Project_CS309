import React, { useEffect, useState } from 'react';
import './CSS/AllProduct.css';
import SearchBar from './SearchBar'; 
import Item from './Item/Item';

const AllProduct = () => {
 
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]); 
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
        placeholder="Search by category ......"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm} 
      />

      <div className="all-cards">
        {filteredProducts.map((product, index) => (
          <Item 
            key={index}
            id={product.id}
            name={product.name}
            image={product.image}
          />
        ))}
      </div>
      
    </div>
  );
};

export default AllProduct;
