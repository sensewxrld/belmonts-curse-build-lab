import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MAGNETIC_SELECTOR = [
  '.site-nav__link',
  '.header-tool',
  '.theme-toggle',
  '.brand-lockup',
  '.page-hero__scroll',
  '.featured-build__body button',
  '.internal-page-content button'
].join(',');

interface MagneticMotion {
  x: (value: number) => void;
  y: (value: number) => void;
}

export const MotionCursor: React.FC = () => {
  const ringRef = useRef<HTMLSpanElement | null>(null);
  const dotRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const media = gsap.matchMedia();

    media.add('(hover: hover) and (pointer: fine)', () => {
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const ringFollowDuration = reducedMotion ? 0.12 : 0.34;
      const dotFollowDuration = reducedMotion ? 0.05 : 0.12;
      gsap.set([ring, dot], { autoAlpha: 0, x: -40, y: -40 });
      const ringX = gsap.quickTo(ring, 'x', { duration: ringFollowDuration, ease: 'power3.out' });
      const ringY = gsap.quickTo(ring, 'y', { duration: ringFollowDuration, ease: 'power3.out' });
      const dotX = gsap.quickTo(dot, 'x', { duration: dotFollowDuration, ease: 'power3.out' });
      const dotY = gsap.quickTo(dot, 'y', { duration: dotFollowDuration, ease: 'power3.out' });
      const magneticMotions = new WeakMap<HTMLElement, MagneticMotion>();
      const movedButtons = new Set<HTMLElement>();
      let activeButton: HTMLElement | null = null;
      let visible = false;

      const resetButton = (button: HTMLElement | null) => {
        if (!button) return;
        const motion = magneticMotions.get(button);
        motion?.x(0);
        motion?.y(0);
      };

      const handlePointerMove = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;

        ringX(event.clientX);
        ringY(event.clientY);
        dotX(event.clientX);
        dotY(event.clientY);
        if (!visible) {
          gsap.to([ring, dot], { autoAlpha: 1, duration: 0.2, overwrite: 'auto' });
          visible = true;
        }

        const target = event.target instanceof Element ? event.target : null;
        const button = target?.closest<HTMLElement>(MAGNETIC_SELECTOR) ?? null;
        if (button !== activeButton) {
          resetButton(activeButton);
          activeButton = button;
          ring.classList.toggle('is-interactive', Boolean(button));
          if (!reducedMotion) {
            gsap.to(ring, { scale: button ? 1.45 : 1, duration: 0.28, ease: 'power3.out' });
          }
        }

        if (reducedMotion || !activeButton) return;
        let motion = magneticMotions.get(activeButton);
        if (!motion) {
          motion = {
            x: gsap.quickTo(activeButton, 'x', { duration: 0.38, ease: 'power3.out' }),
            y: gsap.quickTo(activeButton, 'y', { duration: 0.38, ease: 'power3.out' })
          };
          magneticMotions.set(activeButton, motion);
        }
        movedButtons.add(activeButton);

        const bounds = activeButton.getBoundingClientRect();
        const x = Math.max(-6, Math.min(6, (event.clientX - bounds.left - bounds.width / 2) * 0.12));
        const y = Math.max(-6, Math.min(6, (event.clientY - bounds.top - bounds.height / 2) * 0.16));
        motion.x(x);
        motion.y(y);
      };

      const hideCursor = () => {
        resetButton(activeButton);
        activeButton = null;
        ring.classList.remove('is-interactive');
        gsap.to([ring, dot], { autoAlpha: 0, duration: 0.2, overwrite: 'auto' });
        visible = false;
      };

      const handlePointerDown = () => {
        if (reducedMotion) return;
        gsap.to(ring, { scale: 0.78, duration: 0.12, overwrite: 'auto' });
      };

      const handlePointerUp = () => {
        if (reducedMotion) return;
        gsap.to(ring, { scale: activeButton ? 1.45 : 1, duration: 0.22, overwrite: 'auto' });
      };

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerdown', handlePointerDown);
      document.addEventListener('pointerup', handlePointerUp);
      document.addEventListener('mouseleave', hideCursor);

      return () => {
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerdown', handlePointerDown);
        document.removeEventListener('pointerup', handlePointerUp);
        document.removeEventListener('mouseleave', hideCursor);
        movedButtons.forEach(button => {
          gsap.killTweensOf(button);
          gsap.set(button, { clearProps: 'transform' });
        });
        gsap.killTweensOf([ring, dot]);
      };
    });

    return () => media.revert();
  }, []);

  return (
    <span className="motion-cursor" aria-hidden="true">
      <span ref={ringRef} className="motion-cursor__ring" />
      <span ref={dotRef} className="motion-cursor__dot" />
    </span>
  );
};
