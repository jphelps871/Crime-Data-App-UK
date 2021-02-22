import React, { useEffect, useState } from "react";
import { checkUserLoggedIn } from "../../src/Requests";
import "../styles/App.css";

const SavedData = () => {
  const [loading, setLoading] = useState(true);
  // const [loggedIn, setLoggedIn] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    checkUserLoggedIn().then(
      (res) => {
        setResponse(res);
      },
      (err) => setResponse(err)
    );
    setLoading(false);
  }, []);

  return (
    <div className="pages">
      {loading ? <h2>Loading...</h2> : <h2>{response}</h2>}
    </div>
  );
};

export default SavedData;
