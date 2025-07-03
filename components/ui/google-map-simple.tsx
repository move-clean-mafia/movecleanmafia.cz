'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SimpleGoogleMapProps {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom?: number;
}

const SimpleGoogleMap: React.FC<SimpleGoogleMapProps> = ({
  apiKey,
  center,
  zoom = 12,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Load Google Maps script directly
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          if (mapRef.current && window.google) {
            const map = new window.google.maps.Map(mapRef.current, {
              center: center,
              zoom: zoom,
            });

            new window.google.maps.Marker({
              position: center,
              map: map,
              title: 'Clinic Location',
            });

            setIsLoading(false);
          }
        };

        script.onerror = () => {
          console.error('Failed to load Google Maps script');
          setError('Failed to load Google Maps');
          setIsLoading(false);
        };

        document.head.appendChild(script);
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to initialize map');
        setIsLoading(false);
      }
    };

    initMap();
  }, [apiKey, center, zoom]);

  if (error) {
    return <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="p-4 bg-gray-100 text-gray-700 rounded">
        Loading map...
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-[400px] rounded" />;
};

export { SimpleGoogleMap };
