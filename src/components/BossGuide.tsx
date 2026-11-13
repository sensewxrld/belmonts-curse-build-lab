import React, { useLayoutEffect, useRef, useState } from 'react';
import { 
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Flame,
  Heart,
  Search,
  Shield,
  ShieldAlert,
  Skull,
  Sword,
  Zap
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BOSSES_DATA } from '../data/bosses';
import { WEAPONS_DATA } from '../data/weapons';
import { ARCANAS_DATA } from '../data/arcanas';
import { RELICS_DATA } from '../data/relics';
import { ItemArtwork } from './ItemArtwork';

gsap.registerPlugin(ScrollTrigger);

interface BossGuideProps {
  onLoadBossCounterBuild: (buildData: { weaponId: string; arcanaId: string; relicIds: string[]; name: string }) => void;
}

export const BossGuide: React.FC<BossGuideProps> = ({ onLoadBossCounterBuild }) => {
  const [search, setSearch] = useState('');
  const [selectedBossId, setSelectedBossId] = useState<string>('medusa'); // Medusa em evidência
  const profileRef = useRef<HTMLElement | null>(null);
  const selectionTweenRef = useRef<gsap.core.Tween | null>(null);

  const filteredBosses = BOSSES_DATA.filter(boss => 
    boss.name.toLowerCase().includes(search.toLowerCase()) ||
    boss.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  const currentBoss = BOSSES_DATA.find(b => b.id === selectedBossId) || BOSSES_DATA[0];

  const recWeapon = WEAPONS_DATA.find(w => w.id === currentBoss.recommendedWeaponId);
  const recArcana = ARCANAS_DATA.find(a => a.id === currentBoss.recommendedArcanaId);
  const recRelics = currentBoss.recommendedRelicIds.map(rid => RELICS_DATA.find(r => r.id === rid)!).filter(Boolean);
  const immunities = [
    {
      key: 'fire',
      label: 'Fogo',
      immune: currentBoss.immunities.fire,
      status: currentBoss.immunities.fire ? 'Imune' : 'Sofre Dano'
    },
    {
      key: 'bleed',
      label: 'Sangramento',
      immune: currentBoss.immunities.bleed,
      status: currentBoss.immunities.bleed ? 'Imune' : 'Sangra'
    },
    {
      key: 'crowdControl',
      label: 'Controle',
      immune: currentBoss.immunities.crowdControl,
      status: currentBoss.immunities.crowdControl ? 'Imune' : 'Interrompível'
    }
  ];
  const immunityCount = immunities.filter(item => item.immune).length;

  const selectBoss = (bossId: string) => {
    if (bossId === currentBoss.id) return;

    selectionTweenRef.current?.kill();
    const profile = profileRef.current;
    if (!profile) {
      setSelectedBossId(bossId);
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    selectionTweenRef.current = gsap.to(profile, {
      autoAlpha: 0,
      ...(reducedMotion ? {} : { y: -8, scale: 0.99 }),
      duration: reducedMotion ? 0.18 : 0.24,
      ease: 'power2.in',
      onComplete: () => {
        selectionTweenRef.current = null;
        setSelectedBossId(bossId);
      }
    });
  };

  useLayoutEffect(() => {
    const profile = profileRef.current;
    if (!profile) return;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const portrait = profile.querySelector<HTMLElement>('.boss-profile__portrait');
      const image = profile.querySelector<HTMLElement>('.boss-profile__portrait img');
      const aura = profile.querySelector<HTMLElement>('.boss-profile__aura');
      const backdrop = profile.querySelector<HTMLElement>('.boss-profile__backdrop');
      const details = profile.querySelectorAll<HTMLElement>('.boss-profile__intro-item');
      const revealSections = profile.querySelectorAll<HTMLElement>('.boss-profile__scroll-reveal');

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro.fromTo(profile, {
        autoAlpha: 0,
        y: 22,
        scale: 0.985
      }, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.42,
        clearProps: 'opacity,visibility,transform'
      });

      if (portrait) {
        intro.fromTo(portrait, {
          autoAlpha: 0,
          y: 28,
          rotationY: -8,
          scale: 0.92
        }, {
          autoAlpha: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.78,
          clearProps: 'opacity,visibility,transform'
        }, '-=0.28');
        gsap.to(portrait, {
          y: -7,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      if (image) {
        intro.fromTo(image, { filter: 'brightness(.58) saturate(.72)' }, {
          filter: 'brightness(1) saturate(1)',
          duration: 0.9,
          clearProps: 'filter'
        }, '-=0.58');
      }

      if (details.length) {
        intro.fromTo(details, { autoAlpha: 0, y: 12 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.07,
          clearProps: 'opacity,visibility,transform'
        }, '-=0.58');
      }

      if (aura) {
        gsap.to(aura, {
          rotation: 360,
          duration: 38,
          repeat: -1,
          ease: 'none'
        });
      }

      if (backdrop) {
        gsap.fromTo(backdrop, { y: 0 }, {
          y: 28,
          ease: 'none',
          scrollTrigger: {
            trigger: profile,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        });
      }

      const activeReveals = new Set<gsap.core.Tween>();
      if (revealSections.length) {
        ScrollTrigger.batch(revealSections, {
          start: 'top 88%',
          once: true,
          batchMax: 3,
          interval: 0.12,
          onEnter: elements => {
            const tween = gsap.to(elements, {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.1,
              ease: 'power3.out',
              clearProps: 'opacity,visibility,transform',
              onComplete: () => activeReveals.delete(tween)
            });
            activeReveals.add(tween);
          }
        });
      }

      let rotateX = portrait
        ? gsap.quickTo(portrait, 'rotationX', { duration: 0.6, ease: 'power3.out' })
        : null;
      let rotateY = portrait
        ? gsap.quickTo(portrait, 'rotationY', { duration: 0.6, ease: 'power3.out' })
        : null;

      const handlePointerMove = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse' || !portrait) return;
        const bounds = portrait.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        profile.style.setProperty('--boss-pointer-x', `${x * 100}%`);
        profile.style.setProperty('--boss-pointer-y', `${y * 100}%`);
        rotateX?.((0.5 - y) * 4);
        rotateY?.((x - 0.5) * 5);
      };

      const handlePointerLeave = () => {
        rotateX?.(0);
        rotateY?.(0);
        profile.style.setProperty('--boss-pointer-x', '50%');
        profile.style.setProperty('--boss-pointer-y', '50%');
      };

      profile.addEventListener('pointermove', handlePointerMove);
      profile.addEventListener('pointerleave', handlePointerLeave);
      const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        profile.removeEventListener('pointermove', handlePointerMove);
        profile.removeEventListener('pointerleave', handlePointerLeave);
        window.cancelAnimationFrame(refreshFrame);
        activeReveals.forEach(tween => tween.kill());
      };
    });

    media.add('(prefers-reduced-motion: reduce)', () => {
      const portrait = profile.querySelector<HTMLElement>('.boss-profile__portrait');
      const details = profile.querySelectorAll<HTMLElement>('.boss-profile__intro-item');
      const revealSections = profile.querySelectorAll<HTMLElement>('.boss-profile__scroll-reveal');
      const intro = gsap.timeline({ defaults: { ease: 'none' } });

      intro.fromTo(profile, { autoAlpha: 0, y: 7 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.34,
        clearProps: 'opacity,visibility,transform'
      });

      if (portrait) {
        intro.fromTo(portrait, { autoAlpha: 0, y: 5 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.32,
          clearProps: 'opacity,visibility,transform'
        }, '-=0.1');
      }

      if (details.length) {
        intro.fromTo(details, { autoAlpha: 0, y: 4 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          stagger: 0.04,
          clearProps: 'opacity,visibility,transform'
        }, '-=0.08');
      }

      const activeReveals = new Set<gsap.core.Tween>();
      if (revealSections.length) {
        ScrollTrigger.batch(revealSections, {
          start: 'top 88%',
          once: true,
          batchMax: 3,
          interval: 0.12,
          onEnter: elements => {
            const tween = gsap.fromTo(elements, {
              autoAlpha: 0,
              y: 5
            }, {
              autoAlpha: 1,
              y: 0,
              duration: 0.3,
              stagger: 0.06,
              ease: 'power1.out',
              clearProps: 'opacity,visibility,transform',
              onComplete: () => activeReveals.delete(tween)
            });
            activeReveals.add(tween);
          }
        });
      }

      const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        window.cancelAnimationFrame(refreshFrame);
        activeReveals.forEach(tween => tween.kill());
      };
    });

    return () => {
      selectionTweenRef.current?.kill();
      media.revert();
    };
  }, [currentBoss.id]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gothic-border/60 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blood-950/60 border border-blood-800 text-blood-300 text-xs font-semibold mb-2">
              <Skull className="w-3.5 h-3.5 text-blood-400" />
              <span>13 Senhores das Trevas • Guia Tático Especializado</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide">
              Bestiário & Estratégias contra Chefes
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Padrões de ataque, janelas de vulnerabilidade, imunidades a fogo/sangramento/CC e contra-arsenal recomendado.
            </p>
          </div>
        </div>

        {/* Alerta de Atualização Nov/2026: Medusa com Lance & Holy Cross */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-gothic-900 to-blood-950/60 border border-emerald-700/60 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-300 leading-relaxed">
            <strong className="text-emerald-300 block mb-0.5 font-semibold">
              Guia Verificado em Novembro de 2026 (Patch 1.1.4):
            </strong>
            No confronto com <strong>Medusa</strong>, o consenso técnico de guias independentes estabelece como prioridade o uso da <strong>Lança (Chauve-Souris)</strong> e de <strong>Holy Cross (Sacred Cross)</strong> combinadas com a relíquia <em>Raven's Feather</em>, anulando sua varredura de cauda e quebrando o enxame de serpentes à distância.
          </div>
        </div>
      </div>

      {/* Grid Principal: Lista de 13 Chefes (Esquerda) vs Dossiê Tático Detalhado (Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Seletor Rápido de Chefes (4 Colunas) */}
        <div className="lg:col-span-4 min-w-0 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar chefe (ex: Dracula, Medusa)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-gothic-900 border border-gothic-border text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-gold-accent"
            />
          </div>

          <div className="boss-selector-list space-y-1.5 max-h-[620px] overflow-x-hidden overflow-y-auto pr-1">
            {filteredBosses.map((boss) => {
              const isSelected = boss.id === currentBoss.id;
              return (
                <button
                  type="button"
                  key={boss.id}
                  onClick={() => selectBoss(boss.id)}
                  aria-pressed={isSelected}
                  className={`boss-selector w-full min-w-0 p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-left ${
                    isSelected
                      ? 'bg-blood-900/40 border-gold-accent shadow-gothic-glow'
                      : 'bg-gothic-900/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="boss-selector__identity min-w-0 flex items-center gap-3">
                    <div className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center font-serif font-bold text-sm ${
                      isSelected ? 'bg-gold-500 text-gothic-950' : 'bg-gothic-800 text-neutral-400'
                    }`}>
                      {boss.name.charAt(0)}
                    </div>
                    <div className="boss-selector__copy min-w-0">
                      <h4
                        className={`boss-selector__name font-serif text-xs font-bold ${isSelected ? 'text-gold-200' : 'text-neutral-200'}`}
                        title={boss.name}
                      >
                        {boss.name}
                      </h4>
                      <span className="boss-selector__subtitle text-[10px] text-neutral-500 block" title={boss.subtitle}>
                        {boss.subtitle}
                      </span>
                    </div>
                  </div>

                  <span className="boss-selector__hp text-[10px] font-mono text-blood-400 font-bold" title={boss.reportedHp}>
                    {boss.reportedHp}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dossiê Tático do Chefe Selecionado (8 Colunas) */}
        <div className="lg:col-span-8">
          <article
            ref={profileRef}
            className="boss-profile"
            aria-labelledby="boss-profile-title"
          >
            <header className="boss-profile__hero">
              <div className="boss-profile__backdrop" aria-hidden="true" />
              <div className="boss-profile__art-stage">
                <div className="boss-profile__aura" aria-hidden="true" />
                <span className="boss-profile__art-index">
                  INIMIGO DE ELITE · {String(BOSSES_DATA.findIndex(b => b.id === currentBoss.id) + 1).padStart(2, '0')}
                </span>
                <ItemArtwork
                  key={currentBoss.id}
                  itemId={currentBoss.id}
                  title={currentBoss.name}
                  iconType="gaze"
                  className="boss-artwork boss-profile__portrait"
                />
                <span className="boss-profile__art-caption" aria-hidden="true">
                  DOSSIÊ DE COMBATE / 1.1.4
                </span>
              </div>

              <div className="boss-profile__identity">
                <div className="boss-profile__intro-item boss-profile__eyebrow">
                  <Skull size={15} aria-hidden="true" />
                  <span>Dossiê do inimigo</span>
                  {currentBoss.updatedNov2026Note && (
                    <span className="boss-profile__verified">Verificado</span>
                  )}
                </div>

                <div className="boss-profile__intro-item">
                  <h2 id="boss-profile-title" className="boss-profile__name">
                    {currentBoss.name}
                  </h2>
                  <p className="boss-profile__subtitle">{currentBoss.subtitle}</p>
                </div>

                <div className="boss-profile__vitality boss-profile__intro-item">
                  <div className="boss-profile__vitality-heading">
                    <span><Heart size={14} aria-hidden="true" /> HP reportado</span>
                    <strong>{currentBoss.reportedHp}</strong>
                  </div>
                  <div className="boss-profile__vitality-line" aria-hidden="true">
                    <span />
                  </div>
                </div>

                <div className="boss-profile__summary boss-profile__intro-item" aria-label="Resumo de combate">
                  <div>
                    <strong>{String(currentBoss.verifiedWeaknesses.length).padStart(2, '0')}</strong>
                    <span>Fraquezas</span>
                  </div>
                  <div>
                    <strong>{String(currentBoss.resistances.length).padStart(2, '0')}</strong>
                    <span>Resistências</span>
                  </div>
                  <div>
                    <strong>{String(immunityCount).padStart(2, '0')}</strong>
                    <span>Imunidades</span>
                  </div>
                </div>
              </div>
            </header>

            <section className="boss-profile__attributes boss-profile__scroll-reveal" aria-labelledby="boss-attributes-title">
              <div className="boss-profile__section-heading">
                <span className="boss-profile__section-index">01 / DEFESA</span>
                <h3 id="boss-attributes-title"><Shield size={15} aria-hidden="true" /> Atributos defensivos</h3>
              </div>
              <div className="boss-profile__immunities">
                {immunities.map(item => (
                  <div
                    className={`boss-profile__immunity${item.immune ? ' is-immune' : ''}`}
                    key={item.key}
                  >
                    {item.key === 'fire' && <Flame size={16} aria-hidden="true" />}
                    {item.key === 'bleed' && <Heart size={16} aria-hidden="true" />}
                    {item.key === 'crowdControl' && <ShieldAlert size={16} aria-hidden="true" />}
                    <span>{item.label}</span>
                    <strong>{item.status}</strong>
                  </div>
                ))}
              </div>
              {currentBoss.immunities.notes && (
                <p className="boss-profile__immunity-note">{currentBoss.immunities.notes}</p>
              )}
            </section>

            <div className="boss-profile__affinities boss-profile__scroll-reveal">
              <section className="boss-profile__affinity boss-profile__affinity--weakness" aria-labelledby="boss-weaknesses-title">
                <div className="boss-profile__section-heading">
                  <span className="boss-profile__section-index">02 / VULNERABILIDADES</span>
                  <h3 id="boss-weaknesses-title"><Zap size={15} aria-hidden="true" /> Fraquezas verificadas</h3>
                </div>
                <ul>
                  {currentBoss.verifiedWeaknesses.map((weakness, index) => (
                    <li key={index}><span aria-hidden="true">+</span>{weakness}</li>
                  ))}
                </ul>
              </section>

              <section className="boss-profile__affinity boss-profile__affinity--resistance" aria-labelledby="boss-resistances-title">
                <div className="boss-profile__section-heading">
                  <span className="boss-profile__section-index">03 / RESISTÊNCIAS</span>
                  <h3 id="boss-resistances-title"><ShieldAlert size={15} aria-hidden="true" /> Resistências conhecidas</h3>
                </div>
                <ul>
                  {currentBoss.resistances.map((resistance, index) => (
                    <li key={index}><span aria-hidden="true">−</span>{resistance}</li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="boss-profile__combat boss-profile__scroll-reveal" aria-labelledby="boss-attacks-title">
              <div className="boss-profile__section-heading">
                <span className="boss-profile__section-index">04 / PADRÕES</span>
                <h3 id="boss-attacks-title"><Sword size={15} aria-hidden="true" /> Ataques & mecânicas</h3>
              </div>
              <ol>
                {currentBoss.attacksAndMechanics.map((attack, index) => (
                  <li key={index}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{attack}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="boss-profile__loadout boss-profile__scroll-reveal" aria-labelledby="boss-loadout-title">
              <div className="boss-profile__loadout-heading">
                <div className="boss-profile__section-heading">
                  <span className="boss-profile__section-index">05 / PREPARAÇÃO</span>
                  <h3 id="boss-loadout-title"><Award size={15} aria-hidden="true" /> Contra-arsenal recomendado</h3>
                </div>
                <button
                  onClick={() => onLoadBossCounterBuild({
                    weaponId: currentBoss.recommendedWeaponId,
                    arcanaId: currentBoss.recommendedArcanaId,
                    relicIds: currentBoss.recommendedRelicIds,
                    name: `Anti-${currentBoss.name}`
                  })}
                  className="boss-profile__equip"
                >
                  <span>Equipar no Planner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="boss-profile__loadout-summary">
                <div><span>Arma prioritária</span><strong>{recWeapon?.name}</strong></div>
                <div><span>Melhor Arcana</span><strong>{recArcana?.spellName}</strong></div>
                <div><span>Relíquias ideais</span><strong>{recRelics.map(relic => relic.name).join(', ')}</strong></div>
              </div>
              <div className="build-equipment-strip build-equipment-strip--compact" aria-label={`Equipamentos recomendados contra ${currentBoss.name}`}>
                {recWeapon && (
                  <figure>
                    <ItemArtwork itemId={recWeapon.id} title={recWeapon.name} iconType={recWeapon.iconType} />
                    <figcaption>ARMA · {recWeapon.name}</figcaption>
                  </figure>
                )}
                {recArcana && (
                  <figure>
                    <ItemArtwork itemId={recArcana.id} title={recArcana.spellName} iconType={recArcana.iconType} />
                    <figcaption>ARCANA · {recArcana.spellName}</figcaption>
                  </figure>
                )}
                {recRelics.map(relic => (
                  <figure key={relic.id}>
                    <ItemArtwork itemId={relic.id} title={relic.name} iconType={relic.iconType} />
                    <figcaption>RELÍQUIA · {relic.name}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section className="boss-profile__strategy boss-profile__scroll-reveal" aria-label="Estratégias de combate">
              <div>
                <span><BookOpen size={14} aria-hidden="true" /> Estratégia tática recomendada</span>
                <p>{currentBoss.combatStrategy}</p>
              </div>
              <div>
                <span><CheckCircle2 size={14} aria-hidden="true" /> Alternativa para iniciantes</span>
                <p>{currentBoss.beginnerAlternative}</p>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
};
