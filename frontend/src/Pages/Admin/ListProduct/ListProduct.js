import { useEffect, useState } from 'react';
import './ListProduct.css';
import Remove from '../Assets/cross_icon.png';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      const data = await response.json();
      console.log('Fetched products:', data); 
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id)=>{
       await fetch ('http://localhost:4000/removeproduct' , {
        method: 'POST',
        headers: {
          Accept : 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id}),
       });
     await  fetchInfo(); 
  }

  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className='format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
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
              <img onClick={()=>{removeProduct(product.id)}} className='remove' src={Remove} alt='Remove' />
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