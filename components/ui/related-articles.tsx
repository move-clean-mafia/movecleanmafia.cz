import React from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { NewsItem } from '../../lib/admin-utils';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface RelatedArticlesProps {
  currentArticleId: string;
  locale: string;
  t: (key: string) => string;
}

const RelatedArticles = async ({
  currentArticleId,
  locale,
  t,
}: RelatedArticlesProps) => {
  // Fetch latest 4 articles (we'll exclude the current one)
  let articles: NewsItem[] = [];
  try {
    const newsQuery = query(
      collection(db, 'news'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(4),
    );
    const querySnapshot = await getDocs(newsQuery);
    articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as NewsItem[];
  } catch (error) {
    console.error('Error fetching related articles:', error);
  }

  // Filter out the current article and take only 3
  const relatedArticles = articles
    .filter((article) => article.id !== currentArticleId)
    .slice(0, 3);

  if (relatedArticles.length === 0) {
    return null;
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
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('news.relatedArticles')}
        </h2>
        <p className="text-lg text-brand-text max-w-2xl mx-auto">
          {t('news.relatedArticlesDescription')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {relatedArticles.map((article) => (
          <Card
            key={article.id}
            className="group border-brand-light/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-brand-primary/50 overflow-hidden h-full flex flex-col"
          >
            {/* Image */}
            {article.mainImage && (
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.mainImage}
                  alt={article.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}

            <CardHeader className="pb-4 flex-grow">
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

            <CardContent className="pt-0 flex-grow flex flex-col">
              <p className="text-brand-text mb-6 line-clamp-3 flex-grow">
                {article.perex}
              </p>

              <Link href={`/news/${article.id}`} className="mt-auto">
                <Button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  {t('news.readMore')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/news">
          <Button
            variant="outline"
            size="lg"
            className="border-brand-primary/30 text-brand-primary hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5"
          >
            {t('news.viewAllNews')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export { RelatedArticles };
