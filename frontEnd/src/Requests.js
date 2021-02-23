import React, { useEffect, useState } from "react";

const getAllData = async ({
  sendUserInputLocation,
  setLoading,
  setStreetNameFromData,
  setCrimeData,
}) => {
  // Stop getAllData from running if nothing is in the search input
  if (sendUserInputLocation.location === "") return;

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
    // setCrimeData([]);
  }
};

export { getAllData };
