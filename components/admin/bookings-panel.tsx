'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  MapPin,
  Loader2,
  Eye,
  Edit,
  Phone,
  Mail,
  Package,
  DollarSign,
  Plus,
} from 'lucide-react';
import {
  fetchReservations,
  updateReservationStatus,
  createReservation,
  updateReservation,
  type Booking,
} from '../../lib/admin-client';
import { ReservationDetailModal } from './reservation-detail-modal';
import { ReservationForm } from './reservation-form';

const statusColors = {
  pending:
    'bg-gradient-to-r from-[#d6b977]/20 to-[#d6b977]/10 text-[#d6b977] border border-[#d6b977]/30',
  confirmed:
    'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200',
  in_progress:
    'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 border border-orange-200',
  completed:
    'bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200',
  cancelled:
    'bg-gradient-to-r from-red-100 to-red-50 text-red-700 border border-red-200',
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

export const BookingsPanel = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(totalBookings / itemsPerPage);

  useEffect(() => {
    loadBookings();
  }, [currentPage]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const result = await fetchReservations(currentPage, itemsPerPage);
      console.log('result', result);
      setBookings(result.bookings);
      setTotalBookings(result.total);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusUpdate = async (
    bookingId: string,
    newStatus: Booking['status'],
  ) => {
    try {
      setUpdatingStatus(bookingId);
      await updateReservationStatus(bookingId, newStatus);
      // Reload bookings to reflect the change
      await loadBookings();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailModalOpen(true);
  };

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking);
    setIsFormOpen(true);
  };

  const handleCreateBooking = () => {
    setEditingBooking(null);
    setIsFormOpen(true);
  };

  const handleSaveBooking = async (bookingData: Partial<Booking>) => {
    try {
      if (editingBooking) {
        // Update existing booking
        await updateReservation(editingBooking.id, bookingData);
      } else {
        // Create new booking
        await createReservation(bookingData);
      }
      // Reload bookings to show the changes
      await loadBookings();
    } catch (error) {
      console.error('Error saving booking:', error);
      throw error;
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
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error, dateString);
      return 'Invalid Date';
    }
  };

  const formatTime = (timeString: string) => {
    return timeLabels[timeString as keyof typeof timeLabels] || timeString;
  };

  const formatService = (service: string) => {
    return serviceLabels[service as keyof typeof serviceLabels] || service;
  };

  if (loading) {
    return (
      <Card className="border-2 border-[#d6b977]/20 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-baloo-bhai font-light text-gray-900">
            Recent Bookings
          </CardTitle>
          <CardDescription className="text-gray-600">
            Loading bookings...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-2 border-[#d6b977]/20 shadow-lg bg-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-baloo-bhai font-light text-gray-900">
                Recent Bookings
              </CardTitle>
              <CardDescription className="text-gray-600">
                Manage and view all customer bookings
              </CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              <Badge
                variant="secondary"
                className="text-sm bg-gradient-to-r from-[#d6b977]/20 to-[#d6b977]/10 text-[#d6b977] border border-[#d6b977]/30"
              >
                {totalBookings} total bookings
              </Badge>
              <Button
                onClick={handleCreateBooking}
                size="sm"
                className="bg-gradient-to-r from-[#d6b977] to-[#d6b977]/90 hover:from-[#d6b977]/90 hover:to-[#d6b977] text-black font-semibold border-2 border-[#d6b977] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Booking
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">No bookings found</p>
              <Button
                onClick={handleCreateBooking}
                className="bg-gradient-to-r from-[#d6b977] to-[#d6b977]/90 hover:from-[#d6b977]/90 hover:to-[#d6b977] text-black font-semibold border-2 border-[#d6b977] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Booking
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border-2 border-[#d6b977]/20 rounded-lg p-6 hover:bg-gradient-to-r hover:from-[#d6b977]/5 hover:to-[#d6b977]/10 transition-all duration-300 bg-white"
                >
                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#d6b977] to-[#d6b977]/90 rounded-full flex items-center justify-center border-2 border-[#d6b977] shadow-lg">
                        <User className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {booking.customerName}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{booking.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{booking.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={statusColors[booking.status]}>
                        {statusLabels[booking.status]}
                      </Badge>
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusUpdate(
                            booking.id,
                            e.target.value as Booking['status'],
                          )
                        }
                        disabled={updatingStatus === booking.id}
                        className="text-sm border-2 border-[#d6b977]/30 rounded px-3 py-1 bg-white focus:border-[#d6b977] focus:ring-[#d6b977] focus:ring-opacity-20 transition-all duration-300"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      {updatingStatus === booking.id && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                    </div>
                  </div>

                  {/* Service Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {formatService(booking.service)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {formatDate(booking.date)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {formatTime(booking.time)}
                      </span>
                    </div>
                  </div>

                  {/* Address and Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      {booking.address && (
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                          <div>
                            <span className="text-sm font-medium text-gray-700">
                              Address:
                            </span>
                            <p className="text-sm text-gray-600">
                              {booking.address}
                            </p>
                          </div>
                        </div>
                      )}
                      {booking.apartmentSize && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            Apartment Size: {booking.apartmentSize} m²
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      {booking.estimatedPrice && (
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            Est. Price: {booking.estimatedPrice}{' '}
                            {booking.currency}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          Created: {formatDate(booking.createdAt)}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-xs border-[#d6b977]/30 text-[#d6b977] bg-[#d6b977]/5"
                        >
                          {booking.source}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs border-[#d6b977]/30 text-[#d6b977] bg-[#d6b977]/5"
                        >
                          {booking.locale.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Message Preview */}
                  {booking.message && (
                    <div className="mb-4">
                      <div className="bg-gradient-to-r from-[#d6b977]/10 to-[#d6b977]/5 p-3 rounded-lg border border-[#d6b977]/20">
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {booking.message}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-xs text-gray-500">
                      ID: {booking.id.slice(-8)}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetails(booking)}
                        className="border-[#d6b977] text-[#d6b977] hover:bg-[#d6b977] hover:text-black transition-all duration-300"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditBooking(booking)}
                        className="border-[#d6b977] text-[#d6b977] hover:bg-[#d6b977] hover:text-black transition-all duration-300"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, totalBookings)} of{' '}
                {totalBookings} bookings
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-[#d6b977] text-[#d6b977] hover:bg-[#d6b977] hover:text-black transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 p-0 ${
                          currentPage === page
                            ? 'bg-[#d6b977] text-black border-[#d6b977]'
                            : 'border-[#d6b977] text-[#d6b977] hover:bg-[#d6b977] hover:text-black'
                        } transition-all duration-300`}
                      >
                        {page}
                      </Button>
                    ),
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-[#d6b977] text-[#d6b977] hover:bg-[#d6b977] hover:text-black transition-all duration-300"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <ReservationDetailModal
        booking={selectedBooking}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedBooking(null);
        }}
        onStatusUpdate={handleStatusUpdate}
        onEdit={(booking) => {
          setEditingBooking(booking);
          setIsDetailModalOpen(false);
          setIsFormOpen(true);
        }}
      />

      {/* Create/Edit Form Modal */}
      <ReservationForm
        booking={editingBooking}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingBooking(null);
        }}
        onSave={handleSaveBooking}
      />
    </>
  );
};
