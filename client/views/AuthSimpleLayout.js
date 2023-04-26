import React from "react";
import Login from "./AuthForm";

export const AuthSimpleLayout = ({ match: { path } }) => {
  return (
    <div className="login-form">
      <h1 style={{fontSize: "36px", marginLeft: "25px"}}>Login</h1>
      <Login />
    </div>
  );
};

export default AuthSimpleLayout;
