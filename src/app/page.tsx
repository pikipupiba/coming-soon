import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import HeroContent from '@/components/landing/HeroContent';
import FeatureHighlights from '@/components/landing/FeatureHighlights';
import ContactForm from '@/components/landing/ContactForm';
import Footer from '@/components/layouts/Footer';
import ThemeToggle from '@/components/ui/ThemeToggle';

// Export metadata for SEO
export const metadata: Metadata = {
  title: {
    default: `${siteConfig.company.name} - Coming Soon`,
    template: `%s | ${siteConfig.company.name}`,
  },
  description: "Stay tuned for our cutting-edge event production platform launching soon.",
  openGraph: {
    title: siteConfig.company.name,
    description: siteConfig.company.tagline,
    url: `https://${siteConfig.company.domain}`,
    siteName: siteConfig.company.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.company.name,
    description: siteConfig.company.tagline,
  },
};

export default function Home() {
  return (
    <main className="flex flex-col h-full">
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 z-40">
        <ThemeToggle />
      </div>

      {/* Centering Container */}
      <div className="flex flex-col flex-grow justify-center">
        {/* Main Content */}
        <div className="flex flex-col items-center">
          <HeroContent />
          <FeatureHighlights />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Contact Form (conditionally rendered via state) */}
      <ContactForm />
    </main>
  );
}
