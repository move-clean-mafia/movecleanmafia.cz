import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Cookie Policy - MoveCleanMafia',
  description:
    'Learn about how MoveCleanMafia uses cookies and similar technologies on our website',
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
