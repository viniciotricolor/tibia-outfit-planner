import { motion } from 'motion/react';
import { useI18n } from '../i18n/I18nContext';
import { Shield, Database, Globe, Trash2, AlertTriangle, Eye, Lock } from 'lucide-react';
import { useState } from 'react';

export default function PrivacyPolicy() {
  const { t } = useI18n();
  const [deleted, setDeleted] = useState(false);

  const handleDeleteAll = () => {
    localStorage.removeItem('tibiaOutfitPlanner');
    localStorage.removeItem('tibiaOutfitWorld');
    localStorage.removeItem('tibiaOutfitLang');
    localStorage.removeItem('tibiaOutfitCharacters');
    localStorage.removeItem('tibiaOutfitCurrentChar');
    localStorage.removeItem('tibiaOutfitPriceHistory');
    // Clear all character data
    const chars = JSON.parse(localStorage.getItem('tibiaOutfitCharacters') || '[]');
    chars.forEach((c: string) => localStorage.removeItem(`tibiaOutfitPlanner_${c}`));
    localStorage.clear();
    setDeleted(true);
    setTimeout(() => window.location.reload(), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-tibia-gold mb-2 flex items-center gap-2">
          <Shield className="h-8 w-8" />
          {t('privacy.title')}
        </h1>
        <p className="text-gray-400">{t('privacy.lastUpdated')}: 21 de Junho de 2026</p>
      </div>

      <div className="space-y-6">
        {/* Dados Coletados */}
        <Section icon={<Database className="h-5 w-5 text-blue-400" />} title={t('privacy.section1.title')}>
          <p>{t('privacy.section1.text')}</p>
          <ul>
            <li>{t('privacy.section1.item1')}</li>
            <li>{t('privacy.section1.item2')}</li>
            <li>{t('privacy.section1.item3')}</li>
            <li>{t('privacy.section1.item4')}</li>
          </ul>
        </Section>

        {/* Dados NÃO Coletados */}
        <Section icon={<Eye className="h-5 w-5 text-green-400" />} title={t('privacy.section2.title')}>
          <p>{t('privacy.section2.text')}</p>
          <ul>
            <li>{t('privacy.section2.item1')}</li>
            <li>{t('privacy.section2.item2')}</li>
            <li>{t('privacy.section2.item3')}</li>
            <li>{t('privacy.section2.item4')}</li>
            <li>{t('privacy.section2.item5')}</li>
          </ul>
        </Section>

        {/* Armazenamento */}
        <Section icon={<Lock className="h-5 w-5 text-yellow-400" />} title={t('privacy.section3.title')}>
          <p>{t('privacy.section3.text')}</p>
          <ul>
            <li>{t('privacy.section3.item1')}</li>
            <li>{t('privacy.section3.item2')}</li>
            <li>{t('privacy.section3.item3')}</li>
          </ul>
        </Section>

        {/* API Externa */}
        <Section icon={<Globe className="h-5 w-5 text-purple-400" />} title={t('privacy.section4.title')}>
          <p>{t('privacy.section4.text')}</p>
          <ul>
            <li>{t('privacy.section4.item1')}</li>
            <li>{t('privacy.section4.item2')}</li>
            <li>{t('privacy.section4.item3')}</li>
          </ul>
        </Section>

        {/* Direitos do Usuário */}
        <Section icon={<AlertTriangle className="h-5 w-5 text-orange-400" />} title={t('privacy.section5.title')}>
          <p>{t('privacy.section5.text')}</p>
          <ul>
            <li>{t('privacy.section5.item1')}</li>
            <li>{t('privacy.section5.item2')}</li>
            <li>{t('privacy.section5.item3')}</li>
          </ul>
        </Section>

        {/* Botão Apagar */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
          <h3 className="text-lg font-bold text-red-400 mb-2 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            {t('privacy.deleteTitle')}
          </h3>
          <p className="text-gray-400 text-sm mb-4">{t('privacy.deleteText')}</p>

          {deleted ? (
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-green-400 text-sm">
              ✓ {t('privacy.deleteSuccess')}
            </div>
          ) : (
            <button
              onClick={handleDeleteAll}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Trash2 className="h-4 w-4 inline mr-2" />
              {t('privacy.deleteButton')}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-tibia-dark rounded-lg p-5 border border-gray-700">
      <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <div className="text-gray-300 text-sm space-y-2">
        {children}
      </div>
    </div>
  );
}
