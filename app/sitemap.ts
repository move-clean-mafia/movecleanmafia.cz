import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://movecleanmafia.cz';
  const currentDate = new Date();

  // Base pages for each locale
  const locales = ['cs', 'en', 'ua'];
  const basePages = ['', 'services', 'contact', 'reservation'];

  const sitemap: MetadataRoute.Sitemap = [];

  // Add base pages for each locale
  locales.forEach((locale) => {
    basePages.forEach((page) => {
      const url =
        page === '' ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}/${page}`;
      const priority = page === '' ? 1.0 : page === 'services' ? 0.9 : 0.8;
      const changeFreq =
        page === '' ? 'daily' : page === 'services' ? 'weekly' : 'monthly';

      sitemap.push({
        url,
        lastModified: currentDate,
        changeFrequency: changeFreq as
          | 'always'
          | 'hourly'
          | 'daily'
          | 'weekly'
          | 'monthly'
          | 'yearly'
          | 'never',
        priority,
      });
    });

    // Add service detail pages
    const services = [
      'moving',
      'cleaning',
      'packing',
      'furniture-cleaning',
      'handyman',
      'packages',
    ];
    services.forEach((service) => {
      sitemap.push({
        url: `${baseUrl}/${locale}/service/${service}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // Add static pages
  const staticPages = [
    { path: '/cookie-policy', priority: 0.3, changeFreq: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFreq: 'monthly' as const },
    {
      path: '/terms-of-service',
      priority: 0.3,
      changeFreq: 'monthly' as const,
    },
  ];

  staticPages.forEach((page) => {
    sitemap.push({
      url: `${baseUrl}${page.path}`,
      lastModified: currentDate,
      changeFrequency: page.changeFreq,
      priority: page.priority,
    });
  });

  return sitemap;
}
