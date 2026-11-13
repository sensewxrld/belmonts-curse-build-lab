import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Trash2, 
  Share2, 
  Layers, 
  CheckCircle2, 
  Award, 
  ShieldAlert,
  Flame,
  Scale
} from 'lucide-react';
import { BUILDS_DATA } from '../data/builds';
import { WEAPONS_DATA } from '../data/weapons';
import { ARCANAS_DATA } from '../data/arcanas';
import { RELICS_DATA } from '../data/relics';
import { CustomBuild } from '../types';
import { calculateBuildScore } from '../utils/calculator';
import { generateShareUrl } from '../utils/storage';
import { ThemeIcon } from './ThemeIcons';
import { ItemArtwork } from './ItemArtwork';

interface BuildLibraryProps {
  onLoadBuildIntoPlanner: (buildIdOrCustom: { id?: string; weaponId: string; arcanaId: string; relicIds: string[]; name?: string; playstyle?: string; description?: string }) => void;
  onSendToComparator: (buildData: { title: string; weaponId: string; arcanaId: string; relicIds: string[] }) => void;
  customBuilds: CustomBuild[];
  onDeleteCustomBuild: (id: string) => void;
}

export const BuildLibrary: React.FC<BuildLibraryProps> = ({
  onLoadBuildIntoPlanner,
  onSendToComparator,
  customBuilds,
  onDeleteCustomBuild
}) => {
  const [tab, setTab] = useState<'presets' | 'custom'>('presets');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = (weaponId: string, arcanaId: string, relicIds: string[], id: string) => {
    const url = generateShareUrl(weaponId, arcanaId, relicIds);
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gothic-border/60 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-gold-950/60 border border-gold-800 text-gold-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
              <span>Biblioteca de Teoria de Builds</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide">
              Matriz de Estratégias & Composições
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Combinações arquitetadas para cada estilo de combate, calculadas por sinergia e eficiência prática.
            </p>
          </div>

          {/* Abas: Presets vs Custom */}
          <div className="flex items-center bg-gothic-900 p-1 rounded-xl border border-gothic-border">
            <button
              onClick={() => setTab('presets')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                tab === 'presets'
                  ? 'bg-blood-800 text-gold-200 shadow-blood-glow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              8 Recomendações de Teoria
            </button>
            <button
              onClick={() => setTab('custom')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                tab === 'custom'
                  ? 'bg-blood-800 text-gold-200 shadow-blood-glow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Minhas Criações</span>
              <span className="px-1.5 py-0.2 rounded-full bg-gothic-950 text-[10px] text-gold-400 font-mono">
                {customBuilds.length}
              </span>
            </button>
          </div>
        </div>

        {/* Nota Obrigatória de Teoria de Builds */}
        <div className="mt-4 p-4 rounded-xl bg-gothic-900 border border-gold-accent/30 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-gold-accent flex-shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-300 leading-relaxed">
            <strong className="text-gold-200 block mb-0.5 font-semibold">
              Classificação Editorial Canônica:
            </strong>
            As 8 configurações catalogadas abaixo são estritamente <strong>recomendações de teoria de builds</strong> formuladas com base em propriedades físicas e mágicas dos itens, e <strong>não presets oficiais da desenvolvedora</strong>. Todas as avaliações são heurísticas e transparentes.
          </div>
        </div>
      </div>

      {/* Conteúdo: 8 Presets de Teoria */}
      {tab === 'presets' && (
        <div className="build-library-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {BUILDS_DATA.map((build) => {
            const weapon = WEAPONS_DATA.find(w => w.id === build.weaponId)!;
            const arcana = ARCANAS_DATA.find(a => a.id === build.arcanaId)!;
            const relics = build.relicIds.map(rid => RELICS_DATA.find(r => r.id === rid)!).filter(Boolean);
            const score = calculateBuildScore(weapon, arcana, relics);

            return (
              <article
                key={build.id}
                className="build-equipment-card gothic-border-card"
              >
                <div className="build-equipment-card__art-trigger">
                  <span className="build-equipment-card__art-index" aria-hidden="true">
                    ARMA / {build.code.replace(/\D/g, '').padStart(2, '0')}
                  </span>
                  <ItemArtwork
                    itemId={weapon.id}
                    title={weapon.name}
                    iconType={weapon.iconType}
                    className="build-equipment-card__artwork"
                  />
                </div>

                <div className="build-equipment-card__body">
                  {/* Topo */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="build-equipment-card__eyebrow">
                        {build.code} • {build.playstyle}
                      </div>
                      <h3 className="build-equipment-card__title">
                        {build.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleShare(build.weaponId, build.arcanaId, build.relicIds, build.id)}
                        className="build-equipment-card__action"
                        title="Copiar link compartilhável desta build"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {copiedId === build.id && (
                    <div className="text-[11px] text-emerald-400 font-mono mb-2">
                      ✓ Link copiado para a área de transferência!
                    </div>
                  )}

                  <p className="build-equipment-card__description">
                    {build.description}
                  </p>

                  <div className="build-equipment-strip build-equipment-strip--compact" aria-label="Equipamentos desta build">
                    <figure>
                      <ItemArtwork itemId={arcana.id} title={arcana.spellName} iconType={arcana.iconType} />
                      <figcaption>ARCANA · {arcana.spellName}</figcaption>
                    </figure>
                    {relics.map(relic => (
                      <figure key={relic.id}>
                        <ItemArtwork itemId={relic.id} title={relic.name} iconType={relic.iconType} />
                        <figcaption>RELÍQUIA · {relic.name}</figcaption>
                      </figure>
                    ))}
                  </div>

                  {/* Componentes Equipados */}
                  <div className="build-equipment-card__loadout">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400 flex items-center gap-1.5">
                        <ThemeIcon name={weapon.iconType} className="w-3.5 h-3.5" />
                        Arma Principal:
                      </span>
                      <span className="font-semibold text-gold-300">
                        {weapon.name} ({weapon.baseDamagePerHit} dano/hit)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400 flex items-center gap-1.5">
                        <ThemeIcon name={arcana.iconType} className="w-3.5 h-3.5" />
                        Arcano:
                      </span>
                      <span className="font-semibold text-purple-300">
                        {arcana.spellName} ({arcana.manaCost} MP)
                      </span>
                    </div>

                    <div className="pt-1 border-t border-neutral-800/80">
                      <span className="text-neutral-400 block mb-1">Relíquias Ativas (3 máx):</span>
                      <div className="flex flex-wrap gap-1.5">
                        {relics.map(r => (
                          <span key={r.id} className="px-2 py-0.5 rounded-md bg-gothic-850 border border-neutral-700 text-[11px] text-neutral-200">
                            {r.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Destaques Táticos */}
                  <div className="build-equipment-card__synergy">
                    <span className="build-equipment-card__section-label">
                      Pontos Chave da Sinergia:
                    </span>
                    <ul className="text-[11px] text-neutral-400 space-y-0.5">
                      {build.highlights.map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-blood-400 font-bold">•</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Base com Pontuação e Ações */}
                <div className="build-equipment-card__footer">
                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase block">Score Heurístico</span>
                      <span className="text-base font-serif font-bold text-gold-300 font-mono">
                        {score.overallScore}/100
                      </span>
                    </div>
                    <span className="text-neutral-600">|</span>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      {score.executionDifficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSendToComparator({
                        title: build.title,
                        weaponId: build.weaponId,
                        arcanaId: build.arcanaId,
                        relicIds: build.relicIds
                      })}
                      className="p-2 rounded-xl bg-gothic-850 hover:bg-gothic-800 border border-neutral-700 text-neutral-300 hover:text-white transition-all"
                      title="Enviar para o comparador lado a lado"
                    >
                      <Scale className="w-4 h-4 text-gold-accent" />
                    </button>

                    <button
                      onClick={() => onLoadBuildIntoPlanner({
                        weaponId: build.weaponId,
                        arcanaId: build.arcanaId,
                        relicIds: build.relicIds,
                        name: build.title
                      })}
                      className="px-3 py-1.5 rounded-full bg-blood-800 hover:bg-blood-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-blood-glow"
                    >
                      <span>Abrir no Planner</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Conteúdo: Builds Personalizadas do Usuário */}
      {tab === 'custom' && (
        <div>
          {customBuilds.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-gothic-900 border border-gothic-border space-y-3">
              <Sparkles className="w-10 h-10 text-neutral-600 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-white">
                Nenhuma build personalizada salva ainda
              </h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Vá até o Montador de Builds (Planner), combine uma arma, um arcano e até três relíquias, e clique em "Salvar Minha Build" para catalogá-la aqui.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customBuilds.map((cb) => {
                const weapon = WEAPONS_DATA.find(w => w.id === cb.weaponId);
                const arcana = ARCANAS_DATA.find(a => a.id === cb.arcanaId);
                const relics = cb.relicIds.map(rid => RELICS_DATA.find(r => r.id === rid)!).filter(Boolean);
                const score = weapon && arcana ? calculateBuildScore(weapon, arcana, relics) : null;

                return (
                  <div
                    key={cb.id}
                    className="rounded-2xl gothic-border-card p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className="text-[10px] font-mono text-gold-400 font-semibold uppercase">
                            Personalizada • {cb.playstyle}
                          </span>
                          <h3 className="font-serif text-lg font-bold text-white">
                            {cb.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleShare(cb.weaponId, cb.arcanaId, cb.relicIds, cb.id)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-gold-accent hover:bg-gothic-800"
                            title="Compartilhar link"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteCustomBuild(cb.id)}
                            className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-gothic-800"
                            title="Excluir build salva"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {cb.description && (
                        <p className="text-xs text-neutral-400 mb-3">{cb.description}</p>
                      )}

                      <div className="space-y-1.5 p-3 rounded-xl bg-gothic-950 border border-neutral-800 text-xs mb-4">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Arma:</span>
                          <span className="text-gold-300 font-semibold">{weapon?.name || 'Desconhecida'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Arcano:</span>
                          <span className="text-purple-300 font-semibold">{arcana?.spellName || 'Desconhecido'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Relíquias:</span>
                          <span className="text-neutral-300 font-medium">{relics.map(r => r.name).join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gothic-border/60 flex items-center justify-between">
                      <span className="text-xs text-gold-400 font-mono">
                        Score: {score?.overallScore || 0}/100
                      </span>

                      <button
                        onClick={() => onLoadBuildIntoPlanner({
                          id: cb.id,
                          weaponId: cb.weaponId,
                          arcanaId: cb.arcanaId,
                          relicIds: cb.relicIds,
                          name: cb.name,
                          playstyle: cb.playstyle,
                          description: cb.description
                        })}
                        className="px-3 py-1.5 rounded-full bg-blood-800 hover:bg-blood-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                      >
                        <span>Editar no Montador</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
