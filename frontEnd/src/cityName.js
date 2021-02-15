import React from "react";
import "./App.css";

const CityName = ({ name }) => {
  return (
    <div className="city-name-container">
      <h2>{name}</h2>
    </div>
  );
};

export default CityName;
