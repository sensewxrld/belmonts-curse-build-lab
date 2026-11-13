import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Target, 
  Check, 
  ArrowRight, 
  AlertTriangle, 
  Info, 
  Sword, 
  Shield, 
  BookOpen,
  Award
} from 'lucide-react';
import { 
  RECOMMENDATION_OBJECTIVES, 
  getRecommendedBuilds, 
  RecommendationResult 
} from '../utils/calculator';
import { BOSSES_DATA } from '../data/bosses';
import { ThemeIcon } from './ThemeIcons';
import { ItemArtwork } from './ItemArtwork';

interface BuildRecommenderProps {
  onLoadRecommendedBuild: (buildData: { weaponId: string; arcanaId: string; relicIds: string[]; name: string }) => void;
  unlockedIds: { weapons: string[]; arcanas: string[]; relics: string[] };
}

export const BuildRecommender: React.FC<BuildRecommenderProps> = ({
  onLoadRecommendedBuild,
  unlockedIds
}) => {
  const [selectedObjectiveIds, setSelectedObjectiveIds] = useState<string[]>(['boss-killer', 'max-damage']);
  const [targetBossId, setTargetBossId] = useState('');
  const [executionDifficulty, setExecutionDifficulty] = useState<'Todas' | 'Iniciante' | 'Intermediário' | 'Avançado'>('Todas');

  const toggleObjective = (id: string) => {
    if (selectedObjectiveIds.includes(id)) {
      if (selectedObjectiveIds.length > 1) {
        setSelectedObjectiveIds(selectedObjectiveIds.filter(item => item !== id));
      }
    } else {
      setSelectedObjectiveIds([...selectedObjectiveIds, id]);
    }
  };

  const recommendations: RecommendationResult[] = getRecommendedBuilds(
    selectedObjectiveIds,
    unlockedIds,
    { targetBossId, executionDifficulty }
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gothic-border/60 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blood-950/60 border border-blood-800 text-blood-300 text-xs font-semibold mb-2">
              <Flame className="w-3.5 h-3.5 text-gold-accent" />
              <span>Sistema de Orientação & Teoria Tática</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide">
              Recomendador Inteligente de Builds
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Marque seus objetivos táticos abaixo para que o motor filtre as 3 combinações mais sinérgicas, detalhando prós e limitações.
            </p>
          </div>
        </div>
      </div>

      {/* Seleção de Objetivos em Pílulas Interativas */}
      <div className="p-6 rounded-2xl bg-gothic-900 border border-gothic-border space-y-4">
        <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-gold-accent" />
          Selecione seus objetivos para esta incursão:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {RECOMMENDATION_OBJECTIVES.map((obj) => {
            const isSelected = selectedObjectiveIds.includes(obj.id);
            return (
              <button
                type="button"
                key={obj.id}
                onClick={() => toggleObjective(obj.id)}
                aria-pressed={isSelected}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blood-900/40 border-gold-accent shadow-gothic-glow'
                    : 'bg-gothic-950 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`text-xs font-bold ${isSelected ? 'text-gold-200' : 'text-neutral-200'}`}>
                    {obj.label}
                  </span>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center border flex-shrink-0 ${
                    isSelected ? 'bg-gold-500 border-gold-400 text-gothic-950' : 'border-neutral-700'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-[11px] text-neutral-400 leading-tight">
                  {obj.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="recommender-filters">
        <label>
          <span>CHEFE-ALVO</span>
          <select value={targetBossId} onChange={event => setTargetBossId(event.target.value)}>
            <option value="">Qualquer confronto</option>
            {BOSSES_DATA.map(boss => <option key={boss.id} value={boss.id}>{boss.name}</option>)}
          </select>
        </label>
        <label>
          <span>NÍVEL DE EXPERIÊNCIA</span>
          <select
            value={executionDifficulty}
            onChange={event => {
              const value = event.currentTarget.value;
              if (value === 'Todas' || value === 'Iniciante' || value === 'Intermediário' || value === 'Avançado') {
                setExecutionDifficulty(value);
              }
            }}
          >
            <option value="Todas">Todos os níveis</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
        </label>
        <p>As preferências de estilo e objetivos são selecionadas acima. “Meu arsenal” limita as recomendações aos itens desbloqueados.</p>
      </div>

      {/* As 3 Melhores Combinações Recomendadas com Explicações e Limitações */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gothic-border/60 pb-2">
          <h2 className="font-serif text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold-accent" />
            As 3 Melhores Combinações Calculadas:
          </h2>
          <span className="text-xs font-mono text-neutral-400">
            Avaliadas por compatibilidade heurística
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className={`rounded-2xl gothic-border-card p-6 flex flex-col justify-between relative ${
                index === 0 ? 'border-gold-accent/60 shadow-gothic-glow' : 'border-gothic-border'
              }`}
            >
              <div className="absolute -top-3 left-6">
                <span className={`pill-badge font-mono font-bold ${
                  index === 0 ? 'bg-gold-500 text-gothic-950' : 'bg-gothic-800 text-neutral-300 border border-neutral-600'
                }`}>
                  #{index + 1} Recomendação
                </span>
              </div>

              <div className="pt-2">
                <div className="text-xs font-mono text-blood-400 font-bold uppercase mb-1">
                  {rec.buildCode}
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-3">
                  {rec.title}
                </h3>
                <div className="build-equipment-strip build-equipment-strip--compact" aria-label={`Equipamentos de ${rec.title}`}>
                  <figure>
                    <ItemArtwork itemId={rec.weapon.id} title={rec.weapon.name} iconType={rec.weapon.iconType} />
                    <figcaption>ARMA · {rec.weapon.name}</figcaption>
                  </figure>
                  <figure>
                    <ItemArtwork itemId={rec.arcana.id} title={rec.arcana.spellName} iconType={rec.arcana.iconType} />
                    <figcaption>ARCANA · {rec.arcana.spellName}</figcaption>
                  </figure>
                  {rec.relics.map(relic => (
                    <figure key={relic.id}>
                      <ItemArtwork itemId={relic.id} title={relic.name} iconType={relic.iconType} />
                      <figcaption>RELÍQUIA · {relic.name}</figcaption>
                    </figure>
                  ))}
                </div>

                {/* Equipamentos da Combinação */}
                <div className="space-y-2 p-3.5 rounded-xl bg-gothic-950 border border-gothic-border/60 text-xs mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 flex items-center gap-1.5">
                      <ThemeIcon name={rec.weapon.iconType} className="w-3.5 h-3.5" />
                      Arma:
                    </span>
                    <span className="font-semibold text-gold-300">
                      {rec.weapon.name} ({rec.weapon.baseDamagePerHit} dano/hit)
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 flex items-center gap-1.5">
                      <ThemeIcon name={rec.arcana.iconType} className="w-3.5 h-3.5" />
                      Arcano:
                    </span>
                    <span className="font-semibold text-purple-300">
                      {rec.arcana.spellName} ({rec.arcana.manaCost} MP)
                    </span>
                  </div>

                  <div className="pt-1.5 border-t border-neutral-800">
                    <span className="text-neutral-400 block mb-1">3 Relíquias:</span>
                    <div className="text-[11px] text-neutral-200 font-medium">
                      {rec.relics.map(r => r.name).join(' • ')}
                    </div>
                  </div>
                </div>

                {/* Por que foi recomendada (Obrigatório) */}
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-neutral-300 mb-3 space-y-1">
                  <span className="text-emerald-400 font-bold block text-[11px] uppercase tracking-wider flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Por que foi recomendada:
                  </span>
                  <p className="text-[11px] text-neutral-300 leading-relaxed font-sans">
                    {rec.recommendationReason}
                  </p>
                </div>

                {/* Limitações conhecidas (Obrigatório) */}
                <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 text-xs text-neutral-300 mb-4 space-y-1">
                  <span className="text-rose-400 font-bold block text-[11px] uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Limitações & Pontos de Atenção:
                  </span>
                  <p className="text-[11px] text-neutral-300 leading-relaxed font-sans">
                    {rec.limitations}
                  </p>
                </div>
              </div>

              {/* Base com Score e Botão de Ação */}
              <div className="pt-3 border-t border-gothic-border/60 flex items-center justify-between">
                <span className="text-xs font-mono text-gold-300 font-bold">
                  Score: {rec.score.overallScore}/100
                </span>

                <button
                  onClick={() => onLoadRecommendedBuild({
                    weaponId: rec.weapon.id,
                    arcanaId: rec.arcana.id,
                    relicIds: rec.relics.map(r => r.id),
                    name: rec.title
                  })}
                  className="px-3.5 py-1.5 rounded-full bg-blood-800 hover:bg-blood-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-blood-glow"
                >
                  <span>Equipar no Planner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {recommendations.length === 0 && (
          <div className="p-8 text-center gothic-border-card">
            <h3 className="font-serif text-lg">Nenhuma combinação atende a esses filtros.</h3>
            <p className="mt-2 text-sm text-neutral-400">Tente outro chefe, nível de execução ou atualize os itens desbloqueados no seu arsenal.</p>
          </div>
        )}
      </div>
    </div>
  );
};
