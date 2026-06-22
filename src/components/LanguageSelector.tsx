import { Globe } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export function LanguageSelector() {
  const { language, setLanguage } = useI18n();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-400" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'pt-BR' | 'en')}
        className="bg-tibia-darker border border-gray-700 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-tibia-accent"
      >
        <option value="pt-BR">🇧🇷 Português</option>
        <option value="en">🇺🇸 English</option>
      </select>
    </div>
  );
}
