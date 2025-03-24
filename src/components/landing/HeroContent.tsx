'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import { fadeIn, fadeInWithDelay } from '@/lib/animations';
import Button from '@/components/ui/Button';
import { useUIStore } from '@/store/uiStore';

const HeroContent = () => {
  const toggleContactForm = useUIStore((state) => state.toggleContactForm);
  
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] px-4 py-20 overflow-hidden text-center">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-primary blur-2xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>
      
      {/* Logo */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <div className="relative w-80 h-24 md:w-96 md:h-32 mb-2">
          <Image
            src="/brand-images/big-logo-color-text-black.png"
            alt={siteConfig.company.name}
            fill
            priority
            className="object-contain dark:hidden"
          />
          <Image
            src="/brand-images/big-logo-color-text-white.png"
            alt={siteConfig.company.name}
            fill
            priority
            className="object-contain hidden dark:block"
          />
        </div>
      </motion.div>
      
      {/* Tagline */}
      <motion.h1
        variants={fadeInWithDelay(0.2)}
        initial="hidden"
        animate="visible"
        className="text-3xl md:text-4xl lg:text-5xl font-owners font-bold mb-6 max-w-2xl"
      >
        {siteConfig.company.tagline}
      </motion.h1>
      
      {/* Description */}
      <motion.p
        variants={fadeInWithDelay(0.4)}
        initial="hidden"
        animate="visible"
        className="text-lg md:text-xl max-w-2xl mb-10 text-gray-700 dark:text-gray-300"
      >
        We're working on something special. Stay tuned for our cutting-edge event production platform launching soon.
      </motion.p>
      
      {/* CTA Button */}
      <motion.div
        variants={fadeInWithDelay(0.6)}
        initial="hidden"
        animate="visible"
      >
        <Button 
          variant="primary" 
          size="lg"
          onClick={() => toggleContactForm(true)}
        >
          Get Notified When We Launch
        </Button>
      </motion.div>
    </section>
  );
};

export default HeroContent;
