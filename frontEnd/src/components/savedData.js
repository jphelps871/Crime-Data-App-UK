import React, { useEffect, useState } from "react";
import { CheckUserLoggedIn } from "../../src/Requests";
import "../styles/App.css";

const SavedData = () => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");

  useEffect(async () => {
    const response = await fetch("/api/user/checkToken");
    if (response.status !== 401) {
      const data = await response.text();
      setResponse(data);
    } else {
      setResponse("You need to sign in");
    }
    setLoading(false);
  }, []);

  return (
    <div className="pages">
      {loading ? <h2>Loading...</h2> : <h2>{response}</h2>}
    </div>
  );
};

export default SavedData;
