import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import axios from "axios";

const ProductPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [error, setError] = useState("");

  const handleClick = () => {
    setModalActive(!modalActive);
  };
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      try {
        const response = await axios.get("http://localhost:5000/cart", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        setCartItems(response.data.cart); // Update the state with the fetched cart data
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to fetch cart items. Please try again.");
      }
    };

    fetchCart();
  }, [cartItems]);
  return (
    <div className="product-page-main">
      <button className="cart-button" onClick={handleClick}>
        cart
      </button>

      <ProductList setCartItems={setCartItems} setProducts={setProducts} />
      <div className={`cart-modal ${modalActive && "cart-modal-active"}`}>
        <button className="close-modal" onClick={handleClick}>
          CLOSE
        </button>
        <Cart cartItems={cartItems} error={error} products={products} />
      </div>
    </div>
  );
};

export default ProductPage;
