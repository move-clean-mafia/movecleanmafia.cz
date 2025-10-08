import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'MoveCleanMafia.cz - Profesionální stěhování a úklid v Praze',
  description:
    'Profesionální služby stěhování a úklidu v Praze. Rychlé, spolehlivé a kvalitní služby pro domácnosti i firmy. Bezplatná konzultace a cenová nabídka.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://movecleanmafia.cz',
    languages: {
      cs: 'https://movecleanmafia.cz/cs',
      en: 'https://movecleanmafia.cz/en',
      uk: 'https://movecleanmafia.cz/ua',
    },
  },
};

export default function RootPage() {
  // This page will be redirected by middleware
  // But we need it for SEO purposes
  redirect('/en');
}
