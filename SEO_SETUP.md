# SEO Setup Documentation

## Current Status: No Indexing Enabled

Your website is currently configured to **NOT** be indexed by search engines. This is perfect for development or when you want to keep the site private.

## Files Created

### 1. `public/robots.txt`

- **Current**: Disallows all crawling (`Disallow: /`)
- **Sitemap**: Commented out until ready for indexing

### 2. `app/sitemap.ts`

- **Generated**: XML sitemap with all routes for both languages
- **Accessible**: At `/sitemap.xml` when deployed
- **Dynamic**: Includes all service pages and main routes

### 3. Enhanced Metadata

- **Favicons**: Complete icon set for all platforms
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter sharing optimization
- **Language Alternates**: Proper hreflang for Czech/English

### 4. Page-Specific Metadata ✅ **NEW**

- **`lib/metadata-utils.ts`**: Centralized metadata generation utility
- **All pages**: Now have language-specific metadata
- **Dynamic content**: News articles and service pages have dynamic metadata
- **Consistent structure**: All pages follow the same metadata pattern

## Page Metadata Implementation

### **Main Pages with Metadata:**

✅ **Homepage** (`/cs`, `/en`)
✅ **Services** (`/cs/services`, `/en/services`)
✅ **Clinic** (`/cs/clinic`, `/en/clinic`)
✅ **Our Team** (`/cs/our-team`, `/en/our-team`)
✅ **News** (`/cs/news`, `/en/news`)
✅ **Contact** (`/cs/contact`, `/en/contact`)
✅ **Reservation** (`/cs/reservation`, `/en/reservation`)
✅ **Photo Gallery** (`/cs/photogallery`, `/en/photogallery`)
✅ **Privacy Policy** (`/cs/privacy`, `/en/privacy`)

### **Dynamic Pages with Metadata:**

✅ **Service Details** (`/cs/services/[service]`, `/en/services/[service]`)
✅ **News Articles** (`/cs/news/[id]`, `/en/news/[id]`)

### **Metadata Features:**

- **Language-specific titles and descriptions**
- **Proper keywords for each page type**
- **Open Graph images for social sharing**
- **Canonical URLs for each language version**
- **Language alternates (hreflang)**
- **Dynamic content from translations**

## How to Enable Indexing

When you're ready to allow search engines to index your site:

### 1. Update `public/robots.txt`

```txt
User-agent: *
Allow: /

Sitemap: https://pulmonology.cz/sitemap.xml
```

### 2. Update Metadata in Layout Files

In both `app/layout.tsx` and `app/[locale]/layout.tsx`, change:

```typescript
robots: {
  index: true,  // Change from false to true
  follow: true, // Change from false to true
  googleBot: {
    index: true,  // Change from false to true
    follow: true, // Change from false to true
  },
},
```

### 3. Update `lib/metadata-utils.ts`

Change the robots settings in the `generatePageMetadata` function:

```typescript
robots: {
  index: true,  // Change from false to true
  follow: true, // Change from false to true
  googleBot: {
    index: true,  // Change from false to true
    follow: true, // Change from false to true
  },
},
```

### 4. Add Google Search Console Verification

Replace `'your-google-verification-code'` in both layout files with your actual verification code from Google Search Console.

### 5. Add Dynamic Content (Optional)

If you have a database with news articles, uncomment and implement the dynamic news section in `app/sitemap.ts`.

## Sitemap Structure

The sitemap includes:

### Main Pages (Priority 1.0-0.5)

- Homepage (1.0)
- Clinic, Services, Reservation (0.9)
- Team, News, Contact (0.8)
- Photo Gallery (0.7)
- Privacy Policy (0.5)

### Service Pages (Priority 0.8)

- Spirometry
- Body Plethysmography
- Oscillometry
- CO Analyzer
- FENO Analyzer
- Lung Diffusion
- Sleep Polygraph
- Pulse Oximeter

### Language Versions

- Czech (`/cs/*`)
- English (`/en/*`)

## Testing

### Sitemap

- Visit: `https://yourdomain.com/sitemap.xml`
- Should show XML with all your routes

### Robots.txt

- Visit: `https://yourdomain.com/robots.txt`
- Should show current crawling rules

### Favicons

- Check browser tab for favicon
- Test on mobile devices for app icons
- Verify PWA manifest functionality

### Page Metadata

- Use browser dev tools to inspect `<head>` section
- Check for proper title, description, and Open Graph tags
- Verify language alternates are present

## SEO Best Practices Implemented

✅ **Technical SEO**

- XML Sitemap
- Robots.txt
- Proper meta tags
- Language alternates (hreflang)
- Canonical URLs

✅ **Page-Specific SEO**

- Unique titles and descriptions for each page
- Language-specific keywords
- Dynamic metadata for content pages
- Proper Open Graph images

✅ **Social Media**

- Open Graph tags
- Twitter Cards
- Proper image sizes
- Page-specific social sharing

✅ **Performance**

- Optimized favicon sizes
- Web app manifest
- Theme colors

✅ **Accessibility**

- Proper language attributes
- Semantic HTML structure
- Alt text for images (when added)

## Metadata Structure

### **Static Pages:**

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params;
  const metadata = pageMetadata.pageName[locale as 'cs' | 'en'];

  return generatePageMetadata({
    ...metadata,
    url: `/${locale}/page-name`,
    locale,
  });
}
```

### **Dynamic Pages:**

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale, id } = await params;

  // Fetch dynamic data
  const data = await fetchData(id);

  return generatePageMetadata({
    title: data.title,
    description: data.description,
    keywords: [...],
    url: `/${locale}/page/${id}`,
    locale,
    image: data.image,
  });
}
```

## Next Steps

1. **Content**: Review and customize page descriptions in `lib/metadata-utils.ts`
2. **Images**: Add Open Graph images for social sharing
3. **Analytics**: Set up Google Analytics
4. **Monitoring**: Set up Google Search Console
5. **Performance**: Monitor Core Web Vitals
6. **Local SEO**: Add structured data for medical practice
