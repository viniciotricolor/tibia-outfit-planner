import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n/I18nContext';
import { ArrowLeft, Check, X, MapPin, User, ExternalLink, TrendingUp } from 'lucide-react';
import { formatGold } from '../services/market';
import { getItemIconUrl } from '../services/itemIcons';
import { ItemIconFallback } from '../components/ItemIconFallback';
import { motion } from 'motion/react';

export default function OutfitDetail() {
  const { id } = useParams<{ id: string }>();
  const { getOutfitById, toggleOutfitCompleted, toggleAddonCompleted, inventory, marketPrices, selectedWorld, loading } = useApp();
  const { t } = useI18n();
  
  const outfit = getOutfitById(id || '');

  if (!outfit) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-tibia-accent">{t('detail.notFound')}</h2>
        <Link to="/" className="text-tibia-gold hover:underline mt-4 inline-block">
          {t('detail.backToDashboard')}
        </Link>
      </div>
    );
  }

  const getItemPrice = (itemName: string) => {
    return marketPrices[itemName]?.offerPrice || 0;
  };

  const getAddonLabel = (addonName: string) => {
    if (addonName === 'First') return t('dashboard.firstAddon');
    return t('dashboard.secondAddon');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to="/" className="flex items-center text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t('detail.back')}
      </Link>

      <div className="bg-tibia-dark rounded-lg p-6 border border-gray-700">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden mb-4">
              {outfit.baseImage ? (
                <img
                  src={outfit.baseImage}
                  alt={`${outfit.name} Outfit`}
                  className="w-full h-full object-contain image-rendering-pixelated"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <span className="text-6xl">👤</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              {outfit.firstAddonImage && (
                <div className="flex-1 aspect-square bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={outfit.firstAddonImage}
                    alt={`${outfit.name} First Addon`}
                    className="w-full h-full object-contain image-rendering-pixelated"
                    loading="lazy"
                  />
                </div>
              )}
              {outfit.secondAddonImage && (
                <div className="flex-1 aspect-square bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={outfit.secondAddonImage}
                    alt={`${outfit.name} Second Addon`}
                    className="w-full h-full object-contain image-rendering-pixelated"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-tibia-gold">{outfit.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-gray-400">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {outfit.city}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {outfit.npc}
                  </div>
                  <div className="capitalize">{outfit.gender === 'both' ? t('dashboard.both') : outfit.gender === 'male' ? t('dashboard.male') : t('dashboard.female')}</div>
                  <div className="capitalize">{outfit.type}</div>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <TrendingUp className="h-4 w-4" />
                  <span>{t('items.pricesFrom')}: {selectedWorld}</span>
                  {loading && <span className="text-tibia-gold">({t('items.updating')})</span>}
                </div>
              </div>
              <button
                onClick={() => toggleOutfitCompleted(outfit.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  outfit.completed
                    ? 'bg-tibia-green text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {outfit.completed ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    {t('detail.complete')}
                  </>
                ) : (
                  t('detail.markComplete')
                )}
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-2">{t('detail.requirements')}</h3>
              <ul className="list-disc list-inside text-gray-400">
                {outfit.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
                {outfit.requirements.length === 0 && (
                  <li className="text-tibia-green">{t('detail.noRequirements')}</li>
                )}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {outfit.addons.map(addon => {
                const totalItems = addon.items.reduce((sum, item) => sum + item.amount, 0);
                const collectedItems = addon.items.reduce((sum, item) => {
                  return sum + Math.min(inventory[item.name] || 0, item.amount);
                }, 0);
                const percentage = totalItems > 0 ? Math.round((collectedItems / totalItems) * 100) : 0;
                
                const totalValue = addon.items.reduce((sum, item) => {
                  return sum + (getItemPrice(item.name) * item.amount);
                }, 0);

                return (
                  <div
                    key={addon.name}
                    className="bg-tibia-darker rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-white">{getAddonLabel(addon.name)}</h4>
                      <button
                        onClick={() => toggleAddonCompleted(outfit.id, addon.name)}
                        className={`flex items-center px-3 py-1 rounded text-sm font-medium transition-colors ${
                          addon.completed
                            ? 'bg-tibia-green text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {addon.completed ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            {t('detail.complete')}
                          </>
                        ) : (
                          t('detail.mark')
                        )}
                      </button>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">{t('detail.progress')}</span>
                        <span className="text-tibia-gold">{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-tibia-green h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      {addon.items.map((item, index) => {
                        const have = inventory[item.name] || 0;
                        const hasEnough = have >= item.amount;
                        const price = getItemPrice(item.name);
                        
                        return (
                          <div
                            key={index}
                            className="bg-gray-800 rounded p-3"
                          >
                            <div className="flex items-center justify-between">
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
                                <div>
                                  <span className="text-white">{item.name}</span>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <span>{formatGold(price)} gp/un</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-gray-400">
                                  {have} / {item.amount}
                                </span>
                                {hasEnough ? (
                                  <Check className="h-5 w-5 text-tibia-green" />
                                ) : (
                                  <X className="h-5 w-5 text-tibia-accent" />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{t('detail.totalValue')}:</span>
                        <span className="text-sm font-bold text-tibia-gold">{formatGold(totalValue)} gp</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <a
                href={`https://www.tibiawiki.com.br/wiki/${outfit.name.replace(/ /g, '_')}_Outfits`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-gray-400 hover:text-tibia-gold transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                {t('detail.viewOnWiki')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
