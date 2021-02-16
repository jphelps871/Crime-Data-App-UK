import React from "react";
import SignIn from "./SignIn";
import Register from "./Register";
import "./login.css";
import "./App.css";

function Login() {
  return (
    <div className="pages">
      <h1>Login to save data from all around the UK</h1>
      <div className="forms">
        <SignIn />
        <Register />
      </div>
    </div>
  );
}

export default Login;
