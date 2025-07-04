'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { NewsSkeleton } from './news-skeleton';
import { NewsImage } from './news-image';
import { formatDate, ClientNewsItem } from '@/lib/admin-utils';

interface NewsListProps {
  news: ClientNewsItem[];
  locale: string;
  translations: {
    published: string;
    readMore: string;
    noArticles: string;
    noArticlesDescription: string;
  };
}

const NewsList = ({ news, locale, translations }: NewsListProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Validate props
  if (!news || !Array.isArray(news)) {
    console.error('NewsList: Invalid news prop provided');
    return (
      <div className="text-center py-16 mb-32">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Error loading news
        </h3>
        <p className="text-brand-text max-w-md mx-auto">
          There was an error loading the news articles. Please try again later.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <NewsSkeleton />;
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-16 mb-32">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          {translations.noArticles}
        </h3>
        <p className="text-brand-text max-w-md mx-auto">
          {translations.noArticlesDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-32">
      {news.map((article) => (
        <Card
          key={article.id}
          className="group border-brand-light/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-brand-primary/50 overflow-hidden"
        >
          {/* Image with loading skeleton */}
          {article.mainImage && (
            <NewsImage src={article.mainImage} alt={article.title} />
          )}

          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Badge
                variant="outline"
                className="border-brand-primary/30 text-brand-primary"
              >
                {translations.published}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-brand-text">
                <Clock className="w-3 h-3" />
                {article.publishedAt
                  ? formatDate(article.publishedAt, 'PPP', locale)
                  : 'N/A'}
              </div>
            </div>
            <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2">
              {article.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-brand-text mb-6 line-clamp-3">{article.perex}</p>

            <Link href={`/news/${article.id}`}>
              <Button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                {translations.readMore}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { NewsList };
