import React from 'react';
import { MapPin } from 'lucide-react';
import { GoogleMap } from './google-map';

interface MapSectionProps {
  title: string;
  subtitle: string;
  clinics: Array<{
    name: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  }>;
}

const MapSection: React.FC<MapSectionProps> = ({
  title,
  subtitle,
  clinics,
}) => {
  return (
    <section className="mb-32">
      <div className="text-center mb-20">
        <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
          {title}
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
          {subtitle}
        </p>
        <div className="w-48 h-2 mx-auto rounded-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary"></div>
      </div>

      <div className="relative">
        {/* Map Container */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-brand-light to-brand-primary rounded-full blur-3xl"></div>
          </div>

          {/* Google Maps */}
          <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="aspect-video">
              <GoogleMap
                markers={clinics
                  .filter((clinic) => clinic.coordinates)
                  .map((clinic) => ({
                    position: clinic.coordinates!,
                    title: clinic.name,
                    address: clinic.address,
                    dotColor: 'bg-teal-500',
                  }))}
                center={
                  clinics.length > 0 && clinics[0].coordinates
                    ? clinics[0].coordinates
                    : { lat: 50.0755, lng: 14.4378 }
                }
                zoom={11}
                className="h-full"
                fallbackContent={
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-brand-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {subtitle}
                    </h3>
                    <p className="text-gray-600">
                      Google Maps integration will be added here
                    </p>
                  </div>
                }
              />
            </div>
          </div>

          {/* Clinic Locations */}
          <div className="relative z-10 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {clinics.map((clinic, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {clinic.name}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {clinic.address}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { MapSection };
