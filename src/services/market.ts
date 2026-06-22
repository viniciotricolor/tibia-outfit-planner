const TIBIAMARKET_API = 'https://api.tibiamarket.top';

export interface MarketPrice {
  item: string;
  itemId: number;
  offerPrice: number;
  buyOffer: number;
  sellOffer: number;
  monthAverageSell: number;
  monthAverageBuy: number;
  lastUpdated: string;
}

export interface WorldInfo {
  name: string;
  lastUpdate: string;
}

// Mapeamento de nomes de itens para IDs do Tibia
const ITEM_IDS: Record<string, number> = {
  'Minotaur Leather': 5878,
  'Chicken Feather': 5890,
  'Honeycomb': 5902,
  'Royal Helmet': 3392,
  'Wolf Paw': 5897,
  'Lion\'s Mane': 9691,
  'Deer Trophy': 7397,
  'Sabretooth': 10311,
  'Iron Ore': 5880,
  'Leather': 3361,
  'Magic Plate Armor': 3366,
  'Royal Shield': 3432,
  'Magic Sulphur': 5904,
  'Enchanted Staff': 3321,
  'Golden Nugget': 9058,
  'Mystic Turban': 3574,
  'Gold Ingot': 9058,
  'Silk': 5879,
  'Ruby': 3030,
  'Diamond': 3028,
  'Orcish Nose Ring': 11479,
  'Mammoth Whisker': 7381,
  'Black Pearl': 3027,
  'Gold Ring': 3063,
  'Demon Bone': 6499,
  'Vampire Dust': 5905,
  'Battle Stone': 11447,
  'Giant Shimmering Pearl': 281,
  'Warrior\'s Sweat': 5885,
  'Bandana': 5917,
  'Stealth Ring': 3049,
  'Assassin Dagger': 7404,
  'Pirate Belt': 5918,
  'Pirate Flag': 5615,
  'Rum': 5552,
  'Treasure Map': 5706,
  'Demonic Essence': 6499,
  'Hellfire Staff': 9664,
  'Nightmare Horn': 20274,
  'Shadow Cloak': 24973,
  'Dream Catcher': 20063,
  'Nightmare Blade': 7418,
  'Jester Ball': 8778,
  'Magic Paintbrush': 34008,
  'Brotherhood Belt': 5918,
  'Sacred Tree Bark': 9302,
  'Holy Shield': 3432,
  'Sacred Amulet': 9302,
  'Shamanic Mantle': 11478,
  'Tribal Mask': 3403,
  'Spirit Cape': 24973,
  'Ancient Amulet': 3025,
  'War Hammer': 3279,
  'Iron Shield': 3432,
  'Battle Axe': 3266,
  'War Horn': 2958,
  'Lizard Leather': 5876,
  'Red Dragon Leather': 5876,
  'Enchanted Chicken Wing': 5903,
  'Piece of Royal Steel': 5889,
  'Piece of Draconian Steel': 5889,
  'Piece of Hell Steel': 5889,
  'Sniper Gloves': 5875,
  'Huge Chunk of Crude Iron': 5880,
  'Perfect Behemoth Fang': 5893,
  'Flask of Warrior\'s Sweat': 5885,
  'Wand of Vortex': 3074,
  'Wand of Dragonbreath': 3075,
  'Wand of Decay': 3076,
  'Wand of Cosmic Energy': 3077,
  'Wand of Inferno': 3078,
  'Snakebite Rod': 3066,
  'Moonlight Rod': 3067,
  'Necrotic Rod': 3068,
  'Terra Rod': 3069,
  'Hailstorm Rod': 3070,
  'Ankh': 3031,
  'Soul Stone': 3035,
  'Ferumbras\' Hat': 3060,
  'Red Piece of Cloth': 5911,
  'Green Piece of Cloth': 5910,
  'Spool of Yarn': 5903,
  'Bat Wing': 5894,
  'Ape Fur': 5895,
  'Holy Orchid': 5906,
  'Lizard Scale': 5896,
  'Red Dragon Scale': 5896,
  'Hardened Bones': 5887,
  'Turtle Shell': 5891,
  'Blue Piece of Cloth': 5909,
  'Brown Piece of Cloth': 5912,
  'Yellow Piece of Cloth': 5913,
  'White Piece of Cloth': 5914,
  'Behemoth Claw': 5893,
  'Nose Ring': 5899,
  'Eye Patch': 5915,
  'Peg Leg': 5916,
  'Hook': 5893,
  'Banana Staff': 5908,
  'Dworc Voodoo Doll': 5884,
  'Mandrake': 5907,
  'Legion Helmet': 3366,
  'Plague Bell': 23607,
  'Plague Mask': 23606,
  'Sturdy Book': 23580,
  'Epaulette': 23577,
  'Silver Token': 22721,
  'Serpent Crest': 22722,
  'Tribal Crest': 22723,
  'Old Cape': 3361,
  'Sedge Hat': 11472,
  'Vampiric Crest': 22724,
  'Dream Warden Mask': 25717,
  'Dream Warden Claw': 25718,
  'Pomegranate': 11452,
  'Ice Shield': 3432,
  'Mage\'s Cap': 5917,
  'Elemental Spikes': 11478,
  'Final Judgement': 3279,
  'Shadow Cowl': 24973,
  'Crude Wood Planks': 23580,
  'Tinged Pot': 23577,
  'Spooky Hood': 24973,
  'Ghost Claw': 5893,
  'Soap': 23580,
  'Scrubbing Brush': 23577,
  'Frostheart Shard': 11447,
};

let cache: Record<string, Record<string, MarketPrice>> = {};
let cachedWorld: string | null = null;

export function clearMarketCache(): void {
  cache = {};
  cachedWorld = null;
}

export async function getWorlds(): Promise<WorldInfo[]> {
  try {
    const response = await fetch(`${TIBIAMARKET_API}/world_data`);
    if (!response.ok) return getDefaultWorlds();
    const data = await response.json();
    return data.map((w: WorldInfo) => ({
      name: w.name,
      lastUpdate: w.lastUpdate,
    }));
  } catch {
    return getDefaultWorlds();
  }
}

function getDefaultWorlds(): WorldInfo[] {
  return [
    { name: 'Yubra', lastUpdate: new Date().toISOString() },
    { name: 'Antica', lastUpdate: new Date().toISOString() },
    { name: 'Secura', lastUpdate: new Date().toISOString() },
    { name: 'Peloria', lastUpdate: new Date().toISOString() },
    { name: 'Lobera', lastUpdate: new Date().toISOString() },
    { name: 'Gladera', lastUpdate: new Date().toISOString() },
    { name: 'Inabra', lastUpdate: new Date().toISOString() },
    { name: 'Belobra', lastUpdate: new Date().toISOString() },
  ];
}

export async function fetchMarketPrices(world: string): Promise<Record<string, MarketPrice>> {
  if (cachedWorld === world && cache[world]) {
    return cache[world];
  }

  const itemIds = Object.values(ITEM_IDS).join(',');
  
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    
    const response = await fetch(
      `${TIBIAMARKET_API}/market_values?server=${world}&item_ids=${itemIds}`,
      { signal: controller.signal }
    );
    
    clearTimeout(timeout);
    
    if (!response.ok) {
      console.warn(`TibiaMarket API error: ${response.status}`);
      return getFallbackPrices();
    }
    
    const data = await response.json();
    const prices: Record<string, MarketPrice> = {};
    
    // Mapear IDs de volta para nomes
    const idToName: Record<number, string> = {};
    Object.entries(ITEM_IDS).forEach(([name, id]) => {
      idToName[id] = name;
    });
    
    data.forEach((item: Record<string, unknown>) => {
      const name = idToName[item.id as number];
      if (name) {
        prices[name] = {
          item: name,
          itemId: item.id as number,
          offerPrice: (item.sell_offer as number) || (item.month_average_sell as number) || 0,
          buyOffer: (item.buy_offer as number) || 0,
          sellOffer: (item.sell_offer as number) || 0,
          monthAverageSell: (item.month_average_sell as number) || 0,
          monthAverageBuy: (item.month_average_buy as number) || 0,
          lastUpdated: new Date().toISOString(),
        };
      }
    });
    
    cache[world] = prices;
    cachedWorld = world;
    
    return prices;
  } catch (err) {
    console.warn('TibiaMarket fetch failed:', err);
    return getFallbackPrices();
  }
}

function getFallbackPrices(): Record<string, MarketPrice> {
  const fallback: Record<string, MarketPrice> = {};
  Object.entries(ITEM_IDS).forEach(([name, id]) => {
    fallback[name] = {
      item: name,
      itemId: id,
      offerPrice: 100,
      buyOffer: 50,
      sellOffer: 100,
      monthAverageSell: 100,
      monthAverageBuy: 50,
      lastUpdated: new Date().toISOString(),
    };
  });
  return fallback;
}

export function getMarketPrice(item: string, world: string): MarketPrice | null {
  return cache[world]?.[item] || null;
}

export function calculateItemValue(item: string, amount: number, world: string): number {
  const price = getMarketPrice(item, world);
  if (price) {
    return price.offerPrice * amount;
  }
  return 0;
}

export function formatGold(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(2)}kk`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}k`;
  }
  return amount.toLocaleString('pt-BR');
}

export interface PriceSnapshot {
  prices: Record<string, number>;
  timestamp: string;
}

const HISTORY_KEY = 'tibiaOutfitPriceHistory';

export function savePriceSnapshot(prices: Record<string, MarketPrice>): void {
  try {
    const history: PriceSnapshot[] = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const snapshot: PriceSnapshot = {
      prices: Object.fromEntries(
        Object.entries(prices).map(([name, p]) => [name, p.offerPrice])
      ),
      timestamp: new Date().toISOString(),
    };
    history.push(snapshot);
    if (history.length > 30) history.splice(0, history.length - 30);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // ignore
  }
}

export function getPriceHistory(): PriceSnapshot[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function getPriceTrend(itemName: string): 'up' | 'down' | 'same' | 'new' {
  const history = getPriceHistory();
  if (history.length < 2) return 'new';
  const current = history[history.length - 1].prices[itemName];
  const previous = history[history.length - 2].prices[itemName];
  if (current === undefined || previous === undefined) return 'new';
  if (current > previous) return 'up';
  if (current < previous) return 'down';
  return 'same';
}
