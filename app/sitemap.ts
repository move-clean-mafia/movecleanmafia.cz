import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://movecleanmafia.cz';
  const currentDate = new Date();

  // Define all routes for all languages with detailed metadata
  const routes: Array<{
    route: string;
    priority: number;
    changeFrequency: 'weekly' | 'monthly' | 'yearly';
  }> = [
    // Czech routes
    { route: '/cs', priority: 1.0, changeFrequency: 'weekly' },
    { route: '/cs/services', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/cs/service/moving', priority: 0.8, changeFrequency: 'monthly' },
    {
      route: '/cs/service/cleaning',
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      route: '/cs/service/furniture-cleaning',
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      route: '/cs/service/handyman',
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      route: '/cs/service/packages',
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    { route: '/cs/contact', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/cs/reservation', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/cs/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { route: '/cs/terms-of-service', priority: 0.3, changeFrequency: 'yearly' },
    { route: '/cs/cookie-policy', priority: 0.3, changeFrequency: 'yearly' },

    // English routes
    { route: '/en', priority: 1.0, changeFrequency: 'weekly' },
    { route: '/en/services', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/en/service/moving', priority: 0.8, changeFrequency: 'monthly' },
    {
      route: '/en/service/cleaning',
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      route: '/en/service/furniture-cleaning',
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      route: '/en/service/handyman',
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      route: '/en/service/packages',
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    { route: '/en/contact', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/en/reservation', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/en/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { route: '/en/terms-of-service', priority: 0.3, changeFrequency: 'yearly' },
    { route: '/en/cookie-policy', priority: 0.3, changeFrequency: 'yearly' },

    // Ukrainian routes
    { route: '/ua', priority: 1.0, changeFrequency: 'weekly' },
    { route: '/ua/services', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/ua/service/moving', priority: 0.8, changeFrequency: 'monthly' },
    {
      route: '/ua/service/cleaning',
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      route: '/ua/service/furniture-cleaning',
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      route: '/ua/service/handyman',
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      route: '/ua/service/packages',
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    { route: '/ua/contact', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/ua/reservation', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/ua/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { route: '/ua/terms-of-service', priority: 0.3, changeFrequency: 'yearly' },
    { route: '/ua/cookie-policy', priority: 0.3, changeFrequency: 'yearly' },
  ];

  // Generate sitemap entries with enhanced metadata
  const sitemapEntries = routes.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency,
    priority,
  }));

  return sitemapEntries;
}
