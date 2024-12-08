import React from "react";

const CartPage = (props) => {
  console.log(props.cartItems);
  return (
    <div className="cart-container-main">
      {props.error && <p style={{ color: "red" }}>{props.error}</p>}
      <div className="cart-list">
        {props.cartItems.map((item, index) => (
          <div className="cart-list-item" key={index}>
            Product ID: {item.productId} - Quantity: {item.quantity}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
