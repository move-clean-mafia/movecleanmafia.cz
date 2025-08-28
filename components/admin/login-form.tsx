'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { signIn, isAdmin } from '../../lib/auth';
import { getLocalizedAdminRoute, getCurrentLocale } from '../../lib/i18n';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Loader2, Lock, Mail } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await signIn(email, password);

      // Check if user is admin
      console.log('Login attempt:', {
        userEmail: user.email,
        userUid: user.uid,
        userDisplayName: user.displayName,
      });

      if (!isAdmin(user)) {
        throw new Error('Access denied. Admin privileges required.');
      }

      // Redirect to dashboard on success
      router.push(
        getLocalizedAdminRoute('/dashboard', getCurrentLocale(pathname)),
      );
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#d6b977] to-[#d6b977]/90 border-2 border-[#d6b977] shadow-lg">
            <Lock className="h-8 w-8 text-black" />
          </div>
          <h2 className="mt-6 text-3xl font-baloo-bhai font-light text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the admin dashboard
          </p>
        </div>

        <Card className="border-2 border-[#d6b977]/20 shadow-xl bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-baloo-bhai font-light text-gray-900">
              Sign In
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert
                  variant="destructive"
                  className="border-red-200 bg-red-50"
                >
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 border-gray-300 focus:border-[#d6b977] focus:ring-[#d6b977] transition-colors"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 border-gray-300 focus:border-[#d6b977] focus:ring-[#d6b977] transition-colors"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#d6b977] to-[#d6b977]/90 hover:from-[#d6b977]/90 hover:to-[#d6b977] text-black font-semibold border-2 border-[#d6b977] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
