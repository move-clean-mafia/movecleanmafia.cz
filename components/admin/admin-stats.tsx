'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../ui/card';
import { Reservation } from '../../lib/admin-utils';

interface AdminStatsProps {
  reservations: Reservation[];
}

const AdminStats: React.FC<AdminStatsProps> = ({ reservations }) => {
  const { t } = useTranslation();

  const totalReservations = reservations.length;
  const pendingCount = reservations.filter(
    (r) => r.status === 'pending',
  ).length;
  const confirmedCount = reservations.filter(
    (r) => r.status === 'confirmed',
  ).length;
  const completedCount = reservations.filter(
    (r) => r.status === 'completed',
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-blue-600">
            {totalReservations}
          </div>
          <div className="text-sm text-gray-600">
            {t('admin.reservations.totalReservations')}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {pendingCount}
          </div>
          <div className="text-sm text-gray-600">
            {t('admin.reservations.pending')}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-green-600">
            {confirmedCount}
          </div>
          <div className="text-sm text-gray-600">
            {t('admin.reservations.confirmed')}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-blue-600">
            {completedCount}
          </div>
          <div className="text-sm text-gray-600">
            {t('admin.reservations.completed')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
