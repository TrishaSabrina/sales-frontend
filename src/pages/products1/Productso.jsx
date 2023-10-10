import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Productso() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the list of products from your Django backend
    axios.get('http://127.0.0.1:8000/productso/')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);


  const handleDelete = (itemId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this item?');
    if (shouldDelete) {
        axios.delete(`http://127.0.0.1:8000/productso/${itemId}/`)
      .then(() => {
        unsuccessnotify();
        
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
    }
    
  };

  const unsuccessnotify = () => toast.error("Deleted Successfully !", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

  return (
    <div className="row mt-3">
      <div className="col">
    <div className='card'>
      <div className="card-body">

      <h2>Product List</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>Name:</strong> {product.name} <br />
            <strong>Description:</strong> {product.description} <br />
            <strong>Price:</strong> {product.price}
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
      
    </div>
    </div>
    </div>
  );
}

export default Productso;
