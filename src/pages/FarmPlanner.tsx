import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n/I18nContext';
import { Shirt, Check, Map, Search } from 'lucide-react';
import { formatGold } from '../services/market';
import { motion } from 'motion/react';

const FARM_PAGE_SIZE = 20;

export default function FarmPlanner() {
  const { outfits, inventory, marketPrices, selectedWorld } = useApp();
  const { t } = useI18n();
  const [selectedOutfit, setSelectedOutfit] = useState<string>('');
  const [outfitSearch, setOutfitSearch] = useState('');
  const [outfitPage, setOutfitPage] = useState(1);
  
  const filteredOutfits = useMemo(() => {
    return outfits.filter(o =>
      o.name.toLowerCase().includes(outfitSearch.toLowerCase())
    );
  }, [outfits, outfitSearch]);

  const outfitTotalPages = Math.ceil(filteredOutfits.length / FARM_PAGE_SIZE);
  const pagedOutfits = filteredOutfits.slice(
    (outfitPage - 1) * FARM_PAGE_SIZE,
    outfitPage * FARM_PAGE_SIZE
  );

  const selectedOutfitData = outfits.find(o => o.id === selectedOutfit);

  const getItemPrice = (itemName: string) => {
    return marketPrices[itemName]?.offerPrice || 0;
  };

  const getFarmOrder = () => {
    if (!selectedOutfitData) return [];

    const allItems: Array<{
      name: string;
      amount: number;
      have: number;
      missing: number;
      outfit: string;
      addon: string;
      price: number;
      totalValue: number;
    }> = [];

    selectedOutfitData.addons.forEach(addon => {
      addon.items.forEach(item => {
        const have = inventory[item.name] || 0;
        const price = getItemPrice(item.name);
        allItems.push({
          name: item.name,
          amount: item.amount,
          have,
          missing: Math.max(0, item.amount - have),
          outfit: selectedOutfitData.name,
          addon: addon.name,
          price,
          totalValue: price * item.amount,
        });
      });
    });

    return allItems.sort((a, b) => b.missing - a.missing);
  };

  const farmOrder = getFarmOrder();
  const totalItems = farmOrder.reduce((sum, item) => sum + item.amount, 0);
  const collectedItems = farmOrder.reduce((sum, item) => sum + Math.min(item.have, item.amount), 0);
  const missingItems = totalItems - collectedItems;
  const percentage = totalItems > 0 ? Math.round((collectedItems / totalItems) * 100) : 0;
  const totalValue = farmOrder.reduce((sum, item) => sum + item.totalValue, 0);

  const getAddonLabel = (addonName: string) => {
    if (addonName === 'First') return t('dashboard.firstAddon');
    return t('dashboard.secondAddon');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-tibia-gold mb-2">{t('farm.title')}</h1>
        <p className="text-gray-400">{t('farm.subtitle')}</p>
        <p className="text-sm text-gray-500 mt-1">
          {t('items.pricesFrom')}: <span className="text-tibia-gold font-medium">{selectedWorld}</span>
        </p>
      </div>

      <div className="bg-tibia-dark rounded-lg p-6 border border-gray-700 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">{t('farm.selectOutfit')}</h2>
        <div className="flex items-center gap-2 mb-3">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('items.search')}
            value={outfitSearch}
            onChange={e => { setOutfitSearch(e.target.value); setOutfitPage(1); }}
            className="flex-1 bg-tibia-darker border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-tibia-accent"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {pagedOutfits.map(outfit => (
            <button
              key={outfit.id}
              onClick={() => setSelectedOutfit(outfit.id)}
              className={`flex items-center gap-2 p-2 rounded-lg border transition-colors text-sm ${
                selectedOutfit === outfit.id
                  ? 'bg-tibia-accent border-tibia-accent text-white'
                  : 'bg-tibia-darker border-gray-700 text-gray-300 hover:border-gray-600'
              }`}
            >
              <Shirt className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium truncate">{outfit.name}</span>
              {outfit.completed && <Check className="h-3 w-3 ml-auto flex-shrink-0" />}
            </button>
          ))}
        </div>
        {outfitTotalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-3">
            <button
              onClick={() => setOutfitPage(p => Math.max(1, p - 1))}
              disabled={outfitPage === 1}
              className="px-2 py-1 text-xs bg-tibia-darker border border-gray-700 rounded hover:border-tibia-accent disabled:opacity-30"
            >
              ←
            </button>
            <span className="text-xs text-gray-400">{outfitPage}/{outfitTotalPages}</span>
            <button
              onClick={() => setOutfitPage(p => Math.min(outfitTotalPages, p + 1))}
              disabled={outfitPage === outfitTotalPages}
              className="px-2 py-1 text-xs bg-tibia-darker border border-gray-700 rounded hover:border-tibia-accent disabled:opacity-30"
            >
              →
            </button>
          </div>
        )}
      </div>

      {selectedOutfitData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-tibia-dark rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedOutfitData.name}</h2>
                  <p className="text-gray-400">{selectedOutfitData.city} - {selectedOutfitData.npc}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">{t('detail.progress')}</p>
                  <p className="text-2xl font-bold text-tibia-gold">{percentage}%</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-400">{t('items.collected')}</span>
                  <span className="text-white">{collectedItems} / {totalItems}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-tibia-green h-3 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Map className="h-5 w-5 text-tibia-gold" />
                  {t('farm.recommendedOrder')}
                </h3>
                <p className="text-sm text-gray-400">
                  {t('farm.orderDescription')}
                </p>

                <div className="space-y-3">
                  {farmOrder.map((item, index) => {
                    const itemPercentage = item.amount > 0 ? Math.round((Math.min(item.have, item.amount) / item.amount) * 100) : 0;
                    return (
                      <div
                        key={`${item.name}-${item.addon}`}
                        className="bg-tibia-darker rounded-lg p-4 border border-gray-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-tibia-gold font-bold">#{index + 1}</span>
                            <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                              <Shirt className="h-4 w-4 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{item.name}</p>
                              <p className="text-xs text-gray-400">{item.outfit} - {getAddonLabel(item.addon)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white">
                              <span className="text-tibia-green">{item.have}</span>
                              {' / '}
                              <span>{item.amount}</span>
                            </p>
                            <p className="text-xs text-gray-500">{formatGold(item.price)} gp/un</p>
                            {item.missing > 0 && (
                              <p className="text-xs text-tibia-accent">{t('items.missing')}: {item.missing}</p>
                            )}
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-tibia-green h-2 rounded-full transition-all duration-300"
                            style={{ width: `${itemPercentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-tibia-dark rounded-lg p-6 border border-gray-700 sticky top-8">
              <h3 className="text-lg font-bold text-white mb-4">{t('farm.summary')}</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{t('farm.totalItems')}</span>
                  <span className="text-white font-bold">{totalItems}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{t('farm.totalCollected')}</span>
                  <span className="text-tibia-green font-bold">{collectedItems}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{t('farm.totalMissing')}</span>
                  <span className="text-tibia-accent font-bold">{missingItems}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{t('items.value')}</span>
                  <span className="text-tibia-gold font-bold">{formatGold(totalValue)} gp</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{t('detail.progress')}</span>
                    <span className="text-tibia-gold font-bold text-xl">{percentage}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <h4 className="text-sm font-bold text-gray-400 mb-3">{t('farm.itemsNeeded')}</h4>
                <div className="space-y-2">
                  {farmOrder.filter(item => item.missing > 0).map(item => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{item.name}</span>
                      <span className="text-tibia-accent">{item.missing}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!selectedOutfitData && (
        <div className="text-center py-12 bg-tibia-dark rounded-lg border border-gray-700">
          <Map className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-400">{t('farm.selectOutfit')}</h3>
          <p className="text-gray-500 mt-2">{t('farm.selectOutfitHint')}</p>
        </div>
      )}
    </motion.div>
  );
}
