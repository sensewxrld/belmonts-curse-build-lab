import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { OFFICIAL_GAME_ART } from '../data/artwork';

const slides = [
  {
    title: 'A maldição rubra',
    eyebrow: 'ARTE-CHAVE OFICIAL',
    src: OFFICIAL_GAME_ART.keyArt,
    mobileSrc: OFFICIAL_GAME_ART.keyArtMobile,
    alt: 'Arte-chave oficial de Castlevania: Belmont’s Curse',
    note: 'Uma nova jornada começa sob as torres de Paris.'
  },
  {
    title: 'O chicote como extensão',
    eyebrow: 'SCREENSHOT OFICIAL · AÇÃO',
    src: OFFICIAL_GAME_ART.whipScreenshot,
    alt: 'Screenshot oficial mostrando a ação do chicote no jogo',
    note: 'Movimento, alcance e precisão em um só gesto.'
  },
  {
    title: 'Armas para cada estilo',
    eyebrow: 'SCREENSHOT OFICIAL · ARMAS',
    src: OFFICIAL_GAME_ART.weaponsScreenshot,
    alt: 'Screenshot oficial da página de armas do jogo',
    note: 'Explore a variedade de armas publicada pela KONAMI.'
  },
  {
    title: 'Lendas à espreita',
    eyebrow: 'SCREENSHOT OFICIAL · CHEFES',
    src: OFFICIAL_GAME_ART.bossesScreenshot,
    alt: 'Screenshot oficial da página de chefes e arcanos do jogo',
    note: 'Encare rostos conhecidos e novos mistérios.'
  }
];

export const TotemSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const dragStart = useRef<number | null>(null);
  const sliderRef = useRef<HTMLElement | null>(null);
  const lastWheelAt = useRef(0);
  const activeSlide = slides[activeIndex];

  const move = useCallback((offset: number) => {
    setImageFailed(false);
    setActiveIndex(index => (index + offset + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 28) return;
      event.preventDefault();
      const now = Date.now();
      if (now - lastWheelAt.current < 550) return;
      lastWheelAt.current = now;
      move(event.deltaY > 0 ? 1 : -1);
    };

    slider.addEventListener('wheel', handleWheel, { passive: false });
    return () => slider.removeEventListener('wheel', handleWheel);
  }, [move]);

  return (
    <section
      ref={sliderRef}
      className="totem-slider"
      aria-label="Arte oficial de Castlevania: Belmont's Curse"
      onPointerDown={event => {
        dragStart.current = event.clientX;
      }}
      onPointerUp={event => {
        if (dragStart.current === null) return;
        const distance = event.clientX - dragStart.current;
        if (Math.abs(distance) > 48) move(distance < 0 ? 1 : -1);
        dragStart.current = null;
      }}
      onPointerCancel={() => {
        dragStart.current = null;
      }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight') move(1);
        if (event.key === 'ArrowLeft') move(-1);
      }}
      tabIndex={0}
    >
      <div className="totem-slider__stack" key={activeIndex}>
        <div className="totem-slider__tile totem-slider__tile--back" aria-hidden="true" />
        <div className="totem-slider__tile totem-slider__tile--middle" aria-hidden="true" />
        <figure className="totem-slider__tile totem-slider__tile--front">
          {!imageFailed ? (
            <picture>
              {activeSlide.mobileSrc && <source media="(max-width: 640px)" srcSet={activeSlide.mobileSrc} />}
              <img
                src={activeSlide.src}
                alt={activeSlide.alt}
                loading={activeIndex === 0 ? 'eager' : 'lazy'}
                decoding="async"
                onError={() => setImageFailed(true)}
              />
            </picture>
          ) : (
            <div className="totem-slider__unavailable" aria-label="Imagem oficial indisponível">
              <span>Imagem oficial temporariamente indisponível</span>
            </div>
          )}
          <figcaption>
            <span className="totem-slider__eyebrow">{activeSlide.eyebrow}</span>
            <span className="totem-slider__title">{activeSlide.title}</span>
          </figcaption>
          <a
            className="totem-slider__credit"
            href={OFFICIAL_GAME_ART.source}
            target="_blank"
            rel="noreferrer"
            aria-label="Ver fonte oficial da KONAMI"
          >
            KONAMI <ExternalLink size={12} />
          </a>
        </figure>
      </div>

      <div className="totem-slider__footer">
        <p>{activeSlide.note}</p>
        <div className="totem-slider__controls">
          <button type="button" onClick={() => move(-1)} aria-label="Imagem anterior">
            <ArrowLeft size={16} />
          </button>
          <span className="totem-slider__count">
            <strong>0{activeIndex + 1}</strong> / 0{slides.length}
          </span>
          <button type="button" onClick={() => move(1)} aria-label="Próxima imagem">
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
      <span className="totem-slider__hint"><ArrowDown size={12} /> arraste ou use as setas</span>
    </section>
  );
};
