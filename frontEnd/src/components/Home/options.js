import React from "react";

const Options = (props) => {
  const allYears = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  for (let i = currentYear; i >= 2012; i--) {
    allYears.push(i);
  }

  return (
    <select
      onChange={(event) => props.onChange(event.target.value)}
      name="year"
    >
      <option disabled>Please select any year from bellow</option>
      {allYears.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default Options;
