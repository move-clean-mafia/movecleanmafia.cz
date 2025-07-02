This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🎯 Optimal Image Specifications

### For Professional Medical Website

| **Image Type**       | **Aspect Ratio** | **Resolution**         | **Format** | **File Size** |
| -------------------- | ---------------- | ---------------------- | ---------- | ------------- |
| **Doctor Portraits** | 4:5 (Portrait)   | 1200×1500px            | WebP/JPEG  | < 500KB       |
| **Staff Cards**      | 4:3 (Landscape)  | 1200×900px             | WebP/JPEG  | < 300KB       |
| **Mobile Optimized** | Same ratios      | 800×1000px / 800×600px | WebP       | < 200KB       |

### 👨‍⚕️ Doctor Photos (Hero Layout)

```
Current: aspect-[4/5] (4:5 ratio)
Recommended Resolution: 800x1000px or 1200x1500px
Aspect Ratio: 4:5 (0.8) - Portrait orientation
File Size: < 500KB optimized
```

### 👩‍⚕️ Staff Photos (Cards - Nurses/Admin)

```
Current: aspect-[4/3] (4:3 ratio)
Recommended Resolution: 800x600px or 1200x900px
Aspect Ratio: 4:3 (1.33) - Landscape orientation
File Size: < 300KB optimized
```

### 📱 Responsive Behavior

```tsx
// Current sizes configuration for Next.js Image:
sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw';
// Mobile: Full width
// Tablet: Half width
// Desktop: 40% width
```

### 📂 Recommended File Structure

```
/public/images/team/
  ├── doctors/
  │   ├── jurij-didyk.webp (1200x1500)
  │   └── ala-stelmashok.webp (1200x1500)
  ├── nurses/
  │   ├── vitalia-didyk.webp (1200x900)
  │   ├── vaclava-halasz.webp (1200x900)
  │   └── marcela-zvoneckova.webp (1200x900)
  └── administration/
      ├── drahomira-pruzincova.webp (1200x900)
      ├── nikol-hurtova.webp (1200x900)
      └── kristyna-hahnova.webp (1200x900)
```

### 🔧 Technical Benefits

- **Next.js Image** automatically optimizes and serves WebP when supported
- **Lazy loading** by default (except `priority` images)
- **Responsive images** with proper `srcset` generation
- **Better Core Web Vitals** scores
- **Automatic image optimization** and caching

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
