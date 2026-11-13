import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Star, 
  ChevronDown, 
  Crown, 
  Check, 
  Clock,
  Plus,
  RotateCcw
} from 'lucide-react';
import { RELICS_DATA } from '../data/relics';
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
      relic.effect.toLowerCase().includes(search.toLowerCase()) ||
      relic.percentagesAndDuration?.toLowerCase().includes(search.toLowerCase());

    const matchesTier = selectedTier === 'Todos' || relic.rarityOrTier === selectedTier;
    const matchesUnlocked = !onlyUnlocked || unlockedRelicIds.includes(relic.id);

    return matchesSearch && matchesTier && matchesUnlocked;
  });

  return (
    <div className="relic-vault">
      <header className="relic-vault__intro">
        <div className="relic-vault__intro-copy">
          <div className="relic-vault__kicker">
            <BookOpen size={13} aria-hidden="true" />
            <span>ARQUIVO DE ARTEFATOS</span>
            <i aria-hidden="true" />
            <span>REGISTRO 04</span>
          </div>
          <h2>Relicário dos <em>pactos malditos.</em></h2>
          <p>
            Escolha os artefatos que definem sua incursão. Cada pacto altera o combate — e as sinergias que você pode forjar.
          </p>
          <span className="relic-vault__collection-count">
            <strong>{String(RELICS_DATA.length).padStart(2, '0')}</strong>
            <span>RELÍQUIAS CATALOGADAS</span>
          </span>
        </div>

        <aside className="relic-vault__loadout" aria-label={`${equippedRelicIds.length} de 3 relíquias equipadas`}>
          <div className="relic-vault__loadout-heading">
            <span>CONFIGURAÇÃO ATIVA</span>
            <strong>{String(equippedRelicIds.length).padStart(2, '0')}<i>/</i>03</strong>
          </div>
          <div className="relic-vault__slots">
            {[0, 1, 2].map(slotIndex => {
              const equippedRelic = RELICS_DATA.find(relic => relic.id === equippedRelicIds[slotIndex]);
              return (
                <div
                  key={slotIndex}
                  className={`relic-vault__slot${equippedRelic ? ' is-filled' : ''}`}
                  aria-label={equippedRelic ? `${equippedRelic.name} equipada` : `Espaço ${slotIndex + 1} vazio`}
                  title={equippedRelic?.name ?? `Espaço ${slotIndex + 1} vazio`}
                >
                  <span className="relic-vault__slot-number">0{slotIndex + 1}</span>
                  <span className="relic-vault__slot-mark">
                    {equippedRelic ? equippedRelic.name.charAt(0) : <Plus size={16} aria-hidden="true" />}
                  </span>
                  <span className="relic-vault__slot-name">
                    {equippedRelic ? equippedRelic.name.split(' (')[0] : 'ESPAÇO LIVRE'}
                  </span>
                </div>
              );
            })}
          </div>
          <span className="relic-vault__loadout-note">ATÉ 3 PACTOS SIMULTÂNEOS</span>
        </aside>
      </header>

      <aside className="relic-vault__edition">
        <span className="relic-vault__edition-mark" aria-hidden="true"><Crown size={24} /></span>
        <div className="relic-vault__edition-copy">
          <div className="relic-vault__edition-kicker">
            <span>PEÇA DE EDIÇÃO LIMITADA</span>
            <i aria-hidden="true" />
            <span>MIDNIGHT EDITION</span>
          </div>
          <h3>Family's Grace <em>— Graça da Família</em></h3>
          <p>
            Recompensa exclusiva da Midnight Edition: evita um golpe fatal e ressuscita o caçador com 35% de vida, uma vez por incursão.
          </p>
        </div>
        <span className="relic-vault__edition-seal" aria-hidden="true">BELMONT<br />LINEAGE<br /><strong>01 / 01</strong></span>
      </aside>

      <section className="relic-vault__filters" aria-label="Busca e filtros de relíquias">
        <div className="relic-vault__filter-top">
          <label className="relic-vault__search">
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Buscar relíquia, efeito ou percentual..."
              aria-label="Buscar relíquias por nome, efeito ou percentual"
            />
            {search && (
              <button type="button" onClick={() => setSearch('')} aria-label="Limpar busca">
                ×
              </button>
            )}
          </label>

          <label className="relic-vault__unlocked">
            <input
              type="checkbox"
              checked={onlyUnlocked}
              onChange={event => setOnlyUnlocked(event.target.checked)}
            />
            <span className="relic-vault__checkbox" aria-hidden="true"><Check size={11} /></span>
            <span>Apenas desbloqueadas <strong>{unlockedRelicIds.length}/{RELICS_DATA.length}</strong></span>
          </label>
        </div>

        <div className="relic-vault__filter-bottom">
          <span className="relic-vault__filter-label">CLASSIFICAR</span>
          <div className="relic-vault__tiers" role="group" aria-label="Filtrar por classificação">
            {tiers.map(tier => {
              const tierCount = tier === 'Todos'
                ? RELICS_DATA.length
                : RELICS_DATA.filter(relic => relic.rarityOrTier === tier).length;
              const isSelected = selectedTier === tier;
              return (
                <button
                  key={tier}
                  type="button"
                  className={`relic-vault__tier${isSelected ? ' is-selected' : ''}`}
                  onClick={() => setSelectedTier(tier)}
                  aria-pressed={isSelected}
                >
                  <span>{tier}</span>
                  <small>{String(tierCount).padStart(2, '0')}</small>
                </button>
              );
            })}
          </div>
          <div className="relic-vault__results" aria-live="polite">
            <strong>{String(filteredRelics.length).padStart(2, '0')}</strong>
            <span>EXIBIDAS</span>
            {(search || selectedTier !== 'Todos' || onlyUnlocked) && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedTier('Todos');
                  setOnlyUnlocked(false);
                }}
              >
                <RotateCcw size={12} aria-hidden="true" />
                LIMPAR
              </button>
            )}
          </div>
        </div>
      </section>

      {filteredRelics.length > 0 ? (
        <div className="item-library-grid relic-library-grid">
          {filteredRelics.map((relic, index) => {
            const isExpanded = expandedRelicId === relic.id;
            const isFav = favorites.includes(relic.id);
            const isEquipped = equippedRelicIds.includes(relic.id);

            return (
              <article
                key={relic.id}
                className={`relic-equipment-card gothic-border-card${relic.isMidnightEditionBonus ? ' is-midnight-bonus' : ''}`}
                data-tier={relic.rarityOrTier}
                data-equipped={isEquipped}
              >
                <button
                  type="button"
                  className="relic-equipment-card__art-trigger"
                  aria-label={`Ampliar imagem ilustrativa de ${relic.name}`}
                  onClick={() => setDetailRelicId(relic.id)}
                >
                  <span className="relic-equipment-card__art-index" aria-hidden="true">
                    RELÍQUIA / {String(index + 1).padStart(2, '0')}
                  </span>
                  <ItemArtwork
                    itemId={relic.id}
                    title={relic.name}
                    iconType={relic.iconType}
                    className="relic-equipment-card__artwork"
                  />
                  <span className="relic-equipment-card__art-hint">Ampliar arte</span>
                </button>

                <div className="relic-equipment-card__body">
                  <header className="relic-equipment-card__heading">
                    <div className="relic-equipment-card__identity">
                      <h3>{relic.name}</h3>
                      <div className="relic-equipment-card__classification">
                        <span className={`relic-equipment-card__tier ${
                          relic.rarityOrTier === 'S-Tier' ? 'is-legendary' :
                          relic.rarityOrTier === 'A-Tier' ? 'is-epic' :
                          relic.rarityOrTier === 'Exclusivo' ? 'is-legendary' : ''
                        }`}>
                          {relic.rarityOrTier}
                        </span>
                        {relic.isMidnightEditionBonus && <span className="relic-equipment-card__edition">Midnight Edition</span>}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleFavorite(relic.id)}
                      className={`relic-equipment-card__favorite${isFav ? ' is-favorite' : ''}`}
                      aria-label={isFav ? `Remover ${relic.name} dos favoritos` : `Favoritar ${relic.name}`}
                      aria-pressed={isFav}
                      title={isFav ? 'Remover dos favoritos' : 'Favoritar relíquia'}
                    >
                      <Star size={15} aria-hidden="true" />
                    </button>
                  </header>

                  <p className="relic-equipment-card__effect">{relic.effect}</p>

                  {relic.percentagesAndDuration && (
                    <div className="relic-equipment-card__duration">
                      <Clock size={13} aria-hidden="true" />
                      <span>{relic.percentagesAndDuration}</span>
                    </div>
                  )}

                  {isExpanded && (
                    <div id={`relic-details-${relic.id}`} className="relic-equipment-card__details animate-fadeIn">
                      <p className="relic-equipment-card__description">
                        {relic.description}
                      </p>

                      <div className="relic-equipment-card__synergies">
                        <span>Sinergias verificadas</span>
                        <p><strong>Armas:</strong> {relic.synergies.weapons.join(', ')}</p>
                        <p><strong>Arcanos:</strong> {relic.synergies.arcanas.join(', ')}</p>
                      </div>

                      <div className="relic-equipment-card__location">
                        <span>Localização no jogo</span>
                        <p>{relic.location}</p>
                      </div>
                    </div>
                  )}

                  <footer className="relic-equipment-card__actions">
                    <button
                      type="button"
                      onClick={() => setExpandedRelicId(isExpanded ? null : relic.id)}
                      aria-expanded={isExpanded}
                      aria-controls={isExpanded ? `relic-details-${relic.id}` : undefined}
                      className="relic-equipment-card__details-toggle"
                    >
                      <span>{isExpanded ? 'Menos detalhes' : 'Ver sinergias'}</span>
                      <ChevronDown className={isExpanded ? 'is-expanded' : ''} size={14} aria-hidden="true" />
                    </button>

                    {onToggleEquipRelicInPlanner && (
                      <button
                        type="button"
                        onClick={() => onToggleEquipRelicInPlanner(relic.id)}
                        className={`relic-equipment-card__equip${isEquipped ? ' is-equipped' : ''}`}
                        disabled={!isEquipped && equippedRelicIds.length >= 3}
                      >
                        {isEquipped ? (
                          <>
                            <Check size={13} aria-hidden="true" />
                            <span>Equipada</span>
                          </>
                        ) : (
                          <span>{equippedRelicIds.length >= 3 ? 'Limite 3 Cheio' : 'Equipar'}</span>
                        )}
                      </button>
                    )}
                  </footer>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="relic-vault__empty" role="status">
          <Search size={20} aria-hidden="true" />
          <strong>Nenhum pacto encontrado</strong>
          <span>A busca não encontrou relíquias com esses critérios.</span>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedTier('Todos');
              setOnlyUnlocked(false);
            }}
          >
            Limpar filtros <RotateCcw size={13} aria-hidden="true" />
          </button>
        </div>
      )}
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
