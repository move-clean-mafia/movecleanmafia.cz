'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import ReservationDetailsModal from './reservation-details-modal';
import {
  Reservation,
  translateServiceType,
  translatePreferredTime,
  translateClinic,
  translateStatus,
  formatDate,
} from '../../lib/admin-utils';

interface ReservationManagementProps {
  reservations: Reservation[];
  onReservationsUpdate: () => void;
  isLoading: boolean;
}

const ReservationManagement: React.FC<ReservationManagementProps> = ({
  reservations,
  onReservationsUpdate,
  isLoading,
}) => {
  const { t } = useTranslation();

  const [filteredReservations, setFilteredReservations] = useState<
    Reservation[]
  >([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    applyFilters(reservations, statusFilter, searchQuery);
  }, [reservations, statusFilter, searchQuery]);

  const updateReservationStatus = async (
    reservationId: string,
    newStatus: string,
  ) => {
    try {
      await updateDoc(doc(db, 'reservations', reservationId), {
        status: newStatus,
      });
      onReservationsUpdate();
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };

  const applyFilters = (
    data: Reservation[],
    status: string,
    search: string,
  ) => {
    let filtered = data;

    if (status !== 'all') {
      filtered = filtered.filter(
        (reservation) => reservation.status === status,
      );
    }

    if (search) {
      filtered = filtered.filter(
        (reservation) =>
          reservation.name.toLowerCase().includes(search.toLowerCase()) ||
          reservation.email.toLowerCase().includes(search.toLowerCase()) ||
          reservation.phone.includes(search),
      );
    }

    setFilteredReservations(filtered);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'}`}
      >
        {translateStatus(status, t)}
      </span>
    );
  };

  const handleRowClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedReservation(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.reservations.title')}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex-1">
              <Label htmlFor="search">{t('admin.reservations.search')}</Label>
              <Input
                id="search"
                type="text"
                placeholder={t('admin.reservations.searchPlaceholder')}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="sm:w-48">
              <Label htmlFor="status-filter">
                {t('admin.reservations.filterByStatus')}
              </Label>
              <Select
                value={statusFilter}
                onValueChange={handleStatusFilterChange}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={t('admin.reservations.allStatuses')}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t('admin.reservations.allStatuses')}
                  </SelectItem>
                  <SelectItem value="pending">
                    {t('admin.reservations.pending')}
                  </SelectItem>
                  <SelectItem value="confirmed">
                    {t('admin.reservations.confirmed')}
                  </SelectItem>
                  <SelectItem value="cancelled">
                    {t('admin.reservations.cancelled')}
                  </SelectItem>
                  <SelectItem value="completed">
                    {t('admin.reservations.completed')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:w-auto flex flex-col">
              <Label className="text-sm font-medium text-gray-700 mb-1">
                &nbsp;
              </Label>
              <Button
                onClick={onReservationsUpdate}
                disabled={isLoading}
                className="h-10"
              >
                {isLoading
                  ? t('admin.reservations.loading')
                  : t('admin.reservations.refresh')}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">
                {t('admin.reservations.loadingReservations')}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium text-gray-700">
                      {t('admin.reservations.name')}
                    </th>
                    <th className="text-left p-2 font-medium text-gray-700">
                      {t('admin.reservations.contact')}
                    </th>
                    <th className="text-left p-2 font-medium text-gray-700">
                      {t('admin.reservations.service')}
                    </th>
                    <th className="text-left p-2 font-medium text-gray-700">
                      {t('admin.reservations.clinic')}
                    </th>
                    <th className="text-left p-2 font-medium text-gray-700">
                      {t('admin.reservations.preferredTime')}
                    </th>
                    <th className="text-left p-2 font-medium text-gray-700">
                      {t('admin.reservations.status')}
                    </th>
                    <th className="text-left p-2 font-medium text-gray-700">
                      {t('admin.reservations.actions')}
                    </th>
                    <th className="text-left p-2 font-medium text-gray-700">
                      {t('admin.reservations.dateCreated')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-8 text-gray-500"
                      >
                        {t('admin.reservations.noReservationsFound')}
                      </td>
                    </tr>
                  ) : (
                    filteredReservations.map((reservation) => (
                      <tr
                        key={reservation.id}
                        className="border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleRowClick(reservation)}
                      >
                        <td className="p-2">
                          <div className="font-medium">{reservation.name}</div>
                        </td>
                        <td className="p-2 text-sm">
                          <div>{reservation.email}</div>
                          <div className="text-gray-600">
                            {reservation.phone}
                          </div>
                        </td>
                        <td className="p-2 text-sm">
                          {translateServiceType(reservation.serviceType, t)}
                        </td>
                        <td className="p-2 text-sm">
                          {translateClinic(reservation.clinic, t)}
                        </td>
                        <td className="p-2 text-sm">
                          {translatePreferredTime(reservation.preferredTime, t)}
                        </td>
                        <td className="p-2">
                          {getStatusBadge(reservation.status)}
                        </td>
                        <td
                          className="p-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Select
                            value={reservation.status}
                            onValueChange={(value) =>
                              updateReservationStatus(reservation.id, value)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">
                                {t('admin.status.pending')}
                              </SelectItem>
                              <SelectItem value="confirmed">
                                {t('admin.status.confirmed')}
                              </SelectItem>
                              <SelectItem value="cancelled">
                                {t('admin.status.cancelled')}
                              </SelectItem>
                              <SelectItem value="completed">
                                {t('admin.status.completed')}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-2 text-sm">
                          {formatDate(reservation.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <ReservationDetailsModal
        reservation={selectedReservation}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ReservationManagement;
