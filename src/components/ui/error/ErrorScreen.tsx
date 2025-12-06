'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ErrorScreenProps {
  title?: string;
  message?: string;
  errorCode?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export const ErrorScreen = ({
  title = 'Aw Jeez, Rick!',
  message = "Something went wrong in another dimension. We'll get it sorted out... probably.",
  errorCode = 'C-137',
  onRetry,
  retryLabel,
}: ErrorScreenProps) => {
  return (
    <div className="flex h-full min-h-0 items-center justify-center bg-background-dark p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex max-w-2xl flex-col items-center text-center"
      >
        {/* Error Image */}
        <motion.div
          animate={{
            rotate: [0, -5, 5, -5, 5, 0],
          }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="relative mb-8 h-64 w-64"
        >
          <Image src="/rick_error.png" alt="Rick Error" fill className="object-contain" priority />
        </motion.div>

        {/* Error Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-8xl font-bold text-primary-400">{errorCode}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 text-4xl font-bold text-white"
        >
          {title}
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 text-lg text-gray-400"
        >
          {message}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4"
        >
          {onRetry && (
            <button
              onClick={onRetry}
              className="rounded-lg border-2 border-secondary-500 bg-transparent px-6 py-3 font-semibold text-secondary-300 transition-all duration-200 hover:bg-secondary-500/10 hover:shadow-lg hover:shadow-secondary-500/30"
            >
              {retryLabel ?? 'Try Again'}
            </button>
          )}
        </motion.div>

        {/* Portal Animation Background Effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-portal blur-3xl"
          />
        </div>
      </motion.div>
    </div>
  );
};
