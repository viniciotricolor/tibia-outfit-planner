import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import { Check, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sampleMounts, mountCategories } from '../data/mounts';
import type { MountCategory } from '../types';

const PAGE_SIZE = 24;

export default function Mounts() {
  const { t } = useI18n();

  const [mounts, setMounts] = useState(() => {
    try {
      const saved = localStorage.getItem(`tibiaMounts_${localStorage.getItem('tibiaOutfitCurrentChar') || 'Principal'}`);
      if (saved) {
        const savedIds = JSON.parse(saved) as string[];
        return sampleMounts.map(m => ({ ...m, tamed: savedIds.includes(m.id) }));
      }
    } catch { /* ignore */ }
    return sampleMounts;
  });

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<MountCategory | 'all'>('all');

  const charName = localStorage.getItem('tibiaOutfitCurrentChar') || 'Principal';

  const saveMounts = (mountList: typeof mounts) => {
    const tamedIds = mountList.filter(m => m.tamed).map(m => m.id);
    localStorage.setItem(`tibiaMounts_${charName}`, JSON.stringify(tamedIds));
  };

  const toggleMount = (mountId: string) => {
    setMounts(prev => {
      const next = prev.map(m => m.id === mountId ? { ...m, tamed: !m.tamed } : m);
      saveMounts(next);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return mounts.filter(m => {
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === 'all' || m.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [mounts, search, categoryFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalTamed = mounts.filter(m => m.tamed).length;
  const percentage = mounts.length > 0 ? Math.round((totalTamed / mounts.length) * 100) : 0;

  const getCategoryLabel = (cat: MountCategory) => {
    const info = mountCategories[cat];
    return info?.label['pt-BR'] || cat;
  };

  const allCategories: (MountCategory | 'all')[] = ['all', ...Object.keys(mountCategories) as MountCategory[]];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-tibia-gold mb-2">{t('mounts.title')}</h1>
        <p className="text-gray-400 text-sm">{t('mounts.subtitle')}</p>

        <div className="mt-3 bg-tibia-dark rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">{t('mounts.progress')}</span>
            <span className="text-xs font-bold text-tibia-gold">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <motion.div
              className="bg-tibia-green h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {totalTamed} / {mounts.length} {t('mounts.tamed')}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder={t('mounts.search')}
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 bg-tibia-dark border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-tibia-accent"
        />
        <div className="flex gap-1 flex-wrap">
          {allCategories.map(cat => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setCategoryFilter(cat); setPage(1); }}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                categoryFilter === cat
                  ? 'bg-tibia-accent text-white'
                  : 'bg-tibia-dark border border-gray-700 text-gray-400 hover:border-gray-600'
              }`}
            >
              {cat === 'all' ? t('mounts.all') : mountCategories[cat as MountCategory]?.icon}{' '}
              {cat === 'all' ? t('mounts.all') : mountCategories[cat as MountCategory]?.label['pt-BR']}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3" layout>
        <AnimatePresence mode="popLayout">
          {paged.map((mount, i) => (
            <motion.div
              key={mount.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              className="bg-tibia-dark rounded-lg p-2 border border-gray-700 hover:border-tibia-accent/50 hover:shadow-lg hover:shadow-tibia-accent/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <Link to={`/mount/${mount.id}`} className="text-xs font-bold text-white truncate hover:text-tibia-gold transition-colors">
                  {mount.name}
                </Link>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => toggleMount(mount.id)}
                  className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                    mount.tamed
                      ? 'bg-tibia-green text-white'
                      : 'bg-gray-700 text-gray-500 hover:bg-gray-600'
                  }`}
                >
                  {mount.tamed ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                </motion.button>
              </div>

              <Link to={`/mount/${mount.id}`} className="block aspect-square bg-gray-800 rounded mb-1 overflow-hidden flex items-center justify-center">
                <img
                  src={mount.imageUrl}
                  alt={mount.name}
                  className="max-w-full max-h-full object-contain image-rendering-pixelated"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </Link>

              <div className="flex items-center justify-between">
                <span className={`text-[10px] px-1 py-0.5 rounded ${
                  mount.category === 'store' ? 'bg-purple-500/20 text-purple-400' :
                  mount.category === 'tameable' ? 'bg-green-500/20 text-green-400' :
                  mount.category === 'quest' ? 'bg-blue-500/20 text-blue-400' :
                  mount.category === 'event' ? 'bg-yellow-500/20 text-yellow-400' :
                  mount.category === 'invasion' ? 'bg-red-500/20 text-red-400' :
                  'bg-gray-700 text-gray-400'
                }`}>
                  {getCategoryLabel(mount.category)}
                </span>
                {mount.premium && (
                  <span className="text-[10px] text-tibia-gold">P</span>
                )}
              </div>

              {mount.items.length > 0 && (
                <div className="mt-1">
                  {mount.items.slice(0, 2).map((item, idx) => (
                    <span key={idx} className="text-[9px] text-gray-500 block truncate">{item.name}</span>
                  ))}
                  {mount.items.length > 2 && (
                    <span className="text-[9px] text-gray-500">+{mount.items.length - 2} {t('mounts.more')}</span>
                  )}
                </div>
              )}

              {mount.requirements.length > 0 && (
                <div className="mt-1">
                  {mount.requirements.slice(0, 1).map((req, idx) => (
                    <span key={idx} className="text-[9px] text-gray-500 block truncate">{req}</span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 bg-tibia-dark border border-gray-700 rounded hover:border-tibia-accent disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-gray-400" />
          </motion.button>
          <span className="text-sm text-gray-400">
            {page} / {totalPages}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1.5 bg-tibia-dark border border-gray-700 rounded hover:border-tibia-accent disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </motion.button>
        </div>
      )}

      <div className="mt-6 text-center">
        <a
          href="https://tibiawiki.com.br/wiki/Montarias"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs text-gray-500 hover:text-tibia-gold transition-colors"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          TibiaWiki BR ({filtered.length} {t('mounts.mounts')})
        </a>
      </div>
    </motion.div>
  );
}
