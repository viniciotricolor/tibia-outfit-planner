import { useParams, Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import { ArrowLeft, Check, ExternalLink, Shield } from 'lucide-react';
import { sampleMounts, mountCategories } from '../data/mounts';
import { getItemIconUrl } from '../services/itemIcons';
import { ItemIconFallback } from '../components/ItemIconFallback';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function MountDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useI18n();

  const charName = localStorage.getItem('tibiaOutfitCurrentChar') || 'Principal';

  const [tamed, setTamed] = useState(() => {
    try {
      const saved = localStorage.getItem(`tibiaMounts_${charName}`);
      if (saved) return JSON.parse(saved).includes(id);
    } catch { /* ignore */ }
    return false;
  });

  useEffect(() => {
    const loadTamed = () => {
      try {
        const saved = localStorage.getItem(`tibiaMounts_${charName}`);
        if (saved) {
          const isTamed = JSON.parse(saved).includes(id);
          setTamed((prev: boolean) => prev === isTamed ? prev : isTamed);
        }
      } catch { /* ignore */ }
    };
    loadTamed();
  }, [id, charName]);

  const toggleTamed = () => {
    setTamed((prev: boolean) => {
      const next = !prev;
      try {
        const saved = localStorage.getItem(`tibiaMounts_${charName}`);
        const ids: string[] = saved ? JSON.parse(saved) : [];
        const updated = next ? [...ids, id] : ids.filter((i: string) => i !== id);
        localStorage.setItem(`tibiaMounts_${charName}`, JSON.stringify(updated));
      } catch { /* ignore */ }
      return next;
    });
  };

  const mount = sampleMounts.find(m => m.id === id);

  if (!mount) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-tibia-accent">{t('mounts.notFound')}</h2>
        <Link to="/mounts" className="text-tibia-gold hover:underline mt-4 inline-block">
          {t('mounts.backToMounts')}
        </Link>
      </div>
    );
  }

  const categoryInfo = mountCategories[mount.category];
  const wikiUrl = `https://tibiawiki.com.br/wiki/${mount.name.replace(/ /g, '_')}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to="/mounts" className="flex items-center text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t('mounts.backToMounts')}
      </Link>

      <div className="bg-tibia-dark rounded-lg p-6 border border-gray-700">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
              <img
                src={mount.imageUrl}
                alt={mount.name}
                className="max-w-full max-h-full object-contain image-rendering-pixelated"
              />
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-tibia-gold">{mount.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-gray-400">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    mount.category === 'store' ? 'bg-purple-500/20 text-purple-400' :
                    mount.category === 'tameable' ? 'bg-green-500/20 text-green-400' :
                    mount.category === 'quest' ? 'bg-blue-500/20 text-blue-400' :
                    mount.category === 'event' ? 'bg-yellow-500/20 text-yellow-400' :
                    mount.category === 'invasion' ? 'bg-red-500/20 text-red-400' :
                    'bg-gray-700 text-gray-400'
                  }`}>
                    {categoryInfo?.icon} {categoryInfo?.label['pt-BR']}
                  </span>
                  {mount.premium && (
                    <span className="flex items-center gap-1 text-tibia-gold text-sm">
                      <Shield className="h-3 w-3" /> Premium
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={toggleTamed}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  tamed
                    ? 'bg-tibia-green text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tamed ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    {t('mounts.tamed')}
                  </>
                ) : (
                  t('mounts.tame')
                )}
              </button>
            </div>

            {mount.requirements.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-2">{t('mounts.requirements')}</h3>
                <ul className="list-disc list-inside text-gray-400">
                  {mount.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {mount.items.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3">{t('mounts.tamingItems')}</h3>
                <div className="space-y-3">
                  {mount.items.map((item, index) => (
                    <div key={index} className="bg-tibia-darker rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center overflow-hidden">
                          {getItemIconUrl(item.name) ? (
                            <img
                              src={getItemIconUrl(item.name)!}
                              alt={item.name}
                              className="w-8 h-8 object-contain image-rendering-pixelated"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <ItemIconFallback />
                          )}
                        </div>
                        <div className="flex-1">
                          <span className="text-white font-medium">{item.name}</span>
                          <div className="text-xs text-gray-500">
                            {t('mounts.amount')}: {item.amount}
                          </div>
                        </div>
                        <a
                          href={`https://tibiawiki.com.br/wiki/${item.name.replace(/ /g, '_')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-tibia-gold transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mount.items.length === 0 && mount.requirements.length > 0 && (
              <div className="mb-6 bg-tibia-darker rounded-lg p-4 border border-gray-700">
                <p className="text-gray-400 text-sm">{t('mounts.noItemsInfo')}</p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-700">
              <a
                href={wikiUrl}
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
