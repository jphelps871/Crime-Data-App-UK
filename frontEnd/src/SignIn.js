import React, { useEffect, useState } from "react";
import "./App.css";
import "./login.css";

const SignIn = () => {
  // STATES
  // stored user data
  const [registerDetails, setRegisterDetails] = useState({
    email: "",
    password: "",
  });
  // query user input
  const [query, setQuery] = useState({});
  // errors
  const [success, setSuccess] = useState("");

  // CALL data
  useEffect(() => {
    registerUser();
  }, [query]);

  // FETCH data
  async function registerUser() {
    if (Object.keys(query).length === 0) return;

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(query),
    };
    const response = await fetch("api/user/signIn", options);
    const data = await response.json();
    console.log(data);
    // setSuccess(data)
  }

  // FUNCTIONS
  // on submit of form send to route ./api/user/signIn
  const submitForm = (event) => {
    event.preventDefault();
    setQuery(registerDetails);
  };

  // run function to store data
  const userInputInformation = (event) => {
    setRegisterDetails({
      ...registerDetails,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className="register" onSubmit={submitForm}>
      <h2>Sign In</h2>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" onChange={userInputInformation} />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" onChange={userInputInformation} />
      <p>{success}</p>
      <button>Sign In</button>
    </form>
  );
};

export default SignIn;
