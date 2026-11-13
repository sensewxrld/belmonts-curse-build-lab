import { SourceItem } from '../types';

export const SOURCES_DATA: SourceItem[] = [
  // --- FONTES OFICIAIS ---
  {
    id: 'src-01',
    name: 'Konami — Portal Oficial de Belmont\'s Curse',
    url: 'https://www.konami.com/games/castlevania/belmonts_curse/us/pt/',
    category: 'Oficial',
    reliabilityLevel: 'Oficial',
    verificationDate: 'Novembro de 2026',
    gameVersion: 'v1.1.4',
    notes: 'Documentação primária da KONAMI, Evil Empire e Motion Twin com visões gerais de mecânicas de combate, regras de Arcanos e inventário.'
  },
  {
    id: 'src-02',
    name: 'Konami — Histórico de Atualizações & Notas do Patch 1.1.4',
    url: 'https://www.konami.com/games/castlevania/belmonts_curse/us/pt/update',
    category: 'Oficial',
    reliabilityLevel: 'Oficial',
    verificationDate: 'Novembro de 2026',
    gameVersion: 'v1.1.4',
    notes: 'Registra a alteração oficial no balanceamento da magia de Arcana Life Drain: redução de alcance excessivo e ajuste na velocidade de ticks de drenagem.'
  },
  {
    id: 'src-03',
    name: 'Steam Community — Comunicados Oficiais & Hotfixes PC',
    url: 'https://steamcommunity.com/app/4231820/announcements/',
    category: 'Oficial',
    reliabilityLevel: 'Oficial',
    verificationDate: 'Novembro de 2026',
    gameVersion: 'v1.1.4',
    notes: 'Notas de correção e estabilidade da versão Windows / Steam Deck. Confirmação do limite de 3 relíquias ativas por personagem.'
  },
  {
    id: 'src-04',
    name: 'PlayStation Blog Brasil — Revelação & Ecossistema de Combate',
    url: 'https://blog.br.playstation.com/2026/02/12/castlevania-belmonts-curse-sai-este-ano-para-o-ps5/',
    category: 'Oficial',
    reliabilityLevel: 'Oficial',
    verificationDate: 'Fevereiro / Novembro de 2026',
    gameVersion: 'v1.0 - v1.1.4',
    notes: 'Detalhes da colaboração entre Konami, Motion Twin e Evil Empire; confirmação do bônus exclusivo da Midnight Edition (Family\'s Grace).'
  },

  // --- GUIAS DE ARMAS E RELÍQUIAS ---
  {
    id: 'src-05',
    name: 'AllThings — Weapon Tier List & Dano Base Reportado',
    url: 'https://allthings.how/castlevania-belmont-s-curse-weapon-tier-list/',
    category: 'Guias de armas e relíquias',
    reliabilityLevel: 'Verificada em guias',
    verificationDate: 'Outubro / Novembro de 2026',
    gameVersion: 'v1.1.4',
    notes: 'Comparação de dano por golpe das 7 armas lendárias (Excalibur 44, Vampire Killer 40, Chauve-Souris 38, etc.). Nota editorial: dano por golpe não deve ser confundido com ATK de raridade.'
  },
  {
    id: 'src-06',
    name: 'AllThings — Todas as 28 Armas, Famílias e Movimentos',
    url: 'https://allthings.how/castlevania-belmont-s-curse-where-to-find-each-weapon-and-its-special-move/',
    category: 'Guias de armas e relíquias',
    reliabilityLevel: 'Verificada em guias',
    verificationDate: 'Novembro de 2026',
    gameVersion: 'v1.1.4',
    notes: 'Catalogação completa das 7 famílias com 4 armas cada (28 armas totais), habilidades especiais e condições de desbloqueio em baús e arenas.'
  },
  {
    id: 'src-07',
    name: 'AllThings — Relic Tier List & Passivas de Combate',
    url: 'https://allthings.how/castlevania-belmont-s-curse-best-relics-tier-list/',
    category: 'Guias de armas e relíquias',
    reliabilityLevel: 'Verificada em guias',
    verificationDate: 'Novembro de 2026',
    gameVersion: 'v1.1.4',
    notes: 'Classificação editorial de Witch\'s Knot, Twilight Gem, Obsidian Fang e outras 14 relíquias. Percentuais verificados em testes de bancada.'
  },
  {
    id: 'src-08',
    name: 'Power Up Gaming — Best Weapons & Relics Synergy Guide',
    url: 'https://powerupgaming.co.uk/2026/10/16/best-weapons-relics-in-castlevania-belmonts-curse/',
    category: 'Guias de armas e relíquias',
    reliabilityLevel: 'Verificada em guias',
    verificationDate: '16 de Outubro de 2026',
    gameVersion: 'v1.1.2',
    notes: 'Análise de sinergias entre armas rápidas (soqueiras e espadas duplas) e relíquias com efeito de acúmulo como Vile Trinket.'
  },
  {
    id: 'src-09',
    name: 'NoobFeed — Best Weapons & Famílias de Combate',
    url: 'https://www.noobfeed.com/articles/castlevania-belmonts-curse-best-weapons',
    category: 'Guias de armas e relíquias',
    reliabilityLevel: 'Verificada em guias',
    verificationDate: 'Outubro de 2026',
    gameVersion: 'v1.1.0',
    notes: 'Guia tático de pontos fortes e fracos de cada arquétipo de arma (Espadão, Lança, Chicote, etc.).'
  },
  {
    id: 'src-10',
    name: 'iTechGuides — Best Weapon Upgrades and Builds',
    url: 'https://www.itechguides.com/best-weapon-upgrades-and-builds-for-every-character-in-castlevania-belmonts-curse/',
    category: 'Guias de armas e relíquias',
    reliabilityLevel: 'Teoria de build',
    verificationDate: 'Novembro de 2026',
    gameVersion: 'v1.1.4',
    notes: 'Sujestões e teorias de sinergia entre classes de equipamentos e estilos agressivos versus defensivos.'
  },
  {
    id: 'src-11',
    name: 'SlashKeys — Best Builds & Setup Theory',
    url: 'https://slashkeys.com/guides/castlevania-belmonts-curse/best-builds',
    category: 'Guias de armas e relíquias',
    reliabilityLevel: 'Teoria de build',
    verificationDate: 'Novembro de 2026',
    gameVersion: 'v1.1.4',
    notes: 'Base das 8 configurações de teoria de build (Boss Killer, DPS de combo, Equilíbrio, etc.). Registro explícito de limitações e custos de mana.'
  },

  // --- GUIAS DE ARCANOS E CHEFES ---
  {
    id: 'src-12',
    name: 'Castlevania Belmont\'s Curse Guide (Wiki Independente) — Tarot Mysteries Tier List',
    url: 'https://www.castlevaniabelmontscurse.fit/guides/tarot-mysteries-tier-list',
    category: 'Guias de Arcanos e chefes',
    reliabilityLevel: 'Verificada em guias',
    verificationDate: 'Novembro de 2026',
    gameVersion: 'v1.1.4',
    notes: 'Wiki comunitária independente (não oficial da Konami). Classificação de utilidade das 16 cartas arcanas.'
  },
  {
    id: 'src-13',
    name: 'Castlevania Belmont\'s Curse Guide — Arcane Tools Tier List',
    url: 'https://www.castlevaniabelmontscurse.fit/guides/arcane-tools-tier-list',
    category: 'Guias de Arcanos e chefes',
    reliabilityLevel: 'Verificada em guias',
    verificationDate: 'Novembro de 2026',
    gameVersion: 'v1.1.4',
    notes: 'Análise de custos de mana, tempo de conjuração e interrupção de ataques de chefes.'
  },
  {
    id: 'src-14',
    name: 'Castlevania Belmont\'s Curse Guide — Condições de Melhoria das Magias',
    url: 'https://www.castlevaniabelmontscurse.fit/guides/all-spells-upgrade-conditions',
    category: 'Guias de Arcanos e chefes',
    reliabilityLevel: 'Verificada em guias',
    verificationDate: 'Novembro de 2026',
    gameVersion: 'v1.1.4',
    notes: 'Requisitos de Nível 2 e Nível 3 para as 16 cartas de Arcana do jogo.'
  },
  {
    id: 'src-15',
    name: 'Castlevania Belmont\'s Curse Guide — Desbloqueio das 16 Magias',
    url: 'https://www.castlevaniabelmontscurse.fit/guides/all-arcana-card-spells-unlock',
    category: 'Guias de Arcanos e chefes',
    reliabilityLevel: 'Verificada em guias',
    verificationDate: 'Novembro de 2026',
    gameVersion: 'v1.1.4',
    notes: 'Localizações exatas de altares, tumbas e puzzles para destravar cada feitiço.'
  },
  {
    id: 'src-16',
    name: 'GAMES.GG — Guia Completo dos 13 Chefes & Vulnerabilidades',
    url: 'https://games.gg/castlevania-belmonts-curse/guides/all-bosses-guide/',
    category: 'Guias de Arcanos e chefes',
    reliabilityLevel: 'Verificada em guias',
    verificationDate: 'Novembro de 2026',
    gameVersion: 'v1.1.4',
    notes: 'Vida reportada, janelas de fraqueza, imunidades a fogo/sangramento/controle e recomendações de confronto.'
  },
  {
    id: 'src-17',
    name: 'Mobalytics — Medusa Boss Strategy Guide',
    url: 'https://mobalytics.gg/gamebase/guides/castlevania-belmont-curse-medusa-boss',
    category: 'Guias de Arcanos e chefes',
    reliabilityLevel: 'Verificada em guias',
    verificationDate: 'Novembro de 2026',
    gameVersion: 'v1.1.4',
    notes: 'Estratégia dedicada ao confronto com Medusa. Recomenda explicitamente a Lança (Chauve-Souris) e Holy Cross (Sacred Cross) com Raven\'s Feather para punição aérea segura.'
  }
];
