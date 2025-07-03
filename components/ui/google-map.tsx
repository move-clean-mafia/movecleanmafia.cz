'use client';

import React, { useState, useCallback } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { AlertCircle } from 'lucide-react';

interface MarkerData {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  address: string;
  dotColor: string;
}

interface GoogleMapProps {
  markers: MarkerData[];
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  className?: string;
  fallbackContent?: React.ReactNode;
}

const containerStyle = {
  width: '100%',
  height: '400px',
};

const mapOptions = {
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
};

const GoogleMapComponent: React.FC<GoogleMapProps> = ({
  markers,
  center,
  zoom = 12,
  className = '',
  fallbackContent,
}) => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || '',
    libraries: ['places'],
  });

  // Calculate center if not provided
  const mapCenter = center || {
    lat:
      markers.length > 0
        ? markers.reduce((sum, marker) => sum + marker.position.lat, 0) /
          markers.length
        : 50.0755,
    lng:
      markers.length > 0
        ? markers.reduce((sum, marker) => sum + marker.position.lng, 0) /
          markers.length
        : 14.4378,
  };

  const onLoad = useCallback((_mapInstance: any) => {
    console.log('Google Maps loaded successfully');
    // Store map instance if needed for future use
    // setMap(_mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    console.log('Google Maps unmounted');
    // Clean up map instance
    // setMap(null);
  }, []);

  const handleMarkerClick = useCallback((marker: MarkerData) => {
    setSelectedMarker(marker);
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  if (!apiKey) {
    console.error(
      'Google Maps API key is not configured. Make sure NEXT_PUBLIC_GOOGLE_MAP_API is set in your .env.local file',
    );
    return (
      <div
        className={`bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 flex items-center justify-center ${className}`}
      >
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-red-800 mb-2">
            Map Unavailable
          </h3>
          <p className="text-red-600 text-sm">
            Google Maps API key is not configured
          </p>
          {fallbackContent && <div className="mt-4">{fallbackContent}</div>}
        </div>
      </div>
    );
  }

  if (loadError) {
    console.error('Error loading Google Maps:', loadError);
    return (
      <div
        className={`bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 flex items-center justify-center ${className}`}
      >
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-red-800 mb-2">
            Map Unavailable
          </h3>
          <p className="text-red-600 text-sm">
            Failed to load Google Maps: {loadError.message}
          </p>
          {fallbackContent && <div className="mt-4">{fallbackContent}</div>}
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 flex items-center justify-center ${className}`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl overflow-hidden ${className}`}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoom}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            title={marker.title}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={handleInfoWindowClose}
          >
            <div className="p-3 max-w-xs">
              <h3 className="font-semibold text-gray-900 mb-2">
                {selectedMarker.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {selectedMarker.address}
              </p>
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{
                    backgroundColor:
                      selectedMarker.dotColor === 'bg-teal-500'
                        ? '#14b8a6'
                        : '#2dd4bf',
                  }}
                />
                <span className="text-xs text-gray-500">Clinic Location</span>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export { GoogleMapComponent as GoogleMap };
