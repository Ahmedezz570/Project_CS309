import React, { useState, useEffect } from "react";

const Sell = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/allproducts"); // API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        // Select the last 4 products
        const lastProducts = data.slice(-4);
        setProducts(lastProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="best-sell">
      <h2>New Collections</h2>
      <p className="par">
        Discover the latest trends in our collection of football shirts. Whether you're a player or a fan, find your perfect fit.
      </p>
      <div className="cards">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="card" key={product.id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="text">
                <a href={`/product/${product.id}`} className="view-link">View Product</a>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No products available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default Sell;
