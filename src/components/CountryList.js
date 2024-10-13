import React from "react";
import continentsData from "../data/continents.json"; // continents et non codes

const CountryList = ({ countries, onCountrySelect }) => {
  return (
    <div>
      {continentsData.codes.map((continentCode) => (
        <div key={continentCode}>
          <h1>{continentCode}</h1>
          <div style={styles.countryList}>
            {countries
              .filter((country) => country.continent === continentCode)
              .map((filteredCountry) => (
                <div
                  key={filteredCountry.code}
                  style={styles.countryItem}
                  onClick={() => onCountrySelect(filteredCountry.code)}
                >
                  {filteredCountry.name}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  countryList: {
    width: "200px",
    borderRight: "1px solid #ccc",
    overflowY: "auto",
    // height: "100vh",
    backgroundColor: "#f8f8f8",
  },
  countryItem: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    cursor: "pointer",
  },
};

export default CountryList;
