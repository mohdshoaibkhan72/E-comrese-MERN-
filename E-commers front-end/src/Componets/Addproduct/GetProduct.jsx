import React, { useState, useEffect } from "react";
import axios from "axios";


const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getproducts");
        console.log(response.data);
        setProducts(response.data);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async (productId) => {
    console.log(`Product with ID ${productId} added to cart`);

  };

  const handledeleltbuton = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/deletproduct/${productId}`);
      console.log(response);
  
      if (response.status === 200) {
        console.log(`Product with ID ${productId} deleted successfully.`);
        // Optionally, you can update the UI optimistically here
      } else {
        console.log(`Failed to delete product with ID ${productId}.`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      
    }
   
  };
  

  return (
    <>
      <div className="cards">
        <div className="card-container ">
          {products.map((product) => (
            <div key={product.productId} className="card cardbox">
              <div> <img
                src={`http://localhost:8000/${product.productPhoto.filename}`}
                alt={product.productName}
                className="card-img-top" /> </div>
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">{product.productDescription}</p>
                <p className="card-text">Price: ${product.productPrice}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product.productId)}>Add to Cart</button>

                <button className="btn btn-primary" onClick={() => handledeleltbuton(product.productId)}>Delete</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
