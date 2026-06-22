import { motion } from 'motion/react';
import { useI18n } from '../i18n/I18nContext';
import { Heart, ExternalLink, Shield, Code, Database, Globe } from 'lucide-react';

export default function About() {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-tibia-gold mb-2">{t('about.title')}</h1>
        <p className="text-gray-400">{t('about.subtitle')}</p>
      </div>

      <div className="space-y-6">
        <div className="bg-tibia-dark rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-6 w-6 text-red-400" />
            <h2 className="text-xl font-bold text-white">{t('about.whatIs')}</h2>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            {t('about.whatIsText')}
          </p>
        </div>

        <div className="bg-tibia-dark rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Code className="h-5 w-5 text-blue-400" />
            {t('about.techStack')}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <TechItem name="React 19" desc="UI Framework" />
            <TechItem name="TypeScript 6" desc="Type Safety" />
            <TechItem name="Vite 8" desc="Build Tool" />
            <TechItem name="Tailwind CSS 3" desc="Styling" />
            <TechItem name="motion.dev" desc="Animations" />
            <TechItem name="React Router 7" desc="Routing" />
            <TechItem name="Lucide React" desc="Icons" />
            <TechItem name="TibiaMarket API" desc="Market Prices" />
          </div>
        </div>

        <div className="bg-tibia-dark rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Database className="h-5 w-5 text-green-400" />
            {t('about.features')}
          </h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-tibia-green mt-0.5">✓</span>
              {t('about.feature1')}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-tibia-green mt-0.5">✓</span>
              {t('about.feature2')}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-tibia-green mt-0.5">✓</span>
              {t('about.feature3')}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-tibia-green mt-0.5">✓</span>
              {t('about.feature4')}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-tibia-green mt-0.5">✓</span>
              {t('about.feature5')}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-tibia-green mt-0.5">✓</span>
              {t('about.feature6')}
            </li>
          </ul>
        </div>

        <div className="bg-tibia-dark rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-yellow-400" />
            {t('about.privacy')}
          </h2>
          <p className="text-gray-300 text-sm">
            {t('about.privacyText')}
          </p>
        </div>

        <div className="bg-tibia-dark rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-purple-400" />
            {t('about.credits')}
          </h2>
          <div className="space-y-3 text-sm">
            <CreditItem name="TibiaWiki BR" url="https://www.tibiawiki.com.br" desc={t('about.creditWiki')} />
            <CreditItem name="TibiaMarket" url="https://api.tibiamarket.top" desc={t('about.creditMarket')} />
            <CreditItem name="CipSoft GmbH" url="https://www.cipsoft.com" desc={t('about.creditCipsoft')} />
          </div>
        </div>

        <div className="text-center pt-4">
          <a
            href="https://github.com/viniciotricolor/tibia-outfit-planner"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <p className="text-center text-xs text-gray-600 pt-4">
          {t('about.madeWith')} ❤️ {t('about.for')} Tibia
        </p>
      </div>
    </motion.div>
  );
}

function TechItem({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="bg-tibia-darker rounded-lg p-3 border border-gray-700">
      <p className="text-white font-medium text-sm">{name}</p>
      <p className="text-gray-500 text-xs">{desc}</p>
    </div>
  );
}

function CreditItem({ name, url, desc }: { name: string; url: string; desc: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-2 rounded hover:bg-gray-800 transition-colors"
    >
      <div>
        <span className="text-tibia-gold font-medium">{name}</span>
        <span className="text-gray-500 ml-2">— {desc}</span>
      </div>
      <ExternalLink className="h-3 w-3 text-gray-500" />
    </a>
  );
}
