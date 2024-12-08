import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);
      console.log(response.data, "login");
      // localStorage.setItem("userId", );
      props.setIsAuthenticated(true);
      setMessage("Login successful!");
      alert("Login successful!");
      navigate("/products");
    } catch (error) {
      setMessage("Login failed. Invalid email or password.");
    }
  };

  return (
    <div className="page-container">
      <div className="curved-background"></div>
      <div className="form-container">
        <h2>Welcome Back</h2>
        <p>
          New here? <a href="/signup">Sign Up</a>
        </p>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Log In</button>
          <p>{message}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
