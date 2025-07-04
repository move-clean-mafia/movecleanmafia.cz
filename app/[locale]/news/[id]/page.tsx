import React from 'react';
import { getTranslation } from '../../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../../lib/i18n';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { NewsItem } from '../../../../lib/admin-utils';
import { Card, CardContent } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import ShareButton from '../../../../components/ui/share-button';
import { CallToAction } from '@/components/ui';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface NewsDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

const NewsDetailPage = async ({ params }: NewsDetailPageProps) => {
  const { locale, id } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  // Fetch news article from Firebase
  let article: NewsItem | null = null;
  try {
    const newsDoc = await getDoc(doc(db, 'news', id));
    if (newsDoc.exists()) {
      article = { id: newsDoc.id, ...newsDoc.data() } as NewsItem;

      // Check if article is published
      if (!article.published) {
        notFound();
      }
    } else {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching news article:', error);
    notFound();
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

  const formatTime = (date: any) => {
    if (!date) return '';
    const dateObj = date?.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-brand-light to-brand-primary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/news">
            <Button
              variant="outline"
              className="border-brand-light/50 text-brand-text hover:border-brand-primary hover:text-brand-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('news.backToNews')}
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <Card className="border-brand-light/30 shadow-lg overflow-hidden mb-8">
          {article.mainImage && (
            <div className="relative h-64 md:h-80 overflow-hidden">
              <Image
                src={article.mainImage}
                alt={article.title}
                fill
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          )}

          <CardContent className="p-8">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge
                variant="outline"
                className="border-brand-primary/30 text-brand-primary"
              >
                {t('news.published')}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-brand-text">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedAt)}
              </div>
              <div className="flex items-center gap-1 text-sm text-brand-text">
                <Clock className="w-4 h-4" />
                {formatTime(article.publishedAt)}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Perex */}
            <p className="text-lg text-brand-text mb-6 leading-relaxed">
              {article.perex}
            </p>

            {/* Article Content (no Card) */}
            <div className="prose-custom px-8 py-8">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {article.content}
              </ReactMarkdown>
            </div>

            {/* Share Button at the end */}
            <div className="px-8 pb-8">
              <ShareButton
                title={article.title}
                text={article.perex}
                url={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/news/${article.id}`}
                className="border-brand-light/50 text-brand-text hover:border-brand-primary hover:text-brand-primary"
              />
            </div>
          </CardContent>
        </Card>

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

export default NewsDetailPage;
