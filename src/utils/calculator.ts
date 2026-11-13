import { Weapon, Arcana, Relic, BuildScoreMetrics } from '../types';
import { WEAPONS_DATA } from '../data/weapons';
import { ARCANAS_DATA } from '../data/arcanas';
import { RELICS_DATA } from '../data/relics';
import { BOSSES_DATA } from '../data/bosses';
import { BUILDS_DATA } from '../data/builds';

/**
 * Motor heurístico transparente para Belmont's Curse Build Lab.
 * Não utiliza fórmulas matemáticas obscuras ou multiplicadores arbitrários.
 * Todos os critérios são expostos abertamente com suas justificativas táticas.
 */
export function calculateBuildScore(
  weapon?: Weapon,
  arcana?: Arcana,
  relics: Relic[] = []
): BuildScoreMetrics {
  const criteriaBreakdown: { label: string; points: number; explanation: string }[] = [];

  if (!weapon || !arcana) {
    return {
      damage: 0,
      speed: 0,
      range: 0,
      defense: 0,
      sustain: 0,
      manaEfficiency: 0,
      crowdControl: 0,
      synergy: 0,
      bossing: 0,
      overallScore: 0,
      executionDifficulty: 'Iniciante',
      criteriaBreakdown: [{ label: 'Configuração Incompleta', points: 0, explanation: 'Selecione ao menos 1 Arma e 1 Arcana para calcular os atributos.' }]
    };
  }

  // 1. DANO BASE & POTENCIAL DE BURST (Heurística baseada no dano por golpe reportado da arma + acréscimos)
  // Armas variam de 10 a 44 de dano por golpe. Mapeamos 44 para ~88 pontos base.
  let damageScore = Math.min(95, Math.round((weapon.baseDamagePerHit / 44) * 85));
  let damageExplanation = `${weapon.name} fornece ${weapon.baseDamagePerHit} de dano por golpe reportado (base da família ${weapon.family}).`;

  // Bônus de relíquias em dano
  const hasObsidianFang = relics.some(r => r.id === 'obsidian-fang');
  const hasVileTrinket = relics.some(r => r.id === 'vile-trinket');
  const hasTwilightGem = relics.some(r => r.id === 'twilight-gem');
  const hasCursedCoin = relics.some(r => r.id === 'cursed-coin');

  if (hasObsidianFang) {
    damageScore = Math.min(100, damageScore + 12);
    damageExplanation += ' Presa de Obsidiana adiciona +25% de penetração de armadura e dano massivo na fase inicial.';
  }
  if (hasVileTrinket && (weapon.speed === 'Muito Rápida' || weapon.speed === 'Rápida')) {
    damageScore = Math.min(100, damageScore + 10);
    damageExplanation += ' Penduricalho Torpe tem sinergia excelente com a alta cadência da arma, empilhando até +24% de dano físico.';
  }
  if (hasTwilightGem) {
    damageScore = Math.min(100, damageScore + 8);
    damageExplanation += ' Gema do Crepúsculo concede +15% de amplificação ao intercalar golpes e magias.';
  }
  if (hasCursedCoin) {
    damageScore = Math.min(100, damageScore + 10);
    damageExplanation += ' Moeda Amaldiçoada eleva o crítico em +35% à custa de defesa.';
  }

  criteriaBreakdown.push({
    label: 'Poder Ofensivo / Dano',
    points: Math.min(100, damageScore),
    explanation: damageExplanation
  });

  // 2. VELOCIDADE DE EXECUÇÃO
  let speedScore = 50;
  if (weapon.speed === 'Muito Rápida') speedScore = 95;
  else if (weapon.speed === 'Rápida') speedScore = 80;
  else if (weapon.speed === 'Média') speedScore = 65;
  else if (weapon.speed === 'Lenta') speedScore = 40;

  if (arcana.id === 'temporal-rush' || arcana.id === 'excellence') {
    speedScore = Math.min(100, speedScore + 15);
  }

  // 3. ALCANCE TÁTICO
  let rangeScore = 50;
  if (weapon.range === 'Muito Longo') rangeScore = 95;
  else if (weapon.range === 'Longo') rangeScore = 80;
  else if (weapon.range === 'Médio') rangeScore = 60;
  else if (weapon.range === 'Curto') rangeScore = 35;

  if (relics.some(r => r.id === 'ravens-feather')) {
    rangeScore = Math.min(100, rangeScore + 18);
  }
  if (arcana.id === 'sacred-cross' || arcana.id === 'chauve-souris') {
    rangeScore = Math.min(100, rangeScore + 10);
  }

  // 4. DEFESA & RESISTÊNCIA
  let defenseScore = 45;
  let defenseExp = 'Resistência de esquiva padrão do caçador.';
  if (weapon.family === 'Espada e escudo') {
    defenseScore += 35;
    defenseExp = 'Escudo ativo permite bloqueios parciais e totais de ataques inimigos.';
  }
  if (relics.some(r => r.id === 'dark-sigil')) {
    defenseScore += 18;
    defenseExp += ' Selo Sombrio reduz diretamente em 18% o dano recebido.';
  }
  if (arcana.id === 'stained-glass-shield') {
    defenseScore += 20;
    defenseExp += ' Rosácea Sagrada anula os próximos 3 impactos sofridos.';
  }
  if (relics.some(r => r.id === 'family-grace')) {
    defenseScore += 15;
    defenseExp += ' Graça da Família evita um golpe letal ressuscitando com 35% de vida.';
  }
  if (hasCursedCoin) {
    defenseScore = Math.max(15, defenseScore - 12);
    defenseExp += ' Penalidade da Moeda Amaldiçoada: +12% de dano sofrido.';
  }

  criteriaBreakdown.push({
    label: 'Defesa e Blindagem',
    points: Math.min(100, defenseScore),
    explanation: defenseExp
  });

  // 5. SUSTENTAÇÃO & CURA
  let sustainScore = 40;
  let sustainExp = 'Dependente de orbes comuns de vida encontradas pelo cenário.';
  if (arcana.id === 'life-drain') {
    sustainScore += 45;
    sustainExp = 'Life Drain converte 40% do dano de trevas diretamente em barra de vida.';
  } else if (arcana.id === 'blood-thorns') {
    sustainScore += 35;
    sustainExp = 'Blood Thorns drena 12% do dano causado pelas vinhas para o conjurador.';
  } else if (arcana.id === 'purification') {
    sustainScore += 25;
    sustainExp = 'Purification libera orbes de cura sagrada ao purificar inimigos caídos.';
  }

  if (relics.some(r => r.id === 'lichs-mark')) {
    sustainScore += 15;
    sustainExp += ' Marca do Lich ergue um sobre-escudo protetor de até 75 pontos.';
  }
  if (weapon.id === 'bernhards-wrath' || weapon.id === 'crimson-shears' || weapon.id === 'mournblade') {
    sustainScore += 15;
    sustainExp += ` Habilidade especial da ${weapon.name} gera drenagem passiva de HP em acertos.`;
  }

  criteriaBreakdown.push({
    label: 'Sustentação e Recuperação de Vida',
    points: Math.min(100, sustainScore),
    explanation: sustainExp
  });

  // 6. EFICIÊNCIA DE MANA
  // Mana varia de 25 a 55. Quanto menor o custo e mais sinérgica a regeneração, maior a nota.
  let manaEfficiency = Math.round(100 - (arcana.manaCost * 1.3));
  let manaExp = `Arcano ${arcana.spellName} consome ${arcana.manaCost} de mana por conjuração.`;

  if (relics.some(r => r.id === 'witchs-knot')) {
    manaEfficiency = Math.min(100, manaEfficiency + 25);
    manaExp += ' Nó da Bruxa reduz custo em 20% e concede +1.5 mana/segundo passivo.';
  }
  if (relics.some(r => r.id === 'mind-relic')) {
    manaEfficiency = Math.min(100, manaEfficiency + 15);
    manaExp += ' Relíquia da Mente acelera recuperação de animação em 25%.';
  }

  criteriaBreakdown.push({
    label: 'Economia e Eficiência de Mana',
    points: Math.min(100, Math.max(20, manaEfficiency)),
    explanation: manaExp
  });

  // 7. CONTROLE DE GRUPO (CC)
  let ccScore = 40;
  if (arcana.id === 'chains-of-justice') ccScore = 95;
  else if (arcana.id === 'petrifying-gaze' || arcana.id === 'blood-thorns') ccScore = 90;
  else if (arcana.id === 'frozen-path' || arcana.id === 'talos-hammer') ccScore = 85;
  else if (arcana.id === 'purification') ccScore = 70;

  if (relics.some(r => r.id === 'sinister-rune')) {
    ccScore = Math.min(100, ccScore + 10);
  }

  // 8. SINERGIA ENTRE EQUIPAMENTOS
  let synergyScore = 60;
  let synergyExp = 'Equipamentos funcionam harmonicamente sem conflito de afinidade.';

  // Verifica se a arma está nas sinergias das relíquias
  const matchedWeaponSynergies = relics.filter(r => r.synergies.weapons.includes(weapon.id)).length;
  const matchedArcanaSynergies = relics.filter(r => r.synergies.arcanas.includes(arcana.id)).length;

  synergyScore += (matchedWeaponSynergies * 10) + (matchedArcanaSynergies * 10);

  if (matchedWeaponSynergies >= 2 && matchedArcanaSynergies >= 2) {
    synergyExp = 'Sinergia de alto nível: múltiplas relíquias potencializam diretamente tanto a arma quanto o arcano selecionados!';
  } else if (matchedWeaponSynergies > 0 || matchedArcanaSynergies > 0) {
    synergyExp = `Sinergia comprovada: ${matchedWeaponSynergies} relíquia(s) ativam afinidade com a arma e ${matchedArcanaSynergies} com o feitiço.`;
  }

  criteriaBreakdown.push({
    label: 'Grau de Sinergia',
    points: Math.min(100, synergyScore),
    explanation: synergyExp
  });

  // 9. EFICIÊNCIA CONTRA CHEFES (BOSSING)
  let bossingScore = 55;
  // Conta para quantos chefes este arcano ou arma são fraquezas recomendadas
  const bossCounterArcana = BOSSES_DATA.filter(b => b.recommendedArcanaId === arcana.id).length;
  const bossCounterWeapon = BOSSES_DATA.filter(b => b.recommendedWeaponId === weapon.id).length;

  bossingScore += (bossCounterArcana * 10) + (bossCounterWeapon * 8);
  if (hasObsidianFang) bossingScore += 8;
  if (relics.some(r => r.id === 'twilight-gem')) bossingScore += 6;

  criteriaBreakdown.push({
    label: 'Eficácia em Duelos contra Chefes',
    points: Math.min(100, bossingScore),
    explanation: `Este arcano é contra-ataque prioritário contra ${bossCounterArcana} chefes principais, e a arma contra ${bossCounterWeapon}.`
  });

  // 10. DIFICULDADE DE EXECUÇÃO
  let executionDifficulty: BuildScoreMetrics['executionDifficulty'] = 'Intermediário';
  if (weapon.family === 'Espadas duplas' || weapon.family === 'Soqueiras') {
    executionDifficulty = 'Avançado';
  } else if (weapon.family === 'Espada e escudo' && arcana.id === 'mirrorwalk') {
    executionDifficulty = 'Especialista';
  } else if (weapon.family === 'Chicote' || weapon.family === 'Lança') {
    executionDifficulty = 'Iniciante';
  }

  // PONTUAÇÃO GERAL HEURÍSTICA
  const overallScore = Math.round(
    (damageScore * 0.22) +
    (bossingScore * 0.20) +
    (synergyScore * 0.18) +
    (defenseScore * 0.15) +
    (sustainScore * 0.15) +
    (manaEfficiency * 0.10)
  );

  return {
    damage: Math.min(100, damageScore),
    speed: Math.min(100, speedScore),
    range: Math.min(100, rangeScore),
    defense: Math.min(100, defenseScore),
    sustain: Math.min(100, sustainScore),
    manaEfficiency: Math.min(100, Math.max(20, manaEfficiency)),
    crowdControl: Math.min(100, ccScore),
    synergy: Math.min(100, synergyScore),
    bossing: Math.min(100, bossingScore),
    overallScore: Math.min(100, overallScore),
    executionDifficulty,
    criteriaBreakdown
  };
}

export interface RecommendationObjective {
  id: string;
  label: string;
  description: string;
}

export const RECOMMENDATION_OBJECTIVES: RecommendationObjective[] = [
  { id: 'max-damage', label: 'Quero causar o máximo de dano', description: 'Maximizar poder de destruição e dano por golpe contra inimigos.' },
  { id: 'boss-killer', label: 'Quero derrotar chefes mais facilmente', description: 'Combinações com alta quebra de guarda, atordoamento e penetração de armadura.' },
  { id: 'survive', label: 'Quero sobreviver mais', description: 'Foco em alta defesa, absorção de golpes, ressurreição e i-frames de proteção.' },
  { id: 'aggressive', label: 'Quero jogar agressivamente', description: 'Combates corpo a corpo empolgantes com alta velocidade de ataque e combos contínuos.' },
  { id: 'ranged', label: 'Quero combater à distância', description: 'Manter segurança extrema com lanças, chicotes e projéteis em área.' },
  { id: 'crowd-control', label: 'Quero eliminar muitos inimigos (Hordas)', description: 'Explosões de cadáveres, AoE massivo e impacto em salas cheias.' },
  { id: 'explore', label: 'Quero explorar o mapa', description: 'Detectar segredos ocultos, passagens trancadas e aumentar recompensas.' },
  { id: 'unlocked-only', label: 'Utilizar somente equipamentos já desbloqueados', description: 'Filtrar recomendações estritamente pelo arsenal que você já possui em mãos.' }
];

export interface RecommendationResult {
  buildCode: string;
  title: string;
  weapon: Weapon;
  arcana: Arcana;
  relics: Relic[];
  score: BuildScoreMetrics;
  recommendationReason: string;
  limitations: string;
}

export interface RecommendationFilters {
  targetBossId?: string;
  executionDifficulty?: BuildScoreMetrics['executionDifficulty'] | 'Todas';
}

export function getRecommendedBuilds(
  selectedObjectiveIds: string[],
  unlockedIds?: { weapons: string[]; arcanas: string[]; relics: string[] },
  filters: RecommendationFilters = {}
): RecommendationResult[] {
  // Gera combinações das 8 teorias de builds e personalizadas, avaliando aderência ao objetivo
  const allCombos = [
    {
      code: 'BUILD 02',
      title: 'Boss Killer (Algoz de Titãs)',
      weaponId: 'excalibur',
      arcanaId: 'chains-of-justice',
      relicIds: ['twilight-gem', 'sinister-rune', 'obsidian-fang'],
      tagMatch: ['max-damage', 'boss-killer'],
      reason: 'Recomendada pela combinação do maior dano por golpe (Excalibur 44) com a Presa de Obsidiana e Chains of Justice, debilitando chefes em momentos críticos.',
      limitations: 'Animações lentas do espadão exigem precisão absoluta no timing; errar um golpe contra chefes velozes deixa o caçador vulnerável.'
    },
    {
      code: 'BUILD 03',
      title: 'DPS de Combo Frenético',
      weaponId: 'war-and-famine',
      arcanaId: 'chains-of-justice',
      relicIds: ['twilight-gem', 'vile-trinket', 'obsidian-fang'],
      tagMatch: ['max-damage', 'aggressive', 'boss-killer'],
      reason: 'Ideal para estilo agressivo: War and Famine acumula os 6 bônus do Vile Trinket em segundos, atingindo a maior taxa contínua de dano por segundo.',
      limitations: 'Alcance muito curto obriga a ficar colado em ataques de área dos chefes. Requer domínio contínuo de esquivas.'
    },
    {
      code: 'BUILD 05',
      title: 'Bastião Defensivo Absoluto',
      weaponId: 'alucards-sword-and-shield',
      arcanaId: 'mirrorwalk',
      relicIds: ['witchs-knot', 'dark-sigil', 'mind-relic'],
      tagMatch: ['survive'],
      reason: 'Oferece sobrevivência inigualável através de guarda com absorção total, redução passiva de 18% com Dark Sigil e reposicionamento com 1.5s de invulnerabilidade via Mirrorwalk.',
      limitations: 'Menor taxa de dano instantâneo explosivo (burst). As lutas duram mais tempo e exigem paciência no contra-ataque.'
    },
    {
      code: 'BUILD 06',
      title: 'Sentinela de Longo Alcance',
      weaponId: 'chauve-souris',
      arcanaId: 'sacred-cross',
      relicIds: ['ravens-feather', 'twilight-gem', 'witchs-knot'],
      tagMatch: ['ranged', 'boss-killer'],
      reason: 'Máxima segurança tática: alcance da Chauve-Souris aliado a Sacred Cross com projéteis acelerados pela Raven\'s Feather (estratégia prioritária contra Medusa e Succubus).',
      limitations: 'Ponto cego se inimigos colarem no corpo do caçador; requer espaço na arena para manter a distância ideal.'
    },
    {
      code: 'BUILD 07',
      title: 'Controle de Hordas e Caos em Área',
      weaponId: 'excalibur',
      arcanaId: 'talos-hammer',
      relicIds: ['twilight-gem', 'abyssal-eye', 'necro-charm'],
      tagMatch: ['crowd-control', 'max-damage'],
      reason: 'Devastação total de grupos: Talos Hammer quebra guardas em massa e Necro Charm explode cadáveres com dano em cadeia ampliado pelo Olho Abissal.',
      limitations: 'Custo de mana elevado (50 por conjuração do martelo). Pouco eficiente contra chefes únicos que não geram lacaios para explodir.'
    },
    {
      code: 'BUILD 08',
      title: 'Navegação e Exploração das Criptas',
      weaponId: 'vampire-killer',
      arcanaId: 'mirrorwalk',
      relicIds: ['crypt-key', 'gloomstone', 'witchs-knot'],
      tagMatch: ['explore'],
      reason: 'Revela passagens secretas no minimapa a até 15 metros, melhora a taxa de drops em 40% e reduz a detecção de monstros para facilitar a coleta de itens.',
      limitations: 'Não maximiza dano para combates diretos difíceis; deve ser trocada antes de entrar em salas de chefes maiores.'
    },
    {
      code: 'BUILD 01',
      title: 'Equilíbrio Ancestral',
      weaponId: 'vampire-killer',
      arcanaId: 'purification',
      relicIds: ['witchs-knot', 'twilight-gem', 'sinister-rune'],
      tagMatch: ['survive', 'boss-killer'],
      reason: 'Configuração mais versátil e confiável para qualquer situação no jogo. O chicote mantém controle médio enquanto Purification anula maldições e fuzila mortos-vivos.',
      limitations: 'Não tem o dano de pico mais alto nem a blindagem máxima de escudo; é o padrão de estabilidade intermediário.'
    },
    {
      code: 'BUILD 04',
      title: 'Combo e Recuperação Vital',
      weaponId: 'bernhards-wrath',
      arcanaId: 'blood-thorns',
      relicIds: ['witchs-knot', 'twilight-gem', 'vile-trinket'],
      tagMatch: ['aggressive', 'survive'],
      reason: 'Permite lutar agressivamente enquanto as soqueiras e Blood Thorns regeneram sua vida de forma contínua.',
      limitations: 'Ineficaz contra inimigos mecânicos como Talos ou espíritos incorpóreos que não sangram nem alimentam as vinhas de vida.'
    }
  ];

  // Filtra por desbloqueados se solicitado
  let filtered = allCombos;
  if (selectedObjectiveIds.includes('unlocked-only') && unlockedIds) {
    filtered = filtered.filter(combo => {
      const weaponOk = unlockedIds.weapons.includes(combo.weaponId);
      const arcanaOk = unlockedIds.arcanas.includes(combo.arcanaId);
      const relicsOk = combo.relicIds.every(rid => unlockedIds.relics.includes(rid));
      return weaponOk && arcanaOk && relicsOk;
    });
  }

  // Pontua de acordo com os objetivos selecionados
  const scored = filtered.map(item => {
    let matchScore = 0;
    selectedObjectiveIds.forEach(obj => {
      if (item.tagMatch.includes(obj)) matchScore += 10;
    });

    const weapon = WEAPONS_DATA.find(w => w.id === item.weaponId)!;
    const arcana = ARCANAS_DATA.find(a => a.id === item.arcanaId)!;
    const relics = item.relicIds.map(rid => RELICS_DATA.find(r => r.id === rid)!).filter(Boolean);
    const score = calculateBuildScore(weapon, arcana, relics);

    return {
      buildCode: item.code,
      title: item.title,
      weapon,
      arcana,
      relics,
      score,
      recommendationReason: item.reason,
      limitations: item.limitations,
      matchScore
    };
  });

  scored.sort((a, b) => (b.matchScore * 2 + b.score.overallScore) - (a.matchScore * 2 + a.score.overallScore));

  const constrained = scored.filter(item => {
    const buildId = item.buildCode.toLowerCase().replace(/\s+/g, '-');
    const build = BUILDS_DATA.find(candidate => candidate.id === buildId);
    const matchesBoss = !filters.targetBossId || Boolean(build?.recommendedBosses.includes(filters.targetBossId));
    const matchesExperience = !filters.executionDifficulty ||
      filters.executionDifficulty === 'Todas' ||
      item.score.executionDifficulty === filters.executionDifficulty;
    return matchesBoss && matchesExperience;
  });

  // Retorna até 3 opções que respeitam os filtros escolhidos.
  return constrained.slice(0, 3);
}
