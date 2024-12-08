import React, { useState } from "react";
import Cart from "../components/Cart";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    // Example data for testing, replace with actual state later
    { id: 1, name: "Product A", price: 100, quantity: 1 },
    { id: 2, name: "Product B", price: 200, quantity: 2 },
  ]);

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
};

export default CartPage;
