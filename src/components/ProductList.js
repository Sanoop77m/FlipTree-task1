import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      try {
        const response = await axios.get("http://localhost:5000/products", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        });
        setProducts(response.data); // Set products from API response
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again.");
      }
    };
    fetchProducts();
    props.setProducts(products);
  }, [products]);

  const handleAddToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem("token");
    const found = products.find((element) => element.id == productId);
    const image = found.image;
    const name = found.name;
    console.log(found.name, found.image);
    try {
      const response = await axios.post(
        "http://localhost:5000/cart",
        { productId, name, image, quantity }, // Send product and quantity in the body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );

      alert("Product added to cart successfully!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  const handleAddToCartClick = (productId) => {
    handleAddToCart(productId, 1); // Call the function with product ID and quantity
  };
  return (
    <div className="product-cont">
      <h2>Products</h2>
      <div className="poroct-list-cont">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt="product-image" />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => handleAddToCartClick(product.id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
