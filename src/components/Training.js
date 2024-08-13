// src/Training.js
import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

// Clé API Google Maps
const API_KEY = "AIzaSyAf7UIljn6JDxuDYjCJm3o4NR4DzrdK4tA";

// Configuration des options pour la carte Google Maps
const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

// Configuration des options pour la vue Street View
const streetViewContainerStyle = {
  height: "400px",
  width: "100%",
};

// Coordonnées pour le centre de la vue
const center = {
  lat: 48.858844,
  lng: 2.294351,
};

const Training = ({ isMapDisplayFlex }) => {
  const [map, setMap] = useState(null);
  const streetViewRef = useRef(null);

  // Styles pour le conteneur de la carte
  const dynamicMapContainerStyle = {
    ...mapContainerStyle,
    display: isMapDisplayFlex ? "flex" : "block",
  };

  useEffect(() => {
    if (map && streetViewRef.current) {
      if (window.google && window.google.maps) {
        const panorama = new window.google.maps.StreetViewPanorama(
          streetViewRef.current,
          {
            position: center,
            pov: { heading: 34, pitch: 10 },
          }
        );
        map.setStreetView(panorama);
      }
    }
  }, [map]);

  useEffect(() => {
    // setMapStyle((prevStyle) => ({
    //   ...prevStyle,
    //   display: isMapDisplayFlex ? "flex" : "block",
    // }));
    console.log("isMapDisplayFlex", isMapDisplayFlex);
    console.log("ABC mapContainerStyle", mapContainerStyle);
    mapContainerStyle.display = isMapDisplayFlex ? "flex" : "bloc";
    console.log("ABC mapContainerStyle", mapContainerStyle);
  }, [isMapDisplayFlex]);
  return (
    <div style={mapContainerStyle}>
      <div style={dynamicMapContainerStyle}>
        <GoogleMap
          onLoad={(map) => setMap(map)}
          mapContainerStyle={dynamicMapContainerStyle}
          center={center}
          zoom={2}
        >
          {/* Vous pouvez ajouter des marqueurs ou autres éléments sur la carte ici */}
        </GoogleMap>
      </div>
      <div style={streetViewContainerStyle} ref={streetViewRef}>
        {/* La vue Street View sera rendue ici */}
      </div>
    </div>
  );
};

export default Training;
