'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumbs } from './breadcrumbs';

interface BreadcrumbsWrapperProps {
  className?: string;
}

export const BreadcrumbsWrapper: React.FC<BreadcrumbsWrapperProps> = ({
  className,
}) => {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'cs';

  // Don't show breadcrumbs on homepage
  if (pathname === `/${locale}` || pathname === `/${locale}/`) {
    return null;
  }

  return (
    <div className="bg-black border-b border-[#d6b977]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs className={className} />
      </div>
    </div>
  );
};
