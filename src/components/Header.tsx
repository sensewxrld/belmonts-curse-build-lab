import React, { useLayoutEffect, useRef } from 'react';
import { ArrowDownToLine, Moon, PackageCheck, Sun } from 'lucide-react';
import { ThemePreference } from '../utils/storage';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: ThemePreference;
  onToggleTheme: () => void;
  onOpenInventory: () => void;
  onOpenExportImport: () => void;
  unlockedCount: { weapons: number; arcanas: number; relics: number };
}

const navTabs = [
  { id: 'dashboard', label: 'Início', number: '01' },
  { id: 'builds', label: 'Builds', number: '02' },
  { id: 'weapons', label: 'Armas', number: '03' },
  { id: 'arcanas', label: 'Arcanos', number: '04' },
  { id: 'relics', label: 'Relíquias', number: '05' },
  { id: 'bosses', label: 'Chefes', number: '06' },
  { id: 'planner', label: 'Build builder', number: '07' },
  { id: 'sources', label: 'Fontes', number: '08' },
  { id: 'recommender', label: 'Recomendador', number: '09' },
  { id: 'comparator', label: 'Comparador', number: '10' }
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  theme,
  onToggleTheme,
  onOpenInventory,
  onOpenExportImport,
  unlockedCount
}) => (
  <header className="site-header sticky top-0 z-40">
    <div className="site-header__top">
      <button
        type="button"
        className="brand-lockup"
        onClick={() => setActiveTab('dashboard')}
        aria-label="Belmont's Curse Build Lab — início"
      >
        <span className="brand-lockup__mark" aria-hidden="true">B</span>
        <span className="brand-lockup__text">
          <strong>BELMONT'S CURSE</strong>
          <span>BUILD LAB <i>·</i> FIELD NOTES / 01.14</span>
        </span>
      </button>

      <div className="site-header__tools">
        <button
          type="button"
          className="header-tool header-tool--inventory"
          onClick={onOpenInventory}
          title="Definir equipamentos já desbloqueados na sua campanha"
        >
          <PackageCheck size={16} aria-hidden="true" />
          <span>Meu arsenal</span>
          <strong>{unlockedCount.weapons + unlockedCount.arcanas + unlockedCount.relics}</strong>
        </button>
        <button
          type="button"
          className="header-tool"
          onClick={onOpenExportImport}
          title="Importar ou exportar seus dados em JSON"
          aria-label="Importar ou exportar dados"
        >
          <ArrowDownToLine size={16} aria-hidden="true" />
          <span className="header-tool__optional">Dados</span>
        </button>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Ativar tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
          title={`Tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span>{theme === 'dark' ? 'Claro' : 'Escuro'}</span>
        </button>
      </div>
    </div>

    <Navigation
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  </header>
);

const Navigation: React.FC<Pick<HeaderProps, 'activeTab' | 'setActiveTab'>> = ({
  activeTab,
  setActiveTab
}) => {
  const navRef = useRef<HTMLElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;

    const positionIndicator = () => {
      const activeLink = nav.querySelector<HTMLElement>('.site-nav__link.is-active');
      if (!activeLink) {
        indicator.style.opacity = '0';
        return;
      }

      indicator.style.width = `${activeLink.offsetWidth}px`;
      indicator.style.transform = `translate3d(${activeLink.offsetLeft}px, 0, 0)`;
      indicator.style.opacity = '1';
    };

    positionIndicator();
    window.addEventListener('resize', positionIndicator);
    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(positionIndicator);
    resizeObserver?.observe(nav);

    return () => {
      window.removeEventListener('resize', positionIndicator);
      resizeObserver?.disconnect();
    };
  }, [activeTab]);

  return (
    <nav ref={navRef} className="site-nav" aria-label="Navegação principal">
      {navTabs.map(tab => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTab(tab.id)}
          className={`site-nav__link${activeTab === tab.id ? ' is-active' : ''}`}
          aria-current={activeTab === tab.id ? 'page' : undefined}
        >
          <span className="site-nav__number">{tab.number}</span>
          <span>{tab.label}</span>
        </button>
      ))}
      <span ref={indicatorRef} className="site-nav__indicator" aria-hidden="true" />
    </nav>
  );
};
