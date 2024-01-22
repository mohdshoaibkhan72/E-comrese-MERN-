import React, { useState, useEffect } from "react";
import axios from "axios";

const CartItemList = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get("http://localhost:8000/getcard");
                // Initialize totalPrice property in each item
                const itemsWithTotalPrice = response.data.data.map((item) => ({
                    ...item,
                    totalPrice: item.productPrice * item.quantity,
                }));
                setCartItems(itemsWithTotalPrice);
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
                // Optionally, you can update the UI optimistically here
            } else {
                console.log(`Failed to delete product with ID ${_id}.`);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        // Update the quantity and price of the specified item in the cart
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item._id === itemId) {
                    const updatedQuantity = Math.max(newQuantity, 1); // Ensure quantity is at least 1
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

    return (
        <div className=" mt-5 display-flex">
            <div style={{ width: "50%" }}>
                <h2>Cart Items</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>ItemPrice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((cartItem) => (
                            <tr key={cartItem._id}>
                                <td>{cartItem.productName}</td>
                                <td>${cartItem.productPrice}</td>
                                <td>
                                    <div className="quantity-counter">
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
                                        <span>{cartItem.quantity}</span>
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

            <div style={{ width: "50vw", marginLeft: "20px" }}>
                <h4>Calculations</h4>
                <div className="card p-3">
                    <p></p>
                    <p className="card-text">Subtotal: ${subTotal}</p>
                    {/* Add more calculation details as needed */}
                </div>
            </div>
        </div>
    );
};

export default CartItemList;
