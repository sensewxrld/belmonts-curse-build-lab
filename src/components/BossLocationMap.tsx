import React, { useState } from 'react';
import { MapPin, Save } from 'lucide-react';
import { BOSS_ENCOUNTERS } from '../data/bossLocations';

interface BossLocationMapProps {
  bossId: string;
}

export const BossLocationMap: React.FC<BossLocationMapProps> = ({ bossId }) => {
  const encounters = BOSS_ENCOUNTERS.filter(encounter => encounter.bossId === bossId);
  const [selectedEncounterId, setSelectedEncounterId] = useState(encounters[0]?.id ?? '');
  const encounter = encounters.find(item => item.id === selectedEncounterId) ?? encounters[0];

  if (!encounter) {
    return (
      <section className="boss-profile-location" aria-label="Localização do chefe">
        <p>Localização ainda não cadastrada.</p>
      </section>
    );
  }

  const routeSteps = encounter.routeSteps?.length ? encounter.routeSteps : [encounter.arena];
  const markerName = encounter.markerStep ?? encounter.arena;
  const markerIndex = routeSteps.findIndex(step => step.toLocaleLowerCase() === markerName.toLocaleLowerCase());
  const arenaIndex = markerIndex >= 0 ? markerIndex : routeSteps.length - 1;

  return (
    <section className="boss-profile-location" aria-labelledby="boss-profile-location-title">
      <div className="boss-profile-location__heading">
        <div>
          <span>LOCALIZAÇÃO</span>
          <h3 id="boss-profile-location-title">{encounter.region}</h3>
        </div>
        {encounters.length > 1 && (
          <div className="boss-profile-location__encounters" aria-label="Selecionar encontro">
            {encounters.map((item, index) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={item.id === encounter.id}
                onClick={() => setSelectedEncounterId(item.id)}
              >
                {index + 1}º encontro · {item.region}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="boss-profile-location__map" aria-label={`Esquema conceitual de ${encounter.region}`}>
        <ol className="boss-profile-location__route">
          {routeSteps.map((step, index) => {
            const isArena = index === arenaIndex;
            return (
              <li key={`${step}-${index}`} className={isArena ? 'is-arena' : ''}>
                <span className="boss-profile-location__node">
                  {isArena ? <MapPin size={15} aria-hidden="true" /> : String(index + 1).padStart(2, '0')}
                </span>
                <span>{step}</span>
                {isArena && <small>Arena</small>}
              </li>
            );
          })}
        </ol>
        <div className="boss-profile-location__mirror">
          <Save size={15} aria-hidden="true" />
          <span>Mirror of Life</span>
          <strong>{encounter.mirrorOfLife}</strong>
        </div>
      </div>
      <p className="boss-profile-location__note">Esquema conceitual, sem escala; não representa o mapa oficial.</p>
    </section>
  );
};
