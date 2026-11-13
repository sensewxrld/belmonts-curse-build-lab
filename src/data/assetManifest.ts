import { ARCANAS_DATA } from './arcanas';
import { BOSSES_DATA } from './bosses';
import { RELICS_DATA } from './relics';
import { WEAPONS_DATA } from './weapons';

export type AssetCategory = 'weapon' | 'arcana' | 'relic' | 'boss';
export type AssetUsageStatus = 'approved' | 'reference-only' | 'pending-permission';

export interface AssetManifestEntry {
  id: string;
  name: string;
  category: AssetCategory;
  image: string | null;
  frame: AssetFrame;
  source: string;
  attribution: string;
  usageStatus: AssetUsageStatus;
  alt: string;
  canonicalName?: string;
}

export interface AssetFrame {
  objectFit: 'contain' | 'cover';
  objectPosition: string;
  padding: string;
}

interface ApprovedAsset {
  extension: 'webp' | 'png';
  source: string;
  attribution: string;
  canonicalName?: string;
}

const itemCatalog = 'https://castlevania.emn178.com/bc/items/';
const tarotCatalog = 'https://castlevania.emn178.com/bc/tarot/';
const officialCharacters = 'https://www.konami.com/games/castlevania/belmonts_curse/us/pt/character';
const officialFanKit = 'https://www.konami.com/games/castlevania/belmonts_curse/us/en-us/guideline/fankit';

const approvedAssets: Record<string, ApprovedAsset> = {
  'vampire-killer': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Vampire Killer' },
  'leather-whip': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Whip' },
  'thorn-whip': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Thorn Whip' },
  'morning-star': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Morning Star' },
  excalibur: { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Excalibur' },
  'claymore-of-the-fallen': {
    extension: 'webp',
    source: itemCatalog,
    attribution: '© KONAMI · Castlevania Database',
    canonicalName: 'Burnt Sword of Fierbois'
  },
  'zweihander-crimson': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Claymore' },
  'mournblade': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Durandal' },
  'war-and-famine': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'War and Famine' },
  'twin-daggers': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Pair of Longswords' },
  'shadow-talons': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Rapiers' },
  'crimson-shears': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Almace and Hauteclaire' },
  'chauve-souris': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Chauve-Souris' },
  'iron-pike': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Lance' },
  'halberd-of-the-guard': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Halberd' },
  'thunder-partizan': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Gungnir' },
  'alucards-sword-and-shield': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: "Alucard's Sword and Shield" },
  'crusader-blade-shield': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Rusted Harpè and Aegis' },
  'aegis-shortsword': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Fleuret and Tower Shield' },
  'paladins-bulwark': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: "Arondight and Lancelot's Shield" },
  'bernhards-wrath': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: "Bernhard's Wrath" },
  'iron-knuckles': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Cestus' },
  'blazing-cestus': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Jewel Knuckles' },
  'vampiric-talons': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Fists of Talos' },
  valmanway: { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Valmanway' },
  'broadsword': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Longsword' },
  'silver-rapier': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Bastard sword' },
  'astral-blade': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Joyeuse' },

  purification: { extension: 'webp', source: tarotCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Absolution' },
  'sacred-cross': { extension: 'webp', source: tarotCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Holy Cross' },
  hellfire: { extension: 'webp', source: tarotCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Infernal Pyre' },
  'petrifying-gaze': { extension: 'webp', source: tarotCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Petrifying Gaze' },
  'talos-hammer': { extension: 'webp', source: tarotCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Fist of Talos' },
  'blood-thorns': { extension: 'webp', source: tarotCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Blood Spikes' },
  'soul-reaping-scythe': { extension: 'webp', source: tarotCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Soul Harvest' },
  'wheel-of-chaos': { extension: 'webp', source: tarotCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Wheel of Chaos' },
  'frozen-path': { extension: 'webp', source: tarotCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Freezing Path' },
  'temporal-rush': { extension: 'webp', source: tarotCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Chronomantic Dive' },
  'life-drain': { extension: 'webp', source: tarotCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Life Drain' },
  'stained-glass-shield': { extension: 'webp', source: tarotCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Stained-Glass Shield' },
  'chains-of-justice': { extension: 'webp', source: tarotCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Chains of Justice' },
  mirrorwalk: { extension: 'webp', source: tarotCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Mirror Walk' },
  'cursed-flame': { extension: 'webp', source: tarotCatalog, attribution: '© KONAMI · Castlevania Database', canonicalName: 'Cursed Flame' },

  'witchs-knot': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  'twilight-gem': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  'family-grace': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  'obsidian-fang': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  'sinister-rune': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  'vile-trinket': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  'dark-sigil': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  'ravens-feather': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  'abyssal-eye': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  'necro-charm': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  'crypt-key': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  gloomstone: { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  'cursed-coin': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  'forsaken-ring': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  'witchs-brew': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  'lichs-mark': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },

  medusa: { extension: 'png', source: officialCharacters, attribution: '© KONAMI · Character page' },
  death: { extension: 'png', source: officialFanKit, attribution: '© KONAMI · Fan Kit' },
  joan: { extension: 'png', source: officialCharacters, attribution: '© KONAMI · Character page' },
  talos: { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  carmilla: { extension: 'png', source: officialCharacters, attribution: '© KONAMI · Character page' },
  brauner: { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  mammon: { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  'saint-louis': { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  isaac: { extension: 'png', source: officialCharacters, attribution: '© KONAMI · Character page' },
  succubus: { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  arthur: { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  doppelganger: { extension: 'webp', source: itemCatalog, attribution: '© KONAMI · Castlevania Database' },
  dracula: { extension: 'png', source: officialCharacters, attribution: '© KONAMI · Character page' }
};

const sourceByCategory: Record<AssetCategory, string> = {
  weapon: itemCatalog,
  arcana: tarotCatalog,
  relic: itemCatalog,
  boss: officialCharacters
};

const assetFolderByCategory: Record<AssetCategory, string> = {
  weapon: 'weapons',
  arcana: 'arcana',
  relic: 'relics',
  boss: 'bosses'
};

const categoryFrames: Record<AssetCategory, AssetFrame> = {
  weapon: { objectFit: 'contain', objectPosition: '50% 50%', padding: '14px 18px' },
  arcana: { objectFit: 'contain', objectPosition: '50% 44%', padding: '8px 18px' },
  relic: { objectFit: 'contain', objectPosition: '50% 50%', padding: '20px 24px' },
  boss: { objectFit: 'contain', objectPosition: '50% 40%', padding: '8px 18px' }
};

const assetFrames: Record<string, Partial<AssetFrame>> = {
  excalibur: { objectPosition: '50% 52%', padding: '20px 24px' },
  purification: { objectPosition: '50% 45%', padding: '4px 12px' },
  'witchs-knot': { objectPosition: '50% 48%', padding: '24px 30px' },
  medusa: { objectPosition: '50% 38%', padding: '4px 14px' }
};

const createEntries = (
  items: Array<{ id: string; name: string }>,
  category: AssetCategory
): AssetManifestEntry[] => items.map(({ id, name }) => {
  const asset = approvedAssets[id];
  const image = asset ? `/assets/${assetFolderByCategory[category]}/${id}.${asset.extension}` : null;
  const frame = { ...categoryFrames[category], ...assetFrames[id] };

  return {
    id,
    name,
    category,
    image,
    frame,
    source: asset?.source ?? sourceByCategory[category],
    attribution: asset?.attribution ?? 'Imagem específica não confirmada',
    usageStatus: asset ? 'approved' : 'reference-only',
    alt: asset
      ? asset.canonicalName
        ? `Arte de ${asset.canonicalName}, correspondência de catálogo para ${name}.`
        : `Arte de ${name} em Castlevania: Belmont’s Curse.`
      : `${name}: imagem específica ainda não confirmada para este registro.`,
    ...(asset?.canonicalName ? { canonicalName: asset.canonicalName } : {})
  };
});

export const ASSET_MANIFEST: AssetManifestEntry[] = [
  ...createEntries(WEAPONS_DATA.map(({ id, name }) => ({ id, name })), 'weapon'),
  ...createEntries(ARCANAS_DATA.map(({ id, spellName }) => ({ id, name: spellName })), 'arcana'),
  ...createEntries(RELICS_DATA.map(({ id, name }) => ({ id, name })), 'relic'),
  ...createEntries(BOSSES_DATA.map(({ id, name }) => ({ id, name })), 'boss')
];

export const ASSET_MANIFEST_BY_ID: Record<string, AssetManifestEntry> = ASSET_MANIFEST.reduce(
  (registry, entry) => {
    registry[entry.id] = entry;
    return registry;
  },
  {} as Record<string, AssetManifestEntry>
);

export const validateAssetManifest = (): string[] => {
  const errors: string[] = [];
  const ids = new Set<string>();
  const paths = new Set<string>();

  for (const entry of ASSET_MANIFEST) {
    if (ids.has(entry.id)) errors.push(`ID duplicado: ${entry.id}`);
    ids.add(entry.id);

    if (!entry.source.startsWith('https://')) errors.push(`Fonte inválida: ${entry.id}`);
    if (!entry.attribution.trim()) errors.push(`Crédito ausente: ${entry.id}`);
    if (!entry.alt.trim()) errors.push(`Texto alternativo ausente: ${entry.id}`);

    if (entry.image) {
      if (entry.usageStatus !== 'approved') errors.push(`Autorização não confirmada: ${entry.id}`);
      if (paths.has(entry.image)) errors.push(`Caminho duplicado: ${entry.image}`);
      paths.add(entry.image);
    }
  }

  return errors;
};
