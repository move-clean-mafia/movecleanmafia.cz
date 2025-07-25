import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://movecleanmafia.cz';
  const currentDate = new Date();

  // Define all routes for all languages
  const routes = [
    // Czech routes
    { route: '/cs', priority: 1.0 },
    { route: '/cs/about', priority: 0.8 },
    { route: '/cs/services', priority: 0.9 },
    { route: '/cs/contact', priority: 0.8 },

    // English routes
    { route: '/en', priority: 1.0 },
    { route: '/en/about', priority: 0.8 },
    { route: '/en/services', priority: 0.9 },
    { route: '/en/contact', priority: 0.8 },

    // Ukrainian routes
    { route: '/ua', priority: 1.0 },
    { route: '/ua/about', priority: 0.8 },
    { route: '/ua/services', priority: 0.9 },
    { route: '/ua/contact', priority: 0.8 },
  ];

  // Generate sitemap entries
  const sitemapEntries = routes.map(({ route, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority,
  }));

  return sitemapEntries;
}
