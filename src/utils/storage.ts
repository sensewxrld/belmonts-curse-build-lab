import { CustomBuild } from '../types';
import { WEAPONS_DATA } from '../data/weapons';
import { ARCANAS_DATA } from '../data/arcanas';
import { RELICS_DATA } from '../data/relics';

const STORAGE_KEYS = {
  UNLOCKED_WEAPONS: 'belmont_unlocked_weapons_v1',
  UNLOCKED_ARCANAS: 'belmont_unlocked_arcanas_v1',
  UNLOCKED_RELICS: 'belmont_unlocked_relics_v1',
  CUSTOM_BUILDS: 'belmont_custom_builds_v1',
  FAVORITES: 'belmont_favorites_v1',
  BUILD_HISTORY: 'belmont_build_history_v1',
  THEME: 'belmont_theme_v1'
};

export type ThemePreference = 'dark' | 'light';

export function getThemePreference(): ThemePreference {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) === 'light' ? 'light' : 'dark';
  } catch (e) {
    console.error('Falha ao carregar preferência de tema', e);
    return 'dark';
  }
}

export function saveThemePreference(theme: ThemePreference): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (e) {
    console.error('Falha ao salvar preferência de tema', e);
  }
}

// Por padrão, se o usuário ainda não mexeu no inventário, deixamos as principais ou todas pré-desbloqueadas para livre exploração
export function getUnlockedInventory(): { weapons: string[]; arcanas: string[]; relics: string[] } {
  try {
    const w = localStorage.getItem(STORAGE_KEYS.UNLOCKED_WEAPONS);
    const a = localStorage.getItem(STORAGE_KEYS.UNLOCKED_ARCANAS);
    const r = localStorage.getItem(STORAGE_KEYS.UNLOCKED_RELICS);

    return {
      weapons: w ? JSON.parse(w) : WEAPONS_DATA.map(item => item.id),
      arcanas: a ? JSON.parse(a) : ARCANAS_DATA.map(item => item.id),
      relics: r ? JSON.parse(r) : RELICS_DATA.map(item => item.id)
    };
  } catch (e) {
    return {
      weapons: WEAPONS_DATA.map(item => item.id),
      arcanas: ARCANAS_DATA.map(item => item.id),
      relics: RELICS_DATA.map(item => item.id)
    };
  }
}

export function saveUnlockedInventory(inv: { weapons: string[]; arcanas: string[]; relics: string[] }) {
  try {
    localStorage.setItem(STORAGE_KEYS.UNLOCKED_WEAPONS, JSON.stringify(inv.weapons));
    localStorage.setItem(STORAGE_KEYS.UNLOCKED_ARCANAS, JSON.stringify(inv.arcanas));
    localStorage.setItem(STORAGE_KEYS.UNLOCKED_RELICS, JSON.stringify(inv.relics));
  } catch (e) {
    console.error('Falha ao salvar inventário', e);
  }
}

export function getCustomBuilds(): CustomBuild[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_BUILDS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function saveCustomBuild(build: CustomBuild): CustomBuild[] {
  const existing = getCustomBuilds();
  const updated = [build, ...existing.filter(b => b.id !== build.id)];
  localStorage.setItem(STORAGE_KEYS.CUSTOM_BUILDS, JSON.stringify(updated));
  return updated;
}

export function deleteCustomBuild(id: string): CustomBuild[] {
  const existing = getCustomBuilds();
  const updated = existing.filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEYS.CUSTOM_BUILDS, JSON.stringify(updated));
  return updated;
}

export function getFavorites(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function toggleFavorite(id: string): string[] {
  const favs = getFavorites();
  const updated = favs.includes(id) ? favs.filter(item => item !== id) : [...favs, id];
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
  return updated;
}

export function addToBuildHistory(build: { weaponId: string; arcanaId: string; relicIds: string[]; name?: string }) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BUILD_HISTORY);
    const list = raw ? JSON.parse(raw) : [];
    const item = { ...build, timestamp: new Date().toISOString() };
    const updated = [item, ...list.slice(0, 19)]; // Mantém os 20 últimos
    localStorage.setItem(STORAGE_KEYS.BUILD_HISTORY, JSON.stringify(updated));
  } catch (e) {}
}

export function getBuildHistory(): any[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BUILD_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function exportUserDataJSON(): string {
  const data = {
    app: "Belmont's Curse Build Lab",
    version: "1.1.4",
    exportedAt: new Date().toISOString(),
    unlocked: getUnlockedInventory(),
    customBuilds: getCustomBuilds(),
    favorites: getFavorites(),
    history: getBuildHistory()
  };
  return JSON.stringify(data, null, 2);
}

export function importUserDataJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.unlocked) saveUnlockedInventory(parsed.unlocked);
    if (parsed.customBuilds) localStorage.setItem(STORAGE_KEYS.CUSTOM_BUILDS, JSON.stringify(parsed.customBuilds));
    if (parsed.favorites) localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(parsed.favorites));
    return true;
  } catch (e) {
    console.error('Erro ao importar JSON', e);
    return false;
  }
}

export function generateShareUrl(weaponId: string, arcanaId: string, relicIds: string[]): string {
  const payload = { w: weaponId, a: arcanaId, r: relicIds };
  const encoded = encodeURIComponent(btoa(JSON.stringify(payload)));
  const url = new URL(window.location.href);
  url.searchParams.set('build', encoded);
  return url.toString();
}

export function parseShareUrl(): { weaponId: string; arcanaId: string; relicIds: string[] } | null {
  try {
    const url = new URL(window.location.href);
    const param = url.searchParams.get('build');
    if (!param) return null;
    const decoded = JSON.parse(atob(decodeURIComponent(param)));
    if (decoded && decoded.w && decoded.a && Array.isArray(decoded.r)) {
      return {
        weaponId: decoded.w,
        arcanaId: decoded.a,
        relicIds: decoded.r.slice(0, 3)
      };
    }
  } catch (e) {}
  return null;
}
