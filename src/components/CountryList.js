import React from 'react';

const CountryList = ({ countries, onCountrySelect }) => {
  return (
    <div style={styles.countryList}>
      {countries.map((country) => (
        <div
          key={country.code}
          style={styles.countryItem}
          onClick={() => onCountrySelect(country.code)}
        >
          {country.name}
        </div>
      ))}
    </div>
  );
};

const styles = {
  countryList: {
    width: '200px',
    borderRight: '1px solid #ccc',
    overflowY: 'auto',
    height: '100vh',
    backgroundColor: '#f8f8f8',
  },
  countryItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
  }
};

export default CountryList;
