import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UpdateProductForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    productPrice: "",
    productDescription: "",
  });

  useEffect(() => {
    // Check if product data is available in location state
    if (location.state && location.state.product) {
      const productData = location.state.product;
      setFormData({
        productId: productData.productId || "",
        productName: productData.productName || "",
        productPrice: productData.productPrice || "",
        productDescription: productData.productDescription || "",
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/updateProduct/${formData.productId}`,
        formData
      );

      if (response.data.success) {
        toast("Product updated successfully");
      } else {
        toast("Not updated, something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    }

    // Reset form data after submission
    setFormData({
      productId: "",
      productName: "",
      productPrice: "",
      productDescription: "",
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="body">
        <div className="container mt-4">
          <form onSubmit={handleSubmit}>
            <p>Update product</p>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="productId"
                placeholder="Enter product ID"
                value={formData.productId}
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Product Name"
                className="form-control"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Product price"
                className="form-control"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Product Description"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProductForm;
