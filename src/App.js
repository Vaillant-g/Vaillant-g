import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Header from "./components/Header";
import Training from "./components/Training";
import GuessrHelpr from "./components/GuessrHelpr";

const API_KEY = "AIzaSyAf7UIljn6JDxuDYjCJm3o4NR4DzrdK4tA";

const initialMapContainerStyle = {
  height: "400px",
  width: "100%",
  display: "block", // Valeur initiale
};

const App = () => {
  const [activeTab, setActiveTab] = useState("training");
  const [mapContainerStyle, setMapContainerStyle] = useState(
    initialMapContainerStyle
  );
  const [map, setMap] = useState(null);
  const streetViewRef = useRef(null);

  useEffect(() => {
    if (map && streetViewRef.current) {
      if (window.google && window.google.maps) {
        const panorama = new window.google.maps.StreetViewPanorama(
          streetViewRef.current,
          {
            position: { lat: 48.858844, lng: 2.294351 },
            pov: { heading: 34, pitch: 10 },
          }
        );
        map.setStreetView(panorama);
      }
    }
  }, [map]);

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
      <div>
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "training" ? (
          <Training
            mapContainerStyle={mapContainerStyle}
            setMapContainerStyle={setMapContainerStyle}
          />
        ) : (
          <GuessrHelpr />
        )}
        
      </div>
    </LoadScript>
  );
};

export default App;
