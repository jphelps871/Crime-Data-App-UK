import React from "react";
import SignIn from "./Login/SignIn";
import Register from "./Login/Register";
import "../styles/login.css";
import "../styles/App.css";

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
