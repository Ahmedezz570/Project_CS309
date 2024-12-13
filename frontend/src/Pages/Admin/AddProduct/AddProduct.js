import './AddProduct.css';
import Upload from '../Assets/upload_area.svg';
import { useState } from 'react';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: '',
        new_price: '',
        old_price: ''
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const addButton = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        try {
            let response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                },
                body: formData,
            });
            responseData = await response.json();

            if (responseData.success) {
                product.image = responseData.image_url;
                console.log(product);
                await fetch ('http://localhost:4000/addproduct' , {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json' ,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product)
                }).then((res)=>res.json()).then((data)=>{
                    data.success ? alert("Product Added") : alert("Product Falied ")
                })
            } else {
                console.error('Error:', responseData.message);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (<>
        <div className="addproduct">
            <div className="field">
                <p>Product Title</p>
                <input
                    value={productDetails.name}
                    onChange={changeHandler}
                    type="text"
                    placeholder="Enter here"
                    name="name"
                />
            </div>

            <div className="price">
                <div className="field">
                    <p>Price</p>
                    <input
                        value={productDetails.old_price}
                        onChange={changeHandler}
                        type="number"
                        placeholder="Enter here"
                        name="old_price"
                    />
                </div>

                <div className="field">
                    <p>Offer Price</p>
                    <input
                        value={productDetails.new_price}
                        onChange={changeHandler}
                        type="number"
                        placeholder="Enter here"
                        name="new_price"    
                    />
                </div>
            </div>

            <div className="field">
                <p>Product Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name="category"
                    className="add-product-selection"
                >
                    <option value="special">Special</option>
                    <option value="tranning">Tranning</option>
                    <option value="national">National </option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="file-input">
                    <img
                        src={image ? URL.createObjectURL(image) : Upload}
                        alt=""
                        className="img"
                    />
                </label>
                <input onChange={imageHandler} type="file" id="file-input" name="image" hidden />
            </div>

            <button onClick={addButton} className="btn">
                Add
            </button>
        </div>
        </>
    );
};

export default AddProduct;