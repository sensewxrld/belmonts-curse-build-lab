import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Sword, 
  Shield, 
  BookOpen, 
  Plus, 
  X, 
  Save, 
  Share2, 
  Scale, 
  CheckCircle2, 
  Flame, 
  Info, 
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { WEAPONS_DATA } from '../data/weapons';
import { ARCANAS_DATA } from '../data/arcanas';
import { RELICS_DATA } from '../data/relics';
import { Weapon, Arcana, Relic, CustomBuild } from '../types';
import { calculateBuildScore } from '../utils/calculator';
import { saveCustomBuild, generateShareUrl, addToBuildHistory } from '../utils/storage';
import { ThemeIcon } from './ThemeIcons';
import { ItemArtwork } from './ItemArtwork';

interface BuildPlannerProps {
  initialWeaponId?: string;
  initialArcanaId?: string;
  initialRelicIds?: string[];
  initialBuildName?: string;
  initialBuildId?: string;
  initialPlaystyle?: string;
  initialBuildDescription?: string;
  onSendToComparator: (buildData: { title: string; weaponId: string; arcanaId: string; relicIds: string[] }) => void;
  unlockedIds: { weapons: string[]; arcanas: string[]; relics: string[] };
  onCustomBuildSaved: (builds: CustomBuild[], build: CustomBuild) => void;
}

export const BuildPlanner: React.FC<BuildPlannerProps> = ({
  initialWeaponId = 'vampire-killer',
  initialArcanaId = 'purification',
  initialRelicIds = ['witchs-knot', 'twilight-gem', 'sinister-rune'],
  initialBuildName = 'Equilíbrio Ancestral',
  initialBuildId,
  initialPlaystyle,
  initialBuildDescription,
  onSendToComparator,
  unlockedIds,
  onCustomBuildSaved
}) => {
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>(initialWeaponId);
  const [selectedArcanaId, setSelectedArcanaId] = useState<string>(initialArcanaId);
  const [selectedRelicIds, setSelectedRelicIds] = useState<string[]>(initialRelicIds);
  const [playstyle, setPlaystyle] = useState<string>('Equilibrado');
  const [buildName, setBuildName] = useState<string>(initialBuildName);
  const [editingBuildId, setEditingBuildId] = useState<string | undefined>(initialBuildId);
  const [buildDescription, setBuildDescription] = useState<string>('');
  const [modalPickerType, setModalPickerType] = useState<'weapon' | 'arcana' | 'relic' | null>(null);
  const [pickerSearch, setPickerSearch] = useState('');
  const [shareSuccess, setShareSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (initialWeaponId) setSelectedWeaponId(initialWeaponId);
    if (initialArcanaId) setSelectedArcanaId(initialArcanaId);
    if (initialRelicIds) setSelectedRelicIds(initialRelicIds.slice(0, 3));
    if (initialBuildName) setBuildName(initialBuildName);
    setEditingBuildId(initialBuildId);
    setPlaystyle(initialPlaystyle || 'Equilibrado');
    setBuildDescription(initialBuildDescription || '');
  }, [initialWeaponId, initialArcanaId, initialRelicIds, initialBuildName, initialBuildId, initialPlaystyle, initialBuildDescription]);

  useEffect(() => {
    setPickerSearch('');
  }, [modalPickerType]);

  const selectedWeapon = WEAPONS_DATA.find(w => w.id === selectedWeaponId);
  const selectedArcana = ARCANAS_DATA.find(a => a.id === selectedArcanaId);
  const selectedRelics = selectedRelicIds.map(rid => RELICS_DATA.find(r => r.id === rid)!).filter(Boolean);

  const metrics = calculateBuildScore(selectedWeapon, selectedArcana, selectedRelics);

  // Registro no histórico ao alterar
  useEffect(() => {
    if (selectedWeaponId && selectedArcanaId) {
      addToBuildHistory({
        weaponId: selectedWeaponId,
        arcanaId: selectedArcanaId,
        relicIds: selectedRelicIds,
        name: buildName
      });
    }
  }, [selectedWeaponId, selectedArcanaId, selectedRelicIds]);

  const handleToggleRelic = (relicId: string) => {
    if (selectedRelicIds.includes(relicId)) {
      setSelectedRelicIds(selectedRelicIds.filter(id => id !== relicId));
    } else {
      if (selectedRelicIds.length < 3) {
        setSelectedRelicIds([...selectedRelicIds, relicId]);
      }
    }
  };

  const handleSaveBuild = () => {
    if (!selectedWeaponId || !selectedArcanaId) return;

    const newBuild: CustomBuild = {
      id: editingBuildId || `custom-${Date.now()}`,
      name: buildName.trim() || 'Build Personalizada',
      description: buildDescription.trim() || undefined,
      playstyle,
      weaponId: selectedWeaponId,
      arcanaId: selectedArcanaId,
      relicIds: selectedRelicIds,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      isCustom: true
    };

    const updated = saveCustomBuild(newBuild);
    onCustomBuildSaved(updated, newBuild);
    setEditingBuildId(newBuild.id);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleShare = () => {
    const url = generateShareUrl(selectedWeaponId, selectedArcanaId, selectedRelicIds);
    navigator.clipboard.writeText(url);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gothic-border/60 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-gold-950/60 border border-gold-800 text-gold-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
              <span>Forja e Teoria de Combate Interativa</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide">
              Montador Inteligente de Builds
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Selecione 1 arma, 1 arcano e até 3 relíquias. O motor heurístico avaliará sua combinação sem multiplicadores fictícios.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onSendToComparator({
                title: buildName,
                weaponId: selectedWeaponId,
                arcanaId: selectedArcanaId,
                relicIds: selectedRelicIds
              })}
              className="px-3.5 py-2 rounded-xl bg-gothic-900 hover:bg-gothic-800 border border-gold-accent/40 text-neutral-200 text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Scale className="w-4 h-4 text-gold-accent" />
              <span>Enviar para Comparador</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-gothic-900 hover:bg-gothic-800 border border-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Share2 className="w-4 h-4 text-purple-400" />
              <span>{shareSuccess ? 'Link Copiado!' : 'Compartilhar Link'}</span>
            </button>

            <button
              onClick={handleSaveBuild}
              className="px-4 py-2 rounded-xl bg-blood-800 hover:bg-blood-700 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-blood-glow"
            >
              <Save className="w-4 h-4 text-gold-200" />
              <span>{saveSuccess ? 'Salvo no Inventário!' : editingBuildId ? 'Salvar Edição' : 'Salvar Minha Build'}</span>
            </button>
          </div>
        </div>
      </div>

      <section className="planner-composition" aria-label="Composição atual da build">
        <div className="planner-composition__featured">
          {selectedWeapon && (
            <ItemArtwork
              itemId={selectedWeapon.id}
              title={selectedWeapon.name}
              iconType={selectedWeapon.iconType}
            />
          )}
          <div>
            <span className="eyebrow">COMPOSIÇÃO ATUAL <span /></span>
            <h2>{buildName || 'Build sem título'}</h2>
            <p>{selectedWeapon?.name} <i>+</i> {selectedArcana?.spellName} <i>+</i> {selectedRelics.length} relíquias</p>
          </div>
        </div>
        <div className="planner-composition__pieces">
          {selectedArcana && (
            <div>
              <ItemArtwork itemId={selectedArcana.id} title={selectedArcana.spellName} iconType={selectedArcana.iconType} />
              <span>ARCANA</span>
              <strong>{selectedArcana.spellName}</strong>
            </div>
          )}
          {selectedRelics.map(relic => (
            <div key={relic.id}>
              <ItemArtwork itemId={relic.id} title={relic.name} iconType={relic.iconType} />
              <span>RELÍQUIA</span>
              <strong>{relic.name}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* Grid Principal: Slots de Equipamento (Esquerda) vs Avaliação Heurística (Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Painel de Equipamentos (7 Colunas) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Informações da Build: Nome & Estilo */}
          <div className="p-5 rounded-2xl bg-gothic-900 border border-gothic-border space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-gold-400 uppercase mb-1">
                  Nome da Configuração:
                </label>
                <input
                  type="text"
                  value={buildName}
                  onChange={(e) => setBuildName(e.target.value)}
                  placeholder="Ex: Assassino de Drácula"
                  className="w-full px-3 py-2 rounded-xl bg-gothic-950 border border-gothic-border text-xs text-white focus:outline-none focus:border-gold-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gold-400 uppercase mb-1">
                  Estilo de Jogo Pretendido:
                </label>
                <select
                  value={playstyle}
                  onChange={(e) => setPlaystyle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gothic-950 border border-gothic-border text-xs text-white focus:outline-none focus:border-gold-accent"
                >
                  <option value="Equilibrado">Equilibrado (Versatilidade)</option>
                  <option value="Boss Killer">Boss Killer (Anti-Chefes)</option>
                  <option value="DPS Agressivo">DPS Agressivo (Combos Rápidos)</option>
                  <option value="Brawler Regenerativo">Brawler Regenerativo (Vampirismo)</option>
                  <option value="Bastião Defensivo">Bastião Defensivo (Parry & Escudo)</option>
                  <option value="Sentinela à Distância">Sentinela à Distância (Segurança)</option>
                  <option value="Controle de Hordas">Controle de Hordas (AoE)</option>
                  <option value="Explorador de Segredos">Explorador de Segredos</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase mb-1">
                Anotações Estratégicas (Opcional):
              </label>
              <textarea
                value={buildDescription}
                onChange={(e) => setBuildDescription(e.target.value)}
                placeholder="Insira notas de rotação de habilidades, momentos de troca de relíquias ou fraquezas a mitigar..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-gothic-950 border border-gothic-border text-xs text-neutral-200 focus:outline-none focus:border-gold-accent resize-none"
              />
            </div>
          </div>

          {/* Slot 1: ARMA PRINCIPAL (Obrigatório 1) */}
          <div className="p-5 rounded-2xl gothic-border-card border-gold-accent/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-gold-400 uppercase font-semibold flex items-center gap-1.5">
                <Sword className="w-4 h-4 text-gold-accent" />
                Slot 1 — Arma Principal (1 Selecionada)
              </span>
              <button
                onClick={() => setModalPickerType('weapon')}
                className="text-xs text-gold-accent hover:underline font-semibold"
              >
                Trocar Arma &gt;
              </button>
            </div>

            {selectedWeapon ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-gothic-950 border border-gold-accent/20">
                <div className="flex items-center gap-3">
                  <ItemArtwork
                    itemId={selectedWeapon.id}
                    title={selectedWeapon.name}
                    iconType={selectedWeapon.iconType}
                    className="planner-slot-art"
                  />
                  <div>
                    <h4 className="font-serif text-base font-bold text-white">
                      {selectedWeapon.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span>{selectedWeapon.family}</span>
                      <span>•</span>
                      <span className="text-gold-300 font-mono font-bold">
                        {selectedWeapon.baseDamagePerHit} dano/hit
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right sm:text-right w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-800">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Cadência & Alcance</span>
                  <span className="text-xs text-neutral-200 font-medium">
                    {selectedWeapon.speed} • {selectedWeapon.range}
                  </span>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => setModalPickerType('weapon')}
                className="p-8 text-center border-2 border-dashed border-neutral-800 rounded-xl cursor-pointer hover:border-gold-accent/60"
              >
                <Plus className="w-6 h-6 text-neutral-500 mx-auto mb-1" />
                <span className="text-xs text-neutral-400">Clique para selecionar uma arma</span>
              </div>
            )}
          </div>

          {/* Slot 2: ARCANO / MAGIA (Obrigatório 1) */}
          <div className="p-5 rounded-2xl gothic-border-card border-arcane-500/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-arcane-300 uppercase font-semibold flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-arcane-400" />
                Slot 2 — Arcana Principal (1 Selecionado)
              </span>
              <button
                onClick={() => setModalPickerType('arcana')}
                className="text-xs text-arcane-300 hover:underline font-semibold"
              >
                Trocar Arcana &gt;
              </button>
            </div>

            {selectedArcana ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-gothic-950 border border-arcane-500/20">
                <div className="flex items-center gap-3">
                  <ItemArtwork
                    itemId={selectedArcana.id}
                    title={selectedArcana.spellName}
                    iconType={selectedArcana.iconType}
                    className="planner-slot-art"
                  />
                  <div>
                    <h4 className="font-serif text-base font-bold text-white">
                      {selectedArcana.spellName}
                    </h4>
                    <div className="text-xs text-purple-300 font-serif italic">
                      {selectedArcana.cardName}
                    </div>
                  </div>
                </div>

                <div className="text-right sm:text-right w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-800">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Custo de Mana</span>
                  <span className="text-xs font-mono font-bold text-arcane-300">
                    {selectedArcana.manaCost} MP / conjuração
                  </span>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => setModalPickerType('arcana')}
                className="p-8 text-center border-2 border-dashed border-neutral-800 rounded-xl cursor-pointer hover:border-arcane-400"
              >
                <Plus className="w-6 h-6 text-neutral-500 mx-auto mb-1" />
                <span className="text-xs text-neutral-400">Clique para selecionar um arcano</span>
              </div>
            )}
          </div>

          {/* Slot 3: RELÍQUIAS PASSIVAS (Máximo 3) */}
          <div className="p-5 rounded-2xl gothic-border-card border-blood-500/30">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-mono text-blood-400 uppercase font-semibold flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blood-400" />
                  Slot 3 — Relíquias Passivas ({selectedRelicIds.length}/3)
                </span>
                <span className="text-[11px] text-neutral-500 block">
                  Regra do sistema: limite estrito de 3 relíquias equipadas por configuração.
                </span>
              </div>

              {selectedRelicIds.length < 3 && (
                <button
                  onClick={() => setModalPickerType('relic')}
                  className="text-xs text-gold-accent hover:underline font-semibold"
                >
                  + Adicionar Relíquia
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[0, 1, 2].map((slotIndex) => {
                const relic = selectedRelics[slotIndex];

                return relic ? (
                  <div
                    key={relic.id}
                    className="p-3 rounded-xl bg-gothic-950 border border-neutral-800 flex flex-col justify-between relative group"
                  >
                    <button
                      onClick={() => handleToggleRelic(relic.id)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-gothic-900 text-neutral-500 hover:text-rose-400"
                      title="Desequipar relíquia"
                    >
                      <X className="w-3 h-3" />
                    </button>

                    <ItemArtwork
                      itemId={relic.id}
                      title={relic.name}
                      iconType={relic.iconType}
                      className="planner-relic-art"
                    />
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-xs text-white truncate pr-4">
                        {relic.name}
                      </span>
                    </div>

                    <p className="text-[10px] text-neutral-400 line-clamp-3 leading-tight mb-2">
                      {relic.effect}
                    </p>

                    <span className="text-[10px] font-mono text-gold-400">
                      {relic.rarityOrTier}
                    </span>
                  </div>
                ) : (
                  <div
                    key={slotIndex}
                    onClick={() => setModalPickerType('relic')}
                    className="p-6 text-center border-2 border-dashed border-neutral-800 rounded-xl cursor-pointer hover:border-blood-500/60 flex flex-col items-center justify-center min-h-[110px]"
                  >
                    <Plus className="w-5 h-5 text-neutral-600 mb-1" />
                    <span className="text-[11px] text-neutral-500">Espaço Vazio</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Painel Heurístico Transparente de Métricas (5 Colunas) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl gothic-border-card border-gold-accent/40 bg-gradient-to-b from-gothic-900 to-gothic-950 space-y-6">
            {/* Pontuação Global Heurística */}
            <div className="text-center pb-4 border-b border-gothic-border/60">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                Índice Geral de Compatibilidade Heurística
              </span>
              <div className="text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-accent to-gold-400">
                {metrics.overallScore}
                <span className="text-xl text-neutral-500 font-sans font-normal">/100</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold">
                <span>Dificuldade de Execução:</span>
                <strong>{metrics.executionDifficulty}</strong>
              </div>
            </div>

            {/* Barras de Atributos Analíticos */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gold-accent" />
                Desempenho por Eixo Tático:
              </h4>

              {/* Dano */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-300">Poder de Dano / Golpe</span>
                  <span className="font-mono font-bold text-gold-300">{metrics.damage}/100</span>
                </div>
                <div className="h-2 rounded-full bg-gothic-950 overflow-hidden border border-neutral-800">
                  <div className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500" style={{ width: `${metrics.damage}%` }} />
                </div>
              </div>

              {/* Velocidade */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-300">Velocidade & Cadência</span>
                  <span className="font-mono font-bold text-purple-300">{metrics.speed}/100</span>
                </div>
                <div className="h-2 rounded-full bg-gothic-950 overflow-hidden border border-neutral-800">
                  <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500" style={{ width: `${metrics.speed}%` }} />
                </div>
              </div>

              {/* Alcance */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-300">Alcance de Segurança</span>
                  <span className="font-mono font-bold text-cyan-300">{metrics.range}/100</span>
                </div>
                <div className="h-2 rounded-full bg-gothic-950 overflow-hidden border border-neutral-800">
                  <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-500" style={{ width: `${metrics.range}%` }} />
                </div>
              </div>

              {/* Defesa */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-300">Defesa & Bloqueio</span>
                  <span className="font-mono font-bold text-blue-300">{metrics.defense}/100</span>
                </div>
                <div className="h-2 rounded-full bg-gothic-950 overflow-hidden border border-neutral-800">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500" style={{ width: `${metrics.defense}%` }} />
                </div>
              </div>

              {/* Sustentação */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-300">Sustentação & Recuperação</span>
                  <span className="font-mono font-bold text-rose-300">{metrics.sustain}/100</span>
                </div>
                <div className="h-2 rounded-full bg-gothic-950 overflow-hidden border border-neutral-800">
                  <div className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-500" style={{ width: `${metrics.sustain}%` }} />
                </div>
              </div>

              {/* Eficiência de Mana */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-300">Eficiência & Gestão de Mana</span>
                  <span className="font-mono font-bold text-indigo-300">{metrics.manaEfficiency}/100</span>
                </div>
                <div className="h-2 rounded-full bg-gothic-950 overflow-hidden border border-neutral-800">
                  <div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-500" style={{ width: `${metrics.manaEfficiency}%` }} />
                </div>
              </div>

              {/* Controle de Grupo */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-300">Controle de Grupo (CC)</span>
                  <span className="font-mono font-bold text-emerald-300">{metrics.crowdControl}/100</span>
                </div>
                <div className="h-2 rounded-full bg-gothic-950 overflow-hidden border border-neutral-800">
                  <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500" style={{ width: `${metrics.crowdControl}%` }} />
                </div>
              </div>

              {/* Duelo contra Chefes */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-300">Eficácia em Duelos contra Chefes</span>
                  <span className="font-mono font-bold text-blood-400">{metrics.bossing}/100</span>
                </div>
                <div className="h-2 rounded-full bg-gothic-950 overflow-hidden border border-neutral-800">
                  <div className="h-full bg-gradient-to-r from-blood-700 to-blood-500 transition-all duration-500" style={{ width: `${metrics.bossing}%` }} />
                </div>
              </div>
            </div>

            {/* Justificativa Heurística dos Critérios (Transparência Obrigatória) */}
            <div className="pt-4 border-t border-gothic-border/60">
              <span className="text-xs font-serif font-bold text-gold-200 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-gold-accent" />
                Explicação dos Critérios da Pontuação:
              </span>
              <div className="space-y-2 text-xs text-neutral-300 max-h-56 overflow-y-auto pr-1">
                {metrics.criteriaBreakdown.map((crit, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-gothic-950/80 border border-neutral-800/80">
                    <div className="flex justify-between font-semibold text-[11px] text-gold-300 mb-0.5">
                      <span>{crit.label}</span>
                      <span className="font-mono">{crit.points} pts</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                      {crit.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE SELEÇÃO DE EQUIPAMENTO */}
      {modalPickerType && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div role="dialog" aria-modal="true" aria-label="Selecionar equipamento" className="w-full max-w-3xl max-h-[85vh] bg-gothic-900 border border-gold-accent/50 rounded-2xl flex flex-col shadow-card-elevated overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-gothic-border flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                {modalPickerType === 'weapon' && <Sword className="w-5 h-5 text-gold-accent" />}
                {modalPickerType === 'arcana' && <Shield className="w-5 h-5 text-arcane-400" />}
                {modalPickerType === 'relic' && <BookOpen className="w-5 h-5 text-blood-400" />}
                <span>
                  {modalPickerType === 'weapon' && 'Selecione uma Arma (28 disponíveis)'}
                  {modalPickerType === 'arcana' && 'Selecione um Arcana (16 disponíveis)'}
                  {modalPickerType === 'relic' && 'Selecione Relíquias (Até 3 ativas)'}
                </span>
              </h3>
              <button
                onClick={() => setModalPickerType(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-gothic-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 pb-0">
              <input
                type="search"
                value={pickerSearch}
                onChange={event => setPickerSearch(event.target.value)}
                placeholder={`Buscar ${modalPickerType === 'weapon' ? 'arma' : modalPickerType === 'arcana' ? 'Arcana' : 'relíquia'}...`}
                aria-label="Buscar equipamento"
                className="w-full px-3 py-2 rounded-xl bg-gothic-950 border border-gothic-border text-xs text-white"
              />
            </div>
            <div className="p-4 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh]">
              {/* Opções de Armas */}
              {modalPickerType === 'weapon' && WEAPONS_DATA.filter(w => `${w.name} ${w.family} ${w.rarity}`.toLowerCase().includes(pickerSearch.toLowerCase())).map(w => (
                <button
                  type="button"
                  key={w.id}
                  onClick={() => {
                    setSelectedWeaponId(w.id);
                    setModalPickerType(null);
                  }}
                  aria-pressed={selectedWeaponId === w.id}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedWeaponId === w.id
                      ? 'bg-blood-950/80 border-gold-accent'
                      : 'bg-gothic-950 border-neutral-800 hover:border-neutral-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ItemArtwork itemId={w.id} title={w.name} iconType={w.iconType} className="picker-item-art" />
                    <div>
                      <h5 className="font-bold text-xs text-white">{w.name}</h5>
                      <span className="text-[11px] text-neutral-400">{w.family} • {w.rarity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-gold-300 text-xs">{w.baseDamagePerHit} dano</span>
                  </div>
                </button>
              ))}

              {/* Opções de Arcanos */}
              {modalPickerType === 'arcana' && ARCANAS_DATA.filter(a => `${a.spellName} ${a.cardName}`.toLowerCase().includes(pickerSearch.toLowerCase())).map(a => (
                <button
                  type="button"
                  key={a.id}
                  onClick={() => {
                    setSelectedArcanaId(a.id);
                    setModalPickerType(null);
                  }}
                  aria-pressed={selectedArcanaId === a.id}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedArcanaId === a.id
                      ? 'bg-purple-950/80 border-arcane-400'
                      : 'bg-gothic-950 border-neutral-800 hover:border-neutral-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ItemArtwork itemId={a.id} title={a.spellName} iconType={a.iconType} className="picker-item-art" />
                    <div>
                      <h5 className="font-bold text-xs text-white">{a.spellName}</h5>
                      <span className="text-[11px] text-purple-300 italic">{a.cardName}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-arcane-300 text-xs">{a.manaCost} MP</span>
                  </div>
                </button>
              ))}

              {/* Opções de Relíquias */}
              {modalPickerType === 'relic' && RELICS_DATA.filter(r => `${r.name} ${r.rarityOrTier} ${r.effect}`.toLowerCase().includes(pickerSearch.toLowerCase())).map(r => {
                const isSelected = selectedRelicIds.includes(r.id);
                return (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => handleToggleRelic(r.id)}
                    aria-pressed={isSelected}
                    disabled={!isSelected && selectedRelicIds.length >= 3}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-blood-950/80 border-gold-accent'
                        : selectedRelicIds.length >= 3
                        ? 'bg-gothic-950 opacity-40 border-neutral-900 cursor-not-allowed'
                        : 'bg-gothic-950 border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ItemArtwork itemId={r.id} title={r.name} iconType={r.iconType} className="picker-item-art" />
                      <div>
                        <h5 className="font-bold text-xs text-white">{r.name}</h5>
                        <span className="text-[10px] text-neutral-400 line-clamp-1">{r.effect}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-gold-400 font-bold ml-2">
                      {isSelected ? '✓ Equipada' : r.rarityOrTier}
                    </span>
                    </button>
                );
              })}
            </div>

            <div className="p-3 border-t border-gothic-border bg-gothic-950 flex justify-end">
              <button
                onClick={() => setModalPickerType(null)}
                className="px-4 py-1.5 rounded-lg bg-gothic-800 text-xs font-semibold text-white hover:bg-gothic-700"
              >
                Concluir Seleção
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
