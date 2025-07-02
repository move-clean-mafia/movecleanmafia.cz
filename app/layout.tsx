import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pulmonologie.cz',
  description: 'Specialized pulmonological care',
};

// This layout is only used for the root redirect
// The actual content is handled by the [locale]/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
