import React, { useState } from 'react';
import { 
  Shield, 
  Sparkles, 
  Search, 
  Star, 
  Flame, 
  ChevronDown, 
  AlertTriangle, 
  Zap, 
  CheckCircle2, 
  Droplet 
} from 'lucide-react';
import { ARCANAS_DATA } from '../data/arcanas';
import { BOSSES_DATA } from '../data/bosses';
import { RELICS_DATA } from '../data/relics';
import { WEAPONS_DATA } from '../data/weapons';
import { Arcana } from '../types';
import { ItemArtwork } from './ItemArtwork';
import { ItemDetailPanel } from './ItemDetailPanel';

interface ArcanaLibraryProps {
  onSelectArcanaForPlanner?: (arcanaId: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  unlockedArcanaIds: string[];
}

export const ArcanaLibrary: React.FC<ArcanaLibraryProps> = ({
  onSelectArcanaForPlanner,
  favorites,
  onToggleFavorite,
  unlockedArcanaIds
}) => {
  const [search, setSearch] = useState('');
  const [expandedArcanaId, setExpandedArcanaId] = useState<string | null>(null);
  const [detailArcanaId, setDetailArcanaId] = useState<string | null>(null);
  const [onlyUnlocked, setOnlyUnlocked] = useState(false);

  const filteredArcanas = ARCANAS_DATA.filter(arcana => {
    const matchesSearch = 
      arcana.spellName.toLowerCase().includes(search.toLowerCase()) ||
      arcana.cardName.toLowerCase().includes(search.toLowerCase()) ||
      arcana.effect.toLowerCase().includes(search.toLowerCase()) ||
      arcana.description.toLowerCase().includes(search.toLowerCase()) ||
      arcana.unlockCondition.toLowerCase().includes(search.toLowerCase());

    const matchesUnlocked = !onlyUnlocked || unlockedArcanaIds.includes(arcana.id);

    return matchesSearch && matchesUnlocked;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gothic-border/60 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-arcane-950/60 border border-arcane-700 text-arcane-300 text-xs font-semibold mb-2">
              <Shield className="w-3.5 h-3.5 text-arcane-400" />
              <span>16 Cartas & Feitiços Arcanos</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide">
              Grimório dos Arcanos Maiores
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Catálogo esotérico com custos exatos de mana, upgrades em três níveis, interações com chefes e fraquezas registradas.
            </p>
          </div>
        </div>

        {/* Alerta Editorial Metodológico: Não presumir que todas as magias funcionam contra todos os chefes */}
        <div className="mt-4 p-4 rounded-xl bg-arcane-950/40 border border-arcane-700/60 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-arcane-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-300 leading-relaxed">
            <strong className="text-arcane-300 block mb-0.5 font-semibold">
              Limitações & Resistências Mecânicas:
            </strong>
            Ao contrário de jogos casuais, <strong>nem todos os Arcanos funcionam contra todos os chefes</strong> em Belmont's Curse. Chefes mecânicos ignoram feitiços de sangue, entidades incorpóreas não pisam em vinhas e santos renegados resistem à luz. Consulte sempre a lista de eficácia e resistências antes de entrar na câmara do chefe.
          </div>
        </div>
      </div>

      {/* Busca & Filtros */}
      <div className="p-4 rounded-2xl bg-gothic-900 border border-gothic-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por feitiço (ex: Life Drain, Purification), carta ou efeito..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gothic-950 border border-gothic-border text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-arcane-400"
          />
        </div>

        <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer self-start sm:self-auto px-2">
          <input
            type="checkbox"
            checked={onlyUnlocked}
            onChange={(e) => setOnlyUnlocked(e.target.checked)}
            className="rounded bg-gothic-950 border-gothic-border text-blood-600 focus:ring-0"
          />
          <span>Apenas Desbloqueados ({unlockedArcanaIds.length}/16)</span>
        </label>
      </div>

      {/* Inventário de Arcanos */}
      <div className="arcana-inventory">
        {filteredArcanas.map((arcana, index) => {
          const isExpanded = expandedArcanaId === arcana.id;
          const isFav = favorites.includes(arcana.id);
          const isUnlocked = unlockedArcanaIds.includes(arcana.id);
          const suggestedWeapons = Array.from(new Map(
            BOSSES_DATA
              .filter(boss => boss.recommendedArcanaId === arcana.id)
              .map(boss => WEAPONS_DATA.find(weapon => weapon.id === boss.recommendedWeaponId))
              .filter((weapon): weapon is (typeof WEAPONS_DATA)[number] => weapon !== undefined)
              .map(weapon => [weapon.id, weapon] as const)
          ).values());

          return (
            <article
              key={arcana.id}
              className={`arcana-equipment-card gothic-border-card${isUnlocked ? ' is-unlocked' : ''}${isExpanded ? ' is-expanded' : ''}`}
            >
              <button
                type="button"
                className="arcana-equipment-card__art-trigger"
                aria-label={`Ampliar imagem ilustrativa de ${arcana.spellName}`}
                onClick={() => setDetailArcanaId(arcana.id)}
              >
                <span className="arcana-equipment-card__art-index" aria-hidden="true">
                  ARCANO / {String(index + 1).padStart(2, '0')}
                </span>
                <ItemArtwork
                  itemId={arcana.id}
                  title={arcana.spellName}
                  iconType={arcana.iconType}
                  className="arcana-equipment-card__artwork"
                />
              </button>

              <div className="arcana-equipment-card__body">
                <div className="arcana-equipment-card__eyebrow">
                  <span><Sparkles size={13} aria-hidden="true" /> CARTA ARCANA</span>
                  <span className={`arcana-equipment-card__status${isUnlocked ? ' is-unlocked' : ''}`}>
                    {isUnlocked
                      ? <><CheckCircle2 size={12} aria-hidden="true" /> Desbloqueado</>
                      : <><Shield size={12} aria-hidden="true" /> Bloqueado</>}
                  </span>
                </div>

                <header className="arcana-equipment-card__heading">
                  <div className="arcana-equipment-card__identity">
                    <h2>{arcana.spellName}</h2>
                    <p>{arcana.cardName}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleFavorite(arcana.id)}
                    className={`arcana-equipment-card__favorite${isFav ? ' is-favorite' : ''}`}
                    aria-label={isFav ? `Remover ${arcana.spellName} dos favoritos` : `Favoritar ${arcana.spellName}`}
                    title={isFav ? 'Remover dos favoritos' : 'Favoritar arcano'}
                  >
                    <Star size={16} aria-hidden="true" />
                  </button>
                </header>

                <dl className="arcana-equipment-card__stats">
                  <div>
                    <dt>CUSTO DE MANA</dt>
                    <dd><Droplet size={14} aria-hidden="true" /> {arcana.manaCost} MP</dd>
                  </div>
                  <div>
                    <dt>MELHORIAS</dt>
                    <dd>{arcana.upgrades.length} NÍVEIS</dd>
                  </div>
                  <div>
                    <dt>CHEFES EFETIVOS</dt>
                    <dd>{arcana.effectiveAgainstBosses.length} ALVOS</dd>
                  </div>
                </dl>

                <div className="arcana-equipment-card__copy">
                  <p className="arcana-equipment-card__description">{arcana.description}</p>
                  <div className="arcana-equipment-card__effect">
                    <span><Zap size={13} aria-hidden="true" /> EFEITO</span>
                    <p>{arcana.effect}</p>
                  </div>
                </div>

                {arcana.patch114Note && (
                  <div className="arcana-equipment-card__patch-note">
                    <Flame size={14} aria-hidden="true" />
                    {arcana.patch114Note}
                  </div>
                )}

                <div className="arcana-equipment-card__synergies">
                  <div className="arcana-equipment-card__synergy-group">
                    <span className="arcana-equipment-card__section-label">ARMAS SUGERIDAS EM DOSSIÊS</span>
                    <div className="arcana-equipment-card__chips">
                      {suggestedWeapons.map(weapon => (
                        <span key={weapon.id} title="Sugestão registrada nos dossiês de chefes">
                          {weapon.name}
                        </span>
                      ))}
                      {suggestedWeapons.length === 0 && (
                        <span className="is-unlisted">Sem arma vinculada nos dossiês</span>
                      )}
                    </div>
                  </div>
                  <div className="arcana-equipment-card__synergy-group">
                    <span className="arcana-equipment-card__section-label">RELÍQUIAS COMPATÍVEIS</span>
                    <div className="arcana-equipment-card__chips">
                      {arcana.compatibleRelics.map(relicId => {
                        const relic = RELICS_DATA.find(item => item.id === relicId);
                        return relic ? <span key={relic.id}>{relic.name}</span> : null;
                      })}
                    </div>
                  </div>
                </div>

                <div className="arcana-equipment-card__unlock">
                  <span>DESBLOQUEIO</span>
                  <p>{arcana.unlockCondition}</p>
                </div>

                <div
                  id={`arcana-details-${arcana.id}`}
                  className={`arcana-equipment-card__expanded${isExpanded ? ' is-open' : ''}`}
                  aria-hidden={!isExpanded}
                >
                  <div className="arcana-equipment-card__expanded-inner">
                    <section>
                      <span className="arcana-equipment-card__section-label">APRIMORAMENTOS</span>
                      <ul>
                        {arcana.upgrades.map((upgrade, upgradeIndex) => (
                          <li key={upgradeIndex}>{upgrade}</li>
                        ))}
                      </ul>
                    </section>
                    <section>
                      <span className="arcana-equipment-card__section-label">CHEFES EFETIVOS</span>
                      <div className="arcana-equipment-card__chips">
                        {arcana.effectiveAgainstBosses.map(bossId => {
                          const boss = BOSSES_DATA.find(item => item.id === bossId);
                          return boss ? <span key={boss.id}>{boss.name}</span> : null;
                        })}
                      </div>
                    </section>
                    <section>
                      <span className="arcana-equipment-card__section-label">RESISTÊNCIAS E LIMITAÇÕES</span>
                      <ul>
                        {arcana.knownResistances.map((resistance, resistanceIndex) => (
                          <li key={resistanceIndex}>{resistance}</li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>

                <footer className="arcana-equipment-card__actions">
                  <button
                    type="button"
                    onClick={() => setExpandedArcanaId(isExpanded ? null : arcana.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`arcana-details-${arcana.id}`}
                    className="arcana-equipment-card__details-toggle"
                  >
                    <span>{isExpanded ? 'Recolher ficha' : 'Ver ficha completa'}</span>
                    <ChevronDown size={15} aria-hidden="true" />
                  </button>
                  {onSelectArcanaForPlanner && (
                    <button
                      type="button"
                      onClick={() => onSelectArcanaForPlanner(arcana.id)}
                      className="arcana-equipment-card__equip"
                    >
                      <Sparkles size={14} aria-hidden="true" />
                      <span>Equipar no Planner</span>
                    </button>
                  )}
                </footer>
              </div>
            </article>
          );
        })}
      </div>
      {detailArcanaId && (() => {
        const arcana = ARCANAS_DATA.find(item => item.id === detailArcanaId);
        if (!arcana) return null;
        return (
          <ItemDetailPanel
            itemId={arcana.id}
            title={arcana.spellName}
            category={`Arcana · ${arcana.cardName}`}
            iconType={arcana.iconType}
            onClose={() => setDetailArcanaId(null)}
          >
            <div className="item-detail-stats">
              <span><small>CUSTO DE MANA</small><strong>{arcana.manaCost} MP</strong></span>
              <span><small>UPGRADES</small><strong>{arcana.upgrades.length}</strong></span>
            </div>
            <p>{arcana.description}</p>
            <div className="item-detail-note">
              <strong>Condição de obtenção</strong>
              <p>{arcana.unlockCondition}</p>
            </div>
            <div className="item-detail-note">
              <strong>Melhorias</strong>
              {arcana.upgrades.map(upgrade => <p key={upgrade}>{upgrade}</p>)}
            </div>
          </ItemDetailPanel>
        );
      })()}
    </div>
  );
};
