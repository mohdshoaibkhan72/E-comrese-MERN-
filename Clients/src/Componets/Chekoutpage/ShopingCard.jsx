import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../Context";

const CartItemList = () => {
  const { user } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getcard");

        const itemsWithTotalPrice = response.data.data.map((item) => ({
          ...item,
          totalPrice: item.productPrice * item.quantity,
        }));
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
        // Refresh cart items after deletion
        const updatedCartItems = cartItems.filter((item) => item._id !== _id);
        setCartItems(updatedCartItems);
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

  const handleOrderButton = async () => {
    try {
      // Prepare the order data to be sent to the server
      const orderData = {
        userName: user.name,
        TotalPrice: totalAmount,
        Address: formData.address,
        MobNumber: formData.phone,
        paymentId: Date.now().toString(), // Generate a unique payment ID
        items: cartItems.map((cartItem) => ({
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          productPrice: cartItem.productPrice,
        })),
      };

      // Make a POST request to the server to create an order
      const response = await axios.post(
        "http://localhost:8000/addorder",
        orderData
      );

      if (response.status === 200) {
        // Display success message
        toast.success("Order created successfully");

        // Clear cart items after successful order
        setCartItems([]);

        // Delete items from the database after successful order
        cartItems.forEach((item) => {
          handleDeleteButton(item._id);
        });

        // Clear the form data
        setFormData({
          phone: "",
          address: "",
        });
      } else {
        toast.error("Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Error creating order");
    }
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

              <button
                type="button"
                onClick={() => handleOrderButton()}
                className="btn btn-primary"
              >
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
