import { useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './UpdateProduct.css';
import Upload from '../Assets/upload_area.svg';


const UpdateProduct = () => {
  const location = useLocation();
  const product = location.state || {};

  const [name, setName] = useState(product.name || '');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(product.category || '');
  const [description, setDescription] = useState(product.description || '');
  const [newPrice, setNewPrice] = useState(product.new_price || '');
  const [oldPrice, setOldPrice] = useState(product.old_price || '');


  useEffect(() => {
    if (product.image) {
      setImage(product.image); 
    }
  }, [product]);

  const imageHandler = (e) => {
    setImage(e.target.files[0]); 
  };

  const changeHandler = (e) => {
    if (e.target.name === 'name') setName(e.target.value);
    else if (e.target.name === 'category') setCategory(e.target.value);
    else if (e.target.name === 'description') setDescription(e.target.value);
    else if (e.target.name === 'old_price') setOldPrice(e.target.value);
    else if (e.target.name === 'new_price') setNewPrice(e.target.value);
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (image && image instanceof File) {
      formData.append('product', image); 
    }

    try {
      let imageResponse = null;
      if (image && image instanceof File) {
        const imageUploadResponse = await fetch('http://localhost:4000/upload', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        });

        if (!imageUploadResponse.ok) {
          throw new Error('Error uploading image');
        }

        imageResponse = await imageUploadResponse.json();
      }

      const updatedProduct = {
        id: product.id,
        name,
        category,
        description,
        old_price: oldPrice,
        new_price: newPrice,
        image: imageResponse ? imageResponse.image_url : product.image, 
      };

      const response = await fetch('http://localhost:4000/updateproduct', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        alert('Product updated successfully!');
        

      } else {
        alert('Error updating product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="updateproduct">
      <h1>Update Product</h1>
      <form onSubmit={updateProduct}>
        <div className="field">
          <p>Product Title</p>
          <input
            type="text"
            placeholder="Enter here"
            value={name}
            onChange={changeHandler}
            name="name"
          />
        </div>
        <div className="field">
          <p>Product Description</p>
          <input
            type="text"
            placeholder="Enter here"
            value={description}
            onChange={changeHandler}
            name="description"
          />
        </div>

        <div className="field">
          <p>Old Price</p>
          <input
            type="number"
            placeholder="Enter here"
            value={oldPrice}
            onChange={changeHandler}
            name="old_price"
          />
        </div>

        <div className="field">
          <p>New Price</p>
          <input
            type="number"
            placeholder="Enter here"
            value={newPrice}
            onChange={changeHandler}
            name="new_price"
          />
        </div>

        <div className="field">
          <p>Category</p>
          <select
            value={category}
            onChange={changeHandler}
            name="category"
            className="add-product-selection"
          >
            <option value="special">Special</option>
            <option value="training">Training</option>
            <option value="national">National</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="file-input">
            <img
              src={image && image instanceof File ? URL.createObjectURL(image) : (product.image || Upload)}
              alt="Product Preview"
              className="img"
            />
          </label>
          <input onChange={imageHandler} type="file" id="file-input" name="image" hidden />
        </div>

        <button type="submit" className="buttoon">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
