'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Clock,
  MapPin,
  User,
  Truck,
  Home,
  AlertCircle,
  Phone,
} from 'lucide-react';
import { useToast } from './ui/use-toast';

interface ReservationFormProps {
  locale: string;
}

// Country codes data
const countryCodes = [
  { code: '+420', country: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: '+421', country: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  { code: '+48', country: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: '+43', country: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: '+49', country: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'FR', name: 'France', flag: '🇫🇷' },
  { code: '+44', country: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+1', country: 'US', name: 'United States', flag: '🇺🇸' },
  { code: '+380', country: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: '+36', country: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: '+40', country: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: '+39', country: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: '+31', country: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: '+32', country: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: '+46', country: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: '+47', country: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: '+45', country: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: '+358', country: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: '+41', country: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: '+352', country: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
  { code: '+371', country: 'LV', name: 'Latvia', flag: '🇱🇻' },
  { code: '+372', country: 'EE', name: 'Estonia', flag: '🇪🇪' },
  { code: '+370', country: 'LT', name: 'Lithuania', flag: '🇱🇹' },
  { code: '+359', country: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
  { code: '+385', country: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: '+386', country: 'SI', name: 'Slovenia', flag: '🇸🇮' },
];

// Zod validation schema
const reservationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(9, 'Phone number must be at least 9 characters'),
  service: z.enum(['moving', 'cleaning', 'packing', 'other']),
  package: z.string().optional(),
  date: z
    .string()
    .min(1, 'Date is required')
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, 'Date cannot be in the past'),
  time: z.enum(['morning', 'afternoon', 'evening']),
  pickupAddress: z.string().optional(),
  deliveryAddress: z.string().optional(),
  address: z.string().optional(),
  apartmentSize: z.string().optional(),
  message: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

// Firebase submission function
const submitReservation = async (data: ReservationFormData, locale: string) => {
  const response = await fetch('/api/reservations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      locale,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to submit reservation');
  }

  return response.json();
};

const ReservationForm: React.FC<ReservationFormProps> = ({ locale }) => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  // Get URL parameters
  const serviceParam = searchParams.get('service');
  const packageParam = searchParams.get('package');

  // Form state
  const [selectedService, setSelectedService] = useState(serviceParam || '');
  const [selectedPackage, setSelectedPackage] = useState(packageParam || '');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+420'); // Default to Czech Republic
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [formData, setFormData] = useState<ReservationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: (serviceParam as any) || '',
    package: packageParam || '',
    date: '',
    time: 'morning',
    pickupAddress: '',
    deliveryAddress: '',
    address: '',
    apartmentSize: '',
    message: '',
  });

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  // React Query mutation for form submission
  const submitMutation = useMutation({
    mutationFn: (data: ReservationFormData) => submitReservation(data, locale),
    onSuccess: (_data) => {
      // Handle success (show success message, redirect, etc.)
      toast({
        title: t('reservation.success.title'),
        description: t('reservation.success.description'),
        variant: 'default',
      });

      // Clear validation errors
      setValidationErrors({});

      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: 'moving',
        package: '',
        date: '',
        time: 'morning',
        pickupAddress: '',
        deliveryAddress: '',
        address: '',
        apartmentSize: '',
        message: '',
      });
      setSelectedService('');
      setSelectedPackage('');
      setSelectedCountryCode('+420');
    },
    onError: (error: Error) => {
      // Handle error (show error message)
      console.error('Failed to submit reservation:', error);
      toast({
        title: t('reservation.error.title'),
        description: error.message || t('reservation.error.description'),
        variant: 'destructive',
      });
    },
  });

  // Update form when URL params change
  useEffect(() => {
    if (serviceParam) {
      setSelectedService(serviceParam);
      setFormData((prev) => ({ ...prev, service: serviceParam as any }));
    }
    if (packageParam) {
      setSelectedPackage(packageParam);
      setFormData((prev) => ({ ...prev, package: packageParam }));
    }
  }, [serviceParam, packageParam]);

  const services = [
    { value: 'moving', label: t('reservation.services.moving') },
    { value: 'cleaning', label: t('reservation.services.cleaning') },
    {
      value: 'furniture-cleaning',
      label: t('reservation.services.furnitureCleaning'),
    },
    { value: 'handyman', label: t('reservation.services.handyman') },
    { value: 'packages', label: t('reservation.services.packages') },
    { value: 'other', label: t('reservation.services.other') },
  ];

  const cleaningPackages = [
    {
      value: 'maintenance',
      label: t('reservation.cleaningPackages.maintenance'),
    },
    {
      value: 'general',
      label: t('reservation.cleaningPackages.general'),
    },
    {
      value: 'postRenovation',
      label: t('reservation.cleaningPackages.postRenovation'),
    },
  ];

  const timeSlots = [
    {
      value: 'morning',
      label: t('reservation.timeSlots.morning'),
    },
    {
      value: 'afternoon',
      label: t('reservation.timeSlots.afternoon'),
    },
    {
      value: 'evening',
      label: t('reservation.timeSlots.evening'),
    },
  ];

  const handleInputChange = (
    field: keyof ReservationFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    setSelectedPackage(''); // Reset package when service changes
    setFormData((prev) => ({ ...prev, service: value as any, package: '' }));
  };

  const handleCountryCodeChange = (value: string) => {
    setSelectedCountryCode(value);
  };

  // Helper function to get error for a specific field
  const getFieldError = (fieldName: string): string | undefined => {
    return validationErrors[fieldName];
  };

  // Helper function to check if field has error
  const hasFieldError = (fieldName: string): boolean => {
    return !!validationErrors[fieldName];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Clear previous validation errors
      setValidationErrors({});

      // Combine country code with phone number for submission
      const submissionData = {
        ...formData,
        phone: `${selectedCountryCode}${formData.phone}`,
      };

      // Validate form data
      const validatedData = reservationSchema.parse(submissionData);

      // Submit using React Query mutation
      submitMutation.mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation errors:', error.errors);

        // Convert Zod errors to field-specific error messages
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const fieldName = err.path[0] as string;
          errors[fieldName] = err.message;
        });

        setValidationErrors(errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-baloo-bhai font-light text-gray-900 flex items-center">
          <User className="w-5 h-5 mr-2 text-brand-primary" />
          {t('reservation.personalInfo')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="firstName"
              className="text-sm font-inter font-medium text-gray-700"
            >
              {t('contact.form.firstName')}
            </Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`mt-1 font-inter font-light ${
                hasFieldError('firstName')
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : ''
              }`}
              placeholder={t('contact.form.firstNamePlaceholder')}
              required
            />
            {hasFieldError('firstName') && (
              <div className="mt-1 flex items-center text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {getFieldError('firstName')}
              </div>
            )}
          </div>
          <div>
            <Label
              htmlFor="lastName"
              className="text-sm font-inter font-medium text-gray-700"
            >
              {t('contact.form.lastName')}
            </Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`mt-1 font-inter font-light ${
                hasFieldError('lastName')
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : ''
              }`}
              placeholder={t('contact.form.lastNamePlaceholder')}
              required
            />
            {hasFieldError('lastName') && (
              <div className="mt-1 flex items-center text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {getFieldError('lastName')}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="email"
              className="text-sm font-inter font-medium text-gray-700"
            >
              {t('contact.form.email')}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`mt-1 font-inter font-light ${
                hasFieldError('email')
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : ''
              }`}
              placeholder={t('contact.form.emailPlaceholder')}
              required
            />
            {hasFieldError('email') && (
              <div className="mt-1 flex items-center text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {getFieldError('email')}
              </div>
            )}
          </div>
          <div>
            <Label
              htmlFor="phone"
              className="text-sm font-inter font-medium text-gray-700 flex items-center"
            >
              <Phone className="w-4 h-4 mr-2 text-brand-primary" />
              {t('contact.form.phone')}
            </Label>
            <div className="mt-1 flex">
              <Select
                value={selectedCountryCode}
                onValueChange={handleCountryCodeChange}
              >
                <SelectTrigger className="w-28 font-inter font-light rounded-r-none border-r-0">
                  <SelectValue>
                    {(() => {
                      const selectedCountry = countryCodes.find(
                        (country) => country.code === selectedCountryCode,
                      );
                      return (
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            {selectedCountry?.flag}
                          </span>
                          <span className="text-sm">{selectedCountryCode}</span>
                        </div>
                      );
                    })()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {countryCodes.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{country.flag}</span>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {country.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {country.code}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`flex-1 font-inter font-light rounded-l-none ${
                  hasFieldError('phone')
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : ''
                }`}
                placeholder="123 456 789"
                required
              />
            </div>
            {hasFieldError('phone') && (
              <div className="mt-1 flex items-center text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {getFieldError('phone')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-baloo-bhai font-light text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-brand-primary" />
          {t('reservation.serviceDetails')}
        </h3>

        {/* Service Selection */}
        <div>
          <Label
            htmlFor="service"
            className="text-sm font-inter font-medium text-gray-700"
          >
            {t('reservation.service')}
          </Label>
          <Select
            value={selectedService}
            onValueChange={handleServiceChange}
            required
          >
            <SelectTrigger
              className={`mt-1 font-inter font-light ${
                hasFieldError('service')
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : ''
              }`}
            >
              <SelectValue placeholder={t('reservation.servicePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.value} value={service.value}>
                  {service.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasFieldError('service') && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              {getFieldError('service')}
            </div>
          )}
        </div>

        {/* Cleaning Package Selection (only for cleaning service) */}
        {selectedService === 'cleaning' && (
          <div>
            <Label
              htmlFor="package"
              className="text-sm font-inter font-medium text-gray-700"
            >
              {t('reservation.cleaningPackage')}
            </Label>
            <Select
              value={selectedPackage}
              onValueChange={(value) => {
                setSelectedPackage(value);
                handleInputChange('package', value);
              }}
              required
            >
              <SelectTrigger className="mt-1 font-inter font-light">
                <SelectValue
                  placeholder={t('reservation.cleaningPackagePlaceholder')}
                />
              </SelectTrigger>
              <SelectContent>
                {cleaningPackages.map((pkg) => (
                  <SelectItem key={pkg.value} value={pkg.value}>
                    {pkg.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Date and Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="date"
              className="text-sm font-inter font-medium text-gray-700"
            >
              {t('reservation.preferredDate')}
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              min={today}
              className={`mt-1 font-inter font-light ${
                hasFieldError('date')
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : ''
              }`}
              required
            />
            {hasFieldError('date') && (
              <div className="mt-1 flex items-center text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {getFieldError('date')}
              </div>
            )}
          </div>
          <div>
            <Label
              htmlFor="time"
              className="text-sm font-inter font-medium text-gray-700"
            >
              {t('reservation.preferredTime')}
            </Label>
            <Select
              value={formData.time}
              onValueChange={(value) => handleInputChange('time', value)}
              required
            >
              <SelectTrigger
                className={`mt-1 font-inter font-light ${
                  hasFieldError('time')
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : ''
                }`}
              >
                <SelectValue placeholder={t('reservation.selectTime')} />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot.value} value={slot.value}>
                    {slot.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasFieldError('time') && (
              <div className="mt-1 flex items-center text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {getFieldError('time')}
              </div>
            )}
          </div>
        </div>

        {/* Address Fields */}
        {selectedService === 'moving' ? (
          // Moving service - pickup and delivery addresses
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="pickupAddress"
                className="text-sm font-inter font-medium text-gray-700 flex items-center"
              >
                <Truck className="w-4 h-4 mr-2 text-brand-primary" />
                {t('reservation.pickupAddress')}
              </Label>
              <Textarea
                id="pickupAddress"
                value={formData.pickupAddress}
                onChange={(e) =>
                  handleInputChange('pickupAddress', e.target.value)
                }
                className={`mt-1 font-inter font-light ${
                  hasFieldError('pickupAddress')
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : ''
                }`}
                rows={3}
                placeholder={t('reservation.pickupAddressPlaceholder')}
                required
              />
              {hasFieldError('pickupAddress') && (
                <div className="mt-1 flex items-center text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {getFieldError('pickupAddress')}
                </div>
              )}
            </div>
            <div>
              <Label
                htmlFor="deliveryAddress"
                className="text-sm font-inter font-medium text-gray-700 flex items-center"
              >
                <Home className="w-4 h-4 mr-2 text-brand-primary" />
                {t('reservation.deliveryAddress')}
              </Label>
              <Textarea
                id="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={(e) =>
                  handleInputChange('deliveryAddress', e.target.value)
                }
                className={`mt-1 font-inter font-light ${
                  hasFieldError('deliveryAddress')
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : ''
                }`}
                rows={3}
                placeholder={t('reservation.deliveryAddressPlaceholder')}
                required
              />
              {hasFieldError('deliveryAddress') && (
                <div className="mt-1 flex items-center text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {getFieldError('deliveryAddress')}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Other services - single address
          <div>
            <Label
              htmlFor="address"
              className="text-sm font-inter font-medium text-gray-700"
            >
              {t('reservation.address')}
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className={`mt-1 font-inter font-light ${
                hasFieldError('address')
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : ''
              }`}
              rows={3}
              placeholder={t('reservation.addressPlaceholder')}
              required
            />
            {hasFieldError('address') && (
              <div className="mt-1 flex items-center text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {getFieldError('address')}
              </div>
            )}
          </div>
        )}

        {/* Apartment Size (for cleaning and moving) */}
        {(selectedService === 'cleaning' || selectedService === 'moving') && (
          <div>
            <Label
              htmlFor="apartmentSize"
              className="text-sm font-inter font-medium text-gray-700"
            >
              {t('reservation.apartmentSize')}
            </Label>
            <Input
              id="apartmentSize"
              type="number"
              value={formData.apartmentSize}
              onChange={(e) =>
                handleInputChange('apartmentSize', e.target.value)
              }
              className="mt-1 font-inter font-light"
              placeholder={t('reservation.apartmentSizePlaceholder')}
            />
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-baloo-bhai font-light text-gray-900 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-brand-primary" />
          {t('reservation.additionalInfo')}
        </h3>
        <div>
          <Label
            htmlFor="message"
            className="text-sm font-inter font-medium text-gray-700"
          >
            {t('reservation.message')}
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className="mt-1 font-inter font-light"
            rows={4}
            placeholder={t('reservation.messagePlaceholder')}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={submitMutation.isPending}
        className="w-full bg-brand-primary hover:bg-brand-secondary font-inter font-medium disabled:opacity-50"
      >
        {submitMutation.isPending
          ? 'Submitting...'
          : t('reservation.submitReservation')}
      </Button>
    </form>
  );
};

export default ReservationForm;
