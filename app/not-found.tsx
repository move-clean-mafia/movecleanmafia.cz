import React from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-oswald font-light text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 font-source-sans font-light mb-6">
            The page you're looking for doesn't exist.
          </p>
          <Link href="/">
            <Button className="bg-brand-primary hover:bg-brand-secondary font-source-sans font-medium">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
