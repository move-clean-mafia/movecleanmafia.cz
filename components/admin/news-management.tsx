'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
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

  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsFormData, setNewsFormData] = useState({
    title: '',
    summary: '',
    content: '',
    published: false,
  });

  const handleNewsFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (editingNews) {
        // Update existing news
        await updateDoc(doc(db, 'news', editingNews.id), {
          title: newsFormData.title,
          summary: newsFormData.summary,
          content: newsFormData.content,
          published: newsFormData.published,
          updatedAt: serverTimestamp(),
        });
      } else {
        // Add new news
        await addDoc(collection(db, 'news'), {
          title: newsFormData.title,
          summary: newsFormData.summary,
          content: newsFormData.content,
          published: newsFormData.published,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      setIsNewsModalOpen(false);
      setEditingNews(null);
      setNewsFormData({
        title: '',
        summary: '',
        content: '',
        published: false,
      });
      onNewsUpdate();
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const handleEditNews = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setNewsFormData({
      title: newsItem.title,
      summary: newsItem.summary,
      content: newsItem.content,
      published: newsItem.published,
    });
    setIsNewsModalOpen(true);
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

  const openNewsModal = () => {
    setEditingNews(null);
    setNewsFormData({ title: '', summary: '', content: '', published: false });
    setIsNewsModalOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{t('admin.news.title')}</CardTitle>
            <Button onClick={openNewsModal}>
              {t('admin.news.addNewArticle')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">{t('admin.news.loading')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {news.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {t('admin.news.noArticlesFound')}
                </div>
              ) : (
                news.map((newsItem) => (
                  <Card key={newsItem.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">
                              {newsItem.title}
                            </h3>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                newsItem.published
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {newsItem.published
                                ? t('admin.news.published')
                                : t('admin.news.draft')}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">
                            {newsItem.summary}
                          </p>
                          <div className="text-sm text-gray-500">
                            {t('admin.news.created')}:{' '}
                            {formatDate(newsItem.createdAt)}
                            {newsItem.updatedAt && (
                              <span className="ml-4">
                                {t('admin.news.updated')}:{' '}
                                {formatDate(newsItem.updatedAt)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditNews(newsItem)}
                          >
                            {t('admin.news.edit')}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteNews(newsItem.id)}
                          >
                            {t('admin.news.delete')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* News Modal */}
      <Dialog open={isNewsModalOpen} onOpenChange={setIsNewsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingNews
                ? t('admin.news.editArticle')
                : t('admin.news.createArticle')}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleNewsFormSubmit} className="space-y-4">
            <div>
              <Label htmlFor="news-title">{t('admin.news.form.title')}</Label>
              <Input
                id="news-title"
                value={newsFormData.title}
                onChange={(e) =>
                  setNewsFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="news-summary">
                {t('admin.news.form.summary')}
              </Label>
              <Textarea
                id="news-summary"
                value={newsFormData.summary}
                onChange={(e) =>
                  setNewsFormData((prev) => ({
                    ...prev,
                    summary: e.target.value,
                  }))
                }
                rows={2}
                required
              />
            </div>
            <div>
              <Label htmlFor="news-content">
                {t('admin.news.form.content')}
              </Label>
              <Textarea
                id="news-content"
                value={newsFormData.content}
                onChange={(e) =>
                  setNewsFormData((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                rows={8}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="news-published"
                checked={newsFormData.published}
                onChange={(e) =>
                  setNewsFormData((prev) => ({
                    ...prev,
                    published: e.target.checked,
                  }))
                }
              />
              <Label htmlFor="news-published">
                {t('admin.news.form.published')}
              </Label>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsNewsModalOpen(false)}
              >
                {t('admin.news.form.cancel')}
              </Button>
              <Button type="submit">
                {editingNews
                  ? t('admin.news.form.update')
                  : t('admin.news.form.create')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewsManagement;
