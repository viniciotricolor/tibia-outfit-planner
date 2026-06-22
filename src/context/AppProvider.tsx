import { useEffect, useState, useCallback, useMemo, type ReactNode } from 'react';
import type { Outfit, PlayerInventory, AppState } from '../types';
import { sampleOutfits } from '../data/outfits';
import { AppContext, type AppContextType } from './AppContext';
import { fetchMarketPrices, getWorlds, clearMarketCache, savePriceSnapshot, type MarketPrice, type WorldInfo } from '../services/market';

const CHARACTERS_KEY = 'tibiaOutfitCharacters';
const CURRENT_CHAR_KEY = 'tibiaOutfitCurrentChar';

function getCharacters(): string[] {
  try {
    return JSON.parse(localStorage.getItem(CHARACTERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function getCurrentCharacter(): string {
  return localStorage.getItem(CURRENT_CHAR_KEY) || '';
}

function loadCharacterState(charName: string): AppState {
  try {
    const saved = localStorage.getItem(`tibiaOutfitPlanner_${charName}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        outfits: parsed.outfits || sampleOutfits,
        inventory: parsed.inventory || {},
        lastUpdated: parsed.lastUpdated || new Date().toISOString(),
        favorites: parsed.favorites || [],
        notificationsEnabled: parsed.notificationsEnabled || false,
        cardMode: parsed.cardMode || 'compact',
      };
    }
  } catch {
    // ignore
  }
  return {
    outfits: sampleOutfits,
    inventory: {},
    lastUpdated: new Date().toISOString(),
    favorites: [],
    notificationsEnabled: false,
    cardMode: 'compact',
  };
}

function saveCharacterState(charName: string, state: AppState): void {
  localStorage.setItem(`tibiaOutfitPlanner_${charName}`, JSON.stringify(state));
}

function loadInitialState(): AppState {
  const chars = getCharacters();
  const current = getCurrentCharacter();
  if (current && chars.includes(current)) {
    return loadCharacterState(current);
  }
  // Legacy: migrate from old single-key format
  try {
    const saved = localStorage.getItem('tibiaOutfitPlanner');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        outfits: parsed.outfits || sampleOutfits,
        inventory: parsed.inventory || {},
        lastUpdated: parsed.lastUpdated || new Date().toISOString(),
        favorites: parsed.favorites || [],
        notificationsEnabled: parsed.notificationsEnabled || false,
        cardMode: parsed.cardMode || 'compact',
      };
    }
  } catch {
    // ignore
  }
  return {
    outfits: sampleOutfits,
    inventory: {},
    lastUpdated: new Date().toISOString(),
    favorites: [],
    notificationsEnabled: false,
    cardMode: 'compact',
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const initialState = useMemo(() => loadInitialState(), []);
  const [outfits, setOutfits] = useState<Outfit[]>(initialState.outfits);
  const [inventory, setInventory] = useState<PlayerInventory>(initialState.inventory);
  const [loading, setLoading] = useState(true);
  const [selectedWorld, setSelectedWorldState] = useState<string>(() => {
    return localStorage.getItem('tibiaOutfitWorld') || 'Yubra';
  });
  const [worlds, setWorlds] = useState<WorldInfo[]>([]);
  const [marketPrices, setMarketPrices] = useState<Record<string, MarketPrice>>({});
  const [favorites, setFavorites] = useState<string[]>(initialState.favorites);
  const [notificationsEnabled, setNotificationsEnabled] = useState(initialState.notificationsEnabled);
  const [cardMode, setCardMode] = useState<'compact' | 'expanded'>(initialState.cardMode);
  const [currentCharacter, setCurrentCharacter] = useState<string>(() => getCurrentCharacter() || 'Principal');
  const [characters, setCharacters] = useState<string[]>(() => {
    const chars = getCharacters();
    if (chars.length === 0) return ['Principal'];
    return chars;
  });

  function getNext21(): Date {
    const now = new Date();
    const next = new Date(now);
    next.setHours(21, 0, 0, 0);
    if (now >= next) next.setDate(next.getDate() + 1);
    return next;
  }

  const [nextUpdate, setNextUpdate] = useState<Date>(getNext21);

  useEffect(() => {
    getWorlds().then(setWorlds);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchMarketPrices(selectedWorld)
      .then(prices => {
        setMarketPrices(prices);
        savePriceSnapshot(prices);
      })
      .catch(err => {
        console.warn('Failed to fetch prices:', err);
      })
      .finally(() => {
        setLoading(false);
      });
    localStorage.setItem('tibiaOutfitWorld', selectedWorld);
  }, [selectedWorld]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 21 && now.getMinutes() === 0) {
        clearMarketCache();
        setLoading(true);
        fetchMarketPrices(selectedWorld)
          .then(prices => {
            setMarketPrices(prices);
            savePriceSnapshot(prices);
            if (notificationsEnabled && Notification.permission === 'granted') {
              new Notification('Tibia Outfit Planner', {
                body: 'Preços do market atualizados!',
                icon: '/favicon.ico',
              });
            }
          })
          .catch(() => {})
          .finally(() => {
            setLoading(false);
          });
        setNextUpdate(getNext21());
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [selectedWorld, notificationsEnabled]);

  useEffect(() => {
    const data: AppState = {
      outfits,
      inventory,
      lastUpdated: new Date().toISOString(),
      favorites,
      notificationsEnabled,
      cardMode,
    };
    saveCharacterState(currentCharacter, data);
  }, [outfits, inventory, favorites, notificationsEnabled, cardMode, currentCharacter]);

  const setSelectedWorld = useCallback((world: string) => {
    setSelectedWorldState(world);
    setMarketPrices({});
    setLoading(true);
  }, []);

  const getOutfitById = useCallback((id: string) => outfits.find(o => o.id === id), [outfits]);

  const toggleOutfitCompleted = useCallback((outfitId: string) => {
    setOutfits(prev =>
      prev.map(o =>
        o.id === outfitId ? { ...o, completed: !o.completed } : o
      )
    );
  }, []);

  const toggleAddonCompleted = useCallback((outfitId: string, addonName: 'First' | 'Second') => {
    setOutfits(prev =>
      prev.map(o =>
        o.id === outfitId
          ? {
              ...o,
              addons: o.addons.map(a =>
                a.name === addonName ? { ...a, completed: !a.completed } : a
              ),
            }
          : o
      )
    );
  }, []);

  const updateInventoryItem = useCallback((itemName: string, amount: number) => {
    setInventory(prev => ({
      ...prev,
      [itemName]: amount,
    }));
  }, []);

  const removeInventoryItem = useCallback((itemName: string) => {
    setInventory(prev => {
      const newInventory = { ...prev };
      delete newInventory[itemName];
      return newInventory;
    });
  }, []);

  const getRequiredItems = useCallback((): Record<string, number> => {
    const required: Record<string, number> = {};
    outfits.filter(o => !o.completed).forEach(outfit => {
      outfit.addons.filter(a => !a.completed).forEach(addon => {
        addon.items.forEach(item => {
          required[item.name] = (required[item.name] || 0) + item.amount;
        });
      });
    });
    return required;
  }, [outfits]);

  const getInventoryStatus = useCallback((): Record<string, { needed: number; have: number; missing: number }> => {
    const required = getRequiredItems();
    const status: Record<string, { needed: number; have: number; missing: number }> = {};

    Object.entries(required).forEach(([itemName, needed]) => {
      const have = inventory[itemName] || 0;
      status[itemName] = {
        needed,
        have,
        missing: Math.max(0, needed - have),
      };
    });

    return status;
  }, [getRequiredItems, inventory]);

  const getProgress = useCallback(() => {
    const totalOutfits = outfits.length;
    const outfitsCompleted = outfits.filter(o => o.completed).length;
    return {
      outfitsCompleted,
      totalOutfits,
      percentage: totalOutfits > 0 ? Math.round((outfitsCompleted / totalOutfits) * 100) : 0,
    };
  }, [outfits]);

  const refreshMarketPrices = useCallback(async () => {
    setLoading(true);
    try {
      clearMarketCache();
      const prices = await fetchMarketPrices(selectedWorld);
      setMarketPrices(prices);
      savePriceSnapshot(prices);
    } catch (err) {
      console.warn('Refresh failed:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedWorld]);

  const toggleFavorite = useCallback((outfitId: string) => {
    setFavorites(prev =>
      prev.includes(outfitId)
        ? prev.filter(id => id !== outfitId)
        : [...prev, outfitId]
    );
  }, []);

  const toggleNotifications = useCallback(async () => {
    if (!notificationsEnabled) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
      }
    } else {
      setNotificationsEnabled(false);
    }
  }, [notificationsEnabled]);

  const toggleCardMode = useCallback(() => {
    setCardMode(prev => prev === 'compact' ? 'expanded' : 'compact');
  }, []);

  const exportProgress = useCallback(() => {
    const data = {
      outfits: outfits.map(o => ({
        id: o.id,
        completed: o.completed,
        addons: o.addons.map(a => ({ name: a.name, completed: a.completed })),
      })),
      inventory,
      favorites,
      world: selectedWorld,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  }, [outfits, inventory, favorites, selectedWorld]);

  const importProgress = useCallback((json: string): boolean => {
    try {
      const data = JSON.parse(json);
      if (data.outfits && Array.isArray(data.outfits)) {
        setOutfits(prev =>
          prev.map(o => {
            const imported = data.outfits.find((i: { id: string }) => i.id === o.id);
            if (imported) {
              return {
                ...o,
                completed: imported.completed,
                addons: o.addons.map(a => {
                  const importedAddon = imported.addons?.find((ia: { name: string }) => ia.name === a.name);
                  return importedAddon ? { ...a, completed: importedAddon.completed } : a;
                }),
              };
            }
            return o;
          })
        );
      }
      if (data.inventory && typeof data.inventory === 'object') {
        setInventory(data.inventory);
      }
      if (data.favorites && Array.isArray(data.favorites)) {
        setFavorites(data.favorites);
      }
      if (data.world) {
        setSelectedWorldState(data.world);
      }
      return true;
    } catch {
      return false;
    }
  }, [setSelectedWorldState]);

  const generateShareUrl = useCallback(() => {
    const completed = outfits.filter(o => o.completed).map(o => o.id);
    const addonCompleted: string[] = [];
    outfits.forEach(o => {
      o.addons.forEach(a => {
        if (a.completed) addonCompleted.push(`${o.id}:${a.name}`);
      });
    });
    const data = { c: completed, a: addonCompleted };
    const encoded = btoa(JSON.stringify(data));
    return `${window.location.origin}${window.location.pathname}#progress=${encoded}`;
  }, [outfits]);

  const loadFromShareUrl = useCallback((): boolean => {
    try {
      const hash = window.location.hash;
      if (!hash.startsWith('#progress=')) return false;
      const encoded = hash.slice('#progress='.length);
      const data = JSON.parse(atob(encoded));
      if (data.c && Array.isArray(data.c)) {
        setOutfits(prev =>
          prev.map(o => {
            const isCompleted = data.c.includes(o.id);
            return {
              ...o,
              completed: isCompleted,
              addons: o.addons.map(a => {
                const key = `${o.id}:${a.name}`;
                const isAddonCompleted = data.a?.includes(key);
                return { ...a, completed: !!isAddonCompleted };
              }),
            };
          })
        );
      }
      window.history.replaceState(null, '', window.location.pathname);
      return true;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    loadFromShareUrl();
  }, [loadFromShareUrl]);

  const switchCharacter = useCallback((name: string) => {
    // Save current character state
    const data: AppState = {
      outfits,
      inventory,
      lastUpdated: new Date().toISOString(),
      favorites,
      notificationsEnabled,
      cardMode,
    };
    saveCharacterState(currentCharacter, data);

    // Load new character
    const newState = loadCharacterState(name);
    setOutfits(newState.outfits);
    setInventory(newState.inventory);
    setFavorites(newState.favorites);
    setCurrentCharacter(name);
    localStorage.setItem(CURRENT_CHAR_KEY, name);
  }, [outfits, inventory, favorites, notificationsEnabled, cardMode, currentCharacter]);

  const createCharacter = useCallback((name: string) => {
    if (characters.includes(name)) return;
    const newChars = [...characters, name];
    setCharacters(newChars);
    localStorage.setItem(CHARACTERS_KEY, JSON.stringify(newChars));
    saveCharacterState(name, {
      outfits: sampleOutfits,
      inventory: {},
      lastUpdated: new Date().toISOString(),
      favorites: [],
      notificationsEnabled: false,
      cardMode: 'compact',
    });
    switchCharacter(name);
  }, [characters, switchCharacter]);

  const deleteCharacter = useCallback((name: string) => {
    if (characters.length <= 1) return;
    const newChars = characters.filter(c => c !== name);
    setCharacters(newChars);
    localStorage.setItem(CHARACTERS_KEY, JSON.stringify(newChars));
    localStorage.removeItem(`tibiaOutfitPlanner_${name}`);
    if (currentCharacter === name) {
      switchCharacter(newChars[0]);
    }
  }, [characters, currentCharacter, switchCharacter]);

  const value = useMemo<AppContextType>(() => ({
    outfits,
    inventory,
    loading,
    selectedWorld,
    worlds,
    marketPrices,
    setSelectedWorld,
    getOutfitById,
    toggleOutfitCompleted,
    toggleAddonCompleted,
    updateInventoryItem,
    removeInventoryItem,
    getRequiredItems,
    getInventoryStatus,
    getProgress,
    refreshMarketPrices,
    nextUpdate,
    favorites,
    toggleFavorite,
    notificationsEnabled,
    toggleNotifications,
    cardMode,
    toggleCardMode,
    exportProgress,
    importProgress,
    generateShareUrl,
    loadFromShareUrl,
    currentCharacter,
    characters,
    switchCharacter,
    createCharacter,
    deleteCharacter,
  }), [
    outfits,
    inventory,
    loading,
    selectedWorld,
    worlds,
    marketPrices,
    setSelectedWorld,
    getOutfitById,
    toggleOutfitCompleted,
    toggleAddonCompleted,
    updateInventoryItem,
    removeInventoryItem,
    getRequiredItems,
    getInventoryStatus,
    getProgress,
    refreshMarketPrices,
    nextUpdate,
    favorites,
    toggleFavorite,
    notificationsEnabled,
    toggleNotifications,
    cardMode,
    toggleCardMode,
    exportProgress,
    importProgress,
    generateShareUrl,
    loadFromShareUrl,
    currentCharacter,
    characters,
    switchCharacter,
    createCharacter,
    deleteCharacter,
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
