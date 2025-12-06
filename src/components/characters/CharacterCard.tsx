'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CharacterCardProps } from '@/types';
import { cn } from '@/lib/utils';

/**
 * Character card component with selection state
 * Follows Single Responsibility Principle - only handles character display and selection
 */
export const CharacterCard = ({ character, isSelected, onSelect }: CharacterCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    // Card click will toggle selection via parent handler
    onSelect(character.id);
  };

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const statusColor = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  };
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300',
        isSelected
          ? 'border-primary-400 bg-primary-900/20 shadow-lg shadow-primary-500/50'
          : 'border-gray-700 bg-gray-800/50 hover:border-secondary-400 hover:shadow-md hover:shadow-secondary-500/30'
      )}
      onClick={handleClick}
    >
      <div className="flex gap-3 p-3">
        {/* Character image */}
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-700">
          {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-gray-700" />}
          <Image
            src={character.image}
            alt={character.name}
            fill
            className={cn(
              'object-cover transition-all duration-300 group-hover:scale-110',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            sizes="80px"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Character info */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-base font-semibold text-white">{character.name}</h3>
            {isSelected && (
              <motion.div
                className="flex-shrink-0 rounded-full bg-primary-400 px-2 py-0.5 text-xs font-bold text-black"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              >
                ✓ Selected
              </motion.div>
            )}
          </div>

          <div className="mt-1 flex items-center gap-2">
            <div className={cn('h-2 w-2 rounded-full', statusColor[character.status])} />
            <span className="text-xs text-gray-400">
              {capitalize(character.status)} - {capitalize(character.species)}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-1 text-xs text-secondary-300">
            <span className="font-medium">{character.episode.length}</span>
            <span className="text-gray-500">episodes</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
