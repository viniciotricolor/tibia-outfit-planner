export interface Item {
  name: string;
  amount: number;
  icon?: string;
}

export interface Addon {
  name: 'First' | 'Second';
  items: Item[];
  completed: boolean;
}

export interface Outfit {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'both';
  type: 'quest' | 'store' | 'event' | 'daily' | 'normal' | 'premium';
  city: string;
  npc: string;
  requirements: string[];
  baseImage: string;
  firstAddonImage: string;
  secondAddonImage: string;
  addons: Addon[];
  completed: boolean;
}

export interface PlayerInventory {
  [itemName: string]: number;
}

export interface Progress {
  outfitsCompleted: number;
  totalOutfits: number;
  itemsCollected: number;
  totalItemsNeeded: number;
}

export interface AppState {
  outfits: Outfit[];
  inventory: PlayerInventory;
  lastUpdated: string;
  favorites: string[];
  notificationsEnabled: boolean;
  cardMode: 'compact' | 'expanded';
}
