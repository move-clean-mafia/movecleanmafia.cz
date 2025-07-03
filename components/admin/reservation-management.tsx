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
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
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

  // Sorting state
  const [sortField, setSortField] = useState<keyof Reservation | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [paginatedReservations, setPaginatedReservations] = useState<
    Reservation[]
  >([]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [
    reservations,
    statusFilter,
    searchQuery,
    sortField,
    sortDirection,
    currentPage,
    itemsPerPage,
  ]);

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

  const applyFiltersAndSort = () => {
    let filtered = [...reservations];

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(
        (reservation) => reservation.status === statusFilter,
      );
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (reservation) =>
          reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          reservation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          reservation.phone.includes(searchQuery),
      );
    }

    // Apply sorting
    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        // Handle date sorting
        if (sortField === 'createdAt') {
          aValue = aValue?.toDate ? aValue.toDate() : new Date(aValue);
          bValue = bValue?.toDate ? bValue.toDate() : new Date(bValue);
        }

        // Convert to string for comparison if needed
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredReservations(filtered);

    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = filtered.slice(startIndex, endIndex);
    setPaginatedReservations(paginated);
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

  const handleSort = (field: keyof Reservation) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field with ascending direction
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page
  };

  const getSortIcon = (field: keyof Reservation) => {
    if (sortField !== field) return <ChevronsUpDown className="w-4 h-4" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(
    currentPage * itemsPerPage,
    filteredReservations.length,
  );

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
                    <th
                      className="text-left p-2 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-1">
                        {t('admin.reservations.name')}
                        {getSortIcon('name')}
                      </div>
                    </th>
                    <th className="text-left p-2 font-medium text-gray-700">
                      {t('admin.reservations.contact')}
                    </th>
                    <th
                      className="text-left p-2 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('serviceType')}
                    >
                      <div className="flex items-center gap-1">
                        {t('admin.reservations.service')}
                        {getSortIcon('serviceType')}
                      </div>
                    </th>
                    <th
                      className="text-left p-2 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('clinic')}
                    >
                      <div className="flex items-center gap-1">
                        {t('admin.reservations.clinic')}
                        {getSortIcon('clinic')}
                      </div>
                    </th>
                    <th
                      className="text-left p-2 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('preferredTime')}
                    >
                      <div className="flex items-center gap-1">
                        {t('admin.reservations.preferredTime')}
                        {getSortIcon('preferredTime')}
                      </div>
                    </th>
                    <th
                      className="text-left p-2 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center gap-1">
                        {t('admin.reservations.status')}
                        {getSortIcon('status')}
                      </div>
                    </th>
                    <th className="text-left p-2 font-medium text-gray-700">
                      {t('admin.reservations.actions')}
                    </th>
                    <th
                      className="text-left p-2 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center gap-1">
                        {t('admin.reservations.dateCreated')}
                        {getSortIcon('createdAt')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedReservations.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-8 text-gray-500"
                      >
                        {filteredReservations.length === 0
                          ? t('admin.reservations.noReservationsFound')
                          : t('admin.reservations.noResultsOnPage')}
                      </td>
                    </tr>
                  ) : (
                    paginatedReservations.map((reservation) => (
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

          {/* Pagination Controls */}
          {filteredReservations.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t">
              {/* Items per page selector */}
              <div className="flex items-center gap-2">
                <Label htmlFor="items-per-page" className="text-sm">
                  {t('admin.reservations.pagination.itemsPerPage')}:
                </Label>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) =>
                    handleItemsPerPageChange(parseInt(value))
                  }
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results info */}
              <div className="text-sm text-gray-600">
                {t('admin.reservations.pagination.showing')} {startItem}{' '}
                {t('admin.reservations.pagination.to')} {endItem}{' '}
                {t('admin.reservations.pagination.of')}{' '}
                {filteredReservations.length}{' '}
                {t('admin.reservations.pagination.results')}
              </div>

              {/* Page navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {t('admin.reservations.pagination.previous')}
                </Button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? 'default' : 'outline'
                        }
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {t('admin.reservations.pagination.next')}
                </Button>
              </div>
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
