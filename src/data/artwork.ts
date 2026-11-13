import { ARCANAS_DATA } from './arcanas';
import { BOSSES_DATA } from './bosses';
import { RELICS_DATA } from './relics';
import { WEAPONS_DATA } from './weapons';

export interface ItemArtworkRecord {
  status: 'pending' | 'verified';
  src?: string;
  credit?: string;
}

export const OFFICIAL_GAME_ART = {
  keyArt: 'https://www.konami.com/games/castlevania/belmonts_curse/s/images/kv2_pc.png',
  keyArtMobile: 'https://www.konami.com/games/castlevania/belmonts_curse/s/images/kv2_sp.jpg',
  whipScreenshot: 'https://www.konami.com/games/castlevania/belmonts_curse/s/images/ss/gs_whip_1.jpg',
  weaponsScreenshot: 'https://www.konami.com/games/castlevania/belmonts_curse/s/images/ss/gs_weapon_1.jpg',
  bossesScreenshot: 'https://www.konami.com/games/castlevania/belmonts_curse/s/images/ss/gs_boss_1.jpg',
  source: 'https://www.konami.com/games/castlevania/belmonts_curse/us/pt/'
} as const;

const catalogItems = [
  ...WEAPONS_DATA.map(item => ({ id: item.id, category: 'weapons' })),
  ...ARCANAS_DATA.map(item => ({ id: item.id, category: 'arcana' })),
  ...RELICS_DATA.map(item => ({ id: item.id, category: 'relics' })),
  ...BOSSES_DATA.map(item => ({ id: item.id, category: 'bosses' }))
];

export const ITEM_ARTWORK_REGISTRY: Record<string, ItemArtworkRecord> = catalogItems.reduce(
  (registry, item) => {
    registry[item.id] = { status: 'pending' };
    return registry;
  },
  {} as Record<string, ItemArtworkRecord>
);

export const getItemArtwork = (itemId: string): ItemArtworkRecord =>
  ITEM_ARTWORK_REGISTRY[itemId] || { status: 'pending' };
