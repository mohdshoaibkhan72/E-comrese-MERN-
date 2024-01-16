import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getproducts');
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (productId) => {
    console.log(`Product with ID ${productId} added to cart`);
  };

  return (
    <div>
      <div className="card-container">
        {products.map((product) => (
          <div key={product.productId} className="card"   >
            <img 
              src={`http://localhost:8000/p11.png`}
              alt={product.productName}
            
              className="card-img-top "
            />
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
