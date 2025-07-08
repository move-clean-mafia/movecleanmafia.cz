import React from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../../lib/i18n';
import { generatePageMetadata } from '../../../../lib/metadata-utils';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { NewsItem, formatDate, formatTime } from '../../../../lib/admin-utils';
import { Card, CardContent } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import ShareButton from '../../../../components/ui/share-button';
import {
  CallToAction,
  RelatedArticles,
  NewsDetailImage,
} from '@/components/ui';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface NewsDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { locale, id } = await params;

  try {
    // Fetch article data
    const docRef = doc(db, 'news', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return {
        title: 'Article Not Found',
      };
    }

    const article = docSnap.data();
    const title = article.title || 'News Article';
    const description =
      article.perex ||
      article.content?.substring(0, 160) ||
      'Latest news from our pulmonology clinic.';
    const keywords = [
      'news',
      'pulmonology',
      'respiratory health',
      locale === 'cs' ? 'novinky' : 'latest updates',
    ];

    return generatePageMetadata({
      title,
      description,
      keywords,
      url: `/${locale}/news/${id}`,
      locale,
      image: article.mainImage || '/pulmonology-logo.png',
    });
  } catch {
    return {
      title: 'News Article',
    };
  }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-brand-light to-brand-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-brand-secondary to-brand-primary rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/news">
            <Button
              variant="outline"
              className="border-brand-light/50 text-brand-text hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('news.backToNews')}
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <Card className="border-brand-light/30 shadow-xl overflow-hidden mb-12 bg-white/80 backdrop-blur-sm">
          {article.mainImage && (
            <NewsDetailImage src={article.mainImage} alt={article.title} />
          )}

          <CardContent className="p-8 md:p-12">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Badge
                variant="outline"
                className="border-brand-primary/30 text-brand-primary bg-brand-primary/5"
              >
                {t('news.published')}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-brand-text">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedAt, 'PPP', locale)}
              </div>
              <div className="flex items-center gap-1 text-sm text-brand-text">
                <Clock className="w-4 h-4" />
                {formatTime(article.publishedAt, locale)}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {article.title}
            </h1>

            {/* Perex */}
            <p className="text-lg md:text-xl text-brand-text mb-8 leading-relaxed font-medium">
              {article.perex}
            </p>

            {/* Article Content */}
            <div className="prose-custom prose-lg max-w-none text-gray-800 leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {article.content}
              </ReactMarkdown>
            </div>

            {/* Share Button */}
            <div className="mt-12 pt-8 border-t border-brand-light/30">
              <ShareButton
                title={article.title}
                text={article.perex}
                url={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/news/${article.id}`}
                className="border-brand-light/50 text-brand-text hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5"
              />
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <RelatedArticles currentArticleId={article.id} locale={locale} t={t} />

        <section className="relative mt-20">
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
