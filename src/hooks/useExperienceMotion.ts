import { RefObject, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SELECTOR = [
  '.internal-page-content .item-library-grid > .gothic-border-card',
  '.internal-page-content .build-library-grid > *',
  '.internal-page-content .gothic-border-card',
  '.internal-page-content .item-artwork--image:not(.boss-artwork)',
  '.internal-page-content .build-equipment-strip > figure',
  '.internal-page-content .planner-slot-art',
  '.internal-page-content .planner-relic-art',
  '.internal-page-content .planner-composition__pieces > div',
  '.internal-page-content .boss-selector',
  '.internal-page-content .weapon-family-section__heading',
  '.internal-page-content .source-card',
  '.home-page > section:not(.home-hero)',
  '.home-page .featured-build',
  '.home-page .recommender-promo'
].join(',');

const CARD_SELECTOR = '.gothic-border-card, .featured-build, .recommender-promo';

interface CardTilt {
  rotateX: (value: number) => void;
  rotateY: (value: number) => void;
  lift: (value: number) => void;
}

export const useExperienceMotion = (
  scopeRef: RefObject<HTMLElement | null>,
  pageKey: string
) => {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    const page = scope?.querySelector<HTMLElement>('.home-page, .internal-page');

    if (!scope || !page) return;

    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const title = page.querySelector<HTMLElement>('.home-hero h1, .page-hero h1');
        const introArt = page.querySelector<HTMLElement>('.home-hero__visual, .page-hero__art');
        const copy = page.querySelector<HTMLElement>('.home-hero__copy, .page-hero__copy');
        const copyItems = copy
          ? Array.from(copy.children).filter(element => element !== title)
          : [];

        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
        intro.fromTo(page, {
          autoAlpha: 0,
          y: 28,
          clipPath: 'inset(0 0 5% 0)'
        }, {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.72,
          clearProps: 'opacity,visibility,transform,clipPath'
        });

        if (title) {
          intro.fromTo(title, {
            autoAlpha: 0,
            y: 26,
            clipPath: 'inset(0 0 100% 0)'
          }, {
            autoAlpha: 1,
            y: 0,
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.82,
            clearProps: 'opacity,visibility,transform,clipPath'
          }, '-=0.48');
        }

        if (copyItems.length) {
          intro.fromTo(copyItems, { autoAlpha: 0, y: 18 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.62,
            stagger: 0.065,
            clearProps: 'opacity,visibility,transform'
          }, '-=0.48');
        }

        if (introArt) {
          intro.fromTo(introArt, {
            autoAlpha: 0,
            y: 30,
            rotationY: -7,
            scale: 0.96
          }, {
            autoAlpha: 1,
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.9,
            clearProps: 'opacity,visibility,transform'
          }, '-=0.66');
        }

        const contentIntro = page.querySelector<HTMLElement>(
          '.internal-page-content > .space-y-8 > :first-child'
        );
        if (contentIntro) {
          intro.fromTo(contentIntro, { autoAlpha: 0, y: 24 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.68,
            clearProps: 'opacity,visibility,transform'
          }, '-=0.42');
        }
      }, page);

      const registeredTargets = new WeakSet<HTMLElement>();
      const revealTargets = Array.from(page.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
      const activeBatchTweens: gsap.core.Tween[] = [];

      const scrollContext = gsap.context(() => {
        revealTargets.forEach(element => {
          registeredTargets.add(element);
        });

        if (revealTargets.length) {
          ScrollTrigger.batch(revealTargets, {
            start: 'top 88%',
            once: true,
            batchMax: 7,
            interval: 0.12,
            onEnter: elements => {
              const tween = gsap.fromTo(elements, {
                autoAlpha: 0,
                y: index => (elements[index]?.classList.contains('boss-artwork') ? 48 : 34),
                x: index => index % 2 === 0 ? -12 : 12,
                scale: index => (elements[index]?.classList.contains('boss-artwork') ? 0.92 : 0.985)
              }, {
                autoAlpha: 1,
                y: 0,
                x: 0,
                scale: 1,
                duration: 0.82,
                stagger: 0.085,
                ease: 'power3.out',
                overwrite: 'auto',
                clearProps: 'opacity,visibility,transform'
              });
              activeBatchTweens.push(tween);
            }
          });
        }

        const artworkFrames = page.querySelectorAll<HTMLElement>(
          '.item-artwork--image:not(.boss-artwork)'
        );
        artworkFrames.forEach(frame => {
          gsap.fromTo(frame, {
            '--scroll-parallax-y': '-13px'
          }, {
            '--scroll-parallax-y': '13px',
            ease: 'none',
            scrollTrigger: {
              trigger: frame,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7
            }
          });
        });

        const parallaxLayers = page.querySelectorAll<HTMLElement>('.page-hero__art, .home-hero__visual');
        parallaxLayers.forEach(layer => {
          gsap.fromTo(layer, {
            '--scroll-parallax-y': '22px'
          }, {
            '--scroll-parallax-y': '-22px',
            ease: 'none',
            scrollTrigger: {
              trigger: layer,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8
            }
          });
        });

        const relicFrames = page.querySelectorAll<HTMLElement>('.item-artwork--relic');
        if (relicFrames.length) {
          gsap.set(relicFrames, { '--relic-float-y': '0px' });
          gsap.to(relicFrames, {
            '--relic-float-y': '-4px',
            duration: 3.8,
            stagger: 0.16,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        }
      }, page);

      const dynamicContexts: Array<() => void> = [];
      const mutationObserver = typeof MutationObserver === 'undefined'
        ? null
        : new MutationObserver(records => {
          records.forEach(record => {
            record.addedNodes.forEach(node => {
              if (!(node instanceof HTMLElement)) return;
              const matches = node.matches(REVEAL_SELECTOR) ? [node] : [];
              matches.push(...Array.from(node.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)));

              matches.forEach(element => {
                if (registeredTargets.has(element)) return;
                registeredTargets.add(element);
                const isBossArtwork = element.classList.contains('boss-artwork');
                const dynamicContext = gsap.context(() => {
                  gsap.fromTo(element, {
                    autoAlpha: 0,
                    y: isBossArtwork ? 48 : 28,
                    scale: isBossArtwork ? 0.92 : 0.985
                  }, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.72,
                    ease: 'power3.out',
                    clearProps: 'opacity,visibility,transform',
                    immediateRender: false,
                    scrollTrigger: {
                      trigger: element,
                      start: 'top 88%',
                      once: true
                    }
                  });
                }, page);
                dynamicContexts.push(() => dynamicContext.revert());
              });
            });
          });
        });
      mutationObserver?.observe(page, { childList: true, subtree: true });

      const cardTilts = new WeakMap<HTMLElement, CardTilt>();
      let activeCard: HTMLElement | null = null;
      let activeArtwork: HTMLElement | null = null;

      const resetCard = (card: HTMLElement | null) => {
        if (!card) return;
        const tilt = cardTilts.get(card);
        tilt?.rotateX(0);
        tilt?.rotateY(0);
        tilt?.lift(0);
        card.style.setProperty('--pointer-x', '50%');
        card.style.setProperty('--pointer-y', '50%');
      };

      const resetArtwork = (artwork: HTMLElement | null) => {
        artwork?.style.setProperty('--parallax-x', '0px');
        artwork?.style.setProperty('--parallax-y', '0px');
      };

      const handlePointerMove = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        const target = event.target instanceof Element ? event.target : null;
        const card = target?.closest<HTMLElement>(CARD_SELECTOR) ?? null;
        const artwork = target?.closest<HTMLElement>('.item-artwork--image') ?? null;

        if (activeCard !== card) {
          resetCard(activeCard);
          activeCard = card && scope.contains(card) ? card : null;
        }
        if (activeCard) {
          const bounds = activeCard.getBoundingClientRect();
          let tilt = cardTilts.get(activeCard);
          if (!tilt) {
            gsap.set(activeCard, { transformPerspective: 1100, transformOrigin: 'center center' });
            tilt = {
              rotateX: gsap.quickTo(activeCard, 'rotationX', { duration: 0.4, ease: 'power3.out' }),
              rotateY: gsap.quickTo(activeCard, 'rotationY', { duration: 0.4, ease: 'power3.out' }),
              lift: gsap.quickTo(activeCard, 'y', { duration: 0.4, ease: 'power3.out' })
            };
            cardTilts.set(activeCard, tilt);
          }

          const x = (event.clientX - bounds.left) / bounds.width;
          const y = (event.clientY - bounds.top) / bounds.height;
          activeCard.style.setProperty('--pointer-x', `${x * 100}%`);
          activeCard.style.setProperty('--pointer-y', `${y * 100}%`);
          tilt.rotateX((0.5 - y) * 5);
          tilt.rotateY((x - 0.5) * 5);
          tilt.lift(-3);
        }

        if (activeArtwork !== artwork) resetArtwork(activeArtwork);
        activeArtwork = artwork && scope.contains(artwork) ? artwork : null;
        if (activeArtwork?.classList.contains('has-zoom-headroom')) {
          const bounds = activeArtwork.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          activeArtwork.style.setProperty('--parallax-x', `${-x * 4}px`);
          activeArtwork.style.setProperty('--parallax-y', `${-y * 4}px`);
        }
      };

      const handlePointerLeave = () => {
        resetCard(activeCard);
        resetArtwork(activeArtwork);
        activeCard = null;
        activeArtwork = null;
      };

      scope.addEventListener('pointermove', handlePointerMove);
      scope.addEventListener('pointerleave', handlePointerLeave);
      const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        scope.removeEventListener('pointermove', handlePointerMove);
        scope.removeEventListener('pointerleave', handlePointerLeave);
        handlePointerLeave();
        window.cancelAnimationFrame(refreshFrame);
        mutationObserver?.disconnect();
        dynamicContexts.forEach(revert => revert());
        activeBatchTweens.forEach(tween => tween.kill());
        scope.querySelectorAll<HTMLElement>(CARD_SELECTOR).forEach(card => {
          gsap.killTweensOf(card);
          gsap.set(card, {
            rotationX: 0,
            rotationY: 0,
            y: 0,
            clearProps: 'transform,transformPerspective,transformOrigin'
          });
        });
        scrollContext.revert();
        context.revert();
      };
    });

    media.add('(prefers-reduced-motion: reduce)', () => {
      const reducedContext = gsap.context(() => {
        const title = page.querySelector<HTMLElement>('.home-hero h1, .page-hero h1');
        const introArt = page.querySelector<HTMLElement>('.home-hero__visual, .page-hero__art');
        const copy = page.querySelector<HTMLElement>('.home-hero__copy, .page-hero__copy');
        const copyItems = copy
          ? Array.from(copy.children).filter(element => element !== title)
          : [];
        const intro = gsap.timeline({ defaults: { ease: 'none' } });

        intro.fromTo(page, { autoAlpha: 0, y: 8 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.36,
          clearProps: 'opacity,visibility,transform'
        });

        if (title) {
          intro.fromTo(title, { autoAlpha: 0, y: 6 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
            clearProps: 'opacity,visibility,transform'
          }, '-=0.1');
        }

        if (copyItems.length) {
          intro.fromTo(copyItems, { autoAlpha: 0, y: 4 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
            stagger: 0.05,
            clearProps: 'opacity,visibility,transform'
          }, '-=0.08');
        }

        if (introArt) {
          intro.fromTo(introArt, { autoAlpha: 0, y: 6 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.34,
            clearProps: 'opacity,visibility,transform'
          }, '-=0.12');
        }

        const contentIntro = page.querySelector<HTMLElement>(
          '.internal-page-content > .space-y-8 > :first-child'
        );
        if (contentIntro) {
          intro.fromTo(contentIntro, { autoAlpha: 0, y: 7 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
            clearProps: 'opacity,visibility,transform'
          }, '-=0.08');
        }
      }, page);

      const registeredTargets = new WeakSet<HTMLElement>();
      const revealTargets = Array.from(page.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
      const activeBatchTweens: gsap.core.Tween[] = [];

      const revealContext = gsap.context(() => {
        revealTargets.forEach(element => {
          registeredTargets.add(element);
        });

        if (revealTargets.length) {
          ScrollTrigger.batch(revealTargets, {
            start: 'top 88%',
            once: true,
            batchMax: 7,
            interval: 0.12,
            onEnter: elements => {
              const tween = gsap.fromTo(elements, {
                autoAlpha: 0,
                y: 6
              }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.34,
                stagger: 0.05,
                ease: 'power1.out',
                overwrite: 'auto',
                clearProps: 'opacity,visibility,transform'
              });
              activeBatchTweens.push(tween);
            }
          });
        }
      }, page);

      const dynamicContexts: Array<() => void> = [];
      const mutationObserver = typeof MutationObserver === 'undefined'
        ? null
        : new MutationObserver(records => {
          records.forEach(record => {
            record.addedNodes.forEach(node => {
              if (!(node instanceof HTMLElement)) return;
              const matches = node.matches(REVEAL_SELECTOR) ? [node] : [];
              matches.push(...Array.from(node.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)));

              matches.forEach(element => {
                if (registeredTargets.has(element)) return;
                registeredTargets.add(element);
                const dynamicContext = gsap.context(() => {
                  gsap.fromTo(element, { autoAlpha: 0, y: 5 }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power1.out',
                    clearProps: 'opacity,visibility,transform',
                    immediateRender: false,
                    scrollTrigger: {
                      trigger: element,
                      start: 'top 88%',
                      once: true
                    }
                  });
                }, page);
                dynamicContexts.push(() => dynamicContext.revert());
              });
            });
          });
        });
      mutationObserver?.observe(page, { childList: true, subtree: true });

      const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        window.cancelAnimationFrame(refreshFrame);
        mutationObserver?.disconnect();
        dynamicContexts.forEach(revert => revert());
        activeBatchTweens.forEach(tween => tween.kill());
        revealContext.revert();
        reducedContext.revert();
      };
    });

    return () => media.revert();
  }, [pageKey, scopeRef]);
};
