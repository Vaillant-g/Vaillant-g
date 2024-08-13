import React, { useState } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import StreetViewComponent from './StreetViewComponent';

// Votre clé API Google Maps
const GOOGLE_MAPS_API_KEY = 'AIzaSyAf7UIljn6JDxuDYjCJm3o4NR4DzrdK4tA';

const containerStyle = {
  width: '50vw', // Ajustez la largeur selon vos besoins
  height: '100vh'
};

const center = {
  lat: 43.3441, // Coordonnées de Béziers, France
  lng: 3.2151
};

const MapComponent = () => {
  const [position, setPosition] = useState(center);

  const handleMapClick = (event) => {
    setPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <div style={{ display: 'flex', height: '100vh' }}>
        <GoogleMap
          mapContainerStyle={{ width: '50%', height: '100%' }}
          center={position}
          zoom={10}
          onClick={handleMapClick}
        >
          <MarkerF position={position} />
        </GoogleMap>
        <StreetViewComponent position={position} />
      </div>
    </LoadScript>
  );
};

export default MapComponent;
