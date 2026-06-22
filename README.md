# Tibia Outfit Planner

Planejador completo de outfits do Tibia com preços do market, progresso e múltiplos personagens.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **132 outfits** do TibiaWiki BR com imagens reais
- **Ícones dos itens** via TibiaWiki
- **Preços do market** em tempo real (TibiaMarket API)
- **Atualização automática** às 21:00 diariamente
- **Múltiplos personagens** com save independente
- **Exportar/Importar** progresso via JSON
- **URL compartilhável** com progresso codificado
- **Favoritos** com filtro rápido
- **Modo compacto/expandido** para cards
- **Notificações browser** quando preços atualizam
- **Histórico de preços** com indicadores ↑/↓
- **Animações** com motion.dev
- **Internacionalização** PT-BR / EN

## Screenshots

<!-- Adicione screenshots aqui -->

## Tech Stack

- **Frontend:** React 19, TypeScript 6, Vite 8
- **Estilo:** Tailwind CSS 3
- **Animações:** motion.dev
- **Ícones:** Lucide React
- **Roteamento:** React Router DOM 7
- **API:** TibiaMarket (preços), TibiaWiki BR (imagens)

## Quick Start

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
├── context/          # React Context (estado global)
├── data/             # Dados dos outfits (132 outfits)
├── i18n/             # Internacionalização (PT-BR/EN)
├── pages/            # Páginas da aplicação
│   ├── Dashboard.tsx     # Lista de outfits com favoritos
│   ├── OutfitDetail.tsx  # Detalhe do outfit
│   ├── TotalItems.tsx    # Total de itens necessários
│   ├── FarmPlanner.tsx   # Planejamento de farm
│   ├── Changelog.tsx     # Histórico de versões
│   └── PrivacyPolicy.tsx # Política de Privacidade (LGPD)
├── services/         # Serviços (market API, wiki icons)
├── types/            # Tipos TypeScript
├── App.tsx           # Rotas e layout principal
└── main.tsx          # Entry point
```

## Como Funciona

### Preços do Market
- Busca preços da API do TibiaMarket
- Atualização automática diária às 21:00
- Botão para refresh manual
- Histórico de preços com indicadores de tendência

### Progresso
- Marque outfits e addons como concluídos
- Inventário de itens com controle de quantidade
- Barra de progresso geral
- Salva automaticamente no localStorage

### Múltiplos Personagens
- Crie quantos personagens quiser
- Cada um tem progresso independente
- Troque entre personagens no seletor do nav

### Compartilhar
- Gere um link com seu progresso
- Cole em qualquer lugar para compartilhar
- Quem abrir o link terá seu progresso carregado

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Privacidade (LGPD)

Este projeto está em conformidade com a Lei Geral de Proteção de Dados (LGPD):

- **Nenhum dado pessoal** é coletado
- Todos os dados ficam **exclusivamente no navegador** (localStorage)
- **Nenhum servidor** é utilizado — tudo roda localmente
- Botão de **exclusão total** disponível na página de Privacidade
- **Exportação** de dados em JSON disponível

Veja a [Política de Privacidade completa](https://seu-app.com/privacy) para mais detalhes.

Créditos:
- [TibiaWiki BR](https://www.tibiawiki.com.br) — Imagens dos outfits e itens
- [TibiaMarket](https://api.tibiamarket.top) — Preços do market
- [CipSoft GmbH](https://www.cipsoft.com) — Criadores do Tibia

## Contribuindo

Contribuições são bem-vindas! Abra uma issue ou pull request no GitHub.

---

Feito com ❤️ para a comunidade do Tibia.
