// src/Training.js
import React, { useEffect, useState, useRef } from "react";
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

const Training = () => {
  const [map, setMap] = useState(null);
  const streetViewRef = useRef(null);

  useEffect(() => {
    if (map && streetViewRef.current) {
      // Assurez-vous que l'objet google est défini avant d'utiliser
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

  return (
    <div>
      <div style={mapContainerStyle}>
        <GoogleMap
          onLoad={(map) => setMap(map)}
          mapContainerStyle={mapContainerStyle}
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
