import { Arcana } from '../types';

export const ARCANAS_DATA: Arcana[] = [
  {
    id: 'purification',
    cardName: 'O Julgamento da Santa Trindade',
    spellName: 'Purification',
    description: 'Invocação de colunas de luz divina que banem impurezas, desintegram projéteis mágicos e causam dano sagrado concentrado em área.',
    manaCost: 35,
    effect: 'Cria três feixes sagrados verticais ao redor do conjurador. Causa dano de Luz contínuo e anula maldições ativas sobre o personagem.',
    upgrades: [
      'Nível 2 — Pilar da Penitência: Raio dos feixes aumentado em 25% e dano sagrado amplificado contra mortos-vivos.',
      'Nível 3 — Batismo Radiante: Inimigos mortos pela magia liberam ondas de cura que restauram 15 HP para o conjurador.'
    ],
    unlockCondition: 'Conquistado na Capela dos Penitentes após quebrar o Selo do Bispo Corrompido.',
    effectiveAgainstBosses: ['death', 'dracula', 'carmilla', 'brauner', 'succubus'],
    knownResistances: ['Saint Louis possui alta resistência a dano sagrado/luz.', 'Inimigos puramente mecânicos (como Talos) sofrem dano sagrado reduzido.'],
    compatibleRelics: ['witchs-knot', 'twilight-gem', 'sinister-rune'],
    iconType: 'holy'
  },
  {
    id: 'sacred-cross',
    cardName: 'A Fé dos Mártires',
    spellName: 'Sacred Cross',
    description: 'Arremessa uma enorme cruz de energia bendita em trajetória de bumerangue que retalha alvos à frente e no retorno.',
    manaCost: 30,
    effect: 'Projétil perfurante que viaja em linha reta média e retorna ao jogador. Causa múltiplos acertos contínuos ao colidir com caixas de colisão volumosas.',
    upgrades: [
      'Nível 2 — Cruz Tripla: Arremessa três cruzes divergentes em leque.',
      'Nível 3 — Vórtice Celestial: O cruzamento das cruzes cria um turbilhão que atrai inimigos pequenos e estilhaça escudos.'
    ],
    unlockCondition: 'Encontrado no Nicho da Catedral Antiga, atrás do mosaico de Gabriel.',
    effectiveAgainstBosses: ['medusa', 'death', 'joan', 'mammon', 'dracula'],
    knownResistances: ['Eficácia drasticamente reduzida contra inimigos com teletransporte rápido no instante do retorno.', 'Chefes muito rápidos esquivam do ponto focal.'],
    compatibleRelics: ['ravens-feather', 'twilight-gem', 'witchs-knot'],
    iconType: 'cross'
  },
  {
    id: 'hellfire',
    cardName: 'O Trono de Cinzas',
    spellName: 'Hellfire',
    description: 'A clássica invocação draculiana: abre o manto e dispara três esferas de magma concentrado seguidas de colunas incandescentes.',
    manaCost: 45,
    effect: 'Dispara três meteoros de fogo demoníaco que detonam em colunas de fogo ascendentes ao contato, causando dano massivo por combustão contínua.',
    upgrades: [
      'Nível 2 — Fogo Negro Abissal: As chamas passam a causar dano necrótico e queimadura duradoura de 6s.',
      'Nível 3 — Erupção Infernal: Adiciona uma 4ª esfera gigantesca que causa atordoamento por impacto.'
    ],
    unlockCondition: 'Câmara do Alquimista Herege — Recompensa após derrotar o Cultista Carmesim.',
    effectiveAgainstBosses: ['brauner', 'arthur', 'mammon', 'doppelganger'],
    knownResistances: ['Imunidade absoluta contra Carmilla em forma infernal e entidades ígneas.', 'Chefes com barreira elemental sofrem 50% menos dano.'],
    compatibleRelics: ['obsidian-fang', 'twilight-gem', 'vile-trinket'],
    iconType: 'fire'
  },
  {
    id: 'petrifying-gaze',
    cardName: 'A Rainha das Górgonas',
    spellName: 'Petrifying Gaze',
    description: 'Canaliza a visão ancestral de Medusa, projetando uma emanação esmeralda que paralisa e petrifica alvos na linha de visão.',
    manaCost: 40,
    effect: 'Emite um cone de energia que transforma monstros comuns em pedra por 5s e reduz a velocidade de movimento e ataque de chefes em 30%.',
    upgrades: [
      'Nível 2 — Fragilidade Calcárea: Alvos petrificados recebem 40% a mais de dano contundente de espadões e soqueiras.',
      'Nível 3 — Fragmentação Sísmica: Finalizar alvos petrificados gera estilhaços de pedra com dano em área.'
    ],
    unlockCondition: 'Cavernas Submersas — Concedido após purificar o Olho da Górgona no altar.',
    effectiveAgainstBosses: ['talos', 'arthur', 'isaac'],
    knownResistances: ['Medusa é 100% imune à sua própria petrificação.', 'Death e entidades espectrais não possuem matéria física e ignoram a petrificação.'],
    compatibleRelics: ['abyssal-eye', 'gloomstone', 'dark-sigil'],
    iconType: 'gaze'
  },
  {
    id: 'talos-hammer',
    cardName: 'O Titã de Bronze',
    spellName: 'Talos Hammer',
    description: 'Materializa um martelo colossal de bronze e ferro forjado dos céus, esmagando o solo com impacto sísmico.',
    manaCost: 50,
    effect: 'Dano de impacto físico/telúrico extremo em um raio de 8 metros. Quebra escudos instantaneamente e derruba chefes pesados.',
    upgrades: [
      'Nível 2 — Onda de Choque Fissurada: Cria fissuras que cospem estilhaços cortantes por 3s.',
      'Nível 3 — Forja Titânica: Aumenta o dano de quebra de guarda em 60%.'
    ],
    unlockCondition: 'Pátio das Máquinas Antigas, ativando a forja desativada de Talos.',
    effectiveAgainstBosses: ['joan', 'talos', 'saint-louis', 'mammon'],
    knownResistances: ['Inimigos flutuantes em grandes alturas (como Succubus no ar) evitam o choque no solo.', 'Animação de conjuração longa deixa vulnerável se mal calculado.'],
    compatibleRelics: ['twilight-gem', 'abyssal-eye', 'necro-charm'],
    iconType: 'hammer'
  },
  {
    id: 'excellence',
    cardName: 'A Coroa do Monarca',
    spellName: 'Excellence',
    description: 'Canaliza uma aura soberana de hiperfoco que eleva todos os atributos do guerreiro por um breve período de maestria pura.',
    manaCost: 30,
    effect: 'Concede imunidade temporária a atordoamento por 8s, eleva a velocidade de ataque em 25% e aumenta a chance de acerto crítico em 20%.',
    upgrades: [
      'Nível 2 — Transe Heroico: Duração estendida para 12s e redução de custo de mana para armas de habilidade.',
      'Nível 3 — Triunfo Régio: Matar ou golpear repetidamente durante o transe estende a duração em até 4s adicionais.'
    ],
    unlockCondition: 'Galeria dos Retratos Reais — Interaja com a pintura dos Reis Ancestrais com uma arma lendária equipada.',
    effectiveAgainstBosses: ['dracula', 'doppelganger', 'death', 'carmilla'],
    knownResistances: ['Não causa dano direto; ineficaz se o jogador adotar postura passiva durante sua duração.'],
    compatibleRelics: ['obsidian-fang', 'twilight-gem', 'sinister-rune'],
    iconType: 'crown'
  },
  {
    id: 'blood-thorns',
    cardName: 'As Raízes do Sacrifício',
    spellName: 'Blood Thorns',
    description: 'Erompe vinhas espinhosas carmesim do chão embebidas em sangue amaldiçoado, enredando os pés dos inimigos.',
    manaCost: 35,
    effect: 'Prende inimigos em solo por 3.5s, aplicando sangramento persistente e restaurando 12% do dano causado diretamente para o conjurador.',
    upgrades: [
      'Nível 2 — Vinhas Vorazes: Espinhos cobrem uma área 40% maior e reduzem a defesa física do alvo em 15%.',
      'Nível 3 — Florada de Sangue: Quando o efeito expira, as vinhas explodem gerando orbes de vitalidade no chão.'
    ],
    unlockCondition: 'Estufa Carmesim — Derrote a Planta Parasita no coração do bosque.',
    effectiveAgainstBosses: ['carmilla', 'brauner', 'arthur', 'mammon'],
    knownResistances: ['Inimigos voadores ou incorpóreos (como Death) não pisam nas vinhas.', 'Monstros de pedra e Talos sofrem 0 sangramento.'],
    compatibleRelics: ['witchs-knot', 'twilight-gem', 'vile-trinket'],
    iconType: 'thorns'
  },
  {
    id: 'soul-reaping-scythe',
    cardName: 'O Ceifador da Meia-Noite',
    spellName: 'Soul-Reaping Scythe',
    description: 'Gira uma foice espectral etérea de alcance formidável que atravessa paredes e colhe fragmentos de alma dos vivos e dos mortos.',
    manaCost: 40,
    effect: 'Corte espectral circular com dano necrótico puro que ignora armaduras físicas. Cada alma colhida abastece 8 pontos de mana imediatamente.',
    upgrades: [
      'Nível 2 — Dupla Ceifa: A foice gira uma segunda vez em direção contrária com o dobro de velocidade.',
      'Nível 3 — Banquete das Almas: Almas colhidas aumentam temporariamente o dano da arma principal em 18% por 6s.'
    ],
    unlockCondition: 'Ossuário Esquecido — Baú oculto atrás da parede fraturada na cripta central.',
    effectiveAgainstBosses: ['joan', 'succubus', 'isaac', 'saint-louis'],
    knownResistances: ['Death possui 75% de resistência inata a dano espectral de foice.', 'Gasto de mana inicial alto.'],
    compatibleRelics: ['sinister-rune', 'lichs-mark', 'mind-relic'],
    iconType: 'scythe'
  },
  {
    id: 'wheel-of-chaos',
    cardName: 'A Roda do Destino Desgovernado',
    spellName: 'Wheel of Chaos',
    description: 'Dispara uma roda flamejante e pontiaguda que ricocheteia velozmente nas paredes, teto e chão de corredores fechados.',
    manaCost: 38,
    effect: 'Projétil caótico que atinge até 8 vezes no ricochete em ambientes fechados, causando queimaduras e desequilíbrio contínuo.',
    upgrades: [
      'Nível 2 — Fagulhas Caóticas: Cada ricochete solta labaredas teleguiadas em direção ao oponente mais próximo.',
      'Nível 3 — Roda Dupla: Lança duas rodas sincronizadas que percorrem o perímetro da sala.'
    ],
    unlockCondition: 'Torre das Engrenagens do Castelo — Ative o mecanismo de escape antes do tempo limite.',
    effectiveAgainstBosses: ['medusa', 'talos', 'mammon'],
    knownResistances: ['Em arenas abertas sem paredes (como certas fases de Drácula no topo do castelo), a roda escapa da tela sem ricochetear.'],
    compatibleRelics: ['obsidian-fang', 'cursed-coin', 'abyssal-eye'],
    iconType: 'chaos'
  },
  {
    id: 'frozen-path',
    cardName: 'O Vale dos Gelos Perpétuos',
    spellName: 'Frozen Path',
    description: 'Gera uma trilha de gelo polar no solo que congela os pés dos inimigos e permite deslizar com velocidade máxima.',
    manaCost: 28,
    effect: 'Cria cristais de gelo que desaceleram inimigos em 50% e podem congelá-los em estado de estiramento por 2.5s. Aumenta a velocidade do jogador no solo gélido.',
    upgrades: [
      'Nível 2 — Geada Pontiaguda: Estalagmites de gelo brotam ao pisar na trilha causando perfuração elemental.',
      'Nível 3 — Nevasca Absoluta: Aumenta a duração do congelamento e fragiliza os chefes contra dano físico em 20%.'
    ],
    unlockCondition: 'Aqueduto Congelado — Encontrado congelado dentro da cachoeira cristalina.',
    effectiveAgainstBosses: ['arthur', 'mammon', 'brauner', 'talos'],
    knownResistances: ['Inimigos e chefes com afinidade criogênica não são desacelerados.', 'Chefes com asas contornam a trilha.'],
    compatibleRelics: ['gloomstone', 'twilight-gem', 'mind-relic'],
    iconType: 'ice'
  },
  {
    id: 'temporal-rush',
    cardName: 'A Ampulheta Quebrada',
    spellName: 'Temporal Rush',
    description: 'Distorce o fluxo temporal ao redor do caçador, desacelerando o tempo relativo para todos os oponentes na sala.',
    manaCost: 55,
    effect: 'Desacelera projéteis e animações inimigas em 60% por 4.5 segundos, permitindo esquivas perfeitas e reposicionamento estratégico.',
    upgrades: [
      'Nível 2 — Eco Temporal: Deixa um clone espectral que repete o último ataque de arma executado.',
      'Nível 3 — Ruptura da Cronologia: Estende a desaceleração para 6.5s e restaura 1 carga de esquiva imediata.'
    ],
    unlockCondition: 'Sala dos Pêndulos Cósmicos — Complete o quebra-cabeça dos relógios em menos de 45 segundos.',
    effectiveAgainstBosses: ['dracula', 'doppelganger', 'succubus', 'carmilla'],
    knownResistances: ['Consumo de mana muito alto (55). Chefes com fases de invulnerabilidade scripted continuam invulneráveis.'],
    compatibleRelics: ['mind-relic', 'twilight-gem', 'family-grace'],
    iconType: 'clock'
  },
  {
    id: 'life-drain',
    cardName: 'A Taça da Imortalidade',
    spellName: 'Life Drain',
    description: 'Canaliza feixes escuros que arrancam a essência vital dos alvos e transferem continuamente na forma de regeneração de vida para o conjurador.',
    manaCost: 40,
    effect: 'Feixe contínuo de drenagem canalizada que causa dano de trevas e converte 40% do dano infligido em pontos de vida reais.',
    upgrades: [
      'Nível 2 — Sifão Ampliado: Permite sugar até 2 alvos simultâneos.',
      'Nível 3 — Vínculo Sanguíneo: O feixe drena também mana se a barra de vida estiver 100% cheia.'
    ],
    unlockCondition: 'Mausoléu das Sombras — Recompensa após derrotar o Vampiro Antigo na câmara de sarcófagos.',
    effectiveAgainstBosses: ['brauner', 'succubus', 'joan', 'mammon'],
    knownResistances: ['Inimigos mortos-vivos esqueléticos e constructos não possuem sangue ou essência biológica, diminuindo a cura pela metade.'],
    compatibleRelics: ['witchs-knot', 'vile-trinket', 'lichs-mark'],
    patch114Note: '⚠️ NOTA OFICIAL PATCH 1.1.4: O alcance de canalização de Life Drain foi reajustado e balanceado na versão 1.1.4 (verificada em nov/2026), reduzindo o alcance de segurança extremo anterior para exigir posicionamento a média distância.',
    iconType: 'drain'
  },
  {
    id: 'stained-glass-shield',
    cardName: 'A Rosácea Sagrada',
    spellName: 'Stained Glass Shield',
    description: 'Conjura três fragmentos flutuantes de vitrais sacros que orbitam o guerreiro, absorvendo impactos e refletindo magias.',
    manaCost: 32,
    effect: 'Concede uma barreira protetora que anula os próximos 3 acertos recebidos. Quando quebrado, cada caco de vidro explode como estilhaço afiado causando dano divino.',
    upgrades: [
      'Nível 2 — Mosaico Refletivo: Reflete 50% dos projéteis mágicos de volta contra os atiradores.',
      'Nível 3 — Cúpula da Basílica: Adiciona um 4º fragmento e gera imunidade a veneno enquanto os vidros estiverem intactos.'
    ],
    unlockCondition: 'Altar da Catedral — Reconstrua o vitral quebrado com as 3 gemas coloridas.',
    effectiveAgainstBosses: ['medusa', 'death', 'carmilla', 'saint-louis'],
    knownResistances: ['Ataques de agarramento contínuo quebram todos os fragmentos de uma só vez.'],
    compatibleRelics: ['dark-sigil', 'mind-relic', 'witchs-knot'],
    iconType: 'shield'
  },
  {
    id: 'chains-of-justice',
    cardName: 'Os Grilhões da Inquisição',
    spellName: 'Chains of Justice',
    description: 'Projeta correntes de prata incandescentes que imobilizam os membros de oponentes e os puxam para perto com atordoamento imediato.',
    manaCost: 34,
    effect: 'Lança correntes que perfuram a armadura, prendem o alvo por 3 segundos e aumentam todo dano físico subsequente recebido pelo inimigo em 25%.',
    upgrades: [
      'Nível 2 — Grilhões Cruzados: As correntes prendem até dois chefes/tenentes simultaneamente.',
      'Nível 3 — Execução da Fogueira: Se o alvo continuar preso após 3 segundos, sofre uma detonação sagrada de 80 de dano puro.'
    ],
    unlockCondition: 'Câmara de Tortura Medieval — Quebre os grilhões do antigo inquisidor aprisionado.',
    effectiveAgainstBosses: ['joan', 'death', 'brauner', 'arthur', 'doppelganger'],
    knownResistances: ['Talos e Mammon possuem grande massa física e não podem ser puxados, apenas recebem a desestabilização e o debuff de dano.'],
    compatibleRelics: ['twilight-gem', 'sinister-rune', 'obsidian-fang'],
    iconType: 'chains'
  },
  {
    id: 'mirrorwalk',
    cardName: 'O Reflexo Sem Alma',
    spellName: 'Mirrorwalk',
    description: 'Projeta um espelho dimensional que permite ao usuário se dissolver no plano reflexivo e reaparecer instantaneamente atrás do perigo.',
    manaCost: 25,
    effect: 'Concede 1.5 segundo de invulnerabilidade total (i-frames perfeitos), teleportando o personagem na direção apontada e deixando uma imagem falsa que atrai a atenção dos inimigos.',
    upgrades: [
      'Nível 2 — Espelho Estilhaçado: A imagem deixada para trás explode em farpas quando atacada por inimigos.',
      'Nível 3 — Travessia Veloz: Reduz o consumo de mana para 18 e concede 2 segundos de velocidade de corrida triplicada.'
    ],
    unlockCondition: 'Salão dos Espelhos do Castelo — Encontre o espelho sem reflexo e atravesse-o à meia-noite no jogo.',
    effectiveAgainstBosses: ['dracula', 'death', 'carmilla', 'medusa', 'talos'],
    knownResistances: ['Não causa dano intrínseco inicial; pura habilidade de reposicionamento e sobrevivência tática.'],
    compatibleRelics: ['witchs-knot', 'dark-sigil', 'mind-relic', 'crypt-key'],
    iconType: 'mirror'
  },
  {
    id: 'cursed-flame',
    cardName: 'O Candeeiro do Condenado',
    spellName: 'Cursed Flame',
    description: 'Acende uma chama espectral arroxeada que consome a alma e a estamina dos inimigos pegos no círculo rúnico.',
    manaCost: 36,
    effect: 'Cria uma poça de fogo espectral no chão que queima por 7 segundos, infligindo dano de fogo das trevas cumulativo e impedindo chefes de utilizarem ataques com salto.',
    upgrades: [
      'Nível 2 — Fogo Fátuo: Projeta pequenos espectros flamejantes que perseguem alvos em fuga.',
      'Nível 3 — Fogueira das Bruxas: Cada inimigo que queima alimenta o poder de magia do conjurador em +10% de ATK mágico.'
    ],
    unlockCondition: 'Cemitério dos Renegados — Acenda as 4 tochas roxas no perímetro da tumba.',
    effectiveAgainstBosses: ['saint-louis', 'isaac', 'joan', 'mammon'],
    knownResistances: ['Entidades puramente de fogo possuem 80% de resistência. Pouco eficaz em terrenos com água corrente profunda.'],
    compatibleRelics: ['witchs-brew', 'sinister-rune', 'obsidian-fang'],
    iconType: 'cursed-fire'
  }
];
