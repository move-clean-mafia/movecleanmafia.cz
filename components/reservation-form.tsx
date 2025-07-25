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
import { Clock, MapPin, User, Truck, Home, AlertCircle } from 'lucide-react';
import { useToast } from './ui/use-toast';

interface ReservationFormProps {
  locale: string;
}

// Zod validation schema
const reservationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(9, 'Phone number must be at least 9 characters'),
  service: z.enum(['moving', 'cleaning', 'packing', 'storage', 'other']),
  package: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
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
    { value: 'packing', label: t('reservation.services.packing') },
    { value: 'storage', label: t('reservation.services.storage') },
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

      // Validate form data
      const validatedData = reservationSchema.parse(formData);

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
        <h3 className="text-lg font-oswald font-light text-gray-900 flex items-center">
          <User className="w-5 h-5 mr-2 text-brand-primary" />
          {t('reservation.personalInfo')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="firstName"
              className="text-sm font-source-sans font-medium text-gray-700"
            >
              {t('contact.form.firstName')}
            </Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`mt-1 font-source-sans font-light ${
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
              className="text-sm font-source-sans font-medium text-gray-700"
            >
              {t('contact.form.lastName')}
            </Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`mt-1 font-source-sans font-light ${
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
              className="text-sm font-source-sans font-medium text-gray-700"
            >
              {t('contact.form.email')}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`mt-1 font-source-sans font-light ${
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
              className="text-sm font-source-sans font-medium text-gray-700"
            >
              {t('contact.form.phone')}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`mt-1 font-source-sans font-light ${
                hasFieldError('phone')
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : ''
              }`}
              placeholder={t('contact.form.phonePlaceholder')}
              required
            />
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
        <h3 className="text-lg font-oswald font-light text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-brand-primary" />
          {t('reservation.serviceDetails')}
        </h3>

        {/* Service Selection */}
        <div>
          <Label
            htmlFor="service"
            className="text-sm font-source-sans font-medium text-gray-700"
          >
            {t('reservation.service')}
          </Label>
          <Select
            value={selectedService}
            onValueChange={handleServiceChange}
            required
          >
            <SelectTrigger
              className={`mt-1 font-source-sans font-light ${
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
              className="text-sm font-source-sans font-medium text-gray-700"
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
              <SelectTrigger className="mt-1 font-source-sans font-light">
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
              className="text-sm font-source-sans font-medium text-gray-700"
            >
              {t('reservation.preferredDate')}
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={`mt-1 font-source-sans font-light ${
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
              className="text-sm font-source-sans font-medium text-gray-700"
            >
              {t('reservation.preferredTime')}
            </Label>
            <Select
              value={formData.time}
              onValueChange={(value) => handleInputChange('time', value)}
              required
            >
              <SelectTrigger
                className={`mt-1 font-source-sans font-light ${
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
                className="text-sm font-source-sans font-medium text-gray-700 flex items-center"
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
                className={`mt-1 font-source-sans font-light ${
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
                className="text-sm font-source-sans font-medium text-gray-700 flex items-center"
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
                className={`mt-1 font-source-sans font-light ${
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
              className="text-sm font-source-sans font-medium text-gray-700"
            >
              {t('reservation.address')}
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className={`mt-1 font-source-sans font-light ${
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
              className="text-sm font-source-sans font-medium text-gray-700"
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
              className="mt-1 font-source-sans font-light"
              placeholder={t('reservation.apartmentSizePlaceholder')}
            />
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-oswald font-light text-gray-900 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-brand-primary" />
          {t('reservation.additionalInfo')}
        </h3>
        <div>
          <Label
            htmlFor="message"
            className="text-sm font-source-sans font-medium text-gray-700"
          >
            {t('reservation.message')}
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className="mt-1 font-source-sans font-light"
            rows={4}
            placeholder={t('reservation.messagePlaceholder')}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={submitMutation.isPending}
        className="w-full bg-brand-primary hover:bg-brand-secondary font-source-sans font-medium disabled:opacity-50"
      >
        {submitMutation.isPending
          ? 'Submitting...'
          : t('reservation.submitReservation')}
      </Button>
    </form>
  );
};

export default ReservationForm;
