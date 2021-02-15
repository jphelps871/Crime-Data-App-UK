import React from "react";
import SignUp from "./SignUp";
import Register from "./Register";
import "./login.css";
import "./App.css";

function Login() {
  return (
    <div className="pages">
      <SignUp />
      <Register />
    </div>
  );
}

export default Login;
