import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Shirt, Calculator, Package, Map, Globe, RefreshCw, Info, Bell, BellOff, Users, Plus, Trash2, BookOpen, Shield, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import Dashboard from './pages/Dashboard';
import OutfitDetail from './pages/OutfitDetail';
import TotalItems from './pages/TotalItems';
import FarmPlanner from './pages/FarmPlanner';
import Changelog from './pages/Changelog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import About from './pages/About';
import { AppProvider } from './context/AppProvider';
import { useApp } from './context/AppContext';
import { I18nProvider, useI18n } from './i18n/I18nContext';
import { LanguageSelector } from './components/LanguageSelector';

function NotificationToggle() {
  const { notificationsEnabled, toggleNotifications } = useApp();

  return (
    <button
      onClick={toggleNotifications}
      className="p-1.5 rounded transition-colors"
      title={notificationsEnabled ? 'Notificações ativadas' : 'Notificações desativadas'}
    >
      {notificationsEnabled ? (
        <Bell className="h-4 w-4 text-tibia-gold" />
      ) : (
        <BellOff className="h-4 w-4 text-gray-500" />
      )}
    </button>
  );
}

function CharacterSelector() {
  const { currentCharacter, characters, switchCharacter, createCharacter, deleteCharacter } = useApp();
  const [newChar, setNewChar] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleCreate = () => {
    if (newChar.trim()) {
      createCharacter(newChar.trim());
      setNewChar('');
      setShowInput(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Users className="h-4 w-4 text-gray-400" />
      <select
        value={currentCharacter}
        onChange={(e) => switchCharacter(e.target.value)}
        className="bg-tibia-darker border border-gray-700 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-tibia-accent"
      >
        {characters.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      {characters.length > 1 && (
        <button
          onClick={() => deleteCharacter(currentCharacter)}
          className="p-1 rounded text-gray-500 hover:text-red-400 transition-colors"
          title="Excluir personagem"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      )}
      {showInput ? (
        <div className="flex items-center gap-1">
          <input
            type="text"
            value={newChar}
            onChange={e => setNewChar(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCreate()}
            placeholder="Nome"
            className="w-20 bg-tibia-darker border border-gray-700 rounded px-1 py-0.5 text-xs text-white focus:outline-none focus:border-tibia-accent"
            autoFocus
          />
          <button onClick={handleCreate} className="text-tibia-green text-xs">✓</button>
          <button onClick={() => setShowInput(false)} className="text-gray-500 text-xs">✗</button>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="p-1 rounded text-gray-500 hover:text-tibia-gold transition-colors"
          title="Novo personagem"
        >
          <Plus className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

function WorldSelector() {
  const { worlds, selectedWorld, setSelectedWorld, loading, refreshMarketPrices } = useApp();
  const { t } = useI18n();
  
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-gray-400" />
        <select
          value={selectedWorld}
          onChange={(e) => setSelectedWorld(e.target.value)}
          disabled={loading}
          className="bg-tibia-darker border border-gray-700 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-tibia-accent disabled:opacity-50"
        >
          {worlds.map(world => (
            <option key={world.name} value={world.name}>
              {world.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => refreshMarketPrices()}
          disabled={loading}
          className="p-1.5 bg-tibia-darker border border-gray-700 rounded hover:border-tibia-accent transition-colors disabled:opacity-50"
          title={t('market.refresh')}
        >
          <RefreshCw className={`h-4 w-4 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      {loading && (
        <div className="w-4 h-4 border-2 border-tibia-gold border-t-transparent rounded-full animate-spin" />
      )}
    </div>
  );
}

function AppContent() {
  const { t } = useI18n();
  const { nextUpdate } = useApp();
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-tibia-darker text-white">
      <nav className="bg-tibia-dark border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shirt className="h-8 w-8 text-tibia-accent" />
              <span className="ml-2 text-xl font-bold text-tibia-gold">Tibia Outfit Planner</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-tibia-accent text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <Shirt className="h-4 w-4 mr-1" />
                {t('nav.outfits')}
              </NavLink>
              <NavLink
                to="/items"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-tibia-accent text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <Calculator className="h-4 w-4 mr-1" />
                {t('nav.totalItems')}
              </NavLink>
              <NavLink
                to="/inventory"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-tibia-accent text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <Package className="h-4 w-4 mr-1" />
                {t('nav.inventory')}
              </NavLink>
              <NavLink
                to="/farm"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-tibia-accent text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <Map className="h-4 w-4 mr-1" />
                {t('nav.farmPlanner')}
              </NavLink>
              <NavLink
                to="/changelog"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-tibia-accent text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <BookOpen className="h-4 w-4 mr-1" />
                {t('nav.changelog')}
              </NavLink>
              <NavLink
                to="/privacy"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-tibia-accent text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <Shield className="h-4 w-4 mr-1" />
                {t('nav.privacy')}
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-tibia-accent text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <Heart className="h-4 w-4 mr-1" />
                {t('nav.about')}
              </NavLink>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <CharacterSelector />
              <NotificationToggle />
              <WorldSelector />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-tibia-blue/10 border border-tibia-blue/30 rounded-lg px-4 py-2 mb-6 flex items-center gap-2 text-sm text-tibia-blue"
        >
          <Info className="h-4 w-4 flex-shrink-0" />
          <span>
            {t('market.dailyUpdate')} {t('market.nextUpdate')}: {formatDate(nextUpdate)} às {formatTime(nextUpdate)}
          </span>
        </motion.div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/outfit/:id" element={<OutfitDetail />} />
          <Route path="/items" element={<TotalItems />} />
          <Route path="/inventory" element={<TotalItems />} />
          <Route path="/farm" element={<FarmPlanner />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </I18nProvider>
  );
}

export default App;
