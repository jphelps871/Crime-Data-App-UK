import React, { useEffect, useState } from "react";
import "../../styles/App.css";
import "../../styles/login.css";

const SignIn = () => {
  // stored user data
  const [registerDetails, setRegisterDetails] = useState({
    email: "",
    password: "",
  });
  // query user input
  const [query, setQuery] = useState({});

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
    console.log(options);
    const response = await fetch("api/user/SignIn", options);
    const data = await response.text();
    setSuccess(data);
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
    <form className="sign-up" onSubmit={submitForm}>
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
