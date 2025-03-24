import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import './globals.css';
import { Providers } from './providers';

// Next.js Metadata API - still works alongside React 19 document metadata
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
    <html lang="en" suppressHydrationWarning className="h-full">
      {/* React 19: Document metadata in components */}
      <title>{siteConfig.company.name}</title>
      <meta name="description" content="We're creating a cutting-edge event production platform. Stay tuned for our launch!" />
      <meta property="og:image" content={`https://${siteConfig.company.domain}/og-image.jpg`} />
      
      {/* React 19: Stylesheet loading with precedence */}
      <link 
        rel="stylesheet" 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
        precedence="high"
      />
      
      <body className="h-full bg-white text-black dark:bg-black dark:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
