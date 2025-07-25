'use client';

import React from 'react';
import { Button } from '../components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-oswald font-light text-gray-900 mb-4">
            Something went wrong!
          </h1>
          <p className="text-gray-600 font-source-sans font-light mb-6">
            {error.message || 'An unexpected error occurred'}
          </p>
          <Button
            onClick={reset}
            className="bg-brand-primary hover:bg-brand-secondary font-source-sans font-medium"
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
