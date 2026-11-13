import { BuildPreset } from '../types';

export const BUILDS_DATA: BuildPreset[] = [
  {
    id: 'build-01',
    code: 'BUILD 01',
    title: 'Equilíbrio Ancestral',
    playstyle: 'Equilíbrio e Versatilidade',
    description: 'A clássica formação Belmont. Combina o alcance versátil do Vampire Killer com a pureza sagrada de Purification, sustentada pelo fluxo contínuo de mana do Nó da Bruxa e pelo poder misto da Gema do Crepúsculo e Runa Sinistra.',
    weaponId: 'vampire-killer',
    arcanaId: 'purification',
    relicIds: ['witchs-knot', 'twilight-gem', 'sinister-rune'],
    isTheoryCraft: true,
    highlights: [
      'Controle exemplar de distâncias curtas e médias',
      'Purificação contínua de maldições e projéteis inimigos',
      'Excelente desempenho sem pontos fracos críticos aparentes'
    ],
    recommendedBosses: ['death', 'carmilla', 'dracula']
  },
  {
    id: 'build-02',
    code: 'BUILD 02',
    title: 'Boss Killer (Algoz de Titãs)',
    playstyle: 'Alto Dano / Destruição de Chefes',
    description: 'Focada em dizimar barras de vida de chefes no menor tempo possível. O dano colossal de 44 da Excalibur é multiplicado pelo atordoamento e vulnerabilidade das Correntes da Justiça, potencializado pela Presa de Obsidiana em alvos saudáveis.',
    weaponId: 'excalibur',
    arcanaId: 'chains-of-justice',
    relicIds: ['twilight-gem', 'sinister-rune', 'obsidian-fang'],
    isTheoryCraft: true,
    highlights: [
      'Maior poder de impacto físico único do jogo',
      'Vulnerabilidade garantida em chefes com Chains of Justice (+25% de dano)',
      'Penetração severa de couraças com Obsidian Fang'
    ],
    recommendedBosses: ['talos', 'saint-louis', 'mammon', 'arthur']
  },
  {
    id: 'build-03',
    code: 'BUILD 03',
    title: 'DPS de Combo Frenético',
    playstyle: 'DPS Contínuo & Agilidade Extrema',
    description: 'Uma tempestade ininterrupta de golpes cortantes. Com War and Famine e os acúmulos de Fúria do Vile Trinket, o jogador atinge taxas astronômicas de dano sustentado enquanto as Chains of Justice mantêm o alvo imobilizado.',
    weaponId: 'war-and-famine',
    arcanaId: 'chains-of-justice',
    relicIds: ['twilight-gem', 'vile-trinket', 'obsidian-fang'],
    isTheoryCraft: true,
    highlights: [
      'Cadência máxima de golpes acumulando dano progressivo',
      'Acúmulo rápido do Vile Trinket (até +24% dano)',
      'Mobilidade e evasão perfeitas em curta distância'
    ],
    recommendedBosses: ['doppelganger', 'joan', 'isaac']
  },
  {
    id: 'build-04',
    code: 'BUILD 04',
    title: 'Combo e Recuperação Vital',
    playstyle: 'Brawler com Autossustentação',
    description: 'Estilo colado e implacável com as soqueiras de Bernhard. As vinhas drenadoras de Blood Thorns e a velocidade de socos ativam o Vile Trinket e restauram constantemente a integridade física do guerreiro sem depender de poções.',
    weaponId: 'bernhards-wrath',
    arcanaId: 'blood-thorns',
    relicIds: ['witchs-knot', 'twilight-gem', 'vile-trinket'],
    isTheoryCraft: true,
    highlights: [
      'Recuperação contínua de vida ao longo de combos prolongados',
      'Imobilização com espinhos carmesim mantendo o alvo no raio de socos',
      'Excelente sobrevivência em arenas fechadas'
    ],
    recommendedBosses: ['succubus', 'brauner', 'arthur']
  },
  {
    id: 'build-05',
    code: 'BUILD 05',
    title: 'Bastião Defensivo Absoluto',
    playstyle: 'Defesa e Contra-ataque Tático',
    description: 'Inspirada no estilo nobre de Alucard. Utiliza o escudo impenetrável aliado aos teletransportes táticos e i-frames de Mirrorwalk. Com Dark Sigil e Mind Relic, a absorção de impacto vira contra-ataque rápido.',
    weaponId: 'alucards-sword-and-shield',
    arcanaId: 'mirrorwalk',
    relicIds: ['witchs-knot', 'dark-sigil', 'mind-relic'],
    isTheoryCraft: true,
    highlights: [
      'Guarda perfeita com bloqueio total de dano físico e mágico',
      'Deslocamento dimensional de 1.5s com Mirrorwalk em janelas de perigo',
      'Consumo mínimo de mana e recuperação de postura inabalável'
    ],
    recommendedBosses: ['dracula', 'death', 'carmilla']
  },
  {
    id: 'build-06',
    code: 'BUILD 06',
    title: 'Sentinela de Longo Alcance',
    playstyle: 'Combate à Distância e Segurança Tática',
    description: 'Mantenha os perigos à distância segura do tridente Chauve-Souris enquanto Sacred Cross retalha o campo de batalha. Com Raven\'s Feather, os projéteis voam mais longe e mais velozes, garantindo controle aéreo total.',
    weaponId: 'chauve-souris',
    arcanaId: 'sacred-cross',
    relicIds: ['ravens-feather', 'twilight-gem', 'witchs-knot'],
    isTheoryCraft: true,
    highlights: [
      'Maior alcance linear de combate do arsenal',
      'Excelente contra chefes voadores e projéteis flutuantes',
      'Segurança incomparável contra investidas frontais'
    ],
    recommendedBosses: ['medusa', 'death', 'succubus']
  },
  {
    id: 'build-07',
    code: 'BUILD 07',
    title: 'Controle de Hordas e Caos em Área',
    playstyle: 'Controle de Grupos (AoE)',
    description: 'Desenvolvida para limpar salas apinhadas de esqueletos, cavaleiros e aberrações. O martelo colossal de Talos e o alcance largo de Excalibur criam ondas de choque que detonam os corpos com Necro Charm e Abyssal Eye.',
    weaponId: 'excalibur',
    arcanaId: 'talos-hammer',
    relicIds: ['twilight-gem', 'abyssal-eye', 'necro-charm'],
    isTheoryCraft: true,
    highlights: [
      'Raio de impacto expandido em 35% com o Olho Abissal',
      'Detonações em cadeia de cadáveres gerando 45 de dano adicional',
      'Quebra de escudos e barreiras em área inteira'
    ],
    recommendedBosses: ['joan', 'mammon', 'talos']
  },
  {
    id: 'build-08',
    code: 'BUILD 08',
    title: 'Navegação e Exploração das Criptas',
    playstyle: 'Exploração, Segredos e Tesouros',
    description: 'Voltada para descobrir passagens secretas, paredes quebráveis e recolher drops valiosos. Mirrorwalk permite ultrapassar armadilhas e grades, enquanto a Crypt Key e Gloomstone facilitam emboscadas e revelam tesouros ocultos.',
    weaponId: 'vampire-killer',
    arcanaId: 'mirrorwalk',
    relicIds: ['crypt-key', 'gloomstone', 'witchs-knot'],
    isTheoryCraft: true,
    highlights: [
      'Detecção de passagens secretas e arcas a 15 metros no minimapa',
      '+40% na taxa de drop de itens raros e ouro de monstros',
      'Silêncio e mobilidade fantasmagórica por corredores hostis'
    ],
    recommendedBosses: ['doppelganger', 'isaac']
  }
];
