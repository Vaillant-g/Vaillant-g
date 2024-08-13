import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Header from "./components/Header";
import Training from "./components/Training";
import GuessrHelpr from "./components/GuessrHelpr";

const API_KEY = "AIzaSyAf7UIljn6JDxuDYjCJm3o4NR4DzrdK4tA";
const LIBRARIES = ["places"];

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
  const [isMapDisplayFlex, setisMapDisplayFlex] = useState(true);
  const [map, setMap] = useState(null);
  const streetViewRef = useRef(null);
  const toggleFlex = () => {
    setisMapDisplayFlex((prevState) => !prevState);
  };

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
    <LoadScript googleMapsApiKey={API_KEY} libraries={LIBRARIES}>
      <div>
        {/* const Header = ({ activeTab, onTabChange, onToggleMap, isMapDisplayFlex }) => { */}
        <Header
          activeTab={activeTab}
          onTabChange={setActiveTab}
          toggleFlex={toggleFlex}
          isMapDisplayFlex={isMapDisplayFlex}
        />
        {activeTab === "training" ? (
          <Training
            // mapContainerStyle={mapContainerStyle}
            // setMapContainerStyle={setMapContainerStyle}
            isMapDisplayFlex={isMapDisplayFlex}
          />
        ) : (
          <GuessrHelpr />
        )}
      </div>
    </LoadScript>
  );
};

export default App;
