import React from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../../firebase';
import { ClientNewsItem } from '../../../lib/admin-utils';
import { CallToAction, NewsPagination, NewsList } from '@/components/ui';
import {
  generatePageMetadata,
  pageMetadata,
} from '../../../lib/metadata-utils';

interface NewsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const metadata = pageMetadata.news[locale as 'cs' | 'en'];

  return generatePageMetadata({
    ...metadata,
    url: `/${locale}/news`,
    locale,
  });
}

const NewsPage = async ({ params, searchParams }: NewsPageProps) => {
  const { locale } = await params;
  const { page } = await searchParams;
  const { t } = await getTranslation(locale as SupportedLanguage);

  // Pagination settings
  const ITEMS_PER_PAGE = 9;
  const currentPage = Math.max(1, parseInt(page || '1', 10));

  // Fetch published news from Firebase
  let allNews: ClientNewsItem[] = [];
  try {
    const newsQuery = query(
      collection(db, 'news'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc'),
    );
    const querySnapshot = await getDocs(newsQuery);
    allNews = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      // Convert Firebase Timestamps to ISO strings for client components
      const convertTimestamp = (timestamp: any) => {
        if (!timestamp) return null;
        if (timestamp.toDate && typeof timestamp.toDate === 'function') {
          return timestamp.toDate().toISOString();
        }
        if (timestamp instanceof Date) {
          return timestamp.toISOString();
        }
        if (typeof timestamp === 'string') {
          return timestamp;
        }
        return null;
      };

      return {
        id: doc.id,
        title: data.title || '',
        content: data.content || '',
        perex: data.perex || '',
        mainImage: data.mainImage || '',
        published: data.published || false,
        publishedAt: convertTimestamp(data.publishedAt),
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as ClientNewsItem;
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    // Return empty array to prevent further errors
    allNews = [];
  }

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(allNews.length / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const news = allNews.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-brand-light to-brand-primary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              {t('news.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {t('news.description')}
            </p>
            <div className="w-48 h-2 mx-auto rounded-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary"></div>
          </div>
        </div>

        {/* News List with Skeleton Loading */}
        <NewsList
          news={news}
          locale={locale}
          translations={{
            published: t('news.published'),
            readMore: t('news.readMore'),
            noArticles: t('news.noArticles'),
            noArticlesDescription: t('news.noArticlesDescription'),
          }}
        />

        {/* Pagination */}
        <NewsPagination
          currentPage={validCurrentPage}
          totalPages={totalPages}
          translations={{
            previous: t('news.pagination.previous'),
            next: t('news.pagination.next'),
          }}
        />

        <section className="relative">
          <CallToAction
            title={t('contact.haveQuestions')}
            description={t('contact.contactUsDescription')}
          />
        </section>
      </div>
    </div>
  );
};

export default NewsPage;
