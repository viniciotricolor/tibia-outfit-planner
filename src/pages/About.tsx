import { motion } from 'motion/react';
import { useI18n } from '../i18n/I18nContext';
import { Heart, Github, ExternalLink, Shield, Code, Database, Globe } from 'lucide-react';

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
            href="https://github.com/vinicio/tibia-outfit-planner"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Github className="h-4 w-4" />
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
