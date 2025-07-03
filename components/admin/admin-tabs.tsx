'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';

interface AdminTabsProps {
  activeTab: 'reservations' | 'news';
  onTabChange: (tab: 'reservations' | 'news') => void;
}

const AdminTabs: React.FC<AdminTabsProps> = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex space-x-1 mb-6">
      <Button
        variant={activeTab === 'reservations' ? 'default' : 'outline'}
        onClick={() => onTabChange('reservations')}
      >
        {t('admin.tabs.reservations')}
      </Button>
      <Button
        variant={activeTab === 'news' ? 'default' : 'outline'}
        onClick={() => onTabChange('news')}
      >
        {t('admin.tabs.news')}
      </Button>
    </div>
  );
};

export default AdminTabs;
