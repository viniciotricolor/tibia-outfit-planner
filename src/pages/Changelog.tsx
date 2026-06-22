import { motion } from 'motion/react';
import { useI18n } from '../i18n/I18nContext';
import { Tag, Calendar, Plus, Wrench, Sparkles, BookOpen } from 'lucide-react';

interface ChangelogEntry {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  changes: { icon: React.ReactNode; text: string }[];
}

const changelog: ChangelogEntry[] = [
  {
    version: '2.1.0',
    date: '2026-06-22',
    type: 'minor',
    changes: [
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Nova aba de Montarias com 110+ montarias do TibiaWiki' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Rastreamento de montarias domadas por personagem' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Filtro por 12 categorias (Domáveis, Store, Quests, Eventos, etc.)' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Barra de progresso de montarias' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Página de detalhe da montaria com itens de doma e preços' },
      { icon: <Wrench className="h-4 w-4 text-blue-400" />, text: 'Itens de montaria incluídos no Total de Itens (toggle)' },
      { icon: <Wrench className="h-4 w-4 text-blue-400" />, text: 'Busca por nome de montaria' },
      { icon: <Wrench className="h-4 w-4 text-blue-400" />, text: 'Paginação e animações nos cards de montaria' },
    ],
  },
  {
    version: '2.0.0',
    date: '2026-06-21',
    type: 'major',
    changes: [
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: '132 outfits do TibiaWiki BR com imagens reais' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Modo compacto/expandido para cards' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Sistema de favoritos com filtro' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Múltiplos personagens com save independente' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Exportar/Importar progresso via JSON' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'URL compartilhável com progresso' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Notificações browser às 21:00' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Ícones reais dos itens via TibiaWiki' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Histórico de preços com indicadores ↑/↓' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Animações com motion.dev' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Atualização automática de preços às 21:00' },
      { icon: <Wrench className="h-4 w-4 text-blue-400" />, text: 'Botão de refresh manual de preços' },
      { icon: <Wrench className="h-4 w-4 text-blue-400" />, text: 'Busca e paginação no Dashboard e FarmPlanner' },
      { icon: <Wrench className="h-4 w-4 text-blue-400" />, text: 'Filtro por tipo (Normal, Premium, Quest, Loja, Evento)' },
    ],
  },
  {
    version: '1.1.0',
    date: '2026-06-20',
    type: 'minor',
    changes: [
      { icon: <Plus className="h-4 w-4 text-green-400" />, text: 'Botão de atualização manual de preços' },
      { icon: <Plus className="h-4 w-4 text-green-400" />, text: 'Aviso de atualização diária às 21:00' },
      { icon: <Plus className="h-4 w-4 text-green-400" />, text: 'Outfits concluídos excluídos do Total de Itens' },
    ],
  },
  {
    version: '1.0.0',
    date: '2026-06-19',
    type: 'major',
    changes: [
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Lançamento inicial' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Dashboard com 17 outfits' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Página de Total de Itens com preços do market' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Farm Planner com ordem recomendada' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Detalhe do outfit com itens e preços' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Internacionalização PT-BR / EN' },
      { icon: <Sparkles className="h-4 w-4 text-yellow-400" />, text: 'Seletor de mundo com preços do TibiaMarket' },
    ],
  },
];

export default function Changelog() {
  const { t } = useI18n();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'major': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'minor': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'patch': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-tibia-gold mb-2">{t('changelog.title')}</h1>
        <p className="text-gray-400">{t('changelog.subtitle')}</p>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700" />

        <div className="space-y-8">
          {changelog.map((entry, entryIndex) => (
            <motion.div
              key={entry.version}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: entryIndex * 0.1 }}
              className="relative pl-12"
            >
              <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-tibia-gold border-2 border-tibia-darker" />

              <div className="bg-tibia-dark rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-tibia-gold" />
                    <span className="text-xl font-bold text-white">v{entry.version}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getTypeColor(entry.type)}`}>
                    {entry.type}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-sm ml-auto">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(entry.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </div>
                </div>

                <div className="space-y-2">
                  {entry.changes.map((change, changeIndex) => (
                    <motion.div
                      key={changeIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: entryIndex * 0.1 + changeIndex * 0.03 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="mt-0.5 flex-shrink-0">{change.icon}</span>
                      <span className="text-gray-300">{change.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://github.com/viniciotricolor/tibia-outfit-planner/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-tibia-gold transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          {t('changelog.viewOnGithub')}
        </a>
      </div>
    </motion.div>
  );
}
