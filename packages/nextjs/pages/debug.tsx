// components/Map.tsx
import React, { useEffect, useRef } from 'react';

const DeBug = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
        script.async = true;
        script.defer = true;
        window.initMap = () => {
          if (mapRef.current) {
            const map = new google.maps.Map(mapRef.current, {
              center: { lat: latitude, lng: longitude },
              zoom: 15,
            });
            new google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map,
            });
          }
        };
        document.head.appendChild(script);
      });
    }
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default DeBug;

