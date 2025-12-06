import { create } from 'zustand';
import { CharacterSelection } from '@/types';

/**
 * Store interface defining the state and actions
 */
interface CharacterStore extends CharacterSelection {
  setCharacterA: (id: string | null) => void;
  setCharacterB: (id: string | null) => void;
  reset: () => void;
}

/**
 * Zustand store for managing selected character IDs
 * Follows Single Responsibility Principle - only handles character selection state
 */
export const useCharacterStore = create<CharacterStore>((set) => ({
  // Initial state
  characterA: null,
  characterB: null,

  // Actions
  setCharacterA: (id) => set({ characterA: id }),
  setCharacterB: (id) => set({ characterB: id }),
  reset: () => set({ characterA: null, characterB: null }),
}));
