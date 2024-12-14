import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListProduct.css';
import Remove from '../Assets/cross_icon.png';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    try {
      await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      await fetchInfo();
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const navigateToUpdate = (product) => {
    navigate('/updateproduct', { state: product });
  };

  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className='format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Actions</p>
      </div>

      <div className='allproducts'>
        <hr />
        {allProducts && allProducts.length > 0 ? (
          allProducts.map((product, index) => (
            <div key={index} className='format-main listproduct-format'>
              <img src={product.image} alt='' className='product-icon' />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <div>
                <img
                  onClick={() => removeProduct(product.id)}
                  className='remove'
                  src={Remove}
                  alt='Remove'
                />
                <button
                  onClick={() => navigateToUpdate(product)}
                  className='update'
                >
                  Update
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
