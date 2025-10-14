/**
 * Service Visibility Configuration
 *
 * This file controls which services are visible across the website.
 * To show/hide a service, simply change the `visible` property to true/false.
 *
 * Changes here will affect:
 * - Homepage service grid
 * - Services page
 * - Service detail pages (hidden services return 404)
 * - Sitemap generation
 * - Reservation form options
 */

export type ServiceSlug =
  | 'moving'
  | 'cleaning'
  | 'furniture-cleaning'
  | 'handyman'
  | 'packages';

export interface ServiceConfig {
  visible: boolean;
}

export const SERVICE_CONFIG: Record<ServiceSlug, ServiceConfig> = {
  moving: { visible: true },
  cleaning: { visible: false },
  'furniture-cleaning': { visible: true },
  handyman: { visible: false },
  packages: { visible: false },
};

/**
 * Check if a service is visible
 * @param serviceSlug - The service slug to check
 * @returns true if the service is visible, false otherwise
 */
export const isServiceVisible = (serviceSlug: string): boolean => {
  const config = SERVICE_CONFIG[serviceSlug as ServiceSlug];
  return config?.visible ?? false;
};

/**
 * Get all visible service slugs
 * @returns Array of visible service slugs
 */
export const getVisibleServiceSlugs = (): ServiceSlug[] => {
  return (Object.keys(SERVICE_CONFIG) as ServiceSlug[]).filter((slug) =>
    isServiceVisible(slug),
  );
};
