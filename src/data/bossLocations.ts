export type BossLocationRegion =
  | 'Paris Streets'
  | "Holy Innocents' Cemetery"
  | 'Catacombs of Paris'
  | 'Main Hall'
  | 'Clock Tower'
  | 'Library'
  | 'Hall of Mirrors'
  | "Notre-Dame"
  | "Master's Quarters";

export interface BossEncounterLocation {
  id: string;
  bossId: string;
  name: string;
  encounterLabel: string;
  order: number;
  region: BossLocationRegion;
  subArea: string;
  arena: string;
  markerStep?: string;
  mirrorOfLife: string;
  approach: string;
  routeSteps?: string[];
  requirements: string[];
  battleStart: string;
  rewards: string[];
  sourceIds: ('boss-order' | 'boss-map' | 'belmont-atlas')[];
  verificationNote?: string;
  scripted?: boolean;
}

export const BOSS_LOCATION_SOURCES = {
  'boss-order': {
    label: 'All Things How · ordem e caminhos',
    url: 'https://allthings.how/castlevania-belmont-s-curse-boss-order-and-where-to-find-each-one/'
  },
  'boss-map': {
    label: 'All Things How · mapa de chefes e Mirrors',
    url: 'https://allthings.how/castlevania-belmonts-curse/map/bosses/'
  },
  'belmont-atlas': {
    label: "Belmont's Curse Atlas · chefes",
    url: 'https://belmontscursemap.com/bosses/'
  }
} as const;

export const BOSS_ENCOUNTERS: BossEncounterLocation[] = [
  {
    id: 'fallen-paris-01',
    bossId: 'the-fallen',
    name: 'The Fallen (Leon)',
    encounterLabel: 'Encontro único',
    order: 1,
    region: 'Paris Streets',
    subArea: 'Gate to the Catacombs',
    arena: 'Gate to the Catacombs',
    mirrorOfLife: 'Central Sewer Drain',
    approach: 'Passe pelo Sewer Reservoir e Path of the Rat; siga para leste a partir de Ancient Sewers até o portão.',
    routeSteps: ['Sewer Reservoir', 'Path of the Rat', 'Ancient Sewers', 'Gate to the Catacombs'],
    requirements: ['Objetivo ativo: “Stop the Monster Terrorizing the City”.'],
    battleStart: 'Aproxime-se do monstro no Gate to the Catacombs.',
    rewards: ['The Fallen Arcana (Holy Cross)', 'The Fallen’s Key', 'Arcane Whip'],
    sourceIds: ['boss-order', 'boss-map', 'belmont-atlas']
  },
  {
    id: 'medusa-cemetery-01',
    bossId: 'medusa',
    name: 'Medusa',
    encounterLabel: 'Encontro único',
    order: 2,
    region: "Holy Innocents' Cemetery",
    subArea: 'Ossuary of the Innocents',
    arena: 'Serpents’ Lair',
    mirrorOfLife: 'Ancient Sewers',
    approach: 'A partir de Central Sewer Drain, siga para oeste pelo Hot Springs e Roman Baths até o extremo sul do cemitério.',
    routeSteps: ['Central Sewer Drain', 'Hot Springs', 'Roman Baths', 'Serpents’ Lair'],
    requirements: ['Nenhum requisito adicional listado nas fontes consultadas.'],
    battleStart: 'Entre na Serpents’ Lair no Ossuary of the Innocents.',
    rewards: ['The Prophetess Arcana (Petrifying Gaze)', 'The Prophetess’s Key', 'Rusted Harpè and Aegis'],
    sourceIds: ['boss-order', 'boss-map', 'belmont-atlas']
  },
  {
    id: 'joan-paris-01',
    bossId: 'joan',
    name: 'Joan',
    encounterLabel: 'Primeiro encontro',
    order: 3,
    region: 'Paris Streets',
    subArea: 'Roof of the Tower',
    arena: 'Roof of the Tower',
    mirrorOfLife: 'Prison Tower',
    approach: 'Suba até o andar mais alto da Prison Tower.',
    routeSteps: ['Prison Tower', 'Roof of the Tower'],
    requirements: ['Nenhum requisito adicional listado nas fontes consultadas.'],
    battleStart: 'Aproxime-se de Joan no topo da torre.',
    rewards: ['The Warrior Arcana (Infernal Pyre)', 'The Warrior’s Key', 'Burnt Sword of Fierbois', 'Holy Light'],
    sourceIds: ['boss-order', 'boss-map', 'belmont-atlas']
  },
  {
    id: 'death-catacombs-01',
    bossId: 'death',
    name: 'Death',
    encounterLabel: 'Primeiro encontro · roteirizado',
    order: 4,
    region: 'Catacombs of Paris',
    subArea: 'Stairway to Hell',
    arena: 'Câmara ritual',
    mirrorOfLife: 'Realm of Old Night',
    approach: 'A câmara ritual fica junto à Stairway to Hell, nas Catacombs of Paris.',
    requirements: ['Nenhum requisito adicional listado nas fontes consultadas.'],
    battleStart: 'A cena inicia o confronto; este encontro não pode ser vencido.',
    rewards: ['Nenhuma recompensa de vitória: o encontro termina por uma sequência roteirizada.'],
    sourceIds: ['boss-order', 'boss-map'],
    verificationNote: 'A fonte de progressão chama o local de “Câmara ritual”; o mapa interativo usa “Altar of Bones”. A nomenclatura da sala permanece divergente.',
    scripted: true
  },
  {
    id: 'isaac-main-hall-01',
    bossId: 'isaac',
    name: 'Isaac',
    encounterLabel: 'Primeiro encontro',
    order: 5,
    region: 'Main Hall',
    subArea: 'Castle Drawbridge',
    arena: 'Castle Drawbridge',
    markerStep: 'Castle Drawbridge',
    mirrorOfLife: 'Entrance Corridor',
    approach: 'Siga para leste desde Stone Bridge e atravesse a Castle Drawbridge até o Main Hall.',
    routeSteps: ['Stone Bridge', 'Castle Drawbridge', 'Main Hall'],
    requirements: ['Nenhum requisito adicional listado nas fontes consultadas.'],
    battleStart: 'O encontro começa ao atravessar a ponte em direção ao Main Hall.',
    rewards: ['Nenhuma Arcana é concedida neste encontro.'],
    sourceIds: ['boss-order', 'boss-map']
  },
  {
    id: 'talos-clock-tower-01',
    bossId: 'talos',
    name: 'Talos',
    encounterLabel: 'Encontro único',
    order: 6,
    region: 'Clock Tower',
    subArea: 'Throne of the Builder',
    arena: 'Câmara da forja',
    mirrorOfLife: 'Foundry Apex',
    approach: 'Use o Builder’s Secret Elevator; atravesse Foundry Apex e Final Trap até a base da torre.',
    routeSteps: ['Builder’s Secret Elevator', 'Foundry Apex', 'Final Trap', 'Throne of the Builder'],
    requirements: ['Acesso à Clock Tower pelo progresso da campanha.'],
    battleStart: 'Entre na câmara da forja no Throne of the Builder.',
    rewards: ['The Builder Arcana (Fist of Talos)', 'Habilidade Smash'],
    sourceIds: ['boss-order', 'boss-map', 'belmont-atlas']
  },
  {
    id: 'carmilla-library-01',
    bossId: 'carmilla',
    name: 'Carmilla',
    encounterLabel: 'Encontro único',
    order: 7,
    region: 'Library',
    subArea: 'Observatory',
    arena: 'Observatory',
    mirrorOfLife: 'Rhetoric Shelves',
    approach: 'Alcance o Observatory no topo da Library.',
    routeSteps: ['Library', 'Observatory'],
    requirements: ['Nenhum requisito adicional listado nas fontes consultadas.'],
    battleStart: 'Entre no Observatory.',
    rewards: ['The Occultist Arcana (Blood Spikes)', 'Brauner’s Paintbrush fica na sala.'],
    sourceIds: ['boss-order', 'boss-map', 'belmont-atlas']
  },
  {
    id: 'brauner-main-hall-01',
    bossId: 'brauner',
    name: 'Brauner',
    encounterLabel: 'Encontro único',
    order: 8,
    region: 'Main Hall',
    subArea: 'Brauner’s Atelier',
    arena: 'Brauner’s Atelier',
    mirrorOfLife: 'Elevator Tower',
    approach: 'Pegue o Ferryman para o Main Hall; suba pelo Grand Hall. O atelier fica a oeste de Servant’s Hall.',
    routeSteps: ['Ferryman', 'Main Hall', 'Grand Hall', 'Servant’s Hall', 'Brauner’s Atelier'],
    requirements: ['Fist of Talos (Smash) e acesso ao ponto de gancho acima da obra.'],
    battleStart: 'Use Smash para destruir o bloco “Masterpiece” suspenso no centro do atelier.',
    rewards: ['The Artist Arcana (Masterpiece)'],
    sourceIds: ['boss-order', 'boss-map', 'belmont-atlas']
  },
  {
    id: 'mammon-catacombs-01',
    bossId: 'mammon',
    name: 'Mammon',
    encounterLabel: 'Encontro único',
    order: 9,
    region: 'Catacombs of Paris',
    subArea: 'Mammon’s Lair',
    arena: 'Mammon’s Lair',
    mirrorOfLife: 'Realm of Old Night',
    approach: 'Encontre a porta em forma de olho no Circle of Greed.',
    routeSteps: ['Circle of Greed', 'Gate of Flesh', 'Mammon’s Lair'],
    requirements: ['Equipe 3 Eyes antes de acessar o Gate of Flesh.'],
    battleStart: 'Interaja com o Gate of Flesh após cumprir o requisito.',
    rewards: ['The Miser Arcana (Wheel of Chaos)', 'Ferryman’s Obol'],
    sourceIds: ['boss-order', 'boss-map', 'belmont-atlas']
  },
  {
    id: 'joan-notre-dame-02',
    bossId: 'joan',
    name: 'Joan',
    encounterLabel: 'Segundo encontro',
    order: 10,
    region: "Notre-Dame",
    subArea: 'Courage Bell',
    arena: 'Courage of Gabriel',
    mirrorOfLife: 'West Triforium',
    approach: 'Na Catedral, localize o Courage Bell.',
    requirements: ['Acesso a Notre-Dame.'],
    battleStart: 'O confronto ocorre junto ao Courage Bell.',
    rewards: ['Bênção da virtude Courage; nenhuma Arcana é concedida neste encontro.'],
    sourceIds: ['boss-order', 'boss-map'],
    verificationNote: 'As fontes usam “Courage Bell” para a localização e “Courage of Gabriel” para a subárea. O mapa não informa uma rota detalhada até a arena.'
  },
  {
    id: 'death-notre-dame-02',
    bossId: 'death',
    name: 'Death',
    encounterLabel: 'Segundo encontro',
    order: 11,
    region: "Notre-Dame",
    subArea: 'Transept / Choir',
    arena: 'Transept',
    mirrorOfLife: 'West Triforium',
    approach: 'Depois de abrir Notre-Dame, reúna as três partituras, resolva as sequências do órgão e siga ao Transept.',
    routeSteps: ['Gallery of Eternal Night', 'Notre-Dame', 'Undercroft', 'West Gallery', 'Stained Glass Gallery', 'La Flèche', 'Great Organ', 'Transept'],
    requirements: [
      'Derrote The Builder, The Artist e The Occultist para abrir Notre-Dame.',
      'Obtenha as três Melody Sheets e complete as sequências astrológicas no Great Organ.'
    ],
    battleStart: 'Death aparece no Transept, junto à cruz onde Trevor está preso.',
    rewards: ['The Shadow Arcana (Soul Harvest)', 'Vampire Killer', 'Double Jump'],
    sourceIds: ['boss-order', 'boss-map', 'belmont-atlas'],
    verificationNote: 'A fonte de progressão especifica Transept; o mapa também lista Choir como subárea.'
  },
  {
    id: 'saint-louis-paris-01',
    bossId: 'saint-louis',
    name: 'Saint Louis',
    encounterLabel: 'Encontro único',
    order: 12,
    region: 'Paris Streets',
    subArea: 'Palace of Justice',
    arena: 'Tree of Justice',
    mirrorOfLife: 'Burned District',
    approach: 'Localize a Tree of Justice no Palace of Justice.',
    requirements: ['Nenhum requisito adicional listado nas fontes consultadas.'],
    battleStart: 'Equilibre as Scales of Justice na Tree of Justice.',
    rewards: ['The Judge Arcana (Chains of Justice)', 'Valmanway'],
    sourceIds: ['boss-order', 'boss-map', 'belmont-atlas']
  },
  {
    id: 'isaac-clock-tower-02',
    bossId: 'isaac',
    name: 'Isaac',
    encounterLabel: 'Segundo encontro',
    order: 13,
    region: 'Clock Tower',
    subArea: 'Heart of the Clock',
    arena: 'Heart of the Clock',
    mirrorOfLife: 'Eastern Summit',
    approach: 'Do Master Bridge, siga para leste até a Clock Tower e alcance o Heart of the Clock.',
    routeSteps: ['Master Bridge', 'Clock Tower', 'Heart of the Clock'],
    requirements: ['Desative o efeito do Cursed Horologium para alcançar a arena.'],
    battleStart: 'Encontre Isaac no Heart of the Clock.',
    rewards: ['The Zealot Arcana (Chronomantic Dive)', 'Chauve-Souris na arena após o confronto.'],
    sourceIds: ['boss-order', 'boss-map', 'belmont-atlas']
  },
  {
    id: 'dracula-court-01',
    bossId: 'dracula',
    name: 'Dracula',
    encounterLabel: 'Encontro / fase do Court of the Night',
    order: 14,
    region: "Master's Quarters",
    subArea: 'Court of the Night',
    arena: 'Court of the Night',
    mirrorOfLife: 'Sanctuary of Solitude',
    approach: 'Acesse as Master’s Quarters pela rota final da Clock Tower e siga até o salão do trono.',
    routeSteps: ['Clock Tower', 'Master’s Quarters', 'Court of the Night'],
    requirements: ['Acesso às Master’s Quarters; condições de final dependem da rota escolhida.'],
    battleStart: 'O confronto começa no Court of the Night.',
    rewards: ['Troféu; sem Arcana reportada.'],
    sourceIds: ['boss-order', 'boss-map', 'belmont-atlas'],
    verificationNote: 'As fontes descrevem a luta completa em fases. Este registro representa a arena do trono; não é um chefe único adicional.'
  },
  {
    id: 'succubus-mirrors-01',
    bossId: 'succubus',
    name: 'Succubus',
    encounterLabel: 'Encontro único',
    order: 15,
    region: 'Hall of Mirrors',
    subArea: 'Belmont Manor',
    arena: 'Belmont Manor',
    mirrorOfLife: 'The Descent Into Memory',
    approach: 'Atravesse a sequência Descent into Memory até Belmont Manor, no centro do Hall of Mirrors.',
    routeSteps: ['Descent into Memory', 'Hall of Mirrors', 'Belmont Manor'],
    requirements: ['Avance até o final da sequência Descent into Memory.'],
    battleStart: 'O confronto começa ao final da sequência, em Belmont Manor.',
    rewards: ['The Temptress Arcana (Life Drain)', 'Revelação do mapa do Hall of Mirrors.'],
    sourceIds: ['boss-order', 'boss-map', 'belmont-atlas']
  },
  {
    id: 'doppelganger-notre-dame-01',
    bossId: 'doppelganger',
    name: 'Doppelganger (The Cursed / The Self)',
    encounterLabel: 'Encontro único',
    order: 16,
    region: "Notre-Dame",
    subArea: 'Gallery of the Four Virtues',
    arena: 'Altar da Catedral',
    mirrorOfLife: 'West Triforium',
    approach: 'Retorne ao altar da Catedral, na Gallery of the Four Virtues.',
    requirements: ['Receba as quatro virtudes ao completar os Stained Glass Challenges.'],
    battleStart: 'O confronto é liberado no altar após obter as quatro virtudes.',
    rewards: ['The Self Arcana (Absolution)', 'Doppelganger Style Costume'],
    sourceIds: ['boss-order', 'boss-map', 'belmont-atlas']
  },
  {
    id: 'arthur-notre-dame-01',
    bossId: 'arthur',
    name: 'Arthur',
    encounterLabel: 'Encontro único',
    order: 17,
    region: "Notre-Dame",
    subArea: 'Chapel',
    arena: 'Chapel',
    mirrorOfLife: 'East Gallery',
    approach: 'A Chapel fica ao sul da entrada de Notre-Dame conectada à Forest.',
    requirements: ['Possua Fist of Talos e complete o Feat of Strength.'],
    battleStart: 'Retire a espada do altar na Chapel.',
    rewards: ['The Brittle King Arcana (Stained-Glass Shield)', 'Excalibur'],
    sourceIds: ['boss-order', 'boss-map', 'belmont-atlas']
  },
  {
    id: 'dracula-rooftops-02',
    bossId: 'dracula',
    name: 'Dracula',
    encounterLabel: 'Fase final · Castle Rooftops',
    order: 18,
    region: "Master's Quarters",
    subArea: 'Castle Rooftops',
    arena: 'Castle Rooftops',
    mirrorOfLife: 'Sanctuary of Solitude',
    approach: 'A fase começa após a luta contra Dracula no Court of the Night.',
    routeSteps: ['Court of the Night', 'Castle Rooftops'],
    requirements: ['Vença a fase do Court of the Night.'],
    battleStart: 'A transição para a forma alada leva à arena dos Castle Rooftops.',
    rewards: ['Troféu do confronto; sem Arcana reportada.'],
    sourceIds: ['boss-order', 'boss-map', 'belmont-atlas'],
    verificationNote: 'As fontes tratam Castle Rooftops como a fase final da mesma luta. O marcador separado identifica a arena, não um chefe único adicional.'
  }
];
