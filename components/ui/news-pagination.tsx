'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from './pagination';

interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
  translations: {
    previous: string;
    next: string;
  };
}

const NewsPagination = ({
  currentPage,
  totalPages,
  translations,
}: NewsPaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mb-16">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        translations={translations}
      />
    </div>
  );
};

export { NewsPagination };
