import React, { useEffect, useState } from "react";
import "./App.css";
import "./login.css";

const Register = () => {
  // STATES
  // stored user data
  const [registerDetails, setRegisterDetails] = useState({
    name: "",
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
    const response = await fetch("api/user/register", options);
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
    <form onSubmit={submitForm} className="sign-up" action="">
      <h2>Register</h2>
      <label htmlFor="name">Name</label>
      <input name="name" type="text" onChange={userInputInformation} />
      <label htmlFor="email">Email</label>
      <input name="email" type="email" onChange={userInputInformation} />
      <label htmlFor="password">Password</label>
      <input name="password" onChange={userInputInformation} />
      <p>{success}</p>
      <button>Register</button>
    </form>
  );
};

export default Register;
