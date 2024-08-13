import React, { useState, useEffect } from "react";
import coveredCountries from "../data/countries.json";
import CountryList from "./CountryList";

const GuessrHelp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(
    coveredCountries.countries
  );
  const [currentCountry, setCurrentCountry] = useState("");

  useEffect(() => {
    const sortedFilteredCountries = coveredCountries.countries
      .filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name)); // Tri alphabétique
    console.log("sortedFilteredCountries", sortedFilteredCountries);
    setFilteredCountries(sortedFilteredCountries);
  }, [searchTerm]);

  const handleCountrySelect = (countryCode) => {
    setCurrentCountry(countryCode);
    console.log("Current country selected:", countryCode);
  };

  return (
    <div style={styles.container}>
      <CountryList
        countries={filteredCountries}
        onCountrySelect={handleCountrySelect}
      />
      <div style={styles.content}>
        <h1>Guessr Help</h1>
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBar}
        />
        <p>Current country code: {currentCountry}</p>
        {/* Vous pouvez ajouter plus de contenu ici en fonction du pays sélectionné */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  searchBar: {
    marginBottom: "20px",
    padding: "8px",
    width: "100%",
    boxSizing: "border-box",
  },
};

export default GuessrHelp;
