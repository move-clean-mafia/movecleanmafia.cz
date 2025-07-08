import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pulmonology.cz';
  const currentDate = new Date();

  // Define all routes for both languages
  const routes = [
    // Czech routes
    { route: '/cs', priority: 1.0 },
    { route: '/cs/clinic', priority: 0.9 },
    { route: '/cs/services', priority: 0.9 },
    { route: '/cs/our-team', priority: 0.8 },
    { route: '/cs/news', priority: 0.8 },
    { route: '/cs/contact', priority: 0.8 },
    { route: '/cs/reservation', priority: 0.9 },
    { route: '/cs/photogallery', priority: 0.7 },
    { route: '/cs/privacy', priority: 0.5 },

    // English routes
    { route: '/en', priority: 1.0 },
    { route: '/en/clinic', priority: 0.9 },
    { route: '/en/services', priority: 0.9 },
    { route: '/en/our-team', priority: 0.8 },
    { route: '/en/news', priority: 0.8 },
    { route: '/en/contact', priority: 0.8 },
    { route: '/en/reservation', priority: 0.9 },
    { route: '/en/photogallery', priority: 0.7 },
    { route: '/en/privacy', priority: 0.5 },
  ];

  // Generate sitemap entries
  const sitemapEntries = routes.map(({ route, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority,
  }));

  // Add service-specific pages
  const services = [
    'spirometrie',
    'bodypletysmografie',
    'oscillometrie',
    'dechovy-co-analyzator',
    'analyzator-feno',
    'vysereni-plicni-difuze',
    'polygraf-s-indikatorem-stavu-spanku',
    'rucni-pulzni-oxymetr',
  ];

  services.forEach((service) => {
    // Czech service pages
    sitemapEntries.push({
      url: `${baseUrl}/cs/services/${service}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    });

    // English service pages
    sitemapEntries.push({
      url: `${baseUrl}/en/services/${service}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    });
  });

  // TODO: Add dynamic news articles when you have a database
  // Example for future implementation:
  /*
	const newsArticles = await getNewsArticles(); // Your database query
	newsArticles.forEach((article) => {
		sitemapEntries.push({
			url: `${baseUrl}/cs/news/${article.slug}`,
			lastModified: article.updatedAt,
			changeFrequency: 'monthly' as const,
			priority: 0.7,
		});
		sitemapEntries.push({
			url: `${baseUrl}/en/news/${article.slug}`,
			lastModified: article.updatedAt,
			changeFrequency: 'monthly' as const,
			priority: 0.7,
		});
	});
	*/

  return sitemapEntries;
}
