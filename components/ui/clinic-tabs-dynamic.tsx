'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Car,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { GoogleMap } from './google-map';

interface TeamMember {
  name: string;
  role: string;
  experience: string;
  image: string;
}

interface ClinicData {
  id: string;
  name: string;
  shortName: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  images: string[];
  services: string[];
  hours: Array<{ day: string; time: string }>;
  team: TeamMember[];
  coordinates: { lat: number; lng: number };
  parking: string;
  accessibility: string;
}

interface ClinicTabsDynamicProps {
  clinicsData: ClinicData[];
  defaultActiveClinic: string;
  locale: string;
  labels: {
    servicesAvailable: string;
    ourTeamAtLocation: string;
    contactInformation: string;
    openingHours: string;
    additionalInformation: string;
    bookAppointment: string;
    bookAppointmentDescription: string;
    bookAtLocation: string;
    locationDirections: string;
    mapIntegration: string;
    coordinates: string;
    phone: string;
    email: string;
    address: string;
  };
}

const ClinicTabsDynamic: React.FC<ClinicTabsDynamicProps> = ({
  clinicsData,
  defaultActiveClinic,
  locale,
  labels,
}) => {
  const [activeClinic, setActiveClinic] = useState(defaultActiveClinic);

  const handleTabClick = (clinicId: string) => {
    setActiveClinic(clinicId);
  };

  const activeClinicData =
    clinicsData.find((clinic) => clinic.id === activeClinic) || clinicsData[0];

  return (
    <>
      {/* Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-100">
          <div className="flex space-x-2">
            {clinicsData.map((clinicData) => (
              <button
                key={clinicData.id}
                onClick={() => handleTabClick(clinicData.id)}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  clinicData.id === activeClinic
                    ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-brand-primary hover:bg-gray-50'
                }`}
              >
                {clinicData.shortName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Panel */}
      <div className="transition-all duration-500">
        {/* Hero Image Gallery */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-96">
            {activeClinicData.images.map((image, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={image}
                  alt={`${activeClinicData.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
                {activeClinicData.name}
              </h2>
              <p className="text-lg text-brand-text leading-relaxed mb-6">
                {activeClinicData.description}
              </p>
              <div className="flex items-center text-brand-primary">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="font-medium">{activeClinicData.address}</span>
              </div>
            </div>

            {/* Services Offered */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-heading">
                {labels.servicesAvailable}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeClinicData.services.map((service, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Team */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-heading">
                {labels.ourTeamAtLocation}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeClinicData.team.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {member.name}
                      </h4>
                      <p className="text-brand-primary text-sm">
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {member.experience}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Details */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">
                {labels.contactInformation}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-brand-primary mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{labels.phone}</p>
                    <a
                      href={`tel:${activeClinicData.phone}`}
                      className="text-brand-primary hover:text-brand-secondary"
                    >
                      {activeClinicData.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-brand-primary mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{labels.email}</p>
                    <a
                      href={`mailto:${activeClinicData.email}`}
                      className="text-brand-primary hover:text-brand-secondary"
                    >
                      {activeClinicData.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-brand-primary mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {labels.address}
                    </p>
                    <p className="text-gray-600">{activeClinicData.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">
                {labels.openingHours}
              </h3>
              <div className="space-y-2">
                {activeClinicData.hours.map((hour, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-medium text-gray-900">
                      {hour.day}
                    </span>
                    <span className="text-gray-600">{hour.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">
                {labels.additionalInformation}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Car className="w-5 h-5 text-brand-primary mr-3" />
                  <span className="text-gray-600">
                    {activeClinicData.parking}
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">
                    {activeClinicData.accessibility}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">
                {labels.bookAppointment}
              </h3>
              <p className="mb-4 opacity-90">
                {labels.bookAppointmentDescription}
              </p>
              <a
                href={`/${locale}/reservation?clinic=${activeClinicData.id}`}
                className="inline-flex items-center w-full justify-center px-6 py-3 bg-white text-brand-primary font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                <Calendar className="w-5 h-5 mr-2" />
                {labels.bookAtLocation}
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 font-heading">
            {labels.locationDirections}
          </h3>
          <div className="h-96">
            <GoogleMap
              markers={[
                {
                  position: activeClinicData.coordinates,
                  title: activeClinicData.name,
                  address: activeClinicData.address,
                  dotColor: 'bg-brand-primary',
                },
              ]}
              center={activeClinicData.coordinates}
              zoom={15}
              className="h-full"
              fallbackContent={
                <div className="bg-gradient-to-br from-brand-light/20 to-brand-primary/20 rounded-xl p-8 text-center h-full flex items-center justify-center">
                  <div>
                    <MapPin className="w-16 h-16 text-brand-primary mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {activeClinicData.name}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {labels.mapIntegration}
                    </p>
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg inline-block">
                      <p className="text-sm text-gray-600 font-medium">
                        {activeClinicData.address}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {labels.coordinates}: {activeClinicData.coordinates.lat}
                        , {activeClinicData.coordinates.lng}
                      </p>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { ClinicTabsDynamic };
