import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Col, Row, Image } from "react-bootstrap";

const CartItemList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getcard");

        const itemsWithTotalPrice = response.data.data.map((item) => ({
          ...item,
          totalPrice: item.productPrice * item.quantity,
        }));
        const totalItems = itemsWithTotalPrice.reduce(
          (total, item) => total + item.quantity,
          0
        );
        setCartItems(itemsWithTotalPrice);
        //items avilabole in cards
        localStorage.setItem("itemaddinCard", totalItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleDeleteButton = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/deleteCard`, {
        data: { _id: _id },
      });

      if (response.status === 200) {
        console.log(`Product with ID ${_id} deleted successfully.`);
        window.location.reload();
      } else {
        console.log(`Failed to delete product with ID ${_id}.`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  /*update quntity */

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id === itemId) {
          const updatedQuantity = Math.max(newQuantity, 1);
          return {
            ...item,
            quantity: updatedQuantity,
            totalPrice: item.productPrice * updatedQuantity,
          };
        }
        return item;
      })
    );
  };

  const subTotal = cartItems.reduce(
    (total, cartItem) => total + cartItem.totalPrice,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <div className="container-fluid pt-5 body">
        <div className="row">
          <div className="col-md-8">
            <h2>Cart Items</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Item Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartItem) => (
                  <tr key={cartItem._id}>
                    <td>{cartItem.productName}</td>
                    <td>${cartItem.productPrice}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-secondary"
                          onClick={() =>
                            handleQuantityChange(
                              cartItem._id,
                              cartItem.quantity - 1
                            )
                          }
                          disabled={cartItem.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="btn btn-light">
                          {cartItem.quantity}
                        </span>
                        <button
                          className="btn btn-secondary"
                          onClick={() =>
                            handleQuantityChange(
                              cartItem._id,
                              cartItem.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${cartItem.totalPrice}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteButton(cartItem._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <form className="col-md-4 ">
            <div className=" ">
              <h4 className="text-white ">Calculations</h4>
              <p className="text-white ">Subtotal: ${subTotal}</p>
              <div className="mb-3">
                <select className="form-select" id="paymentMethod" required>
                  <option value="">Select payments method </option>
                  <option value="creditCard">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
              <div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="creditCardNumber"
                    placeholder="Card Number"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="expirationDate"
                    placeholder="Expirar date"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    placeholder="CVV"
                    required
                  />
                </div>
              </div>
              <button type="button" className="btn btn-info">
                Pay Amount
              </button>
            </div>
          </form>
        </div>

        <form className=" mt-3 w-50 h-auto">
          <h2>Checkout Form</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              className="form-control"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Address"
              name="address"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="city"
              placeholder="City"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="zipCode"
              placeholder="Zip Code"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Place Order
          </button>
        </form>
      </div>
    </>
  );
};

export default CartItemList;
