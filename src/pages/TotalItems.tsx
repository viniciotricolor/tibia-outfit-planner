import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n/I18nContext';
import { Check, X, Package, TrendingUp, PawPrint } from 'lucide-react';
import { formatGold, getPriceTrend } from '../services/market';
import { getItemIconUrl } from '../services/itemIcons';
import { ItemIconFallback } from '../components/ItemIconFallback';
import { motion } from 'motion/react';
import { sampleMounts } from '../data/mounts';

export default function TotalItems() {
  const { getRequiredItems, updateInventoryItem, inventory, marketPrices, selectedWorld, loading } = useApp();
  const { t } = useI18n();
  const requiredItems = getRequiredItems();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'needed' | 'have' | 'missing' | 'value'>('name');
  const [includeMountItems, setIncludeMountItems] = useState(() => {
    return localStorage.getItem('tibiaIncludeMountItems') !== 'false';
  });

  const toggleIncludeMountItems = () => {
    setIncludeMountItems(prev => {
      const next = !prev;
      localStorage.setItem('tibiaIncludeMountItems', String(next));
      return next;
    });
  };

  const charName = localStorage.getItem('tibiaOutfitCurrentChar') || 'Principal';
  const tamedMountIds = useMemo(() => {
    try {
      const saved = localStorage.getItem(`tibiaMounts_${charName}`);
      return saved ? JSON.parse(saved) as string[] : [];
    } catch { return []; }
  }, [charName]);

  const mountItems = useMemo(() => {
    const items: Record<string, number> = {};
    sampleMounts
      .filter(m => !tamedMountIds.includes(m.id) && m.items.length > 0)
      .forEach(mount => {
        mount.items.forEach(item => {
          items[item.name] = (items[item.name] || 0) + item.amount;
        });
      });
    return items;
  }, [tamedMountIds]);

  const allRequiredItems = useMemo(() => {
    if (!includeMountItems) return requiredItems;
    const merged = { ...requiredItems };
    Object.entries(mountItems).forEach(([name, amount]) => {
      merged[name] = (merged[name] || 0) + amount;
    });
    return merged;
  }, [requiredItems, mountItems, includeMountItems]);

  const getItemPrice = (itemName: string) => {
    return marketPrices[itemName]?.offerPrice || 0;
  };

  const items = Object.entries(allRequiredItems)
    .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map(([name, needed]) => ({
      name,
      needed,
      have: inventory[name] || 0,
      missing: Math.max(0, needed - (inventory[name] || 0)),
      value: getItemPrice(name) * needed,
    }))
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'needed':
          return b.needed - a.needed;
        case 'have':
          return b.have - a.have;
        case 'missing':
          return b.missing - a.missing;
        case 'value':
          return b.value - a.value;
        default:
          return 0;
      }
    });

  const totalNeeded = Object.values(allRequiredItems).reduce((sum, val) => sum + val, 0);
  const totalHave = Object.entries(allRequiredItems).reduce(
    (sum, [name]) => sum + Math.min(inventory[name] || 0, allRequiredItems[name]),
    0
  );
  const totalMissing = totalNeeded - totalHave;
  const percentage = totalNeeded > 0 ? Math.round((totalHave / totalNeeded) * 100) : 0;
  
  const totalValue = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-tibia-gold mb-2">{t('items.title')}</h1>
        <p className="text-gray-400">{t('items.subtitle')}</p>
        <p className="text-sm text-gray-500 mt-1">
          {t('items.pricesFrom')}: <span className="text-tibia-gold font-medium">{selectedWorld}</span>
          {loading && <span className="ml-2 text-tibia-accent">({t('items.updating')})</span>}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-tibia-dark rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-tibia-blue/20 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-tibia-blue" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{t('items.totalItems')}</p>
              <p className="text-2xl font-bold text-white">{totalNeeded}</p>
            </div>
          </div>
        </div>

        <div className="bg-tibia-dark rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-tibia-green/20 rounded-lg flex items-center justify-center">
              <Check className="h-5 w-5 text-tibia-green" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{t('items.collected')}</p>
              <p className="text-2xl font-bold text-white">{totalHave}</p>
            </div>
          </div>
        </div>

        <div className="bg-tibia-dark rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-tibia-accent/20 rounded-lg flex items-center justify-center">
              <X className="h-5 w-5 text-tibia-accent" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{t('items.missing')}</p>
              <p className="text-2xl font-bold text-white">{totalMissing}</p>
            </div>
          </div>
        </div>

        <div className="bg-tibia-dark rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-tibia-gold/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-tibia-gold" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{t('detail.progress')}</p>
              <p className="text-2xl font-bold text-white">{percentage}%</p>
            </div>
          </div>
        </div>

        <div className="bg-tibia-dark rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-purple-400 font-bold">💰</span>
            </div>
            <div>
              <p className="text-sm text-gray-400">{t('items.value')}</p>
              <p className="text-xl font-bold text-white">{formatGold(totalValue)} gp</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-tibia-dark rounded-lg p-4 border border-gray-700 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder={t('items.search')}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-tibia-darker border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-tibia-accent"
            />
          </div>
          <div className="flex gap-2 items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleIncludeMountItems}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                includeMountItems
                  ? 'bg-tibia-accent text-white'
                  : 'bg-tibia-darker border border-gray-700 text-gray-400 hover:border-gray-600'
              }`}
            >
              <PawPrint className="h-4 w-4" />
              {t('items.includeMounts')}
            </motion.button>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="bg-tibia-darker border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tibia-accent"
            >
              <option value="name">{t('items.sortName')}</option>
              <option value="needed">{t('items.sortNeeded')}</option>
              <option value="have">{t('items.sortHave')}</option>
              <option value="missing">{t('items.sortMissing')}</option>
              <option value="value">{t('items.sortValue')}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-tibia-dark rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">{t('items.headerItem')}</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">{t('items.headerNeeded')}</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">{t('items.headerHave')}</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">{t('items.headerMissing')}</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">{t('items.headerUnitPrice')}</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">{t('items.headerTotalValue')}</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">{t('items.headerStatus')}</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">{t('items.headerAction')}</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => {
                const hasEnough = item.have >= item.needed;
                const unitValue = getItemPrice(item.name);
                return (
                  <tr
                    key={item.name}
                    className="border-b border-gray-700 last:border-b-0 hover:bg-gray-800/50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center mr-3 overflow-hidden">
                          {getItemIconUrl(item.name) ? (
                            <img
                              src={getItemIconUrl(item.name)!}
                              alt={item.name}
                              className="w-6 h-6 object-contain image-rendering-pixelated"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <ItemIconFallback />
                          )}
                        </div>
                        <span className="text-white font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-300">{item.needed}</td>
                    <td className="py-3 px-4 text-right text-white">{item.have}</td>
                    <td className="py-3 px-4 text-right text-tibia-accent">{item.missing}</td>
                    <td className="py-3 px-4 text-right text-gray-400">
                      {formatGold(unitValue)} gp
                      {unitValue > 0 && (
                        <span className={`ml-1 text-xs ${
                          getPriceTrend(item.name) === 'up' ? 'text-red-400' :
                          getPriceTrend(item.name) === 'down' ? 'text-green-400' :
                          'text-gray-500'
                        }`}>
                          {getPriceTrend(item.name) === 'up' ? '↑' :
                           getPriceTrend(item.name) === 'down' ? '↓' : '–'}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right text-tibia-gold font-medium">{formatGold(item.value)} gp</td>
                    <td className="py-3 px-4 text-center">
                      {hasEnough ? (
                        <Check className="h-5 w-5 text-tibia-green mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-tibia-accent mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => updateInventoryItem(item.name, Math.max(0, item.have - 10))}
                          className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-white hover:bg-gray-600"
                        >
                          -
                        </button>
                        <button
                          onClick={() => updateInventoryItem(item.name, item.have + 10)}
                          className="w-8 h-8 bg-tibia-accent rounded flex items-center justify-center text-white hover:bg-red-600"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
