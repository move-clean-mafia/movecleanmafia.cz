'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { GoogleMap } from './google-map';

interface ClinicInfo {
  name: string;
  phones: string[];
  emails: string[];
  address: string;
  hours: Array<{
    days: string;
    time: string;
    isSpecial?: boolean;
  }>;
  coordinates?: {
    lat: number;
    lng: number;
  };
  dotColor: string;
}

interface ClinicTabsProps {
  clinics: ClinicInfo[];
  labels: {
    phone: string;
    email: string;
    address: string;
    openingHours: string;
    mapLocation: string;
    mapIntegration: string;
    coordinates: string;
  };
}

const ClinicTabs: React.FC<ClinicTabsProps> = ({ clinics, labels }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="relative">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-100">
          <div className="flex space-x-2">
            {clinics.map((clinic, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-brand-primary hover:bg-gray-50'
                }`}
              >
                {clinic.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative">
        {clinics.map((clinic, index) => (
          <div
            key={index}
            className={`transition-all duration-500 ${
              activeTab === index
                ? 'opacity-100 transform translate-y-0'
                : 'opacity-0 transform translate-y-4 absolute inset-0 pointer-events-none'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Clinic Information */}
              <div className="transform transition-all duration-700 hover:scale-105">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary transform rotate-45 translate-x-16 -translate-y-16"></div>
                  </div>

                  <div className="relative z-10 p-8">
                    <div className="flex items-center mb-6">
                      <div
                        className={`w-3 h-3 ${clinic.dotColor} rounded-full mr-3`}
                      ></div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {clinic.name}
                      </h3>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      {/* Phones */}
                      <div className="flex items-start">
                        <Phone className="w-5 h-5 text-teal-600 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900 mb-1">
                            {labels.phone}
                          </p>
                          <div className="space-y-1">
                            {clinic.phones.map((phone) => (
                              <a
                                key={phone}
                                href={`tel:${phone}`}
                                className="text-teal-600 hover:text-teal-700 block"
                              >
                                {phone}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Emails */}
                      <div className="flex items-start">
                        <Mail className="w-5 h-5 text-teal-600 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900 mb-1">
                            {labels.email}
                          </p>
                          <div className="space-y-1">
                            {clinic.emails.map((email) => (
                              <a
                                key={email}
                                href={`mailto:${email}`}
                                className="text-teal-600 hover:text-teal-700 block"
                              >
                                {email}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-teal-600 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900 mb-1">
                            {labels.address}
                          </p>
                          <p className="text-gray-600">{clinic.address}</p>
                        </div>
                      </div>

                      {/* Hours */}
                      <div className="flex items-start">
                        <Clock className="w-5 h-5 text-teal-600 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900 mb-1">
                            {labels.openingHours}
                          </p>
                          <div className="space-y-1">
                            {clinic.hours.map((hour, hourIndex) => (
                              <div
                                key={hourIndex}
                                className={`text-sm ${
                                  hour.isSpecial
                                    ? 'text-red-600'
                                    : 'text-gray-600'
                                }`}
                              >
                                <span className="font-medium">
                                  {hour.days}:
                                </span>{' '}
                                {hour.time}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="transform transition-all duration-700 hover:scale-105">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative h-full">
                  {/* Background Pattern */}
                  <div className="absolute top-0 left-0 w-32 h-32 opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-brand-light to-brand-primary transform rotate-45 -translate-x-16 -translate-y-16"></div>
                  </div>

                  <div className="relative z-10 p-8 h-full flex flex-col">
                    <div className="flex items-center mb-6">
                      <MapPin className="w-6 h-6 text-brand-primary mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">
                        {labels.mapLocation}
                      </h3>
                    </div>

                    {/* Map Container */}
                    <div className="flex-1">
                      {clinic.coordinates ? (
                        <GoogleMap
                          markers={[
                            {
                              position: clinic.coordinates,
                              title: clinic.name,
                              address: clinic.address,
                              dotColor: clinic.dotColor,
                            },
                          ]}
                          center={clinic.coordinates}
                          zoom={15}
                          className="h-full"
                          fallbackContent={
                            <div className="text-center">
                              <MapPin className="w-16 h-16 text-brand-primary mx-auto mb-4" />
                              <h4 className="text-xl font-bold text-gray-900 mb-2">
                                {clinic.name}
                              </h4>
                              <p className="text-gray-600 mb-4">
                                {labels.mapIntegration}
                              </p>
                              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                                <p className="text-sm text-gray-600 font-medium">
                                  {clinic.address}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                  {labels.coordinates}: {clinic.coordinates.lat}
                                  , {clinic.coordinates.lng}
                                </p>
                              </div>
                            </div>
                          }
                        />
                      ) : (
                        <div className="flex-1 bg-gradient-to-br from-brand-light/20 to-brand-primary/20 rounded-2xl p-8 flex items-center justify-center">
                          <div className="text-center">
                            <MapPin className="w-16 h-16 text-brand-primary mx-auto mb-4" />
                            <h4 className="text-xl font-bold text-gray-900 mb-2">
                              {clinic.name}
                            </h4>
                            <p className="text-gray-600 mb-4">
                              {labels.mapIntegration}
                            </p>
                            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                              <p className="text-sm text-gray-600 font-medium">
                                {clinic.address}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ClinicTabs };
