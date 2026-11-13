import React, { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  Check,
  CheckSquare,
  Gem,
  Save,
  Shield,
  Square,
  Sword,
  X
} from 'lucide-react';
import { WEAPONS_DATA } from '../data/weapons';
import { ARCANAS_DATA } from '../data/arcanas';
import { RELICS_DATA } from '../data/relics';
import { ThemeIcon } from './ThemeIcons';

type InventoryTab = 'weapons' | 'arcanas' | 'relics';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlocked: { weapons: string[]; arcanas: string[]; relics: string[] };
  onSave: (newUnlocked: { weapons: string[]; arcanas: string[]; relics: string[] }) => void;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose,
  unlocked,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<InventoryTab>('weapons');
  const [currentUnlocked, setCurrentUnlocked] = useState(unlocked);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
  }, []);

  if (!isOpen) return null;

  const tabs = [
    {
      id: 'weapons' as const,
      label: 'Armas',
      Icon: Sword,
      count: currentUnlocked.weapons.length,
      total: WEAPONS_DATA.length
    },
    {
      id: 'arcanas' as const,
      label: 'Arcanos',
      Icon: Shield,
      count: currentUnlocked.arcanas.length,
      total: ARCANAS_DATA.length
    },
    {
      id: 'relics' as const,
      label: 'Relíquias',
      Icon: BookOpen,
      count: currentUnlocked.relics.length,
      total: RELICS_DATA.length
    }
  ];

  const items = activeTab === 'weapons'
    ? WEAPONS_DATA.map(item => ({
      id: item.id,
      name: item.name,
      detail: item.family,
      iconType: item.iconType,
      quality: 'weapon'
    }))
    : activeTab === 'arcanas'
      ? ARCANAS_DATA.map(item => ({
        id: item.id,
        name: item.spellName,
        detail: item.cardName,
        iconType: item.iconType,
        quality: 'arcana'
      }))
      : RELICS_DATA.map(item => ({
        id: item.id,
        name: item.name,
        detail: item.rarityOrTier,
        iconType: item.iconType,
        quality: 'relic'
      }));

  const totalUnlocked =
    currentUnlocked.weapons.length +
    currentUnlocked.arcanas.length +
    currentUnlocked.relics.length;
  const totalItems = WEAPONS_DATA.length + ARCANAS_DATA.length + RELICS_DATA.length;

  const toggleItem = (type: InventoryTab, id: string) => {
    const list = currentUnlocked[type];
    const updated = list.includes(id) ? list.filter(item => item !== id) : [...list, id];
    setCurrentUnlocked({ ...currentUnlocked, [type]: updated });
  };

  const handleSelectAll = (type: InventoryTab) => {
    const allIds = type === 'weapons'
      ? WEAPONS_DATA.map(item => item.id)
      : type === 'arcanas'
        ? ARCANAS_DATA.map(item => item.id)
        : RELICS_DATA.map(item => item.id);
    setCurrentUnlocked({ ...currentUnlocked, [type]: allIds });
  };

  const handleDeselectAll = (type: InventoryTab) => {
    setCurrentUnlocked({ ...currentUnlocked, [type]: [] });
  };

  const requestClose = () => {
    if (closeTimerRef.current !== null) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onClose();
      return;
    }

    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      onClose();
    }, 240);
  };

  const handleSaveAndClose = () => {
    onSave(currentUnlocked);
    requestClose();
  };

  return (
    <div
      className={`inventory-modal${isClosing ? ' is-closing' : ''}`}
      data-state={isClosing ? 'closing' : 'open'}
    >
      <section
        className="inventory-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inventory-modal-title"
      >
        <header className="inventory-modal__header">
          <div className="inventory-modal__heading">
            <span className="inventory-modal__emblem" aria-hidden="true">
              <Gem size={20} />
            </span>
            <div>
              <span className="inventory-modal__eyebrow">REGISTRO DO CAÇADOR</span>
              <h2 id="inventory-modal-title">Meu Arsenal</h2>
              <p>Marque o equipamento que você já encontrou para personalizar suas recomendações.</p>
            </div>
          </div>

          <div className="inventory-modal__header-meta">
            <span className="inventory-modal__total">
              <strong>{String(totalUnlocked).padStart(2, '0')}</strong>
              <span> / {totalItems} itens</span>
            </span>
            <button
              type="button"
              onClick={requestClose}
              className="inventory-modal__close"
              aria-label="Fechar meu arsenal"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        <div className="inventory-modal__toolbar">
          <div
            className={`inventory-modal__tabs inventory-modal__tabs--${activeTab}`}
            role="tablist"
            aria-label="Categoria do equipamento"
          >
            {tabs.map(({ id, label, Icon, count, total }) => (
              <button
                type="button"
                key={id}
                id={`inventory-tab-${id}`}
                role="tab"
                aria-selected={activeTab === id}
                aria-controls="inventory-items"
                onClick={() => setActiveTab(id)}
                className={`inventory-modal__tab inventory-modal__tab--${id}${activeTab === id ? ' is-active' : ''}`}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{label}</span>
                <small>{count}<i>/{total}</i></small>
              </button>
            ))}
          </div>

          <div className="inventory-modal__bulk-actions">
            <button
              type="button"
              onClick={() => handleSelectAll(activeTab)}
              className="inventory-modal__bulk-button"
            >
              <CheckSquare size={14} aria-hidden="true" />
              <span>Marcar todas</span>
            </button>
            <button
              type="button"
              onClick={() => handleDeselectAll(activeTab)}
              className="inventory-modal__bulk-button inventory-modal__bulk-button--quiet"
            >
              <Square size={14} aria-hidden="true" />
              <span>Desmarcar</span>
            </button>
          </div>
        </div>

        <div className="inventory-modal__list-header">
          <span>COLEÇÃO / {activeTab === 'weapons' ? 'ARMAMENTO' : activeTab === 'arcanas' ? 'ARCANA' : 'RELICÁRIOS'}</span>
          <span>{items.length} REGISTROS</span>
        </div>

        <div
          key={activeTab}
          id="inventory-items"
          role="tabpanel"
          aria-labelledby={`inventory-tab-${activeTab}`}
          className="inventory-modal__grid"
        >
          {items.map((item, index) => {
            const isChecked = currentUnlocked[activeTab].includes(item.id);
            return (
              <button
                type="button"
                key={item.id}
                aria-pressed={isChecked}
                aria-label={`${isChecked ? 'Desmarcar' : 'Marcar'} ${item.name}`}
                onClick={() => toggleItem(activeTab, item.id)}
                className={`inventory-modal__item inventory-modal__item--${item.quality}${isChecked ? ' is-unlocked' : ''}`}
                style={{ '--item-index': index } as React.CSSProperties}
              >
                <span className="inventory-modal__item-icon" aria-hidden="true">
                  <ThemeIcon name={item.iconType} className="w-5 h-5" />
                </span>
                <span className="inventory-modal__item-copy">
                  <strong>{item.name}</strong>
                  <small>{item.detail}</small>
                </span>
                <span className="inventory-modal__check" aria-hidden="true">
                  <Check size={13} strokeWidth={3} />
                </span>
              </button>
            );
          })}
        </div>

        <footer className="inventory-modal__footer">
          <div className="inventory-modal__save-note">
            <span className="inventory-modal__save-indicator" aria-hidden="true" />
            <span>Seu arsenal é salvo neste navegador</span>
          </div>
          <button
            type="button"
            onClick={handleSaveAndClose}
            className="inventory-modal__save"
          >
            <Save size={16} aria-hidden="true" />
            <span>Salvar alterações</span>
          </button>
        </footer>
      </section>
    </div>
  );
};
