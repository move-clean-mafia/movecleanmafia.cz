import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Clock, Eye } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  perex: string;
  mainImage: string;
  publishedAt: string;
  formattedDate: string;
}

interface HomepageRecentNewsProps {
  locale: string;
  news: NewsArticle[];
  title: string;
  subtitle: string;
  readMoreText: string;
  viewAllNewsText: string;
  publishedText: string;
  noNewsText: string;
  noNewsDescription: string;
}

const HomepageRecentNews: React.FC<HomepageRecentNewsProps> = ({
  locale,
  news,
  title,
  subtitle,
  readMoreText,
  viewAllNewsText,
  publishedText,
  noNewsText,
  noNewsDescription,
}) => {
  if (news.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-brand-light/5 to-brand-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
              {title}
            </h2>
            <p className="text-xl text-brand-text max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
              <Calendar className="w-16 h-16 text-brand-primary/30 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {noNewsText}
              </h3>
              <p className="text-brand-text">{noNewsDescription}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-brand-light/5 to-brand-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            {title}
          </h2>
          <p className="text-xl text-brand-text max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 group"
            >
              {/* Article Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.mainImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-brand-primary" />
                  <span className="text-sm font-medium text-gray-900">
                    {article.formattedDate}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-primary transition-colors duration-300">
                  {article.title}
                </h3>

                <p className="text-brand-text mb-4 line-clamp-3 leading-relaxed">
                  {article.perex}
                </p>

                {/* Article Meta */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{publishedText}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-brand-primary">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                {/* Read More Link */}
                <Link
                  href={`/${locale}/news/${article.id}`}
                  className="inline-flex items-center text-brand-primary hover:text-brand-secondary font-semibold transition-colors group-hover:text-brand-secondary"
                >
                  {readMoreText}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All News Button */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-full hover:from-brand-secondary hover:to-brand-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {viewAllNewsText}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export { HomepageRecentNews };
