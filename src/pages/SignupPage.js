import React from "react";
import Signup from "../components/Signup";

const SignupPage = () => {
  return (
    <div
      style={{
        padding: "20px 200px",
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(138,138,255,0) 71%)",
        height: "calc(100vh - 64px)",
      }}
    >
      <h1 className="page-header">Start for free</h1>
      <Signup />
    </div>
  );
};

export default SignupPage;
