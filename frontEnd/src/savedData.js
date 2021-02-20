import React, { useEffect, useState } from "react";
import "./App.css";

const SavedData = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(async () => {
    try {
      const response = await fetch("/api/user/checkToken");
      const data = await response.text();
      setResponse(data);
    } catch (err) {
      console.log(err);
      setResponse("need to be logged in");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="pages">
      {loading ? <h2>Loading...</h2> : <h2>{response}</h2>}
    </div>
  );
};

export default SavedData;
