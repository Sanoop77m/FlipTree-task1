import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token); // Save JWT token
      localStorage.setItem("userId", response.data.userId); // Save user ID
      alert("Signup successful!");
    } catch (error) {
      console.error("Signup error:", error.response.data.message);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <div className="curved-background"></div>
      <div className="form-container">
        <h2>Create New Account</h2>
        <p>
          Already a member? <a href="/login">Log In</a>
        </p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          <p>{message}</p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
