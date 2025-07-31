import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Terms of Service - MoveCleanMafia',
  description:
    'Terms of Service and legal conditions for using MoveCleanMafia services',
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
