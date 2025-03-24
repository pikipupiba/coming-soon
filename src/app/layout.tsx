import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: siteConfig.company.name,
    template: `%s | ${siteConfig.company.name}`,
  },
  description: "We're creating a cutting-edge event production platform. Stay tuned for our launch!",
  keywords: ["event production", "event management", "production platform", "audio", "video", "lighting"],
  authors: [{ name: siteConfig.company.name }],
  metadataBase: new URL(`https://${siteConfig.company.domain}`),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `https://${siteConfig.company.domain}`,
    title: siteConfig.company.name,
    description: siteConfig.company.tagline,
    siteName: siteConfig.company.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.company.name,
    description: siteConfig.company.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
