import React from "react";
import Login from "../components/Login";

const LoginPage = (props) => {
  return (
    <div
      style={{
        padding: "20px 200px",
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(138,138,255,0) 71%)",
        height: "calc(100vh - 64px)",
      }}
    >
      <h1 className="page-header">Welcome to FlipTree</h1>
      <Login setIsAuthenticated={props.setIsAuthenticated} />
    </div>
  );
};

export default LoginPage;
