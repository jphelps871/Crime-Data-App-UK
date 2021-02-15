import React from "react";
import "./App.css";

const DisplayCrimeData = ({ crimeType, crimeNumber }) => {
  return (
    <div className="crime-cards">
      <h5>{crimeType}</h5>
      <p>{crimeNumber}</p>
    </div>
  );
};

export default DisplayCrimeData;
