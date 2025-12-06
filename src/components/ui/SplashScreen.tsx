'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  // We should prefetch data here
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Trigger exit animation after 2.2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.5,
          }}
          transition={{
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for smooth transition
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-500"
        >
          {/* Portal Image with zoom animation */}
          <motion.div
            initial={{ scale: 1, rotate: 0 }}
            animate={{
              scale: [1, 1.2, 1.15, 12],
              rotate: [0, 5, -5, 0],
              opacity: [1, 1, 1, 0],
            }}
            transition={{
              duration: 2.8,
              times: [0, 0.25, 0.5, 1],
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            className="relative h-64 w-64"
          >
            <Image src="/portal.webp" alt="Portal" fill className="object-contain" priority />
          </motion.div>

          {/* Glow effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{
              scale: [0, 2, 3, 12],
              opacity: [0.5, 0.7, 0.8, 0],
            }}
            transition={{
              duration: 2.8,
              ease: 'easeOut',
            }}
            className="absolute h-64 w-64 rounded-full bg-primary-400 blur-3xl"
          />

          {/* Portal rings animation */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [0.5, 2.5, 5],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 1.8,
                delay: i * 0.25,
                repeat: 1,
                ease: 'easeOut',
              }}
              className="absolute h-96 w-96 rounded-full border-4 border-primary-400"
              style={{
                boxShadow: '0 0 40px rgba(92, 173, 74, 0.5)',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
