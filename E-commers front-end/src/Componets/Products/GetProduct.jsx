import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../Context";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [value, setValue] = useState({
    productId: "",
    productName: "",
    productPrice: "",
    productDescription: "",
  });
  const { accountType } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getproducts");
        //console.log(response.data);
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
      const responseGetCard = await axios.get("http://localhost:8000/getcard");
      const userCard = responseGetCard.data.data;
      if (userCard.some((item) => item.productId === productId)) {
        toast("Already added in cart");
        return;
      }
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
        const updatedCart = [
          ...cart,
          { productId, productPrice, productName, filename },
        ];
        setCart(updatedCart);
        toast("Item added in Cart");
        console.log(updatedCart);
      } else {
        toast("Some error occurred");
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

      if (response.status === 200) {
        console.log(`Product with ID ${productId} deleted successfully.`);
        window.location.reload();
      } else {
        console.log(`Failed to delete product with ID ${productId}.`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleUpdateButton = (productId) => {
    const selectedProduct = products.find(
      (product) => product.productId === productId
    );
    // console.log("Selected Product:", selectedProduct);

    try {
      navigate(`/updateProduct/${productId}`, {
        state: { product: selectedProduct },
      });
    } catch (error) {
      console.error("Error updating product:", error);
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
                  style={{
                    display: accountType === "user" ? "block" : "none",
                  }}
                >
                  Add to Cart
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteButton(product.productId)}
                  style={{
                    display: accountType === "seller" ? "flex" : "none",
                  }}
                >
                  Delete
                </button>
                <Button
                  className="btn btn-warning mt-1"
                  onClick={() => handleUpdateButton(product.productId)}
                  style={{
                    display: accountType === "seller" ? "flex" : "none",
                    justifyContent: "space-around",
                  }}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
