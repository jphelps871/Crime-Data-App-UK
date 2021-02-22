import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Nav from "./nav";
import Login from "./login";
import SavedData from "./savedData";
import DisplayCrimeData from "./Home/displayData";
import CityName from "./Home/cityName";
import Options from "./Home/options";
import Spinner from "./Home/loading.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { getAllData } from "../Requests";

import "../styles/App.css";

require("dotenv").config();

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/savedData" component={SavedData} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  // States
  const [userInputLocation, setInputLocation] = useState({
    street: "",
    city: "",
  });
  const [userDefinedYear, setUserDefinedYear] = useState("2021");
  const [sendUserInputLocation, setSendUserInputLocation] = useState({
    location: "",
    year: "",
  });
  const [crimeData, setCrimeData] = useState([]);
  const [streetNameFromData, setStreetNameFromData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllData({
      sendUserInputLocation,
      setLoading,
      setStreetNameFromData,
      setCrimeData,
    });
  }, [sendUserInputLocation]);

  function streetAndCityInput(e) {
    // send data to string state
    setInputLocation({ ...userInputLocation, [e.target.name]: e.target.value });
  }

  function submitForm(e) {
    e.preventDefault();
    let userStreetInput = e.target.children[0];
    let userCityInput = e.target.children[1];
    if (userStreetInput.value && userCityInput.value !== "") {
      // on submit, remove previous displayed crimes
      setCrimeData([]);
      setStreetNameFromData("");

      // user inupt values for location need to be in one string, for mapBox to find lat and long
      const locationAsString = Object.values(userInputLocation).join(" ");
      setSendUserInputLocation({
        ...userInputLocation,
        location: locationAsString,
        year: userDefinedYear,
      });

      // reset input
      // userStreetInput.value = "";
      // userCityInput.value = "";
      userStreetInput.style.borderColor = "inherit";
      userCityInput.style.borderColor = "inherit";
    } else {
      userStreetInput.style.borderColor = "red";
      userCityInput.style.borderColor = "red";
    }
  }

  return (
    <div className="pages">
      <div className="home-container">
        <h1>The crime data app to help you feel safe.</h1>
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Street Name"
            name="street"
            onChange={streetAndCityInput}
          />
          <input
            type="text"
            placeholder="City / Town"
            name="city"
            onChange={streetAndCityInput}
          />
          <Options onChange={(value) => setUserDefinedYear(value)} />
          <button>Find Crime Data</button>
        </form>
        <p className="form-info">
          Search by town, city or simply click the location icon to get
          information on crime in your area. Data is collected from
          ‘data.police.uk’.
        </p>
      </div>
      <div className="save">
        <CityName name={streetNameFromData} />
      </div>
      <div className="crime-data-container">
        {loading ? <Spinner /> : ""}
        {crimeData.map((data) => (
          <DisplayCrimeData
            key={data[0]}
            crimeType={data[0]}
            crimeNumber={data[1]}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

// authors
// <div>Icons made by <a href="http://fontawesome.io" title="Dave Gandy">Dave Gandy</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
