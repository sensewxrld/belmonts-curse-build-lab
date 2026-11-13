import React, { useEffect, useState } from 'react';
import { 
  Scale, 
  Sparkles, 
  ArrowRight, 
  Check, 
  AlertTriangle, 
  Sword, 
  Shield, 
  BookOpen, 
  TrendingUp, 
  Flame,
  Info
} from 'lucide-react';
import { BUILDS_DATA } from '../data/builds';
import { WEAPONS_DATA } from '../data/weapons';
import { ARCANAS_DATA } from '../data/arcanas';
import { RELICS_DATA } from '../data/relics';
import { CustomBuild } from '../types';
import { calculateBuildScore } from '../utils/calculator';
import { ThemeIcon } from './ThemeIcons';
import { ItemArtwork } from './ItemArtwork';

interface BuildComparatorProps {
  customBuilds: CustomBuild[];
  initialBuildAId?: string;
  initialBuildBId?: string;
  initialBuildA?: {
    title: string;
    weaponId: string;
    arcanaId: string;
    relicIds: string[];
  } | null;
  onDraftCleared: () => void;
  onBuildSelectionChange: (side: 'a' | 'b', buildId: string) => void;
  onLoadBuildIntoPlanner: (buildData: { weaponId: string; arcanaId: string; relicIds: string[]; name: string }) => void;
}

export const BuildComparator: React.FC<BuildComparatorProps> = ({
  customBuilds,
  initialBuildAId = 'build-01',
  initialBuildBId = 'build-02',
  initialBuildA,
  onDraftCleared,
  onBuildSelectionChange,
  onLoadBuildIntoPlanner
}) => {
  const [buildAId, setBuildAId] = useState<string>(initialBuildAId);
  const [buildBId, setBuildBId] = useState<string>(initialBuildBId);
  const [draftBuildA, setDraftBuildA] = useState(initialBuildA);

  useEffect(() => {
    setDraftBuildA(initialBuildA);
  }, [initialBuildA]);

  // Lista de todas as opções de builds disponíveis para comparar
  const availableOptions = [
    ...BUILDS_DATA.map(b => ({ id: b.id, label: `${b.code}: ${b.title}`, isCustom: false, data: b })),
    ...customBuilds.map(c => ({ id: c.id, label: `Personalizada: ${c.name}`, isCustom: true, data: c }))
  ];

  const getBuildDetails = (id: string) => {
    const preset = BUILDS_DATA.find(b => b.id === id);
    if (preset) {
      const weapon = WEAPONS_DATA.find(w => w.id === preset.weaponId)!;
      const arcana = ARCANAS_DATA.find(a => a.id === preset.arcanaId)!;
      const relics = preset.relicIds.map(rid => RELICS_DATA.find(r => r.id === rid)!).filter(Boolean);
      return {
        title: preset.title,
        subtitle: `${preset.code} • ${preset.playstyle}`,
        description: preset.description,
        weapon,
        arcana,
        relics,
        score: calculateBuildScore(weapon, arcana, relics)
      };
    }

    const custom = customBuilds.find(c => c.id === id);
    if (custom) {
      const weapon = WEAPONS_DATA.find(w => w.id === custom.weaponId)!;
      const arcana = ARCANAS_DATA.find(a => a.id === custom.arcanaId)!;
      const relics = custom.relicIds.map(rid => RELICS_DATA.find(r => r.id === rid)!).filter(Boolean);
      return {
        title: custom.name,
        subtitle: `Personalizada • ${custom.playstyle}`,
        description: custom.description || 'Configuração personalizada do jogador.',
        weapon,
        arcana,
        relics,
        score: calculateBuildScore(weapon, arcana, relics)
      };
    }

    return null;
  };

  const draftWeapon = draftBuildA && WEAPONS_DATA.find(weapon => weapon.id === draftBuildA.weaponId);
  const draftArcana = draftBuildA && ARCANAS_DATA.find(arcana => arcana.id === draftBuildA.arcanaId);
  const draftRelics = draftBuildA
    ? draftBuildA.relicIds.map(id => RELICS_DATA.find(relic => relic.id === id)).filter((relic): relic is NonNullable<typeof relic> => Boolean(relic))
    : [];
  const draftBuildDetails = draftBuildA && draftWeapon && draftArcana ? {
    title: draftBuildA.title,
    subtitle: 'Build enviada para comparação',
    description: 'Composição atual do Build Builder.',
    weapon: draftWeapon,
    arcana: draftArcana,
    relics: draftRelics,
    score: calculateBuildScore(draftWeapon, draftArcana, draftRelics)
  } : null;

  const buildA = draftBuildDetails || getBuildDetails(buildAId) || getBuildDetails('build-01')!;
  const buildB = getBuildDetails(buildBId) || getBuildDetails('build-02')!;

  const comparisonAttributes = [
    { label: 'Dano Estimado / Golpe', keyA: buildA.score.damage, keyB: buildB.score.damage, desc: 'Poder de impacto concentrado' },
    { label: 'Velocidade & Cadência', keyA: buildA.score.speed, keyB: buildB.score.speed, desc: 'Velocidade dos golpes e cancelamento de animações' },
    { label: 'Alcance Tático', keyA: buildA.score.range, keyB: buildB.score.range, desc: 'Distância de segurança contra ataques frontais' },
    { label: 'Defesa & Blindagem', keyA: buildA.score.defense, keyB: buildB.score.defense, desc: 'Capacidade de absorção de dano e bloqueio' },
    { label: 'Sustentação & Cura', keyA: buildA.score.sustain, keyB: buildB.score.sustain, desc: 'Recuperação de vida passiva ou por drenagem' },
    { label: 'Eficiência de Mana', keyA: buildA.score.manaEfficiency, keyB: buildB.score.manaEfficiency, desc: 'Custo por feitiço e recuperação passiva' },
    { label: 'Sinergias dos Efeitos', keyA: buildA.score.synergy, keyB: buildB.score.synergy, desc: 'Harmonia entre bônus de armas, magias e relíquias' },
    { label: 'Eficiência contra Chefes', keyA: buildA.score.bossing, keyB: buildB.score.bossing, desc: 'Vantagem mecânica em duelos contra os 13 chefes' }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gothic-border/60 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-gold-950/60 border border-gold-800 text-gold-300 text-xs font-semibold mb-2">
              <Scale className="w-3.5 h-3.5 text-gold-accent" />
              <span>Análise Comparativa Lado a Lado</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide">
              Comparador de Builds: BUILD A x BUILD B
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Avalie contrastes técnicos, trade-offs defensivos versus ofensivos e níveis de complexidade prática.
            </p>
          </div>
        </div>

        {/* Alerta Metodológico Obrigatório: Não apresentar simulações como medições reais */}
        <div className="mt-4 p-4 rounded-xl bg-gothic-900 border border-gold-accent/40 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-gold-accent flex-shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-300 leading-relaxed">
            <strong className="text-gold-200 block mb-0.5 font-semibold">
              Termo Canônico de Modelagem Heurística:
            </strong>
            Os índices comparativos exibidos nesta bancada são <strong>modelagens heurísticas baseadas nos parâmetros conhecidos do jogo</strong> e <strong>não devem ser interpretados como medições laboratoriais exatas extraídas do código da KONAMI</strong>. O desempenho em jogo dependerá da habilidade do caçador em esquivar, posicionar-se e cronometrar ataques.
          </div>
        </div>
      </div>

      {/* Seletor Duplo de Configurações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seletor BUILD A */}
        <div className="p-4 rounded-2xl bg-gothic-900 border border-blood-800/80 space-y-2">
          <label className="text-xs font-mono text-blood-400 font-bold uppercase tracking-wider block">
            Selecione a BUILD A:
          </label>
          <select
            value={draftBuildA ? '__draft__' : buildAId}
            onChange={(e) => {
              setDraftBuildA(null);
              onDraftCleared();
              setBuildAId(e.target.value);
              onBuildSelectionChange('a', e.target.value);
            }}
            className="w-full px-3 py-2.5 rounded-xl bg-gothic-950 border border-gothic-border text-xs text-white focus:outline-none focus:border-gold-accent font-semibold"
          >
            {draftBuildA && <option value="__draft__">Atual: {draftBuildA.title}</option>}
            {availableOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Seletor BUILD B */}
        <div className="p-4 rounded-2xl bg-gothic-900 border border-arcane-700/80 space-y-2">
          <label className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider block">
            Selecione a BUILD B:
          </label>
          <select
            value={buildBId}
            onChange={(e) => {
              setBuildBId(e.target.value);
              onBuildSelectionChange('b', e.target.value);
            }}
            className="w-full px-3 py-2.5 rounded-xl bg-gothic-950 border border-gothic-border text-xs text-white focus:outline-none focus:border-gold-accent font-semibold"
          >
            {availableOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cartões dos Equipamentos Lado a Lado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Detalhe da Build A */}
        <div className="p-5 rounded-2xl gothic-border-card border-blood-800/60 bg-gradient-to-b from-gothic-900 to-gothic-950 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-blood-400 font-bold uppercase">BUILD A</span>
              <span className="text-xs font-mono text-gold-400 font-bold">Score: {buildA.score.overallScore}/100</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-1">{buildA.title}</h3>
            <span className="text-xs text-neutral-400 block mb-4">{buildA.subtitle}</span>

            <div className="build-equipment-strip build-equipment-strip--compact" aria-label="Equipamentos da Build A">
              <figure>
                <ItemArtwork itemId={buildA.weapon.id} title={buildA.weapon.name} iconType={buildA.weapon.iconType} />
                <figcaption>ARMA · {buildA.weapon.name}</figcaption>
              </figure>
              <figure>
                <ItemArtwork itemId={buildA.arcana.id} title={buildA.arcana.spellName} iconType={buildA.arcana.iconType} />
                <figcaption>ARCANA · {buildA.arcana.spellName}</figcaption>
              </figure>
              {buildA.relics.map(relic => (
                <figure key={relic.id}>
                  <ItemArtwork itemId={relic.id} title={relic.name} iconType={relic.iconType} />
                  <figcaption>RELÍQUIA · {relic.name}</figcaption>
                </figure>
              ))}
            </div>

            <div className="space-y-2 p-3 rounded-xl bg-gothic-950 border border-neutral-800 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-neutral-400">Arma:</span>
                <span className="font-semibold text-gold-300">{buildA.weapon.name} ({buildA.weapon.baseDamagePerHit} dano/hit)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Arcana:</span>
                <span className="font-semibold text-purple-300">{buildA.arcana.spellName} ({buildA.arcana.manaCost} MP)</span>
              </div>
              <div className="pt-1 border-t border-neutral-800">
                <span className="text-neutral-400 block mb-1">Relíquias:</span>
                <div className="text-[11px] text-neutral-300 font-medium">
                  {buildA.relics.map(r => r.name).join(' • ')}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gothic-900 text-xs text-neutral-400 font-mono flex items-center justify-between">
              <span>Dificuldade de Execução:</span>
              <strong className="text-white">{buildA.score.executionDifficulty}</strong>
            </div>
          </div>

          <button
            onClick={() => onLoadBuildIntoPlanner({
              weaponId: buildA.weapon.id,
              arcanaId: buildA.arcana.id,
              relicIds: buildA.relics.map(r => r.id),
              name: buildA.title
            })}
            className="mt-4 w-full py-2 rounded-xl bg-blood-800 hover:bg-blood-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-blood-glow"
          >
            <span>Carregar BUILD A no Planner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Detalhe da Build B */}
        <div className="p-5 rounded-2xl gothic-border-card border-arcane-800/60 bg-gradient-to-b from-gothic-900 to-gothic-950 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">BUILD B</span>
              <span className="text-xs font-mono text-gold-400 font-bold">Score: {buildB.score.overallScore}/100</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-1">{buildB.title}</h3>
            <span className="text-xs text-neutral-400 block mb-4">{buildB.subtitle}</span>

            <div className="build-equipment-strip build-equipment-strip--compact" aria-label="Equipamentos da Build B">
              <figure>
                <ItemArtwork itemId={buildB.weapon.id} title={buildB.weapon.name} iconType={buildB.weapon.iconType} />
                <figcaption>ARMA · {buildB.weapon.name}</figcaption>
              </figure>
              <figure>
                <ItemArtwork itemId={buildB.arcana.id} title={buildB.arcana.spellName} iconType={buildB.arcana.iconType} />
                <figcaption>ARCANA · {buildB.arcana.spellName}</figcaption>
              </figure>
              {buildB.relics.map(relic => (
                <figure key={relic.id}>
                  <ItemArtwork itemId={relic.id} title={relic.name} iconType={relic.iconType} />
                  <figcaption>RELÍQUIA · {relic.name}</figcaption>
                </figure>
              ))}
            </div>

            <div className="space-y-2 p-3 rounded-xl bg-gothic-950 border border-neutral-800 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-neutral-400">Arma:</span>
                <span className="font-semibold text-gold-300">{buildB.weapon.name} ({buildB.weapon.baseDamagePerHit} dano/hit)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Arcana:</span>
                <span className="font-semibold text-purple-300">{buildB.arcana.spellName} ({buildB.arcana.manaCost} MP)</span>
              </div>
              <div className="pt-1 border-t border-neutral-800">
                <span className="text-neutral-400 block mb-1">Relíquias:</span>
                <div className="text-[11px] text-neutral-300 font-medium">
                  {buildB.relics.map(r => r.name).join(' • ')}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gothic-900 text-xs text-neutral-400 font-mono flex items-center justify-between">
              <span>Dificuldade de Execução:</span>
              <strong className="text-white">{buildB.score.executionDifficulty}</strong>
            </div>
          </div>

          <button
            onClick={() => onLoadBuildIntoPlanner({
              weaponId: buildB.weapon.id,
              arcanaId: buildB.arcana.id,
              relicIds: buildB.relics.map(r => r.id),
              name: buildB.title
            })}
            className="mt-4 w-full py-2 rounded-xl bg-purple-900 hover:bg-purple-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-arcane-glow"
          >
            <span>Carregar BUILD B no Planner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabela de Comparação Métrica Detalhada */}
      <div className="p-6 rounded-2xl bg-gothic-900 border border-gothic-border space-y-4">
        <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-gold-accent" />
          Tabela Comparativa de Atributos & Diferenciais
        </h3>

        <div className="space-y-4 pt-2">
          {comparisonAttributes.map((attr, idx) => {
            const diff = attr.keyA - attr.keyB;
            const isWinnerA = diff > 0;
            const isWinnerB = diff < 0;

            return (
              <div key={idx} className="p-3.5 rounded-xl bg-gothic-950 border border-neutral-800/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neutral-200">
                    {attr.label}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
                    {attr.desc}
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-3 items-center">
                  {/* Score Build A */}
                  <div className="col-span-2 text-left">
                    <span className={`text-xs font-mono font-bold ${isWinnerA ? 'text-blood-400 font-black' : 'text-neutral-400'}`}>
                      {attr.keyA}/100 {isWinnerA && '👑'}
                    </span>
                  </div>

                  {/* Barras Gráficas Concorrentes */}
                  <div className="col-span-8 flex items-center gap-2">
                    {/* Barra A */}
                    <div className="flex-1 h-2 rounded-full bg-gothic-900 overflow-hidden flex justify-end">
                      <div 
                        className={`comparison-meter comparison-meter--a h-full transition-all duration-500 rounded-full ${
                          isWinnerA ? 'bg-gradient-to-l from-blood-600 to-blood-400' : 'bg-neutral-600'
                        }`} 
                        style={{ width: `${attr.keyA}%` }} 
                      />
                    </div>

                    <span className="text-[10px] font-mono text-neutral-500 px-1">VS</span>

                    {/* Barra B */}
                    <div className="flex-1 h-2 rounded-full bg-gothic-900 overflow-hidden">
                      <div 
                        className={`comparison-meter comparison-meter--b h-full transition-all duration-500 rounded-full ${
                          isWinnerB ? 'bg-gradient-to-r from-purple-600 to-purple-400' : 'bg-neutral-600'
                        }`} 
                        style={{ width: `${attr.keyB}%` }} 
                      />
                    </div>
                  </div>

                  {/* Score Build B */}
                  <div className="col-span-2 text-right">
                    <span className={`text-xs font-mono font-bold ${isWinnerB ? 'text-purple-400 font-black' : 'text-neutral-400'}`}>
                      {isWinnerB && '👑 '} {attr.keyB}/100
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
