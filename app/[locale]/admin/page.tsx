'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { Button } from '../../../components/ui/button';
import AdminLogin from '../../../components/admin/admin-login';
import AdminTabs from '../../../components/admin/admin-tabs';
import AdminStats from '../../../components/admin/admin-stats';
import ReservationManagement from '../../../components/admin/reservation-management';
import NewsManagement from '../../../components/admin/news-management';
import { Reservation, NewsItem } from '../../../lib/admin-utils';

const AdminPage: React.FC = () => {
  const { t } = useTranslation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoadingReservations, setIsLoadingReservations] = useState(false);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<'reservations' | 'news'>(
    'reservations',
  );

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        fetchReservations();
        fetchNews();
      } else {
        setIsAuthenticated(false);
        setReservations([]);
        setNews([]);
      }
      setIsCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      setReservations([]);
      setNews([]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchReservations = async () => {
    setIsLoadingReservations(true);
    try {
      const q = query(
        collection(db, 'reservations'),
        orderBy('createdAt', 'desc'),
      );
      const querySnapshot = await getDocs(q);
      const reservationsData: Reservation[] = [];

      querySnapshot.forEach((doc) => {
        reservationsData.push({
          id: doc.id,
          ...doc.data(),
        } as Reservation);
      });

      setReservations(reservationsData);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setIsLoadingReservations(false);
    }
  };

  const fetchNews = async () => {
    setIsLoadingNews(true);
    try {
      const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const newsData: NewsItem[] = [];

      querySnapshot.forEach((doc) => {
        newsData.push({
          id: doc.id,
          ...doc.data(),
        } as NewsItem);
      });

      setNews(newsData);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoadingNews(false);
    }
  };

  const handleLogin = () => {
    // This will be handled by the auth state listener
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">{t('admin.checkingAuth')}</p>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // Show main admin interface if authenticated
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('admin.title')}
          </h1>
          <div className="flex items-center space-x-4">
            <Button onClick={handleLogout} variant="outline">
              {t('admin.logout')}
            </Button>
          </div>
        </div>

        <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'reservations' && (
          <>
            <AdminStats reservations={reservations} />
            <ReservationManagement
              reservations={reservations}
              onReservationsUpdate={fetchReservations}
              isLoading={isLoadingReservations}
            />
          </>
        )}

        {activeTab === 'news' && (
          <NewsManagement
            news={news}
            onNewsUpdate={fetchNews}
            isLoading={isLoadingNews}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
