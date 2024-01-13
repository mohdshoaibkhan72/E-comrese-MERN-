import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AdProductForm = () => {
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    productPrice: "",
    productDescription: "",
    productPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, productPhoto: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/addproduct",
        formData
      );
      if (response) {
        toast("Item added in database");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item to the database");
    }
    setFormData({
    productId: "",
    productName: "",
    productPrice: "",
    productDescription: "",
    productPhoto: null,
      });
    
  };


  
  return (
    <>
       <ToastContainer />
      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
        <p>Add product Form</p>
          <div className="mb-3">
            
            <input
              type="text"
              className="form-control"
              name="productId"
              placeholder="Enter product ID"
              value={formData.productId}
              onChange={handleChange}
              required
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
              placeholder="product Deseciption"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
           
            <input
              type="file"
              accept="image/*"
              placeholder="add photo"
              className="form-control"
              name="productPhoto"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div className="drops">
                  <div className="drop drop-1"></div>
                  <div className="drop drop-2"></div>
                  <div className="drop drop-3"></div>
                  <div className="drop drop-4"></div>
                  <div className="drop drop-5"></div>
                </div>
       
      </div>
    </>
  );
};

export default AdProductForm;
