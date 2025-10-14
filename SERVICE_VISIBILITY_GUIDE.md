# Service Visibility Configuration Guide

## Overview

This guide explains how to easily show/hide services on the MoveCleanMafia website using the centralized service configuration system.

## Quick Start

To show or hide a service, edit the file: `lib/service-config.ts`

### Currently Visible Services

- ✅ **Moving** (Stěhování) - `visible: true`
- ✅ **Furniture Cleaning** (Chemické čištění) - `visible: true`

### Currently Hidden Services

- ❌ **Cleaning** (Úklid) - `visible: false`
- ❌ **Handyman** (Hodinový manžel) - `visible: false`
- ❌ **Packages** (Výhodné balíčky) - `visible: false`

## How to Change Service Visibility

1. Open the file: `lib/service-config.ts`

2. Find the `SERVICE_CONFIG` object:

```typescript
export const SERVICE_CONFIG: Record<ServiceSlug, ServiceConfig> = {
  moving: { visible: true },
  cleaning: { visible: false },
  'furniture-cleaning': { visible: true },
  handyman: { visible: false },
  packages: { visible: false },
};
```

3. Change `visible: false` to `visible: true` to show a service, or vice versa to hide it.

4. Save the file and rebuild/restart your application.

## Examples

### To Show Cleaning Service Again

```typescript
cleaning: { visible: true },  // Changed from false to true
```

### To Hide Moving Service

```typescript
moving: { visible: false },  // Changed from true to false
```

### To Show All Services

```typescript
export const SERVICE_CONFIG: Record<ServiceSlug, ServiceConfig> = {
  moving: { visible: true },
  cleaning: { visible: true },
  'furniture-cleaning': { visible: true },
  handyman: { visible: true },
  packages: { visible: true },
};
```

## What Changes When You Hide a Service?

When a service is hidden, it will be automatically removed from:

1. **Homepage** - Service cards in the compact services grid
2. **Services Page** - Service cards and detailed pricing sections
3. **Service Detail Pages** - Hidden service pages return 404 error
4. **Sitemap** - Hidden services won't appear in sitemap.xml
5. **Reservation Form** - Hidden services won't appear in the dropdown
6. **Header Navigation** - Hidden services removed from dropdown menu (desktop & mobile)
7. **Footer** - Hidden services removed from "Our Services" section
8. **Related Services** - Hidden services won't appear in related services sections

## Service Mapping

The system maps service titles (which vary by language) to service slugs:

| Czech Title      | Ukrainian Title  | English Title      | Service Slug         |
| ---------------- | ---------------- | ------------------ | -------------------- |
| Stěhování        | Перевезення      | Moving             | `moving`             |
| Úklid            | Прибирання       | Cleaning           | `cleaning`           |
| Chemické čištění | Хімчистка меблів | Furniture Cleaning | `furniture-cleaning` |
| Hodinový manžel  | Муж на годину    | Handyman           | `handyman`           |
| Výhodné balíčky  | Вигідні пакети   | Packages           | `packages`           |

## Technical Details

### Files Modified

1. **lib/service-config.ts** - Main configuration file (NEW)
2. **app/[locale]/page.tsx** - Homepage filtering
3. **app/[locale]/services/page.tsx** - Services page filtering
4. **app/[locale]/service/[slug]/page.tsx** - Detail page 404 handling
5. **app/sitemap.ts** - Sitemap generation filtering
6. **components/reservation-form.tsx** - Form dropdown filtering
7. **components/header.tsx** - Header navigation filtering (desktop & mobile)
8. **components/footer.tsx** - Footer service links filtering
9. **components/related-services.tsx** - Related services filtering

### Helper Functions

The system provides two helper functions:

1. `isServiceVisible(slug: string): boolean` - Check if a service is visible
2. `getVisibleServiceSlugs(): ServiceSlug[]` - Get all visible service slugs

### Implementation Approach

Service objects in the codebase now include a `slug` property that directly maps to the service configuration. This ensures accurate filtering regardless of language or translation variations.

```typescript
const services = [
  {
    slug: 'moving',
    title: t('services.moving'),
    // ... other properties
  },
  // ... more services
];

// Filter visible services
const visibleServices = services.filter((service) =>
  isServiceVisible(service.slug),
);
```

### Admin Panel Consideration

The admin panel still shows all services for managing existing bookings, even if they are hidden from the public website. This is intentional to ensure administrators can manage historical data.

## Troubleshooting

### Service Still Showing After Hiding

- Make sure you saved the `lib/service-config.ts` file
- Restart your development server or rebuild the application
- Clear your browser cache

### 404 Errors on Service Pages

- This is expected behavior for hidden services
- Check that the service is marked as `visible: true` if it should be accessible

### Service Not in Dropdown

- Verify the service is marked as `visible: true` in the configuration
- The "Other" option is always visible regardless of configuration

## Need Help?

If you need to modify the service configuration system itself (add new services, change behavior, etc.), contact your development team.
