'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../auth-provider';
import { signOutUser } from '../../lib/auth';
import { getLocalizedAdminRoute, getCurrentLocale } from '../../lib/i18n';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  LogOut,
  Home,
  BarChart3,
  FileText,
  MessageSquare,
  Loader2,
} from 'lucide-react';
import { BookingsPanel } from './bookings-panel';
import { getReservationStats } from '../../lib/admin-client';

export const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setStatsLoading(true);
      const statsData = await getReservationStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOutUser();
      router.push(getLocalizedAdminRoute('/login', getCurrentLocale(pathname)));
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateHome = () => {
    router.push('/');
  };

  const statsCards = [
    {
      title: 'Total Reservations',
      value: stats.total.toString(),
      change: '+12%',
      icon: FileText,
      color: 'text-[#d6b977]',
      bgColor: 'bg-gradient-to-br from-[#d6b977]/20 to-[#d6b977]/10',
    },
    {
      title: 'Pending Requests',
      value: stats.pending.toString(),
      change: '+5%',
      icon: FileText,
      color: 'text-[#d6b977]',
      bgColor: 'bg-gradient-to-br from-[#d6b977]/20 to-[#d6b977]/10',
    },
    {
      title: 'Completed Jobs',
      value: stats.completed.toString(),
      change: '+8%',
      icon: BarChart3,
      color: 'text-[#d6b977]',
      bgColor: 'bg-gradient-to-br from-[#d6b977]/20 to-[#d6b977]/10',
    },
    {
      title: 'In Progress',
      value: stats.inProgress.toString(),
      change: '+3%',
      icon: MessageSquare,
      color: 'text-[#d6b977]',
      bgColor: 'bg-gradient-to-br from-[#d6b977]/20 to-[#d6b977]/10',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-black border-b-2 border-[#d6b977] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-1 bg-gradient-to-b from-[#d6b977] to-[#d6b977]/70 rounded-full"></div>
              <h1 className="text-2xl font-baloo-bhai font-light text-white">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">
                Welcome,{' '}
                <span className="text-[#d6b977] font-medium">
                  {user?.email}
                </span>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNavigateHome}
                className="border-[#d6b977] text-[#d6b977] hover:bg-[#d6b977] hover:text-black transition-all duration-300"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Site
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                disabled={loading}
                className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {loading ? 'Signing out...' : 'Sign Out'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Card
              key={index}
              className="border-2 border-[#d6b977]/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {statsLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin text-[#d6b977]" />
                      ) : (
                        stat.value
                      )}
                    </p>
                    <p className="text-sm text-[#d6b977] font-medium">
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-full ${stat.bgColor} border-2 border-[#d6b977]/20`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bookings Panel */}
        <div className="mb-8">
          <BookingsPanel />
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card className="border-2 border-[#d6b977]/20 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-baloo-bhai font-light text-gray-900">
                Recent Activity
              </CardTitle>
              <CardDescription className="text-gray-600">
                Latest reservations and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#d6b977]/10 to-[#d6b977]/5 rounded-lg border border-[#d6b977]/20">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      New reservation received
                    </p>
                    <p className="text-sm text-gray-600">
                      Moving service for apartment in Prague
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#d6b977]/10 to-[#d6b977]/5 rounded-lg border border-[#d6b977]/20">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Cleaning job completed
                    </p>
                    <p className="text-sm text-gray-600">
                      Post-renovation cleaning in Brno
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">4 hours ago</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#d6b977]/10 to-[#d6b977]/5 rounded-lg border border-[#d6b977]/20">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">
                      Customer inquiry
                    </p>
                    <p className="text-sm text-gray-600">
                      New inquiry about moving services
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">6 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
