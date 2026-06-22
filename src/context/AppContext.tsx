import { createContext, useContext } from 'react';
import type { Outfit, PlayerInventory } from '../types';
import type { MarketPrice, WorldInfo } from '../services/market';

export interface AppContextType {
  outfits: Outfit[];
  inventory: PlayerInventory;
  loading: boolean;
  selectedWorld: string;
  worlds: WorldInfo[];
  marketPrices: Record<string, MarketPrice>;
  setSelectedWorld: (world: string) => void;
  getOutfitById: (id: string) => Outfit | undefined;
  toggleOutfitCompleted: (outfitId: string) => void;
  toggleAddonCompleted: (outfitId: string, addonName: 'First' | 'Second') => void;
  updateInventoryItem: (itemName: string, amount: number) => void;
  removeInventoryItem: (itemName: string) => void;
  getRequiredItems: () => Record<string, number>;
  getInventoryStatus: () => Record<string, { needed: number; have: number; missing: number }>;
  getProgress: () => { outfitsCompleted: number; totalOutfits: number; percentage: number };
  refreshMarketPrices: () => Promise<void>;
  nextUpdate: Date;
  favorites: string[];
  toggleFavorite: (outfitId: string) => void;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  cardMode: 'compact' | 'expanded';
  toggleCardMode: () => void;
  exportProgress: () => string;
  importProgress: (json: string) => boolean;
  generateShareUrl: () => string;
  loadFromShareUrl: () => boolean;
  currentCharacter: string;
  characters: string[];
  switchCharacter: (name: string) => void;
  createCharacter: (name: string) => void;
  deleteCharacter: (name: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
