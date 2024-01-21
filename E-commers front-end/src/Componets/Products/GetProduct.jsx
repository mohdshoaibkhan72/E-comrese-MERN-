import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate(); // Use useNavigate from react-router-dom

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

  const handleAddToCart = async (
    productId,
    productPrice,
    productName,
    filename
  ) => {
    try {
      const user = localStorage.getItem("user");
      console.log("UserName:", user);

      // Send a POST request to add the product to the cart in the database
      const response = await axios.post("http://localhost:8000/shopingcard", {
        productId,
        productPrice,
        productName,
        filename,
        user,
      });

      // Check the response from the server
      if (response.data.success) {
        // Product added successfully
        // Add the product to the cart state
        const updatedCart = [
          ...cart,
          { productId, productPrice, productName, filename },
        ];
        setCart(updatedCart);

        // Optionally, you can navigate to the Addshop page after adding to the cart

        console.log(updatedCart);
      } else {
        // Product already added, show an alert
        alert("Product is already added to the cart");
      }
    } catch (error) {
      console.error("Error adding product to the cart:", error);
    }
  };

  const handleDeleteButton = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/deletproduct/${productId}`
      );
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
        <div className="card-container">
          {products.map((product) => (
            <div key={product.productId} className="card cardbox">
              <div>
                <img
                  src={`http://localhost:8000/${product.productPhoto.filename}`}
                  alt={product.productName}
                  className="card-img-top"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">{product.productDescription}</p>
                <p className="card-text">Price: ${product.productPrice}</p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleAddToCart(
                      product._id,
                      product.productPrice,
                      product.productName,
                      product.productPhoto.filename
                    )
                  }
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDeleteButton(product.productId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
