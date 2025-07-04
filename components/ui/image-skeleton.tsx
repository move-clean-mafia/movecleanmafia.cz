import React from 'react';

interface ImageSkeletonProps {
  className?: string;
  height?: string;
}

const ImageSkeleton = ({
  className = '',
  height = 'h-48',
}: ImageSkeletonProps) => {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 ${height} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
    </div>
  );
};

export { ImageSkeleton };
