import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  Star, 
  ChevronDown, 
  Crown, 
  ShieldCheck, 
  Zap, 
  Check, 
  Clock 
} from 'lucide-react';
import { RELICS_DATA } from '../data/relics';
import { Relic } from '../types';
import { ItemArtwork } from './ItemArtwork';
import { ItemDetailPanel } from './ItemDetailPanel';

interface RelicLibraryProps {
  onToggleEquipRelicInPlanner?: (relicId: string) => void;
  equippedRelicIds?: string[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  unlockedRelicIds: string[];
}

export const RelicLibrary: React.FC<RelicLibraryProps> = ({
  onToggleEquipRelicInPlanner,
  equippedRelicIds = [],
  favorites,
  onToggleFavorite,
  unlockedRelicIds
}) => {
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('Todos');
  const [expandedRelicId, setExpandedRelicId] = useState<string | null>(null);
  const [detailRelicId, setDetailRelicId] = useState<string | null>(null);
  const [onlyUnlocked, setOnlyUnlocked] = useState(false);

  const tiers = ['Todos', 'S-Tier', 'A-Tier', 'B-Tier', 'Exclusivo', 'Utilitário'];

  const filteredRelics = RELICS_DATA.filter(relic => {
    const matchesSearch = 
      relic.name.toLowerCase().includes(search.toLowerCase()) ||
      relic.description.toLowerCase().includes(search.toLowerCase()) ||
      relic.effect.toLowerCase().includes(search.toLowerCase());

    const matchesTier = selectedTier === 'Todos' || relic.rarityOrTier === selectedTier;
    const matchesUnlocked = !onlyUnlocked || unlockedRelicIds.includes(relic.id);

    return matchesSearch && matchesTier && matchesUnlocked;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gothic-border/60 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blood-950/60 border border-blood-800 text-blood-300 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5 text-gold-accent" />
              <span>17 Relíquias Cadastradas • Limite de 3 Equipadas</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide">
              Relicário dos Pactos Malditos
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Artefatos passivos com bônus de combate, tempos de duração e sinergias diretas com armas e magias.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-gothic-900 border border-gold-accent/30 text-xs flex items-center gap-2">
            <span className="text-neutral-400">Limite de Configuração:</span>
            <span className="font-mono font-bold text-gold-300">
              {equippedRelicIds.length}/3 relíquias ativas
            </span>
          </div>
        </div>

        {/* Destaque Obrigatório: Family's Grace / Midnight Edition */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-gold-950/70 via-gothic-900 to-blood-950/70 border border-gold-accent/50 flex items-start gap-3">
          <Crown className="w-5 h-5 text-gold-accent flex-shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-300 leading-relaxed">
            <strong className="text-gold-200 block mb-0.5 font-semibold">
              Family's Grace (Graça da Família) — Bônus Exclusivo da Midnight Edition:
            </strong>
            Identificada formalmente como recompensa exclusiva dos adquirentes da <strong>Midnight Edition</strong>. Concede a habilidade inestimável de evitar um golpe fatal, ressuscitando o caçador com 35% de vida uma vez por incursão.
          </div>
        </div>
      </div>

      {/* Busca & Filtros */}
      <div className="p-4 rounded-2xl bg-gothic-900 border border-gothic-border space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-neutral-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por relíquia, efeito ou percentual..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gothic-950 border border-gothic-border text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-accent"
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer self-start sm:self-auto px-2">
            <input
              type="checkbox"
              checked={onlyUnlocked}
              onChange={(e) => setOnlyUnlocked(e.target.checked)}
              className="rounded bg-gothic-950 border-gothic-border text-blood-600 focus:ring-0"
            />
            <span>Apenas Desbloqueadas ({unlockedRelicIds.length}/17)</span>
          </label>
        </div>

        {/* Filtros em Pílulas: Tier Editorial */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[11px] font-mono text-neutral-500 mr-1">Classificação:</span>
          {tiers.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTier(t)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedTier === t
                  ? 'bg-gold-500/20 text-gold-200 border border-gold-500/50 shadow-gothic-glow'
                  : 'bg-gothic-800 text-neutral-400 hover:text-white hover:bg-gothic-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grade de 17 Relíquias */}
      <div className="item-library-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRelics.map((relic) => {
          const isExpanded = expandedRelicId === relic.id;
          const isFav = favorites.includes(relic.id);
          const isEquipped = equippedRelicIds.includes(relic.id);

          return (
            <div
              key={relic.id}
              className={`rounded-2xl gothic-border-card p-5 flex flex-col justify-between transition-all ${
                relic.isMidnightEditionBonus ? 'border-gold-accent/50 bg-gradient-to-br from-gold-950/20 to-gothic-900' : ''
              }`}
            >
              <button
                type="button"
                className="equipment-art-trigger"
                aria-label={`Ampliar imagem ilustrativa de ${relic.name}`}
                onClick={() => setDetailRelicId(relic.id)}
              >
                <ItemArtwork
                  itemId={relic.id}
                  title={relic.name}
                  iconType={relic.iconType}
                />
              </button>
              <div>
                {/* Topo do Card */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-serif text-base font-bold text-white tracking-wide">
                        {relic.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`pill-badge py-0 px-2 text-[10px] ${
                          relic.rarityOrTier === 'S-Tier' ? 'badge-legendary' :
                          relic.rarityOrTier === 'A-Tier' ? 'badge-epic' :
                          relic.rarityOrTier === 'Exclusivo' ? 'badge-legendary' : 'badge-common'
                        }`}>
                          {relic.rarityOrTier}
                        </span>
                        {relic.isMidnightEditionBonus && (
                          <span className="text-[10px] font-mono text-gold-300 font-bold uppercase tracking-wider">
                            Midnight Edition
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleFavorite(relic.id)}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-gold-accent hover:bg-gothic-800 transition-colors"
                    title={isFav ? 'Remover dos favoritos' : 'Favoritar relíquia'}
                  >
                    <Star className={`w-4 h-4 ${isFav ? 'fill-gold-accent text-gold-accent' : ''}`} />
                  </button>
                </div>

                {/* Efeito da Relíquia */}
                <p className="text-xs text-neutral-300 leading-relaxed bg-gothic-900/60 p-3 rounded-xl border border-neutral-800/80 mb-3">
                  {relic.effect}
                </p>

                {/* Percentuais & Duração */}
                {relic.percentagesAndDuration && (
                  <div className="flex items-center gap-2 text-[11px] font-mono text-gold-300 bg-gothic-950/80 px-3 py-1.5 rounded-lg border border-gold-accent/20 mb-3">
                    <Clock className="w-3.5 h-3.5 text-gold-accent" />
                    <span>{relic.percentagesAndDuration}</span>
                  </div>
                )}

                {/* Detalhes Expansíveis */}
                {isExpanded && (
                  <div className="space-y-3 pt-2 text-xs border-t border-gothic-border/50 animate-fadeIn">
                    <p className="text-neutral-400 text-[11px] italic">
                      "{relic.description}"
                    </p>

                    {/* Sinergias */}
                    <div className="space-y-1">
                      <span className="text-gold-300 font-semibold text-[11px] block">
                        ⚡ Sinergias Verificadas:
                      </span>
                      <div className="text-[11px] text-neutral-300">
                        <strong className="text-neutral-400">Armas:</strong>{' '}
                        {relic.synergies.weapons.join(', ')}
                      </div>
                      <div className="text-[11px] text-neutral-300">
                        <strong className="text-neutral-400">Arcanos:</strong>{' '}
                        {relic.synergies.arcanas.join(', ')}
                      </div>
                    </div>

                    {/* Localização */}
                    <div className="p-2.5 rounded-lg bg-gothic-950 border border-neutral-800">
                      <span className="text-gold-400 font-mono text-[10px] uppercase block mb-0.5">
                        Localização no Jogo:
                      </span>
                      <p className="text-neutral-300 text-[11px] leading-relaxed">
                        {relic.location}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Ações na Base do Card */}
              <div className="pt-3 mt-3 border-t border-gothic-border/50 flex items-center justify-between gap-2">
                <button
                  onClick={() => setExpandedRelicId(isExpanded ? null : relic.id)}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 font-medium transition-colors"
                >
                  <span>{isExpanded ? 'Menos detalhes' : 'Ver sinergias'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {onToggleEquipRelicInPlanner && (
                  <button
                    onClick={() => onToggleEquipRelicInPlanner(relic.id)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                      isEquipped
                        ? 'bg-gold-500 text-gothic-950 font-bold shadow-gothic-glow'
                        : equippedRelicIds.length >= 3
                        ? 'bg-gothic-800 text-neutral-500 cursor-not-allowed'
                        : 'bg-blood-800 hover:bg-blood-700 text-white shadow-blood-glow'
                    }`}
                    disabled={!isEquipped && equippedRelicIds.length >= 3}
                  >
                    {isEquipped ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Equipada (3 máx)</span>
                      </>
                    ) : (
                      <span>{equippedRelicIds.length >= 3 ? 'Limite 3 Cheio' : 'Equipar no Planner'}</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {detailRelicId && (() => {
        const relic = RELICS_DATA.find(item => item.id === detailRelicId);
        if (!relic) return null;
        return (
          <ItemDetailPanel
            itemId={relic.id}
            title={relic.name}
            category={`Relíquia · ${relic.rarityOrTier}`}
            iconType={relic.iconType}
            onClose={() => setDetailRelicId(null)}
          >
            <p>{relic.description}</p>
            <div className="item-detail-note">
              <strong>Efeito e duração</strong>
              <p>{relic.effect}</p>
              {relic.percentagesAndDuration && <p>{relic.percentagesAndDuration}</p>}
            </div>
            <div className="item-detail-note">
              <strong>Localização</strong>
              <p>{relic.location}</p>
            </div>
            <div className="item-detail-note">
              <strong>Sinergias</strong>
              <p>Armas: {relic.synergies.weapons.join(', ')}</p>
              <p>Arcanos: {relic.synergies.arcanas.join(', ')}</p>
            </div>
          </ItemDetailPanel>
        );
      })()}
    </div>
  );
};
