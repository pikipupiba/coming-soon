'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import { featureTransition } from '@/lib/animations';
import { useUIStore } from '@/store/uiStore';

const FeatureHighlights = () => {
  const currentFeatureIndex = useUIStore((state) => state.currentFeatureIndex);
  const nextFeature = useUIStore((state) => state.nextFeature);
  
  useEffect(() => {
    // Auto-cycle features every 5 seconds
    const interval = setInterval(() => {
      nextFeature();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextFeature]);
  
  const currentFeature = siteConfig.features[currentFeatureIndex];
  
  return (
    <section className="relative max-w-4xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center">
        {/* Indicators */}
        <div className="flex space-x-2 mb-8">
          {siteConfig.features.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentFeatureIndex === index 
                  ? 'bg-primary w-6' 
                  : 'bg-gray-300 dark:bg-gray-700'
              }`}
              aria-label={`View feature ${index + 1}`}
              onClick={() => useUIStore.getState().setFeatureIndex(index)}
            />
          ))}
        </div>
        
        {/* Feature Content */}
        <div className="w-full min-h-[200px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeatureIndex}
              variants={featureTransition}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-center"
            >
              <h3 className="text-2xl font-owners font-bold mb-4 text-black dark:text-white">
                {currentFeature.title}
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {currentFeature.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
