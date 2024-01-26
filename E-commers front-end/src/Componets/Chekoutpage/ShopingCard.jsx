import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("Error fetching cart items");
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
      toast.error("Error deleting product");
    }
  };

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

  const gstPercentage = 10;
  const gstAmount = (subTotal * gstPercentage) / 100;
  const totalAmount = subTotal + gstAmount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <div className="container-fluid pt-5 body">
        <div className="row">
          <div className="col-md-8">
            <h2 className="text-white">Card items</h2>
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

          <div className="col-md-4">
            <div className="">
              <h4 className="text-white">Calculations</h4>
              <p className="text-white">Subtotal: ${subTotal}</p>
              <p className="text-white">
                GST ({gstPercentage}%): ${gstAmount}
              </p>
              <p className="text-white">Total: ${totalAmount}</p>
            </div>

            <form className="mt-3">
              <p>Address form</p>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Address"
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
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CartItemList;
