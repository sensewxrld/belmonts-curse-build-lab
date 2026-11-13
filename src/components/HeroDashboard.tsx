import React, { useMemo } from 'react';
import { ArrowDownRight, ArrowRight, Search, Sparkles } from 'lucide-react';
import { ARCANAS_DATA } from '../data/arcanas';
import { BOSSES_DATA } from '../data/bosses';
import { BUILDS_DATA } from '../data/builds';
import { RELICS_DATA } from '../data/relics';
import { WEAPONS_DATA } from '../data/weapons';
import { ItemArtwork } from './ItemArtwork';
import { TotemSlider } from './TotemSlider';

interface HeroDashboardProps {
  onNavigateTab: (tab: string, filterParam?: string) => void;
  onSelectBuildToLoad: (buildId: string) => void;
  globalSearch: string;
  setGlobalSearch: (q: string) => void;
}

export const HeroDashboard: React.FC<HeroDashboardProps> = ({
  onNavigateTab,
  onSelectBuildToLoad,
  globalSearch,
  setGlobalSearch
}) => {
  const searchResults = useMemo(() => {
    const query = globalSearch.trim().toLocaleLowerCase();
    if (query.length < 2) return [];

    return [
      ...WEAPONS_DATA.map(item => ({
        id: item.id,
        title: item.name,
        detail: `${item.family} · ${item.baseDamagePerHit} dano/golpe`,
        tab: 'weapons'
      })),
      ...ARCANAS_DATA.map(item => ({
        id: item.id,
        title: item.spellName,
        detail: `${item.cardName} · ${item.manaCost} MP`,
        tab: 'arcanas'
      })),
      ...RELICS_DATA.map(item => ({
        id: item.id,
        title: item.name,
        detail: `${item.rarityOrTier} · Relíquia`,
        tab: 'relics'
      })),
      ...BOSSES_DATA.map(item => ({
        id: item.id,
        title: item.name,
        detail: `${item.subtitle} · Chefe`,
        tab: 'bosses'
      })),
      ...BUILDS_DATA.map(item => ({
        id: item.id,
        title: item.title,
        detail: `${item.code} · ${item.playstyle}`,
        tab: 'builds'
      }))
    ].filter(item => `${item.title} ${item.detail}`.toLocaleLowerCase().includes(query)).slice(0, 8);
  }, [globalSearch]);

  const featuredBuilds = [
    { id: 'build-01', label: 'Versátil', accent: 'mint' },
    { id: 'build-02', label: 'Boss killer', accent: 'ember' },
    { id: 'build-03', label: 'Alto DPS', accent: 'ultra' },
    { id: 'build-05', label: 'Defensiva', accent: 'lavender' },
    { id: 'build-06', label: 'À distância', accent: 'mint' }
  ].map(feature => ({
    ...feature,
    build: BUILDS_DATA.find(build => build.id === feature.id)!
  })).filter(feature => feature.build);

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <div className="eyebrow"><span /> UMA BANCADA PARA QUEM CAÇA</div>
          <p className="home-hero__index">CASTLEVANIA: BELMONT'S CURSE <span>/</span> BUILD LAB</p>
          <h1>DOMINE A<br /><em>MALDIÇÃO.</em></h1>
          <p className="home-hero__intro">
            Explore armas lendárias, descubra combinações poderosas e construa sua estratégia em
            <i> Castlevania: Belmont's Curse.</i>
          </p>

          <div className="home-hero__actions">
            <button type="button" className="button-primary" onClick={() => onNavigateTab('builds')}>
              Explorar builds <ArrowRight size={16} />
            </button>
            <button type="button" className="button-text" onClick={() => onNavigateTab('planner')}>
              Abrir Build Builder <ArrowDownRight size={16} />
            </button>
          </div>

          <div className="global-search">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              value={globalSearch}
              onChange={event => setGlobalSearch(event.target.value)}
              placeholder="Busque armas, arcanos, relíquias, chefes..."
              aria-label="Buscar no Build Lab"
            />
            {globalSearch && (
              <button type="button" onClick={() => setGlobalSearch('')} aria-label="Limpar busca">×</button>
            )}
          </div>
          {searchResults.length > 0 && (
            <div className="search-results" role="list" aria-label="Resultados da busca">
              {searchResults.map(result => (
                <button
                  type="button"
                  key={`${result.tab}-${result.id}`}
                  onClick={() => {
                    if (result.tab === 'builds') {
                      onSelectBuildToLoad(result.id);
                    } else {
                      onNavigateTab(result.tab);
                    }
                  }}
                  role="listitem"
                >
                  <span>{result.title}</span>
                  <small>{result.detail}</small>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              ))}
            </div>
          )}

          <div className="home-hero__footnote">
            <span>01 — 08</span>
            <span>Teoria de builds, dados e estratégia</span>
          </div>
        </div>

        <div className="home-hero__visual">
          <span className="hero-geometry hero-geometry--circle" aria-hidden="true" />
          <span className="hero-geometry hero-geometry--line" aria-hidden="true" />
          <TotemSlider />
        </div>
        <a className="official-credit" href="https://www.konami.com/games/castlevania/belmonts_curse/us/pt/" target="_blank" rel="noreferrer">
          Arte oficial e screenshots: KONAMI
        </a>
      </section>

      <section className="collection-strip" aria-label="Conteúdo do laboratório">
        <div><span>28</span><small>armas catalogadas</small></div>
        <div><span>16</span><small>cartas de Arcana</small></div>
        <div><span>17</span><small>relíquias registradas</small></div>
        <div><span>13</span><small>confrontos mapeados</small></div>
        <button type="button" onClick={() => onNavigateTab('sources')}>Ver metodologia <ArrowRight size={15} /></button>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ESCOLHA SEU CAMINHO <span /></p>
            <h2>Estratégias em <em>destaque</em></h2>
          </div>
          <button type="button" className="button-text" onClick={() => onNavigateTab('builds')}>
            Biblioteca completa <ArrowRight size={16} />
          </button>
        </div>

        <div className="featured-builds">
          {featuredBuilds.map(({ build, label, accent }, index) => {
            const weapon = WEAPONS_DATA.find(item => item.id === build.weaponId);
            return (
              <article className={`featured-build featured-build--${accent}`} key={build.id}>
                <div className="featured-build__art">
                  {weapon && (
                    <ItemArtwork
                      itemId={weapon.id}
                      title={weapon.name}
                      iconType={weapon.iconType}
                    />
                  )}
                  <span className="featured-build__number">0{index + 1}</span>
                </div>
                <div className="featured-build__body">
                  <span className="featured-build__tag">{label}</span>
                  <h3>{build.title}</h3>
                  <p>{build.description}</p>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectBuildToLoad(build.id);
                      onNavigateTab('planner');
                    }}
                  >
                    Carregar build <ArrowRight size={15} />
                  </button>
                </div>
              </article>
            );
          })}
          <article className="recommender-promo">
            <Sparkles size={20} aria-hidden="true" />
            <p className="eyebrow">SEM UM PLANO?</p>
            <h3>Deixe a caçada indicar o próximo passo.</h3>
            <button type="button" onClick={() => onNavigateTab('recommender')}>
              Encontrar uma build <ArrowRight size={15} />
            </button>
          </article>
        </div>
      </section>

      <section className="home-disclaimer">
        <span>NOTA EDITORIAL</span>
        <p>As combinações são recomendações de theorycrafting, não presets oficiais. Consulte as fontes e limitações antes de seguir qualquer estratégia.</p>
        <button type="button" onClick={() => onNavigateTab('sources')}>Fontes e créditos <ArrowRight size={14} /></button>
      </section>
    </div>
  );
};
