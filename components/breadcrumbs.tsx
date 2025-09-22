'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  isLast?: boolean;
}

interface BreadcrumbsProps {
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'cs';

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Always start with home
    breadcrumbs.push({
      label: t('navigation.home'),
      href: `/${locale}`,
    });

    // Build breadcrumbs from path segments
    let currentPath = `/${locale}`;

    for (let i = 1; i < segments.length; i++) {
      const segment = segments[i];
      currentPath += `/${segment}`;

      let label = '';

      // Map segments to translated labels
      switch (segment) {
        case 'services':
          label = t('navigation.services');
          break;
        case 'contact':
          label = t('navigation.contact');
          break;
        case 'reservation':
          label = t('navigation.reservation');
          break;
        case 'service':
          // Add "Services" breadcrumb first
          breadcrumbs.push({
            label: t('navigation.services'),
            href: `/${locale}/services`,
            isLast: false,
          });

          // For service detail pages, we need the next segment
          if (i + 1 < segments.length) {
            const serviceSlug = segments[i + 1];
            switch (serviceSlug) {
              case 'moving':
                label = t('services.moving');
                break;
              case 'cleaning':
                label = t('services.cleaning');
                break;
              case 'furniture-cleaning':
                label = t('services.furnitureCleaning');
                break;
              case 'handyman':
                label = t('services.handyman');
                break;
              case 'packages':
                label = t('services.packages');
                break;
              default:
                label = t('services.service');
            }
            // Skip the next segment since we processed it
            i++;
            currentPath += `/${segments[i]}`;
          } else {
            label = t('services.service');
          }
          break;
        case 'privacy':
          label = t('footer.privacyPolicy');
          break;
        case 'terms-of-service':
          label = t('footer.termsOfService');
          break;
        case 'cookie-policy':
          label = t('footer.cookiePolicy');
          break;
        default:
          // Capitalize first letter for unknown segments
          label = segment.charAt(0).toUpperCase() + segment.slice(1);
      }

      breadcrumbs.push({
        label,
        href: currentPath,
        isLast: i === segments.length - 1,
      });
    }

    // Mark the last item
    if (breadcrumbs.length > 0) {
      breadcrumbs[breadcrumbs.length - 1].isLast = true;
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav
      className={`flex items-center space-x-2 text-sm font-body ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-[#d6b977]/60 mx-2" />
            )}
            {item.isLast ? (
              <span className="text-[#d6b977] font-medium flex items-center">
                {index === 0 && <Home className="w-4 h-4 mr-1" />}
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-white/80 hover:text-[#d6b977] transition-colors duration-200 flex items-center"
              >
                {index === 0 && <Home className="w-4 h-4 mr-1" />}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
