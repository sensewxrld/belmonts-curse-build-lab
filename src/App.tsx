import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useExperienceMotion } from './hooks/useExperienceMotion';
import { MotionCursor } from './components/MotionCursor';
import { Header } from './components/Header';
import { HeroDashboard } from './components/HeroDashboard';
import { WeaponLibrary } from './components/WeaponLibrary';
import { ArcanaLibrary } from './components/ArcanaLibrary';
import { RelicLibrary } from './components/RelicLibrary';
import { BuildLibrary } from './components/BuildLibrary';
import { BuildPlanner } from './components/BuildPlanner';
import { BuildRecommender } from './components/BuildRecommender';
import { BossGuide } from './components/BossGuide';
import { BuildComparator } from './components/BuildComparator';
import { SourcesSection } from './components/SourcesSection';
import { PageHero, PageHeroProps } from './components/PageHero';
import { WEAPONS_DATA } from './data/weapons';
import { ARCANAS_DATA } from './data/arcanas';
import { RELICS_DATA } from './data/relics';
import { BOSSES_DATA } from './data/bosses';
import { BUILDS_DATA } from './data/builds';
import { InventoryModal } from './components/InventoryModal';
import { ExportImportModal } from './components/ExportImportModal';
import {
  getUnlockedInventory, 
  saveUnlockedInventory, 
  getCustomBuilds, 
  deleteCustomBuild, 
  getFavorites, 
  toggleFavorite, 
  parseShareUrl,
  getThemePreference,
  saveThemePreference,
  ThemePreference
} from './utils/storage';
import { CustomBuild } from './types';

const INTERNAL_PAGE_HEROES: Record<string, PageHeroProps> = {
  builds: {
    section: 'Biblioteca de combate',
    index: '01',
    title: 'ENCONTRE SUA BUILD.',
    emphasis: 'FORJE O IMPOSSÍVEL.',
    description: 'Cada combinação transforma sua maneira de enfrentar a maldição. Explore teorias, compare estilos e leve sua estratégia à arena.',
    count: `${BUILDS_DATA.length} configurações editoriais`,
    featuredItem: { id: 'vampire-killer', name: 'Vampire Killer', iconType: 'whip' }
  },
  weapons: {
    section: 'Arsenal de Rose Belmont',
    index: '02',
    title: 'ARSENAL',
    emphasis: 'LENDÁRIO.',
    description: 'Conheça as armas e famílias de combate — e descubra qual delas combina com seu próximo confronto.',
    count: `${WEAPONS_DATA.length} registros · 7 famílias`,
    featuredItem: { id: 'vampire-killer', name: 'Vampire Killer', iconType: 'whip' }
  },
  arcanas: {
    section: 'Coleção de cartas',
    index: '03',
    title: 'ARCANA',
    emphasis: 'PODERES SELADOS.',
    description: 'Explore a coleção de poderes, seus custos, efeitos e combinações possíveis para cada estilo de jogo.',
    count: `${ARCANAS_DATA.length} registros de Arcana`,
    featuredItem: { id: 'purification', name: 'Purification', iconType: 'holy' }
  },
  relics: {
    section: 'Arquivo de artefatos',
    index: '04',
    title: 'RELÍQUIAS',
    emphasis: 'PODERES ESQUECIDOS.',
    description: 'Artefatos raros, efeitos e sinergias para ajustar cada detalhe da sua estratégia.',
    count: `${RELICS_DATA.length} registros de relíquias`,
    featuredItem: { id: 'witchs-knot', name: "Witch's Knot", iconType: 'knot' }
  },
  bosses: {
    section: 'Dossiês de confronto',
    index: '05',
    title: 'CONFRONTE',
    emphasis: 'A ESCURIDÃO.',
    description: 'Estude padrões, fraquezas e loadouts recomendados antes de encarar os grandes adversários.',
    count: `${BOSSES_DATA.length} dossiês de chefes`,
    featuredItem: { id: 'medusa', name: 'Medusa', iconType: 'gaze' }
  },
  planner: {
    section: 'Oficina de builds',
    index: '06',
    title: 'FORJE SUA',
    emphasis: 'ESTRATÉGIA.',
    description: 'Combine uma arma, um Arcana e até três relíquias. Salve, ajuste e compare sua criação.',
    count: '1 arma · 1 Arcana · até 3 relíquias',
    featuredItem: { id: 'excalibur', name: 'Excalibur', iconType: 'greatsword' }
  },
  sources: {
    section: 'Caderno de pesquisa',
    index: '07',
    title: 'CONHECIMENTO',
    emphasis: 'VERIFICADO.',
    description: 'Consulte as referências usadas para contextualizar dados, mecânicas e teorias desta plataforma.',
    featuredItem: { id: 'sinister-rune', name: 'Sinister Rune', iconType: 'rune' }
  },
  recommender: {
    section: 'Orientador de combate',
    index: '08',
    title: 'ENCONTRE SUA',
    emphasis: 'PRÓXIMA BUILD.',
    description: 'Conte como prefere jogar e receba combinações que conversam com seus objetivos e equipamentos.',
    featuredItem: { id: 'chauve-souris', name: 'Chauve-Souris', iconType: 'spear' }
  },
  comparator: {
    section: 'Mesa de estratégia',
    index: '09',
    title: 'DUAS BUILDS.',
    emphasis: 'UMA ESTRATÉGIA.',
    description: 'Compare equipamentos e pontuações heurísticas lado a lado para entender as diferenças entre configurações.',
    featuredItem: { id: 'excalibur', name: 'Excalibur', iconType: 'greatsword' }
  }
};

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showInitialLoader, setShowInitialLoader] = useState(true);
  const [isLoaderExiting, setIsLoaderExiting] = useState(false);
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [theme, setTheme] = useState<ThemePreference>(() => getThemePreference());
  const lenisRef = useRef<Lenis | null>(null);
  const motionScopeRef = useRef<HTMLElement | null>(null);
  const pageExitTweenRef = useRef<gsap.core.Tween | null>(null);
  useExperienceMotion(motionScopeRef, activeTab);

  // Estados persistentes
  const [unlocked, setUnlocked] = useState(() => getUnlockedInventory());
  const [customBuilds, setCustomBuilds] = useState<CustomBuild[]>(() => getCustomBuilds());
  const [favorites, setFavorites] = useState<string[]>(() => getFavorites());
  const [comparatorDraft, setComparatorDraft] = useState<{
    title: string;
    weaponId: string;
    arcanaId: string;
    relicIds: string[];
  } | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveThemePreference(theme);
  }, [theme]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoaderExiting(true), 520);
    return () => window.clearTimeout(timeout);
  }, []);

  // Modais
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isExportImportOpen, setIsExportImportOpen] = useState(false);

  // Estado de carregamento do Planner
  const [plannerPreset, setPlannerPreset] = useState<{
    customBuildId?: string;
    weaponId: string;
    arcanaId: string;
    relicIds: string[];
    name: string;
    playstyle?: string;
    description?: string;
  }>({
    weaponId: 'vampire-killer',
    arcanaId: 'purification',
    relicIds: ['witchs-knot', 'twilight-gem', 'sinister-rune'],
    name: 'Equilíbrio Ancestral'
  });

  // Estado do Comparador Lado a Lado
  const [comparatorPreset, setComparatorPreset] = useState<{
    buildAId: string;
    buildBId: string;
  }>({
    buildAId: 'build-01',
    buildBId: 'build-02'
  });

  // Smooth scrolling respects the operating system's reduced-motion preference.
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenisRaf: ((time: number) => void) | null = null;
    const updateScrollTrigger = () => ScrollTrigger.update();
    gsap.ticker.lagSmoothing(0);

    const stopLenis = () => {
      if (lenisRaf) {
        gsap.ticker.remove(lenisRaf);
        lenisRaf = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      lenisRef.current = null;
    };

    const startLenis = () => {
      if (reducedMotion.matches || lenisRef.current) return;

      const lenis = new Lenis({
        duration: 1.1,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
      });
      lenisRef.current = lenis;
      lenis.on('scroll', updateScrollTrigger);

      const raf = (time: number) => {
        if (lenisRef.current !== lenis) return;
        lenis.raf(time * 1000);
      };
      lenisRaf = raf;
      gsap.ticker.add(raf);
      ScrollTrigger.refresh();
    };

    const handleMotionPreferenceChange = () => {
      if (reducedMotion.matches) stopLenis();
      else startLenis();
    };

    startLenis();
    reducedMotion.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      reducedMotion.removeEventListener('change', handleMotionPreferenceChange);
      stopLenis();
    };
  }, []);

  // Leitura de link compartilhado (?build=...)
  useEffect(() => {
    const shared = parseShareUrl();
    if (shared) {
      setPlannerPreset({
        weaponId: shared.weaponId,
        arcanaId: shared.arcanaId,
        relicIds: shared.relicIds,
        name: 'Build Compartilhada por Link'
      });
      setActiveTab('planner');
    }
  }, []);

  const handleTabChange = (tab: string) => {
    const wasExiting = Boolean(pageExitTweenRef.current);
    pageExitTweenRef.current?.kill();
    pageExitTweenRef.current = null;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

    if (tab === activeTab) {
      if (wasExiting) {
        const currentPage = motionScopeRef.current?.querySelector<HTMLElement>('.home-page, .internal-page');
        if (currentPage) {
          gsap.to(currentPage, {
            autoAlpha: 1,
            y: 0,
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.24,
            ease: 'power2.out',
            clearProps: 'opacity,visibility,transform,clipPath'
          });
        }
      }
      window.scrollTo({ top: 0, behavior });
      return;
    }

    const currentPage = motionScopeRef.current?.querySelector<HTMLElement>('.home-page, .internal-page');
    const navigate = () => {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior });
      pageExitTweenRef.current = null;
    };

    if (!currentPage || behavior === 'auto') {
      navigate();
      return;
    }

    pageExitTweenRef.current = gsap.to(currentPage, {
      autoAlpha: 0,
      y: -18,
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.26,
      ease: 'power2.in',
      onComplete: navigate
    });
  };

  const handleLoadBuildIntoPlanner = (buildData: { id?: string; weaponId: string; arcanaId: string; relicIds: string[]; name?: string; playstyle?: string; description?: string }) => {
    setPlannerPreset({
      customBuildId: buildData.id,
      weaponId: buildData.weaponId,
      arcanaId: buildData.arcanaId,
      relicIds: buildData.relicIds,
      name: buildData.name || 'Build Selecionada',
      playstyle: buildData.playstyle,
      description: buildData.description
    });
    handleTabChange('planner');
  };

  const handleSendToComparator = (buildData: { title: string; weaponId: string; arcanaId: string; relicIds: string[] }) => {
    setComparatorDraft(buildData);
    handleTabChange('comparator');
  };

  const handleComparatorSelectionChange = (side: 'a' | 'b', buildId: string) => {
    setComparatorPreset(previous => side === 'a'
      ? { ...previous, buildAId: buildId }
      : { ...previous, buildBId: buildId });
  };

  const handleSaveUnlocked = (newUnlocked: { weapons: string[]; arcanas: string[]; relics: string[] }) => {
    setUnlocked(newUnlocked);
    saveUnlockedInventory(newUnlocked);
  };

  const handleToggleFav = (id: string) => {
    const updated = toggleFavorite(id);
    setFavorites(updated);
  };

  const handleDeleteCustom = (id: string) => {
    const updated = deleteCustomBuild(id);
    setCustomBuilds(updated);
  };

  const handleReloadData = () => {
    setUnlocked(getUnlockedInventory());
    setCustomBuilds(getCustomBuilds());
    setFavorites(getFavorites());
  };

  return (
    <div className="app-shell relative min-h-screen bg-gothic-950 text-neutral-100 flex flex-col justify-between selection:bg-blood-700 selection:text-gold-200">
      {/* Header Sticky */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        theme={theme}
        onToggleTheme={() => setTheme(current => current === 'dark' ? 'light' : 'dark')}
        onOpenInventory={() => setIsInventoryOpen(true)}
        onOpenExportImport={() => setIsExportImportOpen(true)}
        unlockedCount={{
          weapons: unlocked.weapons.length,
          arcanas: unlocked.arcanas.length,
          relics: unlocked.relics.length
        }}
      />

      <MotionCursor />

      {showInitialLoader && (
        <div
          className={`site-loader${isLoaderExiting ? ' site-loader--exiting' : ''}`}
          role="status"
          aria-live="polite"
          onAnimationEnd={event => {
            if (isLoaderExiting && event.target === event.currentTarget) {
              setShowInitialLoader(false);
            }
          }}
        >
          <div className="site-loader__content">
            <span className="site-loader__mark" aria-hidden="true">B</span>
            <span className="site-loader__title">BELMONT'S CURSE</span>
            <span className="site-loader__subtitle">BUILD LAB · PREPARANDO O ARSENAL</span>
            <span className="site-loader__track" aria-hidden="true"><i /></span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main ref={motionScopeRef} className="app-main relative z-10 max-w-7xl mx-auto px-4 pt-6 flex-1 w-full">
        {activeTab !== 'dashboard' && INTERNAL_PAGE_HEROES[activeTab] && (
          <div className={`internal-page internal-page--${activeTab}`}>
            <PageHero {...INTERNAL_PAGE_HEROES[activeTab]} />
            <div id="section-content" className="internal-page-content">
        {activeTab === 'weapons' && (
          <WeaponLibrary
            onSelectWeaponForPlanner={(wId) => {
              setPlannerPreset(prev => ({ ...prev, weaponId: wId }));
              handleTabChange('planner');
            }}
            favorites={favorites}
            onToggleFavorite={handleToggleFav}
            unlockedWeaponIds={unlocked.weapons}
          />
        )}

        {activeTab === 'arcanas' && (
          <ArcanaLibrary
            onSelectArcanaForPlanner={(aId) => {
              setPlannerPreset(prev => ({ ...prev, arcanaId: aId }));
              handleTabChange('planner');
            }}
            favorites={favorites}
            onToggleFavorite={handleToggleFav}
            unlockedArcanaIds={unlocked.arcanas}
          />
        )}

        {activeTab === 'relics' && (
          <RelicLibrary
            onToggleEquipRelicInPlanner={(rId) => {
              let updated = plannerPreset.relicIds;
              if (updated.includes(rId)) {
                updated = updated.filter(id => id !== rId);
              } else if (updated.length < 3) {
                updated = [...updated, rId];
              }
              setPlannerPreset(prev => ({ ...prev, relicIds: updated }));
            }}
            equippedRelicIds={plannerPreset.relicIds}
            favorites={favorites}
            onToggleFavorite={handleToggleFav}
            unlockedRelicIds={unlocked.relics}
          />
        )}

        {activeTab === 'builds' && (
          <BuildLibrary
            onLoadBuildIntoPlanner={handleLoadBuildIntoPlanner}
            onSendToComparator={handleSendToComparator}
            customBuilds={customBuilds}
            onDeleteCustomBuild={handleDeleteCustom}
          />
        )}

        {activeTab === 'planner' && (
          <BuildPlanner
            initialWeaponId={plannerPreset.weaponId}
            initialArcanaId={plannerPreset.arcanaId}
            initialRelicIds={plannerPreset.relicIds}
            initialBuildName={plannerPreset.name}
            initialBuildId={plannerPreset.customBuildId}
            initialPlaystyle={plannerPreset.playstyle}
            initialBuildDescription={plannerPreset.description}
            onSendToComparator={handleSendToComparator}
            unlockedIds={unlocked}
            onCustomBuildSaved={(builds, build) => {
              setCustomBuilds(builds);
              setPlannerPreset({
                customBuildId: build.id,
                weaponId: build.weaponId,
                arcanaId: build.arcanaId,
                relicIds: build.relicIds,
                name: build.name,
                playstyle: build.playstyle,
                description: build.description || ''
              });
            }}
          />
        )}

        {activeTab === 'recommender' && (
          <BuildRecommender
            onLoadRecommendedBuild={handleLoadBuildIntoPlanner}
            unlockedIds={unlocked}
          />
        )}

        {activeTab === 'bosses' && (
          <BossGuide
            onLoadBossCounterBuild={handleLoadBuildIntoPlanner}
          />
        )}

        {activeTab === 'comparator' && (
          <BuildComparator
            customBuilds={customBuilds}
            initialBuildAId={comparatorPreset.buildAId}
            initialBuildBId={comparatorPreset.buildBId}
            initialBuildA={comparatorDraft}
            onDraftCleared={() => setComparatorDraft(null)}
            onBuildSelectionChange={handleComparatorSelectionChange}
            onLoadBuildIntoPlanner={handleLoadBuildIntoPlanner}
          />
        )}

        {activeTab === 'sources' && (
          <SourcesSection />
        )}
            </div>
          </div>
        )}
        {activeTab === 'dashboard' && (
          <HeroDashboard
            onNavigateTab={handleTabChange}
            onSelectBuildToLoad={(buildId) => {
              const b = [
                { id: 'build-01', w: 'vampire-killer', a: 'purification', r: ['witchs-knot', 'twilight-gem', 'sinister-rune'], n: 'Equilíbrio Ancestral' },
                { id: 'build-02', w: 'excalibur', a: 'chains-of-justice', r: ['twilight-gem', 'sinister-rune', 'obsidian-fang'], n: 'Boss Killer (Algoz de Titãs)' },
                { id: 'build-03', w: 'war-and-famine', a: 'chains-of-justice', r: ['twilight-gem', 'vile-trinket', 'obsidian-fang'], n: 'DPS de Combo Frenético' },
                { id: 'build-04', w: 'bernhards-wrath', a: 'blood-thorns', r: ['witchs-knot', 'twilight-gem', 'vile-trinket'], n: 'Combo e Recuperação Vital' },
                { id: 'build-05', w: 'alucards-sword-and-shield', a: 'mirrorwalk', r: ['witchs-knot', 'dark-sigil', 'mind-relic'], n: 'Bastião Defensivo Absoluto' },
                { id: 'build-06', w: 'chauve-souris', a: 'sacred-cross', r: ['ravens-feather', 'twilight-gem', 'witchs-knot'], n: 'Sentinela de Longo Alcance' },
                { id: 'build-07', w: 'excalibur', a: 'talos-hammer', r: ['twilight-gem', 'abyssal-eye', 'necro-charm'], n: 'Controle de Hordas' },
                { id: 'build-08', w: 'vampire-killer', a: 'mirrorwalk', r: ['crypt-key', 'gloomstone', 'witchs-knot'], n: 'Navegação e Exploração' },
              ].find(item => item.id === buildId);
              if (b) {
                handleLoadBuildIntoPlanner({
                  weaponId: b.w,
                  arcanaId: b.a,
                  relicIds: b.r,
                  name: b.n
                });
              }
            }}
            globalSearch={globalSearch}
            setGlobalSearch={setGlobalSearch}
          />
        )}
      </main>

      {/* Footer Editorial Belmont */}
      <footer className="relative z-10 bg-gothic-950 border-t border-gothic-border/60 py-8 px-4 text-xs text-neutral-400 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <span className="font-serif font-bold text-sm tracking-wider text-gold-200">
              BELMONT'S CURSE BUILD LAB - DESENVOLVIDO POR <em>ARTHUR ANJOS</em>
            </span>
            <p className="text-[11px] text-neutral-500 font-sans">
              Dedicado a <em>Castlevania: Belmont's Curse</em> (KONAMI, Evil Empire, Motion Twin). Atualizado para o patch 1.1.4 (Novembro de 2026).
            </p>
          </div>

          <div className="flex items-center gap-4 text-neutral-400 text-xs">
            <button onClick={() => handleTabChange('sources')} className="hover:text-gold-accent transition-colors">
              Fontes & Versão
            </button>
            <span>•</span>
            <button onClick={() => setIsInventoryOpen(true)} className="hover:text-gold-accent transition-colors">
              Meu Arsenal
            </button>
            <span>•</span>
            <button onClick={() => setIsExportImportOpen(true)} className="hover:text-gold-accent transition-colors">
              Exportar / Importar JSON
            </button>
          </div>
        </div>
      </footer>

      {/* Modais Globais */}
      <InventoryModal
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        unlocked={unlocked}
        onSave={handleSaveUnlocked}
      />

      <ExportImportModal
        isOpen={isExportImportOpen}
        onClose={() => setIsExportImportOpen(false)}
        onDataReload={handleReloadData}
      />
    </div>
  );
};
