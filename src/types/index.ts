export type WeaponFamily = 
  | 'Espada de uma mão'
  | 'Espadão'
  | 'Chicote'
  | 'Espadas duplas'
  | 'Lança'
  | 'Soqueiras'
  | 'Espada e escudo';

export type Rarity = 'Comum' | 'Raro' | 'Épico' | 'Lendário';

export interface Weapon {
  id: string;
  name: string;
  family: WeaponFamily;
  rarity: Rarity;
  baseDamagePerHit: number; // Dano reportado por golpe (não confundir com ATK)
  range: 'Curto' | 'Médio' | 'Longo' | 'Muito Longo';
  speed: 'Lenta' | 'Média' | 'Rápida' | 'Muito Rápida';
  specialAbility: string;
  strengths: string[];
  weaknesses: string[];
  locationUnlock: string;
  compatibleBuilds: string[];
  loreNote?: string;
  iconType: string;
}

export interface Arcana {
  id: string;
  cardName: string;
  spellName: string;
  description: string;
  manaCost: number;
  effect: string;
  upgrades: string[];
  unlockCondition: string;
  effectiveAgainstBosses: string[];
  knownResistances: string[];
  compatibleRelics: string[];
  patch114Note?: string;
  iconType: string;
}

export interface Relic {
  id: string;
  name: string;
  description: string;
  effect: string;
  percentagesAndDuration?: string;
  location: string;
  rarityOrTier: 'S-Tier' | 'A-Tier' | 'B-Tier' | 'Exclusivo' | 'Utilitário';
  isMidnightEditionBonus?: boolean;
  synergies: {
    weapons: string[];
    arcanas: string[];
  };
  recommendedBuilds: string[];
  iconType: string;
}

export interface BuildPreset {
  id: string;
  title: string;
  code: string;
  playstyle: string;
  description: string;
  weaponId: string;
  arcanaId: string;
  relicIds: [string, string, string]; // Limite exato de 3 relíquias
  isTheoryCraft: true; // Requisito: identificadas como teoria de build, não oficiais da desenvolvedora
  highlights: string[];
  recommendedBosses: string[];
}

export interface CustomBuild {
  id: string;
  name: string;
  description?: string;
  playstyle: string;
  weaponId: string;
  arcanaId: string;
  relicIds: string[]; // Máximo 3
  createdAt: string;
  isCustom: true;
}

export interface Boss {
  id: string;
  name: string;
  subtitle: string;
  reportedHp: string;
  attacksAndMechanics: string[];
  resistances: string[];
  verifiedWeaknesses: string[];
  immunities: {
    fire: boolean;
    bleed: boolean;
    crowdControl: boolean;
    notes?: string;
  };
  recommendedWeaponId: string;
  recommendedArcanaId: string;
  recommendedRelicIds: [string, string, string];
  combatStrategy: string;
  beginnerAlternative: string;
  updatedNov2026Note?: string;
}

export interface SourceItem {
  id: string;
  name: string;
  url: string;
  category: 'Oficial' | 'Guias de armas e relíquias' | 'Guias de Arcanos e chefes';
  reliabilityLevel: 'Oficial' | 'Verificada em guias' | 'Teoria de build';
  verificationDate: string;
  gameVersion: string;
  notes: string;
  divergences?: string;
}

export interface BuildScoreMetrics {
  damage: number;       // 0-100
  speed: number;        // 0-100
  range: number;        // 0-100
  defense: number;      // 0-100
  sustain: number;      // 0-100
  manaEfficiency: number; // 0-100
  crowdControl: number; // 0-100
  synergy: number;      // 0-100
  bossing: number;      // 0-100
  overallScore: number; // 0-100
  executionDifficulty: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Especialista';
  criteriaBreakdown: {
    label: string;
    points: number;
    explanation: string;
  }[];
}
