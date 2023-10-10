import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Productso from './Productso'; // Import the ProductList component

import './productso.css';



function generatePurchaseNumber() {
  const timestamp = Date.now(); // Get the current timestamp
  const random = Math.floor(Math.random() * 10000); // Generate a random number

  // Combine timestamp and random number to create a unique reference number
  return `PUR-${timestamp}-${random}`;
}

function AddProductso() {
  const [products, setProducts] = useState([
    {
      name: '',
      description: '',
      price: '',
    },
  ]);

  const handleChange = (event, index, field) => {
    const { value } = event.target;
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the products array directly
      await axios.post('http://127.0.0.1:8000/productso/', { products });

      // Clear the products array after successful submission
      setProducts([
        {
          name: '',
          description: '',
          price: '',
        },
      ]);

      const purchaseNumber = generatePurchaseNumber();
      successnotify(`Added Successfully! Purchase Number: ${purchaseNumber}`);
    } catch (error) {
      unsuccessnotify('Failed to Add. Try again!');
    }
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        name: '',
        description: '',
        price: '',
      },
    ]);
  };

  const removeProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const successnotify = (message) =>
    toast.success(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const unsuccessnotify = (message) =>
    toast.error(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  return (
    <>
      {/* Your form JSX */}
      {/* <form onSubmit={handleSubmit}>
        {products.map((product, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => handleChange(e, index, 'name')}
            />
            <input
              type="text"
              name="description"
              placeholder="Product Description"
              value={product.description}
              onChange={(e) => handleChange(e, index, 'description')}
            />
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              value={product.price}
              onChange={(e) => handleChange(e, index, 'price')}
            />
            <button type="button" onClick={() => removeProduct(index)}>
              Remove
            </button>
          </div>
        ))}
        <div className="card-footer">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <button type="button" onClick={addProduct}>
        Add Product
      </button>

      <ToastContainer />

      <div className="content-wrapper">
        <Productso /> 
      </div> */}

      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          {products.map((product, index) => (
            <div key={index} className="product-row">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => handleChange(e, index, 'name')}
                className="product-input"
              />
              <input
                type="text"
                name="description"
                placeholder="Product Description"
                value={product.description}
                onChange={(e) => handleChange(e, index, 'description')}
                className="product-input"
              />
              <input
                type="number"
                name="price"
                placeholder="Product Price"
                value={product.price}
                onChange={(e) => handleChange(e, index, 'price')}
                className="product-input"
              />
              <button type="button" onClick={() => removeProduct(index)} className="remove-button">
                Remove
              </button>
            </div>
          ))}
          <div className="card-footer">
           
            <button type="button" onClick={addProduct} className="add-button">
              Add Product
            </button>
          </div>

           <button type="submit" className="submit-button mt-3">
            Submit
          </button>
        </form>


        <ToastContainer />

       
      </div>

      <div className="content-wrapper">
        <Productso /> 
      </div> 
    </>
  );
}

export default AddProductso;
