'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../auth-provider';
import { signOutUser } from '../../lib/auth';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Users,
  Calendar,
  Settings,
  LogOut,
  Home,
  BarChart3,
  FileText,
  MessageSquare,
} from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOutUser();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateHome = () => {
    router.push('/');
  };

  const stats = [
    {
      title: 'Total Reservations',
      value: '24',
      change: '+12%',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Pending Requests',
      value: '8',
      change: '+5%',
      icon: FileText,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Completed Jobs',
      value: '16',
      change: '+8%',
      icon: BarChart3,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Customer Messages',
      value: '12',
      change: '+3%',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const quickActions = [
    {
      title: 'View Reservations',
      description: 'Manage all reservations',
      icon: Calendar,
      href: '/admin/reservations',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Customer Management',
      description: 'View and manage customers',
      icon: Users,
      href: '/admin/customers',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Settings',
      description: 'Configure admin settings',
      icon: Settings,
      href: '/admin/settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-oswald font-light text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleNavigateHome}>
                <Home className="w-4 h-4 mr-2" />
                Go to Site
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                disabled={loading}
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
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-full ${action.bgColor}`}>
                    <action.icon className={`w-6 h-6 ${action.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-oswald font-light">
                      {action.title}
                    </CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-oswald font-light">
                Recent Activity
              </CardTitle>
              <CardDescription>Latest reservations and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
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
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
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
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Customer inquiry
                    </p>
                    <p className="text-sm text-gray-600">
                      Storage service question from customer
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
