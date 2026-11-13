import { Boss } from '../types';

export const BOSSES_DATA: Boss[] = [
  {
    id: 'medusa',
    name: 'Medusa',
    subtitle: 'A Rainha Górgona das Profundezas',
    reportedHp: '1.850 HP',
    attacksAndMechanics: [
      'Olhar Petrificante: Cone frontal de luz esmeralda que petrifica o jogador se mantido de frente.',
      'Enxame de Cabeças Aladas: Convoca cabeças de serpente voadoras em trajetórias onduladas senoidais.',
      'Investida da Cauda de Serpente: Varredura rápida em 360° em nível de solo.',
      'Chuva de Dardos Venenosos: Disparo de escamas venenosas em leque ascendente.'
    ],
    resistances: ['100% de imunidade a petrificação', 'Resistência a dano de terra/veneno'],
    verifiedWeaknesses: ['Vulnerável a armas de perfuração longa (Lanças)', 'Fraqueza severa a dano Sagrado/Luz (Sacred Cross / Purification)'],
    immunities: {
      fire: false,
      bleed: false,
      crowdControl: true,
      notes: 'Totalmente imune a atordoamento por petrificação ou congelamento.'
    },
    recommendedWeaponId: 'chauve-souris',
    recommendedArcanaId: 'sacred-cross',
    recommendedRelicIds: ['ravens-feather', 'twilight-gem', 'witchs-knot'],
    combatStrategy: 'Mantenha distância usando o alcance linear da Lança Chauve-Souris para mantê-la fora da zona de varredura da cauda. Quando ela iniciar a animação do Olhar Petrificante, vire as costas imediatamente ou salte com Raven\'s Feather. Lance Sacred Cross de longe: as trajetórias da cruz cobrem as cabeças voadoras e causam dano duplo contínuo em seu torso.',
    beginnerAlternative: 'Se ainda não possuir Chauve-Souris, utilize o Chicote Vampire Killer com Sacred Cross e mantenha-se em saltos defensivos na borda da arena.',
    updatedNov2026Note: 'Priorizar a Lança (Chauve-Souris) e Holy Cross (Sacred Cross), conforme guia de chefes verificado em novembro de 2026.'
  },
  {
    id: 'death',
    name: 'Death (A Morte)',
    subtitle: 'O Primeiro Tenente do Abismo',
    reportedHp: '2.400 HP',
    attacksAndMechanics: [
      'Chuva de Foices Voadoras: Múltiplas mini-foices teleguiadas em órbitas imprevisíveis.',
      'Corte de Foice Titânica: Golpe amplo vertical com onda de choque necrótica no chão.',
      'Gaiola Espectral de Almas: Invoca pilares de almas para restringir o movimento do jogador.',
      'Teletransporte da Foice Giratória: Surge nas costas do caçador desferindo um golpe giratório letal.'
    ],
    resistances: ['75% de resistência a dano espectral e necrótico', 'Imunidade a sangramento (entidade sem carne)'],
    verifiedWeaknesses: ['Fraqueza crítica a Dano Sagrado e Luz Divina', 'Vulnerável a parry no primeiro frame do golpe vertical'],
    immunities: {
      fire: false,
      bleed: true,
      crowdControl: true,
      notes: 'Imune a sangramento, atordoamento e petrificação.'
    },
    recommendedWeaponId: 'vampire-killer',
    recommendedArcanaId: 'purification',
    recommendedRelicIds: ['witchs-knot', 'twilight-gem', 'sinister-rune'],
    combatStrategy: 'Purification é a chave deste combate: os três pilares sagrados não apenas causam dano devastador contra Death, mas destroem instantaneamente todas as mini-foices voadoras ao redor do caçador. Ataque com o chicote Vampire Killer aproveitando o alcance para desferir golpes em arco.',
    beginnerAlternative: 'Utilize Alucard\'s Sword and Shield para bloquear com segurança os giros repentinos da foice se tiver dificuldade nos desvios.'
  },
  {
    id: 'joan',
    name: 'Joan (A Donzela Espectral)',
    subtitle: 'Comandante da Legião Caída',
    reportedHp: '1.450 HP',
    attacksAndMechanics: [
      'Estocada Sagrada em Carga: Investida em linha reta com lança reluzente cruzando metade do salão.',
      'Bandeira da Convocação: Espeta o estandarte no solo chamando lanceiros fantasmas.',
      'Chuva de Flechas de Fogo: Sinaliza área circular onde choverão flechas em arco.',
      'Escudo Radiante: Absorve ataques frontais por 3 segundos antes de explodir em contra-ataque.'
    ],
    resistances: ['Resistência moderada a dano de luz'],
    verifiedWeaknesses: ['Vulnerável a dano de impacto e quebra de poise', 'Fraqueza a dano sombrio e garras'],
    immunities: {
      fire: false,
      bleed: false,
      crowdControl: false,
      notes: 'Suscetível a imobilização por correntes e atordoamento de impacto.'
    },
    recommendedWeaponId: 'excalibur',
    recommendedArcanaId: 'chains-of-justice',
    recommendedRelicIds: ['twilight-gem', 'sinister-rune', 'obsidian-fang'],
    combatStrategy: 'Quando Joan fincar a bandeira para invocar reforços, utilize Chains of Justice imediatamente para prendê-la e interromper a invocação. Aproveite os 3 segundos de vulnerabilidade para desferir o corte soberano da Excalibur com bônus da Presa de Obsidiana.',
    beginnerAlternative: 'Mantenha distância com a Lança Iron Pike ou Alabarda para atacar após a investida dela.'
  },
  {
    id: 'talos',
    name: 'Talos',
    subtitle: 'O Colosso Autômato de Bronze',
    reportedHp: '3.200 HP',
    attacksAndMechanics: [
      'Pisada Sísmica: Choque no chão que derruba o jogador se não estiver no ar.',
      'Golpe de Clava de Bronze: Pancada demolidora que destrói pilares da arena.',
      'Sopro de Forja Incandescente: Lança-chamas cônico de longa duração emitido pelo peitoral.',
      'Carga Imparável: Caminha atropelando tudo em sua frente até atingir a muralha.'
    ],
    resistances: ['Altíssima couraça física', 'Imune a fogo, veneno, sangramento e controle de mente'],
    verifiedWeaknesses: ['Vulnerável a penetração de armadura pesada e dano elétrico', 'Ponto fraco no tornozelo e no núcleo do peito'],
    immunities: {
      fire: true,
      bleed: true,
      crowdControl: true,
      notes: 'Totalmente imune a fogo, sangramento, veneno e puxões de corrente.'
    },
    recommendedWeaponId: 'excalibur',
    recommendedArcanaId: 'chains-of-justice',
    recommendedRelicIds: ['twilight-gem', 'obsidian-fang', 'abyssal-eye'],
    combatStrategy: 'Não utilize magias de fogo ou veneno (ele é de metal fundido). Salte sempre que ele erguer a perna para escapar da onda sísmica. As Chains of Justice não puxam Talos devido à sua massa, mas aplicam o debuff de +25% de dano sofrido; foque os golpes de Excalibur no calcanhar blindado até ele ajoelhar.',
    beginnerAlternative: 'Fique na extremidade da arena com Chauve-Souris ou flechas e ataque com cautela.'
  },
  {
    id: 'carmilla',
    name: 'Carmilla',
    subtitle: 'A Matriarca dos Cárpatos',
    reportedHp: '2.100 HP',
    attacksAndMechanics: [
      'Máscara de Sangue Flutuante: Projeta uma máscara gigante que chora lágrimas de sangue tóxico.',
      'Dança da Rapina Escarlate: Vôo rasante veloz com unhas lâminas dilacerando o solo.',
      'Redoma de Sangue Fervente: Barreira de sangue que repele ataques corpo a corpo.',
      'Drenagem Vampírica Aérea: Mergulho teleguiado tentando agarrar o caçador.'
    ],
    resistances: ['Absorve dano de sangramento', 'Alta mobilidade e esquiva aérea'],
    verifiedWeaknesses: ['Vulnerável a dano Sagrado/Luz pura', 'Interrupção durante a invocação da máscara'],
    immunities: {
      fire: false,
      bleed: true,
      crowdControl: false,
      notes: 'Imune a dano de sangramento; suscetível a lentidão e vinhas terrestres ao pousar.'
    },
    recommendedWeaponId: 'vampire-killer',
    recommendedArcanaId: 'purification',
    recommendedRelicIds: ['witchs-knot', 'twilight-gem', 'sinister-rune'],
    combatStrategy: 'Purification é mortal contra Carmilla: ativação dos pilares de luz sagrada quebra a máscara flutuante instantaneamente e impede que ela execute o rasante de drenagem. Mantenha o Vampire Killer estalando no momento em que ela toca o chão.',
    beginnerAlternative: 'Guarda defensiva com Alucard\'s Sword and Shield ao ver a máscara descendo.'
  },
  {
    id: 'brauner',
    name: 'Brauner',
    subtitle: 'O Pintor das Telas Amaldiçoadas',
    reportedHp: '1.950 HP',
    attacksAndMechanics: [
      'Pincelada de Sangue Tóxico: Pinta formas geométricas que ganham vida e atacam em linhas retas.',
      'Pinturas Dimensionais: Abre quadros no ar que disparam mãos espectrais e corvos.',
      'Vôo das Asas de Tinta: Transforma-se em borrão de tinta preta invulnerável por 2s.',
      'Grito da Tela Rompida: Onda sonora de choque que empurra o jogador para as armadilhas.'
    ],
    resistances: ['Resistência a dano cortante comum'],
    verifiedWeaknesses: ['Vulnerável a Fogo (queima suas pinturas)', 'Fraqueza a dano sagrado concentrado'],
    immunities: {
      fire: false,
      bleed: false,
      crowdControl: false,
      notes: 'Não possui imunidades elementais severas, exceto durante a forma de tinta líquida.'
    },
    recommendedWeaponId: 'war-and-famine',
    recommendedArcanaId: 'hellfire',
    recommendedRelicIds: ['obsidian-fang', 'twilight-gem', 'vile-trinket'],
    combatStrategy: 'Use Hellfire para incendiar as telas assim que ele iniciar a pintura das invocações. Quando ele se rematerializar da forma de tinta, feche a distância com War and Famine e acione as correntes ou combo de cortes rápidos.',
    beginnerAlternative: 'Utilize Chauve-Souris para quebrar as pinturas de longe sem se expor à tinta tóxica.'
  },
  {
    id: 'mammon',
    name: 'Mammon',
    subtitle: 'O Demônio da Ganância e das Moedas Derretidas',
    reportedHp: '2.800 HP',
    attacksAndMechanics: [
      'Chuva de Ouro Derretido: Gotas de metal em brasa caindo continuamente do teto.',
      'Balanço do Cofre de Ferro: Arremessa um cofre maciço preso em grossas correntes.',
      'Vórtice da Cobiça: Puxa o jogador para seu centro enquanto moedas cortantes circulam.',
      'Explosão de Moedas em Estilhaços: Quando sofre 25% de dano, cospe moedas em 360°.'
    ],
    resistances: ['Resistência a fogo e impacto comum'],
    verifiedWeaknesses: ['Fraqueza a perfurações de precisão e dano divino sagrado', 'Núcleo vulnerável na barriga aberta'],
    immunities: {
      fire: true,
      bleed: false,
      crowdControl: true,
      notes: 'Imune a queimadura e imobilizações forçadas devido à sua massa grotesca.'
    },
    recommendedWeaponId: 'excalibur',
    recommendedArcanaId: 'talos-hammer',
    recommendedRelicIds: ['twilight-gem', 'abyssal-eye', 'obsidian-fang'],
    combatStrategy: 'Evite o solo durante a chuva de ouro derretido saltando entre as plataformas laterais. Quando ele preparar o balanço do cofre, execute o Talos Hammer para quebrar o poise dele, seguido de golpes descendentes de Excalibur.',
    beginnerAlternative: 'Foque em armas de alcance como Chicotes e mantenha-se em constante corrida lateral.'
  },
  {
    id: 'saint-louis',
    name: 'Saint Louis',
    subtitle: 'O Cardeal Renegado',
    reportedHp: '2.050 HP',
    attacksAndMechanics: [
      'Glaive Sagrada Giratória: Lança sua glaive reluzente como um bumerangue cortante.',
      'Círculo de Julgamento Celestial: Marcações douradas no chão explodem em colunas sacras.',
      'Barreira de Fé Inabalável: Redoma dourada que reflete 30% de todo dano de luz.',
      'Teletransporte em Luz Ofuscante: Desaparece cegando temporariamente o caçador.'
    ],
    resistances: ['80% de resistência a dano Sagrado / Luz', 'Imune a cegueira e feitiços de oração'],
    verifiedWeaknesses: ['Extremamente vulnerável a Magia Negra, Sangue e Chamas Malditas (Cursed Flame / Blood Thorns)', 'Vulnerável a dano físico contundente'],
    immunities: {
      fire: false,
      bleed: false,
      crowdControl: false,
      notes: 'Não use magias sagradas (Purification ou Sacred Cross) contra Saint Louis — ele absorve a maior parte.'
    },
    recommendedWeaponId: 'excalibur',
    recommendedArcanaId: 'cursed-flame',
    recommendedRelicIds: ['witchs-knot', 'obsidian-fang', 'sinister-rune'],
    combatStrategy: 'NUNCA use Purification ou Sacred Cross aqui. Saint Louis possui altíssima resistência sagrada. Use a Cursed Flame para corromper o solo sob seus pés e descarregue cortes de Excalibur ou adagas sombrias enquanto ele conjura suas ladainhas.',
    beginnerAlternative: 'Soqueiras com dano físico puro (Iron Knuckles ou Bernhard\'s Wrath) focando em golpes rápidos nas costas.'
  },
  {
    id: 'isaac',
    name: 'Isaac',
    subtitle: 'O Mestre Forjador de Diabretes',
    reportedHp: '1.700 HP',
    attacksAndMechanics: [
      'Lança do Mestre Forjador: Estocadas velozes combinadas com saltos acrobáticos.',
      'Convocação de Innocent Devils: Invoca diabretes alados e corvos carniceiros de apoio.',
      'Besta Rápida Escondida: Disparo surpresa de três virotes venenosos pelo pulso.',
      'Círculo de Forja Negra: Chão incandesce gerando criaturas explosivas.'
    ],
    resistances: ['Resistência moderada a feitiços de fogo'],
    verifiedWeaknesses: ['Vulnerável a atordoamento em cadeia e combos rápidos de curta distância', 'Fraqueza a dano sagrado e gelo'],
    immunities: {
      fire: false,
      bleed: false,
      crowdControl: false,
      notes: 'Altamente suscetível a correntes, congelamento de solo e interrupção de golpes.'
    },
    recommendedWeaponId: 'war-and-famine',
    recommendedArcanaId: 'chains-of-justice',
    recommendedRelicIds: ['twilight-gem', 'vile-trinket', 'obsidian-fang'],
    combatStrategy: 'Isaac tem pouca poise. Ao colar nele com War and Famine e prendê-lo com Chains of Justice, ele não consegue iniciar as invocações de Innocent Devils. Mantenha a pressão ininterrupta.',
    beginnerAlternative: 'Use Vampire Killer para atingir tanto Isaac quanto os diabretes voadores com varredura em arco.'
  },
  {
    id: 'succubus',
    name: 'Succubus',
    subtitle: 'A Ilusionista dos Pesadelos',
    reportedHp: '1.600 HP',
    attacksAndMechanics: [
      'Clones Ilusórios: Divide-se em 3 cópias idênticas que atacam simultaneamente.',
      'Beijo Letal da Drenagem: Teletransporte imediato tentando beijar e drenar metade da vida do herói.',
      'Pétalas Venenosas Hipnóticas: Dispersa pétalas que causam lentidão e inversão de controles.',
      'Garras Aladas: Golpes em mergulho com as asas pontiagudas.'
    ],
    resistances: ['Resistência a dano mental e ilusões'],
    verifiedWeaknesses: ['O clone verdadeiro projeta sombra no chão e sofre dano ampliado de Luz/Sagrado', 'Vulnerável a Sacred Cross em área'],
    immunities: {
      fire: false,
      bleed: false,
      crowdControl: false,
      notes: 'Interrompível durante a aproximação do beijo se atingida por projétil rápido.'
    },
    recommendedWeaponId: 'chauve-souris',
    recommendedArcanaId: 'sacred-cross',
    recommendedRelicIds: ['ravens-feather', 'twilight-gem', 'witchs-knot'],
    combatStrategy: 'Descubra a Succubus verdadeira observando a sombra no solo. Dispare Sacred Cross no centro da sala para dissolver os clones instantaneamente e punir o vôo dela com o alcance longo da Chauve-Souris.',
    beginnerAlternative: 'Ative Stained Glass Shield para neutralizar o ataque surpresa do beijo caso seja pego de surpresa.'
  },
  {
    id: 'arthur',
    name: 'Sir Arthur (O Cavaleiro Espectral)',
    subtitle: 'O Guardião das Armaduras Condenadas',
    reportedHp: '2.200 HP',
    attacksAndMechanics: [
      'Espadão Flamejante: Cortes amplos que deixam trilhas de chamas no piso.',
      'Impacto do Escudo Pesado: Investida de ombro que quebra a guarda do herói.',
      'Chuva de Lanças de Prata: Conjura lanças do teto que caem em linha reta sequencial.',
      'Fúria dos Três Golpes: Combo brutal de três golpes que termina com um golpe telúrico.'
    ],
    resistances: ['Extrema resistência física frontal com escudo armado'],
    verifiedWeaknesses: ['Ataques pelas costas enquanto executa o combo lento', 'Vulnerável a Petrifying Gaze e Frozen Path'],
    immunities: {
      fire: true,
      bleed: false,
      crowdControl: false,
      notes: 'Imune a queimadura por chamas. Congelamento reduz severamente sua mobilidade.'
    },
    recommendedWeaponId: 'excalibur',
    recommendedArcanaId: 'frozen-path',
    recommendedRelicIds: ['twilight-gem', 'obsidian-fang', 'dark-sigil'],
    combatStrategy: 'Sir Arthur é muito pesado e telegrafado. Congele o solo com Frozen Path para fazer com que as investidas dele percam tração. Esgueire-se pelas costas durante a animação do espadão e execute cortes carregados com Excalibur.',
    beginnerAlternative: 'Utilize Alucard\'s Sword and Shield para aparar (parry) o primeiro golpe da sequência de três cortes.'
  },
  {
    id: 'doppelganger',
    name: 'Doppelganger',
    subtitle: 'A Sombra do Próprio Caçador',
    reportedHp: '1.900 HP',
    attacksAndMechanics: [
      'Mimetismo Perfeito: Copia a mesma arma e magias que o jogador estiver utilizando.',
      'Rolamento Evasivo com i-frames: Desvia de ataques carregados com reflexos idênticos aos do jogador.',
      'Contra-ataque Fatal: Se atingido durante a postura de guarda, revida com golpe crítico.',
      'Consumo de Frascos Escuros: Tenta se curar quando atinge 40% da vida.'
    ],
    resistances: ['Resistência dinâmica de acordo com os equipamentos mimetizados'],
    verifiedWeaknesses: ['Vulnerável a ataques inesperados fora do ângulo habitual', 'Suscetível a imobilização com Chains of Justice antes de iniciar a cura'],
    immunities: {
      fire: false,
      bleed: false,
      crowdControl: false,
      notes: 'Pode sofrer todos os debuffs do jogo, porém possui capacidade de esquiva perfeita.'
    },
    recommendedWeaponId: 'war-and-famine',
    recommendedArcanaId: 'chains-of-justice',
    recommendedRelicIds: ['twilight-gem', 'vile-trinket', 'obsidian-fang'],
    combatStrategy: 'Não tente disputar golpes carregados lentos, pois o Doppelganger sempre esquivará. Use Chains of Justice no momento em que ele recuar para beber o frasco de cura, travando-o no lugar. Desfira uma enxurrada contínua com War and Famine antes que ele escape.',
    beginnerAlternative: 'Equipe Mirrorwalk para sair do alcance dele e punir suas investidas pelas costas.'
  },
  {
    id: 'dracula',
    name: 'Conde Dracula',
    subtitle: 'O Senhor das Trevas e Rei dos Vampiros',
    reportedHp: '4.500 HP (Fase 1: 2.000 HP / Fase 2 Bestial: 2.500 HP)',
    attacksAndMechanics: [
      'Fase 1 — Três Esferas de Fogo Negro: Teletransporta, abre o manto e lança projéteis ígneos ao nível dos olhos.',
      'Fase 1 — Colunas de Magma Cósmico: Erompem do solo em pontos onde o jogador pisa.',
      'Fase 2 — Metamorfose da Besta Demoníaca: Transforma-se em gárgula colossal alada que ocupa metade da tela.',
      'Fase 2 — Raio da Desolação: Feixe contínuo de energia escura que varre o teto e chão.',
      'Fase 2 — Chuva de Meteoros de Sangue: Rochas incandescentes caindo em padrão denso.'
    ],
    resistances: ['50% de resistência a todas as magias elementais profanas', 'Imune a petrificação e atordoamento em fase bestial'],
    verifiedWeaknesses: ['Fraqueza terminal ao chicote sagrado Vampire Killer', 'Dano crítico de Purification atingindo o coração em ambas as fases'],
    immunities: {
      fire: true,
      bleed: true,
      crowdControl: true,
      notes: 'Imune a fogo, sangramento e atordoamento total. Aceita apenas debuffs de quebra de dano sagrado.'
    },
    recommendedWeaponId: 'vampire-killer',
    recommendedArcanaId: 'purification',
    recommendedRelicIds: ['witchs-knot', 'twilight-gem', 'family-grace'],
    combatStrategy: 'O confronto definitivo. Na Fase 1, pule sobre as esferas de fogo e acerte o chicote diretamente na cabeça do Conde. Na Fase 2, use Mirrorwalk ou saltos precisos para contornar o Raio da Desolação. Acione Purification exatamente debaixo do torso da Besta para que os três feixes atinjam o núcleo simultaneamente, gerando acertos críticos sagrados maciços.',
    beginnerAlternative: 'Tenha a relíquia Family\'s Grace (Midnight Edition) equipada como seguro de vida contra o Raio da Desolação.'
  }
];
