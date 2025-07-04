import React from 'react';

const NewsSkeleton = () => {
  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-32">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="group border-brand-light/30 shadow-lg overflow-hidden rounded-lg bg-white"
          >
            {/* Image skeleton */}
            <div className="relative h-48 overflow-hidden bg-gray-200 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
            </div>

            {/* Header skeleton */}
            <div className="p-6 pb-4">
              {/* Badge and date skeleton */}
              <div className="flex items-center gap-2 mb-3">
                <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded-full"></div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded-full"></div>
                  <div className="h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded"></div>
                </div>
              </div>

              {/* Title skeleton */}
              <div className="space-y-2 mb-4">
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded"></div>
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded w-3/4"></div>
              </div>
            </div>

            {/* Content skeleton */}
            <div className="px-6 pt-0 pb-6">
              {/* Description skeleton */}
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded w-2/3"></div>
              </div>

              {/* Button skeleton */}
              <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center mb-16">
        <div className="flex items-center gap-2">
          <div className="h-9 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded"></div>
          <div className="flex items-center gap-1">
            <div className="h-9 w-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded"></div>
            <div className="h-9 w-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded"></div>
            <div className="h-9 w-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded"></div>
            <div className="h-9 w-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded"></div>
            <div className="h-9 w-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded"></div>
          </div>
          <div className="h-9 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded"></div>
        </div>
      </div>
    </>
  );
};

export { NewsSkeleton };
