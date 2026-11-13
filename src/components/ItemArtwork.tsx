import React, { useEffect, useState } from 'react';
import { ASSET_MANIFEST_BY_ID } from '../data/assetManifest';

interface ItemArtworkProps {
  itemId: string;
  title: string;
  iconType: string;
  className?: string;
  priority?: boolean;
}

export const ItemArtwork: React.FC<ItemArtworkProps> = ({
  itemId,
  title,
  className = '',
  priority = false
}) => {
  const artwork = ASSET_MANIFEST_BY_ID[itemId];
  const [imageFailed, setImageFailed] = useState(false);
  const [hasZoomHeadroom, setHasZoomHeadroom] = useState(false);
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    setImageFailed(false);
    setHasZoomHeadroom(false);
    setNaturalSize(null);
  }, [itemId]);

  if (artwork?.image && !imageFailed) {
    return (
      <figure
        className={`item-artwork item-artwork--image item-artwork--${artwork.category}${hasZoomHeadroom ? ' has-zoom-headroom' : ''} ${className}`}
        style={{ padding: artwork.frame.padding }}
      >
        <img
          key={itemId}
          src={artwork.image}
          alt={artwork.alt}
          style={{
            width: '100%',
            height: '100%',
            maxWidth: naturalSize ? `${naturalSize.width}px` : '100%',
            maxHeight: naturalSize ? `${naturalSize.height}px` : '100%',
            objectFit: artwork.frame.objectFit,
            objectPosition: artwork.frame.objectPosition
          }}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={event => {
            const image = event.currentTarget;
            const frame = image.closest<HTMLElement>('.item-artwork');
            const frameStyle = frame ? window.getComputedStyle(frame) : null;
            const availableWidth = frame && frameStyle
              ? frame.clientWidth - parseFloat(frameStyle.paddingLeft) - parseFloat(frameStyle.paddingRight)
              : image.clientWidth;
            const availableHeight = frame && frameStyle
              ? frame.clientHeight - parseFloat(frameStyle.paddingTop) - parseFloat(frameStyle.paddingBottom)
              : image.clientHeight;
            const scale = Math.min(
              1,
              availableWidth / image.naturalWidth,
              availableHeight / image.naturalHeight
            );

            setNaturalSize({ width: image.naturalWidth, height: image.naturalHeight });
            setHasZoomHeadroom(scale > 0 && scale < 0.92);
          }}
          onError={() => setImageFailed(true)}
        />
        {artwork.category === 'arcana' && (
          <span className="item-artwork__flip-back" aria-hidden="true">{title}</span>
        )}
        <figcaption>
          {artwork.canonicalName && <span>Catálogo: {artwork.canonicalName}</span>}
          <span>{artwork.attribution}</span>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className={`item-artwork item-artwork--unavailable ${className}`} aria-label={`${title}: imagem específica não disponível`}>
      <figcaption>
        Imagem específica não confirmada para este registro.
      </figcaption>
    </figure>
  );
};
