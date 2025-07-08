import { Metadata } from 'next';

interface PageMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  url: string;
  locale: string;
  image?: string;
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  url,
  locale,
  image,
}: PageMetadataOptions): Metadata {
  const isCzech = locale === 'cs';
  const baseUrl = 'https://pulmonology.cz';
  const fullUrl = `${baseUrl}${url}`;

  // Default keywords for medical/pulmonology context
  const defaultKeywords = isCzech
    ? ['plicní lékařství', 'respirační zdraví', 'pulmonolog', 'Česká republika']
    : ['pulmonology', 'respiratory health', 'pulmonologist', 'Czech Republic'];

  const allKeywords = [...defaultKeywords, ...keywords];

  // Default Open Graph image
  const defaultImage = image || '/pulmonology-logo.png';

  return {
    title: {
      template: isCzech ? '%s | Pulmonologie.cz' : '%s | Pulmonology.cz',
      default: title,
    },
    description,
    keywords: allKeywords,
    authors: [{ name: isCzech ? 'Pulmonologie.cz' : 'Pulmonology.cz' }],
    creator: isCzech ? 'Pulmonologie.cz' : 'Pulmonology.cz',
    publisher: isCzech ? 'Pulmonologie.cz' : 'Pulmonology.cz',
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    openGraph: {
      type: 'website',
      locale: isCzech ? 'cs_CZ' : 'en_US',
      url: fullUrl,
      title,
      description,
      siteName: isCzech ? 'Pulmonologie.cz' : 'Pulmonology.cz',
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [defaultImage],
    },
    verification: {
      google: 'tAjavF9M2DplYyPZUChDkwHhQKU7ewlYPJdAGG62nUY',
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        cs: `${baseUrl}/cs${url.replace(/^\/[a-z]{2}/, '')}`,
        en: `${baseUrl}/en${url.replace(/^\/[a-z]{2}/, '')}`,
      },
    },
  };
}

// Predefined metadata for common pages
export const pageMetadata = {
  home: {
    cs: {
      title: 'Pulmonologie.cz - Profesionální plicní péče',
      description:
        'Specializovaná plicní péče a respirační zdravotní služby v České republice. Moderní diagnostika a léčba plicních onemocnění.',
      keywords: [
        'plicní lékařství',
        'diagnostika',
        'léčba',
        'respirační onemocnění',
      ],
    },
    en: {
      title: 'Pulmonology.cz - Professional Pulmonological Care',
      description:
        'Specialized pulmonological care and respiratory health services in Czech Republic. Modern diagnostics and treatment of lung diseases.',
      keywords: [
        'pulmonology',
        'diagnostics',
        'treatment',
        'respiratory diseases',
      ],
    },
  },
  services: {
    cs: {
      title: 'Naše služby - Plicní diagnostika a léčba',
      description:
        'Kompletní spektrum plicních vyšetření a diagnostických metod. Spirometrie, bodypletysmografie, oscilometrie a další specializované testy.',
      keywords: [
        'spirometrie',
        'bodypletysmografie',
        'oscillometrie',
        'plicní testy',
      ],
    },
    en: {
      title: 'Our Services - Pulmonary Diagnostics and Treatment',
      description:
        'Complete spectrum of pulmonary examinations and diagnostic methods. Spirometry, body plethysmography, oscillometry and other specialized tests.',
      keywords: [
        'spirometry',
        'body plethysmography',
        'oscillometry',
        'pulmonary tests',
      ],
    },
  },
  clinic: {
    cs: {
      title: 'Naše klinika - Moderní plicní centrum',
      description:
        'Moderní plicní klinika s nejnovějším vybavením a zkušenými specialisty. Poskytujeme komplexní plicní péči v příjemném prostředí.',
      keywords: [
        'plicní klinika',
        'moderní vybavení',
        'specialisté',
        'komplexní péče',
      ],
    },
    en: {
      title: 'Our Clinic - Modern Pulmonary Center',
      description:
        'Modern pulmonary clinic with the latest equipment and experienced specialists. We provide comprehensive pulmonary care in a pleasant environment.',
      keywords: [
        'pulmonary clinic',
        'modern equipment',
        'specialists',
        'comprehensive care',
      ],
    },
  },
  team: {
    cs: {
      title: 'Náš tým - Zkušení plicní specialisté',
      description:
        'Seznamte se s našimi zkušenými plicními specialisty a zdravotnickým personálem. Profesionální tým s dlouholetými zkušenostmi.',
      keywords: [
        'plicní specialisté',
        'lékaři',
        'zdravotnický personál',
        'zkušenosti',
      ],
    },
    en: {
      title: 'Our Team - Experienced Pulmonary Specialists',
      description:
        'Meet our experienced pulmonary specialists and medical staff. Professional team with years of experience.',
      keywords: [
        'pulmonary specialists',
        'doctors',
        'medical staff',
        'experience',
      ],
    },
  },
  news: {
    cs: {
      title: 'Aktuality - Novinky z plicního lékařství',
      description:
        'Nejnovější novinky a informace z oblasti plicního lékařství. Články o diagnostice, léčbě a prevenci respiračních onemocnění.',
      keywords: [
        'novinky',
        'plicní lékařství',
        'diagnostika',
        'léčba',
        'prevence',
      ],
    },
    en: {
      title: 'News - Latest Updates in Pulmonology',
      description:
        'Latest news and information from the field of pulmonology. Articles about diagnostics, treatment and prevention of respiratory diseases.',
      keywords: [
        'news',
        'pulmonology',
        'diagnostics',
        'treatment',
        'prevention',
      ],
    },
  },
  contact: {
    cs: {
      title: 'Kontakt - Spojte se s námi',
      description:
        'Kontaktujte naši plicní kliniku. Informace o ordinačních hodinách, adrese a způsobech objednání termínu.',
      keywords: ['kontakt', 'ordinace', 'objednání', 'adresa', 'telefon'],
    },
    en: {
      title: 'Contact - Get in Touch',
      description:
        'Contact our pulmonary clinic. Information about office hours, address and ways to book an appointment.',
      keywords: ['contact', 'office', 'appointment', 'address', 'phone'],
    },
  },
  reservation: {
    cs: {
      title: 'Objednání - Rezervujte si termín',
      description:
        'Rezervujte si termín u našeho plicního specialisty. Jednoduché online objednání s možností výběru termínu.',
      keywords: ['objednání', 'rezervace', 'termín', 'online', 'specialista'],
    },
    en: {
      title: 'Book Appointment - Schedule Your Visit',
      description:
        'Book an appointment with our pulmonary specialist. Simple online booking with the option to choose a time slot.',
      keywords: ['appointment', 'booking', 'schedule', 'online', 'specialist'],
    },
  },
  photogallery: {
    cs: {
      title: 'Fotogalerie - Naše klinika a vybavení',
      description:
        'Prohlédněte si fotografie naší kliniky, moderního vybavení a příjemného prostředí, kde poskytujeme plicní péči.',
      keywords: [
        'fotogalerie',
        'klinika',
        'vybavení',
        'prostředí',
        'fotografie',
      ],
    },
    en: {
      title: 'Photo Gallery - Our Clinic and Equipment',
      description:
        'Browse photos of our clinic, modern equipment and pleasant environment where we provide pulmonary care.',
      keywords: [
        'photo gallery',
        'clinic',
        'equipment',
        'environment',
        'photos',
      ],
    },
  },
  privacy: {
    cs: {
      title: 'Ochrana osobních údajů - GDPR',
      description:
        'Informace o zpracování osobních údajů v souladu s GDPR. Seznamte se s našimi zásadami ochrany soukromí.',
      keywords: ['GDPR', 'osobní údaje', 'ochrana', 'soukromí', 'zpracování'],
    },
    en: {
      title: 'Privacy Policy - GDPR',
      description:
        'Information about personal data processing in accordance with GDPR. Learn about our privacy protection policies.',
      keywords: [
        'GDPR',
        'personal data',
        'protection',
        'privacy',
        'processing',
      ],
    },
  },
  cookiePolicy: {
    cs: {
      title: 'Zásady cookies - Informace o cookies',
      description:
        'Informace o tom, jak používáme cookies a podobné technologie na našem webu. Seznamte se s našimi zásadami cookies.',
      keywords: ['cookies', 'zásady', 'technologie', 'sledování', 'preference'],
    },
    en: {
      title: 'Cookie Policy - Information about Cookies',
      description:
        'Information about how we use cookies and similar technologies on our website. Learn about our cookie policies.',
      keywords: ['cookies', 'policy', 'technology', 'tracking', 'preferences'],
    },
  },
};
