import React, { useState, useEffect } from "react";

const SendData = ({ dataToDatabase }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  let displays;

  const sendData = (dataToDatabase) => {
    // send to database
    if (dataToDatabase.length !== 0) {
      // send to database
    }
  };

  useEffect(async () => {
    const response = await fetch("/api/user/checkToken");
    if (response.status !== 401) {
      const data = await response.text();
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  loggedIn ? (displays = "block") : (displays = "none");
  return (
    <button onClick={sendData} style={{ display: displays }}>
      Add Data
    </button>
  );
};

export default SendData;
