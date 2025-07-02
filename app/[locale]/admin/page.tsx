'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { LanguageSwitcher } from '../../../components/languageSwitcher';

interface LoginFormData {
  email: string;
  password: string;
}

interface AdminPageProps {
  params: { locale: string };
}

const AdminPage: React.FC<AdminPageProps> = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = pathname.split('/')[1]; // Extract locale from pathname

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      if (userCredential.user) {
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      console.error('Login error:', error);

      // Handle specific Firebase Auth errors with translations
      switch (error.code) {
        case 'auth/user-not-found':
          setError(t('admin.errors.userNotFound'));
          break;
        case 'auth/wrong-password':
          setError(t('admin.errors.wrongPassword'));
          break;
        case 'auth/invalid-email':
          setError(t('admin.errors.invalidEmail'));
          break;
        case 'auth/too-many-requests':
          setError(t('admin.errors.tooManyRequests'));
          break;
        default:
          setError(t('admin.errors.genericError'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      setFormData({ email: '', password: '' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {t('admin.title')}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-6">
                {t('admin.welcomeMessage')}
              </p>

              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <p className="text-sm text-green-800">
                    {t('admin.loggedInAs')}: {auth.currentUser?.email}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  {t('admin.logout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-6">
          <a
            href={`/${locale}`}
            className="text-blue-600 hover:text-blue-700 text-sm underline"
          >
            ← {t('navigation.home')}
          </a>
        </div>

        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {t('admin.loginTitle')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('admin.loginSubtitle')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {t('admin.email')}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  placeholder="admin@example.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                {t('admin.password')}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t('admin.loggingIn')}
                  </>
                ) : (
                  t('admin.login')
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
