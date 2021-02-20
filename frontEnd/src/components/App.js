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

const element = <FontAwesomeIcon icon={faPlus} size="3x" />;

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
    getAllData();
  }, [sendUserInputLocation]);

  const getAllData = async () => {
    // Stop getAllData from running if nothing is in the search input
    if (sendUserInputLocation.location === "") return;
    console.log(sendUserInputLocation.location);

    try {
      // fetch location from user input
      const locationResponse = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${sendUserInputLocation.location}.json?limit=1&country=GB&access_token=${process.env.REACT_APP_MAP_BOX_API}`
      );
      const locationData = await locationResponse.json();
      const location = locationData.features[0].center;

      // fetch crime data, from latitude and longitude of MapBox API
      const allCrimeData = [];
      for (let i = 1; i < 12; i++) {
        const crimeResponse = await fetch(
          `https://data.police.uk/api/crimes-at-location?date=${sendUserInputLocation.year}-${i}&lat=${location[1]}&lng=${location[0]}`
        );
        // get crime data
        const crimeData = await crimeResponse.json();
        crimeData.forEach((obj) => {
          allCrimeData.push(obj);
        });
        setLoading(true);
      }

      setStreetNameFromData(allCrimeData[0].location.street.name);

      // reduce json into objects and their quantities (how many times they appear)
      const crimeQuantity = allCrimeData.reduce((allCrimes, crime) => {
        if (crime.category in allCrimes) {
          allCrimes[crime.category]++;
        } else {
          allCrimes[crime.category] = 1;
        }
        return allCrimes;
      }, {});

      // return an array from object
      setCrimeData(Object.entries(crimeQuantity));
      setLoading(false);
    } catch (e) {
      setStreetNameFromData("Sorry, there is no information on this location");

      // return crimeData to nothing
      setCrimeData([]);
    }
  };

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
        <button className="save-crime">{element}</button>
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
