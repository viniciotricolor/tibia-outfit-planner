import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n/I18nContext';
import { Check, X, ExternalLink, ChevronLeft, ChevronRight, Star, Download, Upload, LayoutGrid, LayoutList, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PAGE_SIZE = 24;

export default function Dashboard() {
  const {
    outfits, getProgress, toggleOutfitCompleted, toggleAddonCompleted,
    favorites, toggleFavorite, cardMode, toggleCardMode,
    exportProgress, importProgress, generateShareUrl,
  } = useApp();
  const { t } = useI18n();
  const progress = getProgress();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [importMsg, setImportMsg] = useState('');
  const [shareMsg, setShareMsg] = useState('');

  const filtered = useMemo(() => {
    return outfits.filter(o => {
      const matchSearch = o.name.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'all' || o.type === typeFilter;
      const matchFav = !showFavoritesOnly || favorites.includes(o.id);
      return matchSearch && matchType && matchFav;
    });
  }, [outfits, search, typeFilter, showFavoritesOnly, favorites]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const getAddonLabel = (addonName: string) => {
    if (addonName === 'First') return t('dashboard.firstAddon');
    return t('dashboard.secondAddon');
  };

  const types = ['all', 'normal', 'premium', 'quest', 'store', 'event'] as const;

  const handleExport = () => {
    const json = exportProgress();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tibia-outfit-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const text = ev.target?.result as string;
          const ok = importProgress(text);
          setImportMsg(ok ? t('dashboard.importSuccess') : t('dashboard.importError'));
          setTimeout(() => setImportMsg(''), 3000);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleShare = () => {
    const url = generateShareUrl();
    navigator.clipboard.writeText(url).then(() => {
      setShareMsg(t('dashboard.shareCopied'));
      setTimeout(() => setShareMsg(''), 3000);
    });
  };

  const CompactCard = ({ outfit, index }: { outfit: typeof outfits[0]; index: number }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className="bg-tibia-dark rounded-lg p-2 border border-gray-700 hover:border-tibia-accent/50 hover:shadow-lg hover:shadow-tibia-accent/10 transition-colors"
    >
      <div className="flex items-center justify-between mb-1">
        <Link to={`/outfit/${outfit.id}`} className="text-xs font-bold text-white hover:text-tibia-gold transition-colors truncate">
          {outfit.name}
        </Link>
        <div className="flex items-center gap-0.5">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => toggleFavorite(outfit.id)}
            className="w-5 h-5 rounded flex items-center justify-center transition-colors"
          >
            <Star className={`h-3 w-3 ${favorites.includes(outfit.id) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => toggleOutfitCompleted(outfit.id)}
            className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
              outfit.completed
                ? 'bg-tibia-green text-white'
                : 'bg-gray-700 text-gray-500 hover:bg-gray-600'
            }`}
          >
            {outfit.completed ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
          </motion.button>
        </div>
      </div>

      <Link to={`/outfit/${outfit.id}`} className="block aspect-square bg-gray-800 rounded mb-1 overflow-hidden">
        {outfit.baseImage ? (
          <img
            src={outfit.baseImage}
            alt={outfit.name}
            className="w-full h-full object-contain image-rendering-pixelated"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-2xl">
            👤
          </div>
        )}
      </Link>

      <div className="flex gap-1">
        {outfit.addons.map(addon => (
          <motion.button
            key={addon.name}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleAddonCompleted(outfit.id, addon.name)}
            className={`flex-1 flex items-center justify-center px-1 py-0.5 rounded text-[10px] transition-colors ${
              addon.completed
                ? 'bg-tibia-green/20 text-tibia-green'
                : 'bg-gray-700 text-gray-500 hover:bg-gray-600'
            }`}
          >
            {addon.completed ? <Check className="h-2.5 w-2.5 mr-0.5" /> : <X className="h-2.5 w-2.5 mr-0.5" />}
            {getAddonLabel(addon.name)}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const ExpandedCard = ({ outfit, index }: { outfit: typeof outfits[0]; index: number }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-tibia-dark rounded-lg p-4 border border-gray-700 hover:border-tibia-accent/50 hover:shadow-xl hover:shadow-tibia-accent/10 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <Link to={`/outfit/${outfit.id}`} className="text-lg font-bold text-white hover:text-tibia-gold transition-colors">
          {outfit.name}
        </Link>
        <div className="flex items-center gap-1">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => toggleFavorite(outfit.id)}
            className="w-7 h-7 rounded flex items-center justify-center transition-colors"
          >
            <Star className={`h-4 w-4 ${favorites.includes(outfit.id) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleOutfitCompleted(outfit.id)}
            className={`flex items-center px-2 py-1 rounded text-xs font-medium transition-colors ${
              outfit.completed
                ? 'bg-tibia-green text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            {outfit.completed ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                {t('detail.complete')}
              </>
            ) : (
              t('detail.mark')
            )}
          </motion.button>
        </div>
      </div>

      <Link to={`/outfit/${outfit.id}`} className="block aspect-square bg-gray-800 rounded-lg mb-3 overflow-hidden">
        {outfit.baseImage ? (
          <img
            src={outfit.baseImage}
            alt={outfit.name}
            className="w-full h-full object-contain image-rendering-pixelated"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-4xl">
            👤
          </div>
        )}
      </Link>

      <div className="space-y-2">
        <div className="flex items-center text-sm">
          <span className="text-gray-400 w-16">{t('dashboard.type')}:</span>
          <span className="text-white capitalize">{outfit.type}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-400 w-16">{t('dashboard.city')}:</span>
          <span className="text-white">{outfit.city}</span>
        </div>

        <div className="pt-2 border-t border-gray-700">
          <div className="flex gap-2">
            {outfit.addons.map(addon => (
              <motion.button
                key={addon.name}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleAddonCompleted(outfit.id, addon.name)}
                className={`flex-1 flex items-center justify-center px-2 py-1 rounded text-xs transition-colors ${
                  addon.completed
                    ? 'bg-tibia-green/20 text-tibia-green'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                {addon.completed ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                {getAddonLabel(addon.name)}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-tibia-gold mb-2">{t('dashboard.title')}</h1>
        <p className="text-gray-400 text-sm">{t('dashboard.subtitle')}</p>

        <div className="mt-3 bg-tibia-dark rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">{t('dashboard.progress')}</span>
            <span className="text-xs font-bold text-tibia-gold">{progress.percentage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <motion.div
              className="bg-tibia-green h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress.percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {progress.outfitsCompleted} / {progress.totalOutfits} {t('dashboard.completed')}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder={t('items.search')}
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 bg-tibia-dark border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-tibia-accent"
        />
        <div className="flex gap-1 flex-wrap">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { setShowFavoritesOnly(!showFavoritesOnly); setPage(1); }}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              showFavoritesOnly
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                : 'bg-tibia-dark border border-gray-700 text-gray-400 hover:border-gray-600'
            }`}
          >
            <Star className="h-3 w-3 inline mr-1" />
            {favorites.length}
          </motion.button>
          {types.map(type => (
            <motion.button
              key={type}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setTypeFilter(type); setPage(1); }}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                typeFilter === type
                  ? 'bg-tibia-accent text-white'
                  : 'bg-tibia-dark border border-gray-700 text-gray-400 hover:border-gray-600'
              }`}
            >
              {type === 'all' ? t('dashboard.all') : t(`type.${type}`)}
            </motion.button>
          ))}
          <motion.button
            whileTap={{ scale: 0.95, rotate: 90 }}
            onClick={toggleCardMode}
            className="px-2 py-1 rounded text-xs font-medium bg-tibia-dark border border-gray-700 text-gray-400 hover:border-gray-600 transition-colors"
            title={cardMode === 'compact' ? t('dashboard.expanded') : t('dashboard.compact')}
          >
            {cardMode === 'compact' ? <LayoutGrid className="h-3 w-3" /> : <LayoutList className="h-3 w-3" />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className="px-2 py-1 rounded text-xs font-medium bg-tibia-dark border border-gray-700 text-gray-400 hover:border-gray-600 transition-colors"
            title={t('dashboard.export')}
          >
            <Download className="h-3 w-3" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleImport}
            className="px-2 py-1 rounded text-xs font-medium bg-tibia-dark border border-gray-700 text-gray-400 hover:border-gray-600 transition-colors"
            title={t('dashboard.import')}
          >
            <Upload className="h-3 w-3" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="px-2 py-1 rounded text-xs font-medium bg-tibia-dark border border-gray-700 text-gray-400 hover:border-gray-600 transition-colors"
            title={t('dashboard.share')}
          >
            <Share2 className="h-3 w-3" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {importMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-4 px-3 py-2 rounded text-sm ${importMsg.includes('✓') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
          >
            {importMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {shareMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 px-3 py-2 rounded text-sm bg-blue-500/20 text-blue-400"
          >
            {shareMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {cardMode === 'compact' ? (
        <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3" layout>
          <AnimatePresence mode="popLayout">
            {paged.map((outfit, i) => (
              <CompactCard key={outfit.id} outfit={outfit} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" layout>
          <AnimatePresence mode="popLayout">
            {paged.map((outfit, i) => (
              <ExpandedCard key={outfit.id} outfit={outfit} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

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
          href="https://www.tibiawiki.com.br/wiki/Outfits"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs text-gray-500 hover:text-tibia-gold transition-colors"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          TibiaWiki BR ({filtered.length} {t('dashboard.outfits')})
        </a>
      </div>
    </motion.div>
  );
}
