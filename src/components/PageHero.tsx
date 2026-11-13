import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { ItemArtwork } from './ItemArtwork';

export interface PageHeroProps {
  section: string;
  index: string;
  title: string;
  emphasis?: string;
  description: string;
  count?: string;
  featuredItem?: {
    id: string;
    name: string;
    iconType: string;
  };
}

export const PageHero: React.FC<PageHeroProps> = ({
  section,
  index,
  title,
  emphasis,
  description,
  count,
  featuredItem
}) => (
  <section className="page-hero" aria-label={`${section}: ${title}`}>
    <div className="page-hero__copy">
      <p className="eyebrow"><span /> {section}</p>
      <p className="page-hero__index">FIELD NOTES <i>/</i> {index}</p>
      <h1>{title}{emphasis && <><br /><em>{emphasis}</em></>}</h1>
      <p className="page-hero__description">{description}</p>
      {count && <span className="page-hero__count">{count}</span>}
      <a className="page-hero__scroll" href="#section-content">
        Explorar seção <ArrowDownRight size={14} />
      </a>
    </div>
    <div className="page-hero__art">
      <span className="page-hero__orbit page-hero__orbit--outer" aria-hidden="true" />
      <span className="page-hero__orbit page-hero__orbit--inner" aria-hidden="true" />
      <span className="page-hero__slash" aria-hidden="true" />
      {featuredItem && (
        <ItemArtwork
          itemId={featuredItem.id}
          title={featuredItem.name}
          iconType={featuredItem.iconType}
          className="page-hero__item-art"
          priority
        />
      )}
      {!featuredItem && <span className="page-hero__sigil" aria-hidden="true">B</span>}
      <span className="page-hero__art-caption">
        <strong>VISUAL DE ESTUDO</strong>
        <span>Ilustração original · não é arte do jogo</span>
      </span>
    </div>
    <span className="page-hero__rule" aria-hidden="true" />
  </section>
);
