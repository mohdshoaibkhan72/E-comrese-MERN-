import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ProductList = () => {
  const [products, setProducts] = useState([]);

  
    // Make a GET request to your Express API endpoint
    axios.get('http://localhost:8000/getproducts')
      .then(response => {
        // Handle successful response
        console.log(response.data);
        setProducts(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching products:', error);
      });
   // Empty dependency array ensures that this effect runs once when the component mounts

  const handleAddToCart = (productId) => {
   
    console.log(`Product with ID ${productId} added to cart`);
  };

  return (
    <div>
      <div className="card-container">
        {products.map(product => (
          <div key={product.productId} className="card">
            
            <div className="card-body">
              <h5 className="card-title">{product.productName}</h5>
              <p className="card-text">{product.productDescription}</p>
              <p className="card-text">Price: ${product.productPrice}</p>
              <button
                className="btn btn-primary"
                onClick={() => handleAddToCart(product.productId)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
