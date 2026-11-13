import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  Filter, 
  Clock, 
  BookOpen, 
  Flame, 
  Layers 
} from 'lucide-react';
import { SOURCES_DATA } from '../data/sources';
import { SourceItem } from '../types';

export const SourcesSection: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('Todas');
  const [filterLevel, setFilterLevel] = useState<string>('Todos');
  const [search, setSearch] = useState<string>('');

  const categories = ['Todas', 'Oficial', 'Guias de armas e relíquias', 'Guias de Arcanos e chefes'];
  const reliabilityLevels = ['Todos', 'Oficial', 'Verificada em guias', 'Teoria de build'];

  const filteredSources = SOURCES_DATA.filter(src => {
    const matchesCategory = filterCategory === 'Todas' || src.category === filterCategory;
    const matchesLevel = filterLevel === 'Todos' || src.reliabilityLevel === filterLevel;
    const matchesSearch = 
      src.name.toLowerCase().includes(search.toLowerCase()) ||
      src.notes.toLowerCase().includes(search.toLowerCase()) ||
      src.url.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gothic-border/60 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transparência Metodológica & Confiabilidade</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide">
              Fontes & Atualizações (Patch 1.1.4)
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Registro das 17 publicações consultadas, níveis de validação e histórico de alterações canônicas.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-gothic-900 border border-emerald-500/30 text-xs flex items-center gap-2">
            <span className="text-neutral-400">Versão Verificada:</span>
            <span className="font-mono font-bold text-emerald-400">v1.1.4 (Nov/2026)</span>
          </div>
        </div>

        {/* Registro da Alteração Canônica da Versão 1.1.4 em Life Drain */}
        <div className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-blood-950 via-gothic-900 to-gothic-950 border border-blood-700/60 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-gold-accent flex-shrink-0" />
            <h3 className="font-serif text-sm font-bold text-gold-200 uppercase tracking-wide">
              Registro Canônico de Atualização — Versão 1.1.4 (Novembro de 2026)
            </h3>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed font-sans">
            <strong>Reajuste no alcance do Arcana Life Drain:</strong> No patch 1.1.4, a KONAMI e a equipe de desenvolvimento reajustaram o raio de canalização do feitiço <em>Life Drain</em>. O alcance excessivo que permitia drenagem fora da tela foi reduzido para uma distância média balanceada, exigindo reposicionamento tático do caçador. Este laboratório utiliza exclusivamente dados pós-patch 1.1.4 e não incorpora dados desatualizados do pré-lançamento.
          </p>
        </div>
      </div>

      {/* Explicativo dos Três Níveis de Confiabilidade Obrigatórios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-gothic-900 border border-emerald-700/50 space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <h4 className="font-serif text-xs font-bold text-emerald-300 uppercase">1. Oficial (Konami / Steam / PS)</h4>
          </div>
          <p className="text-[11px] text-neutral-300 leading-relaxed">
            Documentação direta da distribuidora e desenvolvedoras (KONAMI, Evil Empire, Motion Twin). Mecânicas fundamentais, notas de atualização e comunicados oficiais.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gothic-900 border border-blue-700/50 space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
            <h4 className="font-serif text-xs font-bold text-blue-300 uppercase">2. Verificada em Guias</h4>
          </div>
          <p className="text-[11px] text-neutral-300 leading-relaxed">
            Informações com consistência comprovada entre duas ou mais fontes independentes de referência (AllThings, GAMES.GG, Mobalytics, Power Up Gaming, NoobFeed).
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gothic-900 border border-purple-700/50 space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
            <h4 className="font-serif text-xs font-bold text-purple-300 uppercase">3. Teoria de Build</h4>
          </div>
          <p className="text-[11px] text-neutral-300 leading-relaxed">
            Combinações sugeridas e arquétipos táticos baseados nas características intrínsecas e sinergias dos equipamentos (SlashKeys, iTechGuides). Não são presets oficiais.
          </p>
        </div>
      </div>

      {/* Filtros e Busca de Fontes */}
      <div className="p-4 rounded-2xl bg-gothic-900 border border-gothic-border space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por nome da publicação, URL ou notas de divergência..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-gothic-950 border border-gothic-border text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-gold-accent"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-mono text-neutral-500">Categoria:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                  filterCategory === cat
                    ? 'bg-blood-800 text-gold-200 border border-gold-accent/40'
                    : 'bg-gothic-800 text-neutral-400 hover:text-white hover:bg-gothic-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-mono text-neutral-500">Nível:</span>
            {reliabilityLevels.map(lvl => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                  filterLevel === lvl
                    ? 'bg-gold-500/20 text-gold-200 border border-gold-500/40'
                    : 'bg-gothic-850 text-neutral-400 hover:text-white hover:bg-gothic-800'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista das 17 Fontes Catalogadas */}
      <div className="space-y-4">
        {filteredSources.map((src, index) => (
          <div
            key={src.id}
            className="p-5 rounded-2xl gothic-border-card border-gothic-border hover:border-gold-accent/40 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`pill-badge text-[10px] py-0.5 px-2.5 ${
                  src.reliabilityLevel === 'Oficial' ? 'bg-emerald-950 border border-emerald-600 text-emerald-300' :
                  src.reliabilityLevel === 'Verificada em guias' ? 'bg-blue-950 border border-blue-600 text-blue-300' :
                  'bg-purple-950 border border-purple-600 text-purple-300'
                }`}>
                  {src.reliabilityLevel}
                </span>

                <span className="text-[11px] font-mono text-neutral-400">
                  {src.category}
                </span>

                <span className="text-neutral-600">•</span>

                <span className="text-[11px] font-mono text-gold-400">
                  {src.gameVersion} ({src.verificationDate})
                </span>
              </div>

              <div className="source-card__title">
                <span className="source-card__monogram" aria-hidden="true">
                  {src.name.split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase()}
                </span>
                <h3 className="font-serif text-base font-bold text-white tracking-wide">
                  {src.name}
                </h3>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed font-sans max-w-4xl">
                {src.notes}
              </p>

              {src.divergences && (
                <div className="text-[11px] text-amber-300 bg-amber-950/30 p-2 rounded-lg border border-amber-800/50">
                  <strong>Registro de Divergência:</strong> {src.divergences}
                </div>
              )}
            </div>

            <div className="flex-shrink-0 self-start md:self-center">
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-gothic-950 hover:bg-gothic-800 border border-gold-accent/30 text-gold-300 text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105"
              >
                <span>Acessar Publicação</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold-accent" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
