require("dotenv").config(); // Load environment variables
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 5000; // Use the PORT from .env or default to 5000
const SECRET_KEY = process.env.SECRET_KEY; // Load SECRET_KEY from .env

app.use(cors());
app.use(bodyParser.json());

let users = []; // Temporary in-memory database

// Mock Product List
const products = [
  {
    id: 1,
    name: "Product A",
    price: 100,
    description: "This is Product A",
    image:
      "https://resourceboy.com/wp-content/uploads/2021/09/square-packaging-product-box-mockup-3.jpg",
  },
  {
    id: 2,
    name: "Product B",
    price: 200,
    description: "This is Product B",
    image:
      "https://resourceboy.com/wp-content/uploads/2021/09/square-packaging-product-box-mockup-3.jpg",
  },
  {
    id: 3,
    name: "Product C",
    price: 300,
    description: "This is Product C",
    image:
      "https://resourceboy.com/wp-content/uploads/2021/09/square-packaging-product-box-mockup-3.jpg",
  },
  {
    id: 4,
    name: "Product D",
    price: 400,
    description: "This is Product D",
    image:
      "https://resourceboy.com/wp-content/uploads/2021/09/square-packaging-product-box-mockup-3.jpg",
  },
];

// Middleware to check token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach user details to the request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

// Signup route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // Check if email already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Generate a unique ID for the new user
  const newUser = {
    id: uuidv4(),
    email,
    password: hashedPassword, // Store the hashed password
    cart: [],
  };

  users.push(newUser); // Add the user to the mock database

  // Generate a JWT token
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  res.status(201).json({
    message: "User registered successfully",
    token,
    userId: newUser.id,
  });
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Compare the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate a new JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({
    message: "Login successful",
    token,
    userId: user.id,
  });
});

// Products Route
app.get("/products", authenticateToken, (req, res) => {
  res.status(200).json(products);
});

// Add product to the cart
app.post("/cart", authenticateToken, (req, res) => {
  const { productId, name, image, quantity } = req.body;
  const userId = req.user.id; // Extract user ID from the token

  // Find the user in the database
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if the product already exists in the cart
  const existingCartItem = user.cart.find(
    (item) => item.productId === productId
  );

  if (existingCartItem) {
    // Update the quantity if the product exists
    existingCartItem.quantity += quantity;
  } else {
    // Add the product to the cart
    user.cart.push({ productId, quantity, name, image });
  }

  res.status(200).json({ message: "Product added to cart", cart: user.cart });
});

// Get cart for the logged-in user
app.get("/cart", authenticateToken, (req, res) => {
  const userId = req.user.id; // Extract user ID from the token

  // Find the user in the mock database
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ cart: user.cart });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
