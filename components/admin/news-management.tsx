'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react';
import { NewsItem, formatDate } from '../../lib/admin-utils';

interface NewsManagementProps {
  news: NewsItem[];
  onNewsUpdate: () => void;
  isLoading: boolean;
}

const NewsManagement: React.FC<NewsManagementProps> = ({
  news,
  onNewsUpdate,
  isLoading,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  // Table state
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sorting state
  const [sortField, setSortField] = useState<keyof NewsItem | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [paginatedNews, setPaginatedNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [
    news,
    statusFilter,
    searchQuery,
    sortField,
    sortDirection,
    currentPage,
    itemsPerPage,
  ]);

  const applyFiltersAndSort = () => {
    let filtered = [...news];

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((newsItem) => {
        if (statusFilter === 'published') {
          return newsItem.published;
        } else if (statusFilter === 'draft') {
          return !newsItem.published;
        }
        return true;
      });
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (newsItem) =>
          newsItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          newsItem.perex.toLowerCase().includes(searchQuery.toLowerCase()) ||
          newsItem.content.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply sorting
    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        // Handle date sorting
        if (sortField === 'createdAt' || sortField === 'updatedAt') {
          aValue = aValue?.toDate ? aValue.toDate() : new Date(aValue);
          bValue = bValue?.toDate ? bValue.toDate() : new Date(bValue);
        }

        // Handle boolean sorting (published)
        if (sortField === 'published') {
          aValue = aValue ? 1 : 0;
          bValue = bValue ? 1 : 0;
        }

        // Convert to string for comparison if needed
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredNews(filtered);

    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = filtered.slice(startIndex, endIndex);
    setPaginatedNews(paginated);
  };

  const handleEditNews = (newsItem: NewsItem) => {
    router.push(`/admin/news/edit/${newsItem.id}`);
  };

  const handleCreateNews = () => {
    router.push('/admin/news/create');
  };

  const handleDeleteNews = async (newsId: string) => {
    if (confirm(t('admin.news.deleteConfirm'))) {
      try {
        await deleteDoc(doc(db, 'news', newsId));
        onNewsUpdate();
      } catch (error) {
        console.error('Error deleting news:', error);
      }
    }
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSort = (field: keyof NewsItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const getSortIcon = (field: keyof NewsItem) => {
    if (sortField !== field) return <ChevronsUpDown className="w-4 h-4" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const getStatusBadge = (published: boolean) => {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          published
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {published ? t('admin.news.published') : t('admin.news.draft')}
      </span>
    );
  };

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredNews.length);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-brand-primary">
            {t('admin.news.title')}
          </CardTitle>
          <Button
            onClick={handleCreateNews}
            className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('admin.news.addNewArticle')}
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex-1">
            <Label htmlFor="search">{t('admin.news.search')}</Label>
            <Input
              id="search"
              type="text"
              placeholder={t('admin.news.searchPlaceholder')}
              value={searchQuery}
              onChange={handleSearchChange}
              className="border-brand-light/50 focus:border-brand-primary"
            />
          </div>
          <div className="sm:w-48">
            <Label htmlFor="status-filter">
              {t('admin.news.filterByStatus')}
            </Label>
            <Select
              value={statusFilter}
              onValueChange={handleStatusFilterChange}
            >
              <SelectTrigger className="border-brand-light/50 focus:border-brand-primary">
                <SelectValue placeholder={t('admin.news.allStatuses')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t('admin.news.allStatuses')}
                </SelectItem>
                <SelectItem value="published">
                  {t('admin.news.published')}
                </SelectItem>
                <SelectItem value="draft">{t('admin.news.draft')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:w-auto flex flex-col">
            <Label className="text-sm font-medium text-gray-700 mb-1">
              &nbsp;
            </Label>
            <Button
              onClick={onNewsUpdate}
              disabled={isLoading}
              className="h-10 border-brand-light hover:bg-brand-light/20"
              variant="outline"
            >
              {isLoading ? t('admin.news.loading') : t('admin.news.refresh')}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto"></div>
            <p className="mt-2 text-brand-text">{t('admin.news.loading')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-brand-light/30">
                  <th
                    className="text-left p-2 font-medium text-brand-primary cursor-pointer hover:bg-brand-light/10"
                    onClick={() => handleSort('title')}
                  >
                    <div className="flex items-center gap-1">
                      {t('admin.news.form.title')}
                      {getSortIcon('title')}
                    </div>
                  </th>

                  <th
                    className="text-left p-2 font-medium text-brand-primary cursor-pointer hover:bg-brand-light/10"
                    onClick={() => handleSort('published')}
                  >
                    <div className="flex items-center gap-1">
                      {t('admin.news.status')}
                      {getSortIcon('published')}
                    </div>
                  </th>
                  <th
                    className="text-left p-2 font-medium text-brand-primary cursor-pointer hover:bg-brand-light/10"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center gap-1">
                      {t('admin.news.created')}
                      {getSortIcon('createdAt')}
                    </div>
                  </th>
                  <th
                    className="text-left p-2 font-medium text-brand-primary cursor-pointer hover:bg-brand-light/10"
                    onClick={() => handleSort('updatedAt')}
                  >
                    <div className="flex items-center gap-1">
                      {t('admin.news.updated')}
                      {getSortIcon('updatedAt')}
                    </div>
                  </th>
                  <th className="text-left p-2 font-medium text-brand-primary">
                    {t('admin.news.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedNews.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-8 text-brand-text"
                    >
                      {filteredNews.length === 0
                        ? t('admin.news.noArticlesFound')
                        : t('admin.news.noResultsOnPage')}
                    </td>
                  </tr>
                ) : (
                  paginatedNews.map((newsItem) => (
                    <tr
                      key={newsItem.id}
                      className="border-b border-brand-light/20 hover:bg-brand-light/5"
                    >
                      <td className="p-2">
                        <div className="font-medium text-gray-900">
                          {newsItem.title}
                        </div>
                      </td>

                      <td className="p-2">
                        {getStatusBadge(newsItem.published)}
                      </td>
                      <td className="p-2 text-sm text-brand-text">
                        {formatDate(newsItem.createdAt)}
                      </td>
                      <td className="p-2 text-sm text-brand-text">
                        {newsItem.updatedAt
                          ? formatDate(newsItem.updatedAt)
                          : '-'}
                      </td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditNews(newsItem)}
                            className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            {t('admin.news.edit')}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteNews(newsItem.id)}
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            {t('admin.news.delete')}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredNews.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-brand-light/30">
            {/* Items per page selector */}
            <div className="flex items-center gap-2">
              <Label
                htmlFor="items-per-page"
                className="text-sm text-brand-text"
              >
                {t('admin.news.pagination.itemsPerPage')}:
              </Label>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) =>
                  handleItemsPerPageChange(parseInt(value))
                }
              >
                <SelectTrigger className="w-20 border-brand-light/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results info */}
            <div className="text-sm text-brand-text">
              {t('admin.news.pagination.showing')} {startItem}{' '}
              {t('admin.news.pagination.to')} {endItem}{' '}
              {t('admin.news.pagination.of')} {filteredNews.length}{' '}
              {t('admin.news.pagination.results')}
            </div>

            {/* Page navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-brand-light hover:bg-brand-light/20"
              >
                {t('admin.news.pagination.previous')}
              </Button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      className={`w-8 h-8 p-0 ${
                        currentPage === pageNum
                          ? 'bg-brand-primary text-white'
                          : 'border-brand-light hover:bg-brand-light/20'
                      }`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-brand-light hover:bg-brand-light/20"
              >
                {t('admin.news.pagination.next')}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsManagement;
