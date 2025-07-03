'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Reservation,
  translateServiceType,
  translatePreferredTime,
  translateClinic,
  translateStatus,
  formatDate,
} from '../../lib/admin-utils';

interface ReservationDetailsModalProps {
  reservation: Reservation | null;
  isOpen: boolean;
  onClose: () => void;
}

const ReservationDetailsModal: React.FC<ReservationDetailsModalProps> = ({
  reservation,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();

  if (!reservation) return null;

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };

    return (
      <Badge
        className={`${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'}`}
      >
        {translateStatus(status, t)}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            {t('admin.reservations.details.title')}
            {getStatusBadge(reservation.status)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t('admin.reservations.details.personalInfo')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  {t('admin.reservations.name')}
                </label>
                <p className="text-gray-900 font-medium">{reservation.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  {t('admin.reservations.details.email')}
                </label>
                <p className="text-gray-900">{reservation.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  {t('admin.reservations.details.phone')}
                </label>
                <p className="text-gray-900">{reservation.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  {t('admin.reservations.dateCreated')}
                </label>
                <p className="text-gray-900">
                  {formatDate(reservation.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t('admin.reservations.details.appointmentDetails')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  {t('admin.reservations.service')}
                </label>
                <p className="text-gray-900 font-medium">
                  {translateServiceType(reservation.serviceType, t)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  {t('admin.reservations.clinic')}
                </label>
                <p className="text-gray-900">
                  {translateClinic(reservation.clinic, t)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  {t('admin.reservations.preferredTime')}
                </label>
                <p className="text-gray-900">
                  {translatePreferredTime(reservation.preferredTime, t)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  {t('admin.reservations.status')}
                </label>
                <div className="mt-1">{getStatusBadge(reservation.status)}</div>
              </div>
            </div>
          </div>

          {/* Message */}
          {reservation.message && (
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('admin.reservations.details.message')}
              </h3>
              <p className="text-gray-900 whitespace-pre-wrap">
                {reservation.message}
              </p>
            </div>
          )}

          {/* Technical Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t('admin.reservations.details.technicalInfo')}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  {t('admin.reservations.details.reservationId')}
                </label>
                <p className="text-gray-900 font-mono text-sm">
                  {reservation.id}
                </p>
              </div>
              {reservation.ip && (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    {t('admin.reservations.details.ipAddress')}
                  </label>
                  <p className="text-gray-900 font-mono text-sm">
                    {reservation.ip}
                  </p>
                </div>
              )}
              {reservation.userAgent && (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    {t('admin.reservations.details.userAgent')}
                  </label>
                  <p className="text-gray-900 text-sm break-all">
                    {reservation.userAgent}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose} variant="outline">
            {t('admin.reservations.details.close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDetailsModal;
