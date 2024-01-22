import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

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

      // Check if the product with the given ID already exists in the user's cart
      const responseGetCard = await axios.get("http://localhost:8000/getcard");
      const userCard = responseGetCard.data.data;
      console.log("data feching", userCard);
      if (userCard.some((item) => item.productId === productId)) {
        toast("Already added in card");
        return;
      }

      console.log("UserName:", user);

      // Send a POST request to add the product to the cart in the database
      const responseAddToCart = await axios.post(
        "http://localhost:8000/shopingcard",
        {
          productId,
          productPrice,
          productName,
          filename,
          user,
        }
      );

      if (responseAddToCart.data.success) {
        // If the product was added successfully
        const updatedCart = [
          ...cart,
          { productId, productPrice, productName, filename },
        ];
        setCart(updatedCart);
        toast("Item added in Cart");
        console.log(updatedCart);
      } else {
        toast("some error occurse ");
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
        window.location.reload();
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
      <ToastContainer />
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
                  className="btn btn-danger"
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
