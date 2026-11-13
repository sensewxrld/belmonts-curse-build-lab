import React, { useEffect, useRef, useState } from 'react';
import { 
  CheckCircle2,
  ChevronDown,
  Crosshair,
  Filter,
  Flame,
  Gauge,
  MapPin,
  Search,
  Shield, 
  Sparkles, 
  Star, 
  Sword,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { ARCANAS_DATA } from '../data/arcanas';
import { BOSSES_DATA } from '../data/bosses';
import { WEAPONS_DATA } from '../data/weapons';
import { RELICS_DATA } from '../data/relics';
import { BUILDS_DATA } from '../data/builds';
import { Weapon, WeaponFamily, Rarity } from '../types';
import { ItemArtwork } from './ItemArtwork';
import { ItemDetailPanel } from './ItemDetailPanel';

interface WeaponLibraryProps {
  onSelectWeaponForPlanner?: (weaponId: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  unlockedWeaponIds: string[];
}

const RARITY_CLASS: Record<Rarity, string> = {
  Comum: 'is-common',
  Raro: 'is-rare',
  Épico: 'is-epic',
  Lendário: 'is-legendary'
};

export const WeaponLibrary: React.FC<WeaponLibraryProps> = ({
  onSelectWeaponForPlanner,
  favorites,
  onToggleFavorite,
  unlockedWeaponIds
}) => {
  const [search, setSearch] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<WeaponFamily | 'Todas'>('Todas');
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'Todas'>('Todas');
  const [onlyUnlocked, setOnlyUnlocked] = useState(false);
  const [expandedWeaponId, setExpandedWeaponId] = useState<string | null>(null);
  const [detailWeaponId, setDetailWeaponId] = useState<string | null>(null);
  const [equippingWeaponId, setEquippingWeaponId] = useState<string | null>(null);
  const equipTimeout = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  useEffect(() => () => {
    if (equipTimeout.current !== null) window.clearTimeout(equipTimeout.current);
  }, []);

  const handleEquipWeapon = (weaponId: string) => {
    if (!onSelectWeaponForPlanner) return;
    if (equipTimeout.current !== null) window.clearTimeout(equipTimeout.current);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEquippingWeaponId(null);
      onSelectWeaponForPlanner(weaponId);
      return;
    }

    setEquippingWeaponId(weaponId);
    equipTimeout.current = window.setTimeout(() => {
      equipTimeout.current = null;
      setEquippingWeaponId(null);
      onSelectWeaponForPlanner(weaponId);
    }, 240);
  };

  const families: (WeaponFamily | 'Todas')[] = [
    'Todas',
    'Chicote',
    'Espadão',
    'Espadas duplas',
    'Lança',
    'Espada e escudo',
    'Soqueiras',
    'Espada de uma mão'
  ];

  const rarities: (Rarity | 'Todas')[] = ['Todas', 'Lendário', 'Épico', 'Raro', 'Comum'];

  const filteredWeapons = WEAPONS_DATA.filter(weapon => {
    const matchesSearch = 
      weapon.name.toLowerCase().includes(search.toLowerCase()) ||
      weapon.specialAbility.toLowerCase().includes(search.toLowerCase()) ||
      weapon.family.toLowerCase().includes(search.toLowerCase());
    
    const matchesFamily = selectedFamily === 'Todas' || weapon.family === selectedFamily;
    const matchesRarity = selectedRarity === 'Todas' || weapon.rarity === selectedRarity;
    const matchesUnlocked = !onlyUnlocked || unlockedWeaponIds.includes(weapon.id);

    return matchesSearch && matchesFamily && matchesRarity && matchesUnlocked;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Banner de Governança sobre Dano */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gothic-border/60 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-gold-950/60 border border-gold-800 text-gold-300 text-xs font-semibold mb-2">
              <Sword className="w-3.5 h-3.5 text-gold-accent" />
              <span>7 Famílias • 28 Armas Catalogadas</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide">
              Arsenal & Armaria Ancestral
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Consulte dados técnicos, cadência de golpes, alcances, habilidades ativas e localizações de desbloqueio.
            </p>
          </div>
        </div>

        {/* Alerta Metodológico Obrigatório: Não confundir dano por golpe com ATK de raridade */}
        <div className="mt-4 p-4 rounded-xl bg-blood-950/60 border border-blood-800/80 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-gold-accent flex-shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-300 leading-relaxed">
            <strong className="text-gold-200 block mb-0.5 font-semibold">
              Critério Canônico de Dano Reportado:
            </strong>
            Os valores exibidos referem-se ao <strong>dano base real por golpe</strong> verificado em guias da versão de lançamento 1.1.4. Não confunda o dano por golpe com o multiplicador geral de ATK associado à raridade cosmética do equipamento.
          </div>
        </div>
      </div>

      {/* Barra de Filtros e Pesquisa */}
      <div className="p-4 rounded-2xl bg-gothic-900 border border-gothic-border space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-neutral-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome da arma, habilidade ou efeito..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gothic-950 border border-gothic-border text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-accent"
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer self-start sm:self-auto px-2 py-2">
            <input
              type="checkbox"
              checked={onlyUnlocked}
              onChange={(e) => setOnlyUnlocked(e.target.checked)}
              className="rounded bg-gothic-950 border-gothic-border text-blood-600 focus:ring-0"
            />
            <span>Apenas Desbloqueadas ({unlockedWeaponIds.length}/28)</span>
          </label>
        </div>

        {/* Filtros em Pílulas: Família */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[11px] font-mono text-neutral-500 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Família:
          </span>
          {families.map((fam) => (
            <button
              key={fam}
              onClick={() => setSelectedFamily(fam)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedFamily === fam
                  ? 'bg-blood-800 text-gold-200 border border-gold-accent/40 shadow-blood-glow'
                  : 'bg-gothic-800 text-neutral-400 hover:text-white hover:bg-gothic-700'
              }`}
            >
              {fam}
            </button>
          ))}
        </div>

        {/* Filtros em Pílulas: Raridade */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[11px] font-mono text-neutral-500 mr-1">Raridade:</span>
          {rarities.map((rar) => (
            <button
              key={rar}
              onClick={() => setSelectedRarity(rar)}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                selectedRarity === rar
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-500/50'
                  : 'bg-gothic-850 text-neutral-400 hover:text-white hover:bg-gothic-800'
              }`}
            >
              {rar}
            </button>
          ))}
        </div>
      </div>

      {/* Catálogo organizado pelas sete famílias de armas */}
      <div className="weapon-family-catalog">
        {families
          .filter(family => family !== 'Todas' && (selectedFamily === 'Todas' || selectedFamily === family))
          .map(family => {
            const familyWeapons = filteredWeapons.filter(weapon => weapon.family === family);
            if (familyWeapons.length === 0) return null;

            return (
              <section key={family} className="weapon-family-section">
                <header className="weapon-family-section__heading">
                  <span>FAMÍLIA DE COMBATE</span>
                  <h2>{family}</h2>
                  <small>{familyWeapons.length.toString().padStart(2, '0')} itens</small>
                </header>
                <div className="weapon-equipment-list">
                  {familyWeapons.map((weapon, weaponIndex) => {
                    const isExpanded = expandedWeaponId === weapon.id;
                    const isFav = favorites.includes(weapon.id);
                    const isUnlocked = unlockedWeaponIds.includes(weapon.id);
                    const isEquipping = equippingWeaponId === weapon.id;
                    const compatibleBuilds = BUILDS_DATA.filter(build => weapon.compatibleBuilds.includes(build.id));
                    const arcanaIds = new Set([
                      ...compatibleBuilds.map(build => build.arcanaId),
                      ...BOSSES_DATA
                        .filter(boss => boss.recommendedWeaponId === weapon.id)
                        .map(boss => boss.recommendedArcanaId)
                    ]);
                    const compatibleArcanas = ARCANAS_DATA.filter(arcana => arcanaIds.has(arcana.id));
                    const compatibleRelics = RELICS_DATA.filter(relic => relic.synergies.weapons.includes(weapon.id));

                    return (
                      <article
                        key={weapon.id}
                        className={`weapon-equipment-card gothic-border-card ${RARITY_CLASS[weapon.rarity]}${isUnlocked ? ' is-unlocked' : ''}${isExpanded ? ' is-expanded' : ''}${isEquipping ? ' is-equipping' : ''}`}
                      >
                        <button
                          type="button"
                          className="weapon-equipment-card__art-trigger"
                          aria-label={`Ampliar imagem ilustrativa de ${weapon.name}`}
                          onClick={() => setDetailWeaponId(weapon.id)}
                        >
                          <span className="weapon-equipment-card__art-index" aria-hidden="true">
                            ARMA / {String(weaponIndex + 1).padStart(2, '0')}
                          </span>
                          <ItemArtwork
                            itemId={weapon.id}
                            title={weapon.name}
                            iconType={weapon.iconType}
                            className="weapon-equipment-card__artwork"
                          />
                        </button>

                        <div className="weapon-equipment-card__body">
                          <div className="weapon-equipment-card__eyebrow">
                            <span><Sword size={13} aria-hidden="true" /> FICHA DE EQUIPAMENTO</span>
                            <span className={`weapon-equipment-card__status${isUnlocked ? ' is-unlocked' : ''}`}>
                              {isUnlocked
                                ? <><CheckCircle2 size={12} aria-hidden="true" /> Desbloqueada</>
                                : <><Shield size={12} aria-hidden="true" /> Bloqueada</>}
                            </span>
                          </div>

                          <header className="weapon-equipment-card__heading">
                            <div className="weapon-equipment-card__identity">
                              <h3>{weapon.name}</h3>
                              <div className="weapon-equipment-card__classification">
                                <span>{weapon.family}</span>
                                <span className={`weapon-equipment-card__rarity ${RARITY_CLASS[weapon.rarity]}`}>
                                  {weapon.rarity}
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => onToggleFavorite(weapon.id)}
                              className={`weapon-equipment-card__favorite${isFav ? ' is-favorite' : ''}`}
                              aria-label={isFav ? `Remover ${weapon.name} dos favoritos` : `Favoritar ${weapon.name}`}
                              aria-pressed={isFav}
                              title={isFav ? 'Remover dos favoritos' : 'Favoritar arma'}
                            >
                              <Star size={16} aria-hidden="true" />
                            </button>
                          </header>

                          <dl className="weapon-equipment-card__stats">
                            <div>
                              <dt><Flame size={13} aria-hidden="true" /> DANO / GOLPE</dt>
                              <dd>{weapon.baseDamagePerHit}</dd>
                            </div>
                            <div>
                              <dt><Gauge size={13} aria-hidden="true" /> VELOCIDADE</dt>
                              <dd>{weapon.speed}</dd>
                            </div>
                            <div>
                              <dt><Crosshair size={13} aria-hidden="true" /> ALCANCE</dt>
                              <dd>{weapon.range}</dd>
                            </div>
                          </dl>

                          <div className="weapon-equipment-card__ability">
                            <span><Zap size={13} aria-hidden="true" /> HABILIDADE ESPECIAL</span>
                            <p>{weapon.specialAbility}</p>
                          </div>

                          <div className="weapon-equipment-card__synergies">
                            <div className="weapon-equipment-card__synergy-group">
                              <span className="weapon-equipment-card__section-label">ARCANOS EM BUILDS / DOSSIÊS</span>
                              <div className="weapon-equipment-card__chips">
                                {compatibleArcanas.map(arcana => (
                                  <span key={arcana.id}>{arcana.spellName}</span>
                                ))}
                                {compatibleArcanas.length === 0 && (
                                  <span className="is-unlisted">Sem Arcano vinculado</span>
                                )}
                              </div>
                            </div>
                            <div className="weapon-equipment-card__synergy-group">
                              <span className="weapon-equipment-card__section-label">RELÍQUIAS SINÉRGICAS</span>
                              <div className="weapon-equipment-card__chips">
                                {compatibleRelics.map(relic => (
                                  <span key={relic.id}>{relic.name}</span>
                                ))}
                                {compatibleRelics.length === 0 && (
                                  <span className="is-unlisted">Sem sinergia registrada</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {weapon.locationUnlock && (
                            <div className="weapon-equipment-card__unlock">
                              <span><MapPin size={13} aria-hidden="true" /> LOCAL DE DESBLOQUEIO</span>
                              <p>{weapon.locationUnlock}</p>
                            </div>
                          )}

                          <div
                            id={`weapon-details-${weapon.id}`}
                            className={`weapon-equipment-card__expanded${isExpanded ? ' is-open' : ''}`}
                            aria-hidden={!isExpanded}
                          >
                            <div className="weapon-equipment-card__expanded-inner">
                              <section>
                                <span className="weapon-equipment-card__section-label">PONTOS FORTES</span>
                                <ul>
                                  {weapon.strengths.map((strength, strengthIndex) => (
                                    <li key={strengthIndex}><CheckCircle2 size={13} aria-hidden="true" /> {strength}</li>
                                  ))}
                                </ul>
                              </section>
                              <section>
                                <span className="weapon-equipment-card__section-label">PONTOS FRACOS</span>
                                <ul>
                                  {weapon.weaknesses.map((weakness, weaknessIndex) => (
                                    <li key={weaknessIndex}><Shield size={13} aria-hidden="true" /> {weakness}</li>
                                  ))}
                                </ul>
                              </section>
                              <section>
                                <span className="weapon-equipment-card__section-label">BUILDS COMPATÍVEIS</span>
                                <div className="weapon-equipment-card__chips">
                                  {compatibleBuilds.map(build => <span key={build.id}>{build.title}</span>)}
                                  {compatibleBuilds.length === 0 && (
                                    <span className="is-unlisted">Nenhuma build cadastrada</span>
                                  )}
                                </div>
                              </section>
                              {weapon.loreNote && (
                                <section>
                                  <span className="weapon-equipment-card__section-label">REGISTRO DE LORE</span>
                                  <p className="weapon-equipment-card__lore">{weapon.loreNote}</p>
                                </section>
                              )}
                            </div>
                          </div>

                          <footer className="weapon-equipment-card__actions">
                            <button
                              type="button"
                              onClick={() => setExpandedWeaponId(isExpanded ? null : weapon.id)}
                              aria-expanded={isExpanded}
                              aria-controls={`weapon-details-${weapon.id}`}
                              className="weapon-equipment-card__details-toggle"
                            >
                              <span>{isExpanded ? 'Recolher ficha' : 'Ver ficha completa'}</span>
                              <ChevronDown size={15} aria-hidden="true" />
                            </button>
                            {onSelectWeaponForPlanner && (
                              <button
                                type="button"
                                onClick={() => handleEquipWeapon(weapon.id)}
                                disabled={isEquipping}
                                className={`weapon-equipment-card__equip${isEquipping ? ' is-equipping' : ''}`}
                              >
                                {isEquipping
                                  ? <CheckCircle2 size={14} aria-hidden="true" />
                                  : <Sparkles size={14} aria-hidden="true" />}
                                <span>{isEquipping ? 'Equipando…' : 'Equipar no Planner'}</span>
                              </button>
                            )}
                          </footer>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
      </div>
      {detailWeaponId && (() => {
        const weapon = WEAPONS_DATA.find(item => item.id === detailWeaponId);
        if (!weapon) return null;
        const compatibleBuilds = BUILDS_DATA.filter(build => weapon.compatibleBuilds.includes(build.id));
        return (
          <ItemDetailPanel
            itemId={weapon.id}
            title={weapon.name}
            category={`${weapon.family} · ${weapon.rarity}`}
            iconType={weapon.iconType}
            onClose={() => setDetailWeaponId(null)}
          >
            <div className="item-detail-stats">
              <span><small>DANO / GOLPE REPORTADO</small><strong>{weapon.baseDamagePerHit}</strong></span>
              <span><small>VELOCIDADE</small><strong>{weapon.speed}</strong></span>
              <span><small>ALCANCE</small><strong>{weapon.range}</strong></span>
            </div>
            <p>{weapon.specialAbility}</p>
            <p><strong>Desbloqueio:</strong> {weapon.locationUnlock}</p>
            <div className="item-detail-note">
              <strong>Builds compatíveis</strong>
              <p>{compatibleBuilds.length ? compatibleBuilds.map(build => build.title).join(' · ') : 'Ainda sem builds recomendadas.'}</p>
            </div>
          </ItemDetailPanel>
        );
      })()}
    </div>
  );
};
