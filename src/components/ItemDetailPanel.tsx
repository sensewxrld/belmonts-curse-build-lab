import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { ItemArtwork } from './ItemArtwork';

interface ItemDetailPanelProps {
  itemId: string;
  title: string;
  category: string;
  iconType: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const ItemDetailPanel: React.FC<ItemDetailPanelProps> = ({
  itemId,
  title,
  category,
  iconType,
  onClose,
  children
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="item-detail-backdrop"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="item-detail-title"
        className="item-detail-panel"
      >
        <button className="item-detail-panel__close" type="button" onClick={onClose} aria-label="Fechar detalhes">
          <X size={18} />
        </button>
        <div className="item-detail-panel__media">
          <ItemArtwork itemId={itemId} title={title} iconType={iconType} />
        </div>
        <div className="item-detail-panel__content">
          <span className="eyebrow">{category}<span /></span>
          <h2 id="item-detail-title">{title}</h2>
          {children}
        </div>
      </section>
    </div>
  );
};
