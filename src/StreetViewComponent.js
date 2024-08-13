import React, { useEffect, useRef, useState } from 'react';

// Conteneur pour la vue Street View
const containerStyle = {
  width: '100%',
  height: '400px'
};

// Position initiale pour Street View
const center = {
  lat: 40.730610, // Latitude de New York par défaut
  lng: -73.935242 // Longitude de New York par défaut
};

const StreetViewComponent = () => {
  const streetViewRef = useRef(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  // Fonction pour charger Google Maps
  const loadGoogleMaps = () => {
    if (window.google && window.google.maps) {
      setGoogleMapsLoaded(true);
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAf7UIljn6JDxuDYjCJm3o4NR4DzrdK4tA&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setGoogleMapsLoaded(true);
      document.head.appendChild(script);
    }
  };

  useEffect(() => {
    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (googleMapsLoaded && streetViewRef.current) {
      const streetView = new window.google.maps.StreetViewPanorama(streetViewRef.current, {
        position: center,
        pov: {
          heading: 34,
          pitch: 10
        },
        zoomControl: true,
        addressControl: true
      });
    }
  }, [googleMapsLoaded]);

  return (
    <div>
      <div
        ref={streetViewRef}
        style={containerStyle}
      />
    </div>
  );
}

export default StreetViewComponent;
