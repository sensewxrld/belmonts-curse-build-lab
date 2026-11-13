import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const typescript = require('typescript');
const requireExtensions = require('node:module')._extensions;

requireExtensions['.ts'] = (module, filename) => {
  const source = readFileSync(filename, 'utf8');
  const output = typescript.transpileModule(source, {
    compilerOptions: {
      module: typescript.ModuleKind.CommonJS,
      target: typescript.ScriptTarget.ES2020,
      esModuleInterop: true
    }
  }).outputText;
  module._compile(output, filename);
};

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { ASSET_MANIFEST, validateAssetManifest } = require('../src/data/assetManifest.ts');
const { WEAPONS_DATA } = require('../src/data/weapons.ts');
const { ARCANAS_DATA } = require('../src/data/arcanas.ts');
const { RELICS_DATA } = require('../src/data/relics.ts');
const { BOSSES_DATA } = require('../src/data/bosses.ts');
const errors = validateAssetManifest();
const expectedEntries = [
  ...WEAPONS_DATA.map(item => ({ category: 'weapon', id: item.id, name: item.name })),
  ...ARCANAS_DATA.map(item => ({ category: 'arcana', id: item.id, name: item.spellName })),
  ...RELICS_DATA.map(item => ({ category: 'relic', id: item.id, name: item.name })),
  ...BOSSES_DATA.map(item => ({ category: 'boss', id: item.id, name: item.name }))
];

if (ASSET_MANIFEST.length !== expectedEntries.length) {
  errors.push(`Quantidade de registros divergente: esperado ${expectedEntries.length}, encontrado ${ASSET_MANIFEST.length}`);
}

for (const expected of expectedEntries) {
  const actual = ASSET_MANIFEST.find(entry => entry.id === expected.id);
  if (!actual || actual.category !== expected.category || actual.name !== expected.name) {
    errors.push(`Associação de asset inválida: ${expected.category}/${expected.id}`);
  }
}

for (const entry of ASSET_MANIFEST) {
  if (!entry.image) continue;

  const relativePath = entry.image.replace(/^\/+/, '').replace(/\//g, sep);
  const resolvedPath = resolve(projectRoot, 'public', relativePath);
  if (!resolvedPath.startsWith(resolve(projectRoot, 'public') + sep)) {
    errors.push(`Caminho de imagem fora de public/assets: ${entry.id}`);
  } else if (!existsSync(resolvedPath)) {
    errors.push(`Arquivo de imagem inexistente: ${entry.id} (${entry.image})`);
  }
}

if (errors.length > 0) {
  console.error(`Validação de assets falhou (${errors.length} problema(s)):\n- ${errors.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(`Manifesto íntegro: ${ASSET_MANIFEST.length} registros; fontes, licenças e caminhos verificados.`);
}
