import React from 'react';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../../firebase';
import { NewsItem } from '../../../lib/admin-utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { CallToAction } from '@/components/ui';

interface NewsPageProps {
  params: Promise<{ locale: string }>;
}

const NewsPage = async ({ params }: NewsPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  // Fetch published news from Firebase
  let news: NewsItem[] = [];
  try {
    const newsQuery = query(
      collection(db, 'news'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc'),
    );
    const querySnapshot = await getDocs(newsQuery);
    news = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as NewsItem[];
  } catch (error) {
    console.error('Error fetching news:', error);
  }

  const formatDate = (date: any) => {
    if (!date) return '';
    const dateObj = date?.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-brand-light to-brand-primary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {t('news.title')}
              </h1>
              <p className="text-lg text-brand-text">{t('news.subtitle')}</p>
            </div>
          </div>
          <div className="w-32 h-1 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto"></div>
        </div>

        {/* News Grid */}
        {news.length === 0 ? (
          <div className="text-center py-16 mb-32">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('news.noArticles')}
            </h3>
            <p className="text-brand-text max-w-md mx-auto">
              {t('news.noArticlesDescription')}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-32">
            {news.map((article) => (
              <Card
                key={article.id}
                className="group border-brand-light/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-brand-primary/50 overflow-hidden"
              >
                {/* Image */}
                {article.mainImage && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.mainImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant="outline"
                      className="border-brand-primary/30 text-brand-primary"
                    >
                      {t('news.published')}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-brand-text">
                      <Clock className="w-3 h-3" />
                      {formatDate(article.publishedAt)}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-brand-text mb-6 line-clamp-3">
                    {article.perex}
                  </p>

                  <Link href={`/news/${article.id}`}>
                    <Button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                      {t('news.readMore')}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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
