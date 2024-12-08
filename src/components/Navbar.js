import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(34 51 92 / 80%)",
    color: "white",
    zIndex: "3",
    position: "relative",
    padding: "20px 20px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    margin: "0 10px",
  };

  return (
    <nav style={navStyle}>
      <h1>FlipTree Store</h1>
      <div></div>
    </nav>
  );
};

export default Navbar;
