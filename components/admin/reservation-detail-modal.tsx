'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Package,
  DollarSign,
  Globe,
  Monitor,
  FileText,
} from 'lucide-react';
import type { Booking } from '../../lib/admin-client';

interface ReservationDetailModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (
    bookingId: string,
    newStatus: Booking['status'],
  ) => Promise<void>;
  onEdit?: (booking: Booking) => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-orange-100 text-orange-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const serviceLabels = {
  moving: 'Moving',
  cleaning: 'Cleaning',
  packing: 'Packing',

  other: 'Other',
};

const timeLabels = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
};

const packageLabels = {
  maintenance: 'Maintenance Cleaning',
  general: 'General Cleaning',
  postRenovation: 'Post-Renovation Cleaning',
};

export const ReservationDetailModal = ({
  booking,
  isOpen,
  onClose,
  onStatusUpdate,
  onEdit,
}: ReservationDetailModalProps) => {
  const [updatingStatus, setUpdatingStatus] = useState(false);

  if (!booking) return null;

  const handleStatusUpdate = async (newStatus: Booking['status']) => {
    try {
      setUpdatingStatus(true);
      await onStatusUpdate(booking.id, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleDateString('cs-CZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleString('cs-CZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-baloo-bhai font-light">
            Reservation Details
          </DialogTitle>
          <DialogDescription>
            Complete information for booking #{booking.id.slice(-8)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with Status */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {booking.customerName}
              </h2>
              <p className="text-gray-600">{booking.email}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={statusColors[booking.status]}>
                {statusLabels[booking.status]}
              </Badge>
              <select
                value={booking.status}
                onChange={(e) =>
                  handleStatusUpdate(e.target.value as Booking['status'])
                }
                disabled={updatingStatus}
                className="text-sm border rounded px-3 py-1 bg-white"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              {updatingStatus && (
                <div className="text-sm text-gray-500">Updating...</div>
              )}
            </div>
          </div>

          <Separator />

          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Name:</span>
                  <span>
                    {booking.firstName} {booking.lastName}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Email:</span>
                  <span>{booking.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Phone:</span>
                  <span>{booking.phone}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Locale:</span>
                  <Badge variant="outline">
                    {booking.locale.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Monitor className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Source:</span>
                  <Badge variant="outline">{booking.source}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">ID:</span>
                  <span className="font-mono text-sm">{booking.id}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Service Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Service Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Service:</span>
                  <Badge variant="secondary">
                    {serviceLabels[
                      booking.service as keyof typeof serviceLabels
                    ] || booking.service}
                  </Badge>
                </div>
                {booking.package && (
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Package:</span>
                    <Badge variant="outline">
                      {packageLabels[
                        booking.package as keyof typeof packageLabels
                      ] || booking.package}
                    </Badge>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Preferred Date:</span>
                  <span>{formatDate(booking.date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Preferred Time:</span>
                  <span>
                    {timeLabels[booking.time as keyof typeof timeLabels] ||
                      booking.time}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                {booking.estimatedPrice && (
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Estimated Price:</span>
                    <span>
                      {booking.estimatedPrice} {booking.currency}
                    </span>
                  </div>
                )}
                {booking.finalPrice && (
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Final Price:</span>
                    <span>
                      {booking.finalPrice} {booking.currency}
                    </span>
                  </div>
                )}
                {booking.apartmentSize && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Apartment Size:</span>
                    <span>{booking.apartmentSize} m²</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Address Information
            </h3>
            <div className="space-y-3">
              {booking.pickupAddress && (
                <div>
                  <span className="font-medium text-gray-700">
                    Pickup Address:
                  </span>
                  <p className="text-gray-600 mt-1">{booking.pickupAddress}</p>
                </div>
              )}
              {booking.deliveryAddress && (
                <div>
                  <span className="font-medium text-gray-700">
                    Delivery Address:
                  </span>
                  <p className="text-gray-600 mt-1">
                    {booking.deliveryAddress}
                  </p>
                </div>
              )}
              {booking.address &&
                !booking.pickupAddress &&
                !booking.deliveryAddress && (
                  <div>
                    <span className="font-medium text-gray-700">Address:</span>
                    <p className="text-gray-600 mt-1">{booking.address}</p>
                  </div>
                )}
            </div>
          </div>

          {booking.message && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Customer Message
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{booking.message}</p>
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* System Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">System Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Created:</span>
                  <span className="ml-2 text-gray-600">
                    {formatDateTime(booking.createdAt)}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Booking ID:</span>
                  <span className="ml-2 font-mono text-gray-600">
                    {booking.id}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Status:</span>
                  <Badge className={`ml-2 ${statusColors[booking.status]}`}>
                    {statusLabels[booking.status]}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Source:</span>
                  <Badge variant="outline" className="ml-2">
                    {booking.source}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onEdit?.(booking)}>Edit Reservation</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
