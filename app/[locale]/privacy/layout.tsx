import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy - MoveCleanMafia',
  description:
    'Learn about how MoveCleanMafia collects, uses, and protects your personal information',
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
