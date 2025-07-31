'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Loader2,
  Save,
  X,
  User,
  MapPin,
  Package,
  DollarSign,
} from 'lucide-react';
import type { Booking } from '../../lib/admin-client';

interface ReservationFormProps {
  booking?: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (bookingData: Partial<Booking>) => Promise<void>;
}

const serviceOptions = [
  { value: 'moving', label: 'Moving' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'packing', label: 'Packing' },

  { value: 'other', label: 'Other' },
];

const packageOptions = [
  { value: 'maintenance', label: 'Maintenance Cleaning' },
  { value: 'general', label: 'General Cleaning' },
  { value: 'postRenovation', label: 'Post-Renovation Cleaning' },
];

const timeOptions = [
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'evening', label: 'Evening' },
];

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const localeOptions = [
  { value: 'cs', label: 'Czech' },
  { value: 'en', label: 'English' },
  { value: 'ua', label: 'Ukrainian' },
];

const sourceOptions = [
  { value: 'website', label: 'Website' },
  { value: 'phone', label: 'Phone' },
  { value: 'email', label: 'Email' },
];

const currencyOptions = [
  { value: 'CZK', label: 'CZK' },
  { value: 'EUR', label: 'EUR' },
  { value: 'USD', label: 'USD' },
];

export const ReservationForm = ({
  booking,
  isOpen,
  onClose,
  onSave,
}: ReservationFormProps) => {
  const [formData, setFormData] = useState<Partial<Booking>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: 'moving',
    package: '',
    preferredDate: '',
    preferredTime: 'morning',
    pickupAddress: '',
    deliveryAddress: '',
    address: '',
    apartmentSize: '',
    message: '',
    status: 'pending',
    currency: 'CZK',
    estimatedPrice: 0,
    finalPrice: 0,
    locale: 'cs',
    source: 'website',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!booking;

  useEffect(() => {
    if (booking) {
      setFormData({
        firstName: booking.firstName || '',
        lastName: booking.lastName || '',
        email: booking.email || '',
        phone: booking.phone || '',
        service: booking.service || 'moving',
        package: booking.package || '',
        preferredDate: booking.preferredDate || '',
        preferredTime: booking.preferredTime || 'morning',
        pickupAddress: booking.pickupAddress || '',
        deliveryAddress: booking.deliveryAddress || '',
        address: booking.address || '',
        apartmentSize: booking.apartmentSize || '',
        message: booking.message || '',
        status: booking.status || 'pending',
        currency: booking.currency || 'CZK',
        estimatedPrice: booking.estimatedPrice || 0,
        finalPrice: booking.finalPrice || 0,
        locale: booking.locale || 'cs',
        source: booking.source || 'website',
      });
    } else {
      // Reset form for new booking
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: 'moving',
        package: '',
        preferredDate: '',
        preferredTime: 'morning',
        pickupAddress: '',
        deliveryAddress: '',
        address: '',
        apartmentSize: '',
        message: '',
        status: 'pending',
        currency: 'CZK',
        estimatedPrice: 0,
        finalPrice: 0,
        locale: 'cs',
        source: 'website',
      });
    }
    setErrors({});
  }, [booking, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required';
    }
    if (!formData.service) {
      newErrors.service = 'Service type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving reservation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-baloo-bhai font-light">
                {isEditing ? 'Edit Reservation' : 'Create New Reservation'}
              </h2>
              <p className="text-gray-600">
                {isEditing
                  ? 'Update reservation details'
                  : 'Add a new customer reservation'}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Customer Information
                </CardTitle>
                <CardDescription>Basic customer details</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange('firstName', e.target.value)
                    }
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange('lastName', e.target.value)
                    }
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Service Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Service Information
                </CardTitle>
                <CardDescription>
                  Service details and scheduling
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="service">Service Type *</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) =>
                      handleInputChange('service', value)
                    }
                  >
                    <SelectTrigger
                      className={errors.service ? 'border-red-500' : ''}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.service}
                    </p>
                  )}
                </div>
                {formData.service === 'cleaning' && (
                  <div>
                    <Label htmlFor="package">Cleaning Package</Label>
                    <Select
                      value={formData.package}
                      onValueChange={(value) =>
                        handleInputChange('package', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select package" />
                      </SelectTrigger>
                      <SelectContent>
                        {packageOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div>
                  <Label htmlFor="preferredDate">Preferred Date *</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) =>
                      handleInputChange('preferredDate', e.target.value)
                    }
                    className={errors.preferredDate ? 'border-red-500' : ''}
                  />
                  {errors.preferredDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.preferredDate}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="preferredTime">Preferred Time</Label>
                  <Select
                    value={formData.preferredTime}
                    onValueChange={(value) =>
                      handleInputChange('preferredTime', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="apartmentSize">Apartment Size (m²)</Label>
                  <Input
                    id="apartmentSize"
                    type="number"
                    value={formData.apartmentSize}
                    onChange={(e) =>
                      handleInputChange('apartmentSize', e.target.value)
                    }
                    placeholder="e.g., 100"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Address Information
                </CardTitle>
                <CardDescription>Pickup and delivery addresses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pickupAddress">Pickup Address</Label>
                  <Textarea
                    id="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={(e) =>
                      handleInputChange('pickupAddress', e.target.value)
                    }
                    placeholder="Enter pickup address"
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryAddress">Delivery Address</Label>
                  <Textarea
                    id="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={(e) =>
                      handleInputChange('deliveryAddress', e.target.value)
                    }
                    placeholder="Enter delivery address"
                  />
                </div>
                <div>
                  <Label htmlFor="address">General Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange('address', e.target.value)
                    }
                    placeholder="Enter general address (if no pickup/delivery)"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Pricing Information
                </CardTitle>
                <CardDescription>
                  Cost estimates and final pricing
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="estimatedPrice">Estimated Price</Label>
                  <Input
                    id="estimatedPrice"
                    type="number"
                    value={formData.estimatedPrice}
                    onChange={(e) =>
                      handleInputChange(
                        'estimatedPrice',
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="finalPrice">Final Price</Label>
                  <Input
                    id="finalPrice"
                    type="number"
                    value={formData.finalPrice}
                    onChange={(e) =>
                      handleInputChange(
                        'finalPrice',
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) =>
                      handleInputChange('currency', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>
                  Customer message and system details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="message">Customer Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange('message', e.target.value)
                    }
                    placeholder="Enter customer message or notes"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        handleInputChange('status', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="locale">Locale</Label>
                    <Select
                      value={formData.locale}
                      onValueChange={(value) =>
                        handleInputChange('locale', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {localeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="source">Source</Label>
                    <Select
                      value={formData.source}
                      onValueChange={(value) =>
                        handleInputChange('source', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sourceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {isEditing ? 'Update Reservation' : 'Create Reservation'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
