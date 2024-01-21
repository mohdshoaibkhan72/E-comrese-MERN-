import React, { useState, useEffect } from "react";
import axios from "axios";

const CartItemList = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get("http://localhost:8000/getcard");
                setCartItems(response.data.data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    const handleDelete = async (itemId) => {
        try {
            // Add logic to delete the item with itemId from the cart
            console.log(`Deleting item with ID: ${itemId}`);
        } catch (error) {
            console.error("Error deleting cart item:", error);
        }
    };

    // Calculate total and other values based on your logic
    const subTotal = cartItems.reduce((total, cartItem) => total + cartItem.productPrice * cartItem.quantity, 0);

    return (
        <div className=" mt-5">
            <h2>Cart Items</h2>
            <ul className="">
                {cartItems.map((cartItem) => (
                    <li key={cartItem._id} className="list-group-item">
                        <div>
                            <p className="mb-1">Name: {cartItem.productName}</p>
                            <p>Price: ${cartItem.productPrice}</p>
                            <p>Quantity: {cartItem.quantity}</p>
                            {/* Add more cart item details as needed */}
                        </div>
                        <button
                            className="btn btn-danger btn-sm ml-2"
                            onClick={() => handleDelete(cartItem._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <div className="mt-4">
                <h4>Calculations</h4>
                <div className="border p-3">
                    <p className="mb-1">Subtotal: ${subTotal}</p>
                    {/* Add more calculation details as needed */}
                </div>
            </div>
        </div>
    );
};

export default CartItemList;
