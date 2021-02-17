import React, { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./App.css";

function Nav() {
  const navStyle = {
    textDecoration: "none",
    color: "inherit",
    marginLeft: "24px",
  };

  return (
    <nav>
      <ul>
        <Link className="home" to="/" style={navStyle}>
          <li>Home</li>
        </Link>
        <button>
          <FaLocationArrow className="location-btn" />
        </button>
        <Link to="/savedData" style={navStyle}>
          <li>Saved Data</li>
        </Link>
        <Link to="/login" style={navStyle}>
          <li>Login</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
