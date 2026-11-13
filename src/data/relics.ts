import { Relic } from '../types';

export const RELICS_DATA: Relic[] = [
  {
    id: 'witchs-knot',
    name: "Witch's Knot (Nó da Bruxa)",
    description: 'Um amuleto trançado com cabelos de sacerdotisas pagãs, amarrado em um nó infinito que canaliza fluxo místico ininterrupto.',
    effect: 'Reduz o custo de mana de todos os Arcanos e habilidades de armas em 20%. Aumenta a velocidade de regeneração de mana passiva em +1.5 mana/segundo.',
    percentagesAndDuration: '-20% custo de mana, +1.5 mana/s passivo contínuo.',
    location: 'Cabana da Bruxa do Pântano Nebuloso — Concedido após desvendar o enigma das três poções.',
    rarityOrTier: 'S-Tier',
    synergies: {
      weapons: ['vampire-killer', 'alucards-sword-and-shield', 'chauve-souris', 'valmanway'],
      arcanas: ['purification', 'blood-thorns', 'mirrorwalk', 'life-drain', 'stained-glass-shield']
    },
    recommendedBuilds: ['build-01', 'build-04', 'build-05', 'build-06', 'build-08'],
    iconType: 'knot'
  },
  {
    id: 'twilight-gem',
    name: 'Twilight Gem (Gema do Crepúsculo)',
    description: 'Uma joia facetada que oscila entre a luz dourada do amanhecer e a profunda escuridão da meia-noite.',
    effect: 'Concede +15% de amplificação em todo dano físico e mágico logo após alternar entre ataque de arma e conjuração de Arcana, com duração de 4 segundos.',
    percentagesAndDuration: '+15% de amplificação mista durante 4 segundos após alternância.',
    location: 'Observatório Celestial do Castelo — No topo do telescópio prismático.',
    rarityOrTier: 'S-Tier',
    synergies: {
      weapons: ['excalibur', 'vampire-killer', 'war-and-famine', 'chauve-souris', 'bernhards-wrath'],
      arcanas: ['chains-of-justice', 'purification', 'sacred-cross', 'hellfire', 'talos-hammer']
    },
    recommendedBuilds: ['build-01', 'build-02', 'build-03', 'build-04', 'build-06', 'build-07'],
    iconType: 'gem'
  },
  {
    id: 'family-grace',
    name: "Family's Grace (Graça da Família)",
    description: 'Relíquia ancestral com o brasão imaculado do clã Belmont gravado em prata de lei. Ressoa com a linhagem dos heróis.',
    effect: 'Aumenta a resistência a dano fatal em 25% e concede uma recuperação instantânea de 35% de HP uma vez por exploração ao sofrer golpe letal.',
    percentagesAndDuration: '+25% de proteção contra bursts letais; revive com 35% de HP (1x por run).',
    location: 'Exclusivo: Bônus de reserva da Midnight Edition (Edição da Meia-Noite).',
    rarityOrTier: 'Exclusivo',
    isMidnightEditionBonus: true,
    synergies: {
      weapons: ['vampire-killer', 'alucards-sword-and-shield', 'excalibur'],
      arcanas: ['temporal-rush', 'purification', 'stained-glass-shield']
    },
    recommendedBuilds: ['build-01', 'build-05'],
    iconType: 'family'
  },
  {
    id: 'obsidian-fang',
    name: 'Obsidian Fang (Presa de Obsidiana)',
    description: 'Uma presa afiada esculpida em vidro vulcânico negro, encantada para despedaçar a couraça de monstros colossais.',
    effect: 'Concede +25% de penetração de armadura física e +30% de dano contra alvos com mais de 75% da vida máxima (fase inicial de chefes).',
    percentagesAndDuration: '+25% penetração de armadura; +30% de dano adicional inicial.',
    location: 'Câmara do Abismo Negro — Drop garantido do Dragão Esquelético.',
    rarityOrTier: 'S-Tier',
    synergies: {
      weapons: ['excalibur', 'war-and-famine', 'mournblade'],
      arcanas: ['chains-of-justice', 'excellence', 'hellfire', 'cursed-flame']
    },
    recommendedBuilds: ['build-02', 'build-03'],
    iconType: 'fang'
  },
  {
    id: 'sinister-rune',
    name: 'Sinister Rune (Runa Sinistra)',
    description: 'Uma placa de ardósia com inscrições arcanas que pulsam em tons vermelhos, amplificando o poder destrutivo de feitiços de dano direto.',
    effect: 'Aumenta em +22% o dano de acertos críticos de magias e estende a duração de efeitos de controle de grupo em +1.5 segundo.',
    percentagesAndDuration: '+22% de crítico mágico, +1.5s em atordoamentos e imobilizações.',
    location: 'Biblioteca Proibida — No cofre oculto atrás das estantes móveis.',
    rarityOrTier: 'A-Tier',
    synergies: {
      weapons: ['vampire-killer', 'excalibur', 'astral-blade'],
      arcanas: ['purification', 'chains-of-justice', 'soul-reaping-scythe', 'cursed-flame']
    },
    recommendedBuilds: ['build-01', 'build-02'],
    iconType: 'rune'
  },
  {
    id: 'vile-trinket',
    name: 'Vile Trinket (Penduricalho Torpe)',
    description: 'Um bibelô macabro feito de dentes polidos e arame farpado que recompensa a agressividade visceral sem tréguas.',
    effect: 'A cada 3 acertos desferidos em menos de 1.5s, ganha 1 acúmulo de Fúria (+4% de dano físico, acumulando até 6 vezes por 5 segundos).',
    percentagesAndDuration: '+4% dano por acúmulo (máx 24% de bônus), dura 5s.',
    location: 'Aposentos do Torturador — Escondido na gaveta secreta da mesa de ferro.',
    rarityOrTier: 'A-Tier',
    synergies: {
      weapons: ['war-and-famine', 'bernhards-wrath', 'valmanway', 'crimson-shears'],
      arcanas: ['blood-thorns', 'chains-of-justice', 'hellfire']
    },
    recommendedBuilds: ['build-03', 'build-04'],
    iconType: 'trinket'
  },
  {
    id: 'dark-sigil',
    name: 'Dark Sigil (Selo Sombrio)',
    description: 'Um selo de cera endurecida com o brasão do eclipse, fortificando a resistência física e mental do portador.',
    effect: 'Reduz todo dano recebido em 18% e converte 20% do impacto bloqueado em restauração da barra de postura defensiva.',
    percentagesAndDuration: '-18% dano geral absorvido, +20% recuperação de guarda.',
    location: 'Bastião das Sombras — Atrás da grade trancada pelo mecanismo do escudo.',
    rarityOrTier: 'A-Tier',
    synergies: {
      weapons: ['alucards-sword-and-shield', 'paladins-bulwark'],
      arcanas: ['mirrorwalk', 'stained-glass-shield', 'petrifying-gaze']
    },
    recommendedBuilds: ['build-05'],
    iconType: 'sigil'
  },
  {
    id: 'mind-relic',
    name: 'Mind Relic (Relíquia da Mente)',
    description: 'Um prisma de quartzo lapidado que vibra em sincronia com os pensamentos de combate, acelerando as sinapses do guerreiro.',
    effect: 'Reduz os tempos de recarga e animação de recuperação de todos os Arcanos em 25% e concede imunidade a confusão/desorientação.',
    percentagesAndDuration: '-25% tempo de recarga / recovery de magias.',
    location: 'Laboratório das Mentes Iluminadas — Resolva o enigma dos espelhos prismáticos.',
    rarityOrTier: 'A-Tier',
    synergies: {
      weapons: ['alucards-sword-and-shield', 'valmanway'],
      arcanas: ['mirrorwalk', 'temporal-rush', 'soul-reaping-scythe']
    },
    recommendedBuilds: ['build-05'],
    iconType: 'mind'
  },
  {
    id: 'ravens-feather',
    name: "Raven's Feather (Pena de Corvo)",
    description: 'Uma pluma azeviche consagrada aos mensageiros da noite, conferindo leveza sobrenatural e alcance ampliado.',
    effect: 'Aumenta o alcance e a velocidade de projéteis e armas perfurantes em 30%. Concede um salto no ar com esquiva estendida.',
    percentagesAndDuration: '+30% alcance e velocidade de projéteis/perfurações.',
    location: 'Torre Mais Alta do Campanário — Ninho dos Corvos Espectrais.',
    rarityOrTier: 'A-Tier',
    synergies: {
      weapons: ['chauve-souris', 'thunder-partizan'],
      arcanas: ['sacred-cross', 'wheel-of-chaos']
    },
    recommendedBuilds: ['build-06'],
    iconType: 'feather'
  },
  {
    id: 'abyssal-eye',
    name: 'Abyssal Eye (Olho Abissal)',
    description: 'Um olho petrificado que vê através das trevas e revela as fraquezas estruturais de massas de inimigos.',
    effect: 'Amplia a área de efeito (AoE) de ataques e magias de impacto em 35% e causa cegueira leve aos inimigos pegos no raio por 2 segundos.',
    percentagesAndDuration: '+35% raio de área de impacto (AoE), 2s de cegueira.',
    location: 'Poço Sem Fim — Derrote o Guardião Cego na descida abissal.',
    rarityOrTier: 'A-Tier',
    synergies: {
      weapons: ['excalibur', 'morning-star', 'zweihander-crimson'],
      arcanas: ['talos-hammer', 'wheel-of-chaos', 'petrifying-gaze']
    },
    recommendedBuilds: ['build-07'],
    iconType: 'eye'
  },
  {
    id: 'necro-charm',
    name: 'Necro Charm (Amuleto Necrótico)',
    description: 'Um talismã esculpido em osso de carrasco que detona os corpos de inimigos derrotados em uma onda destrutiva.',
    effect: 'Inimigos derrotados explodem causando 45 de dano de contusão em área a oponentes vizinhos, facilitando o extermínio de hordas.',
    percentagesAndDuration: '45 de dano fixo por cadáver detonado em raio de 4m.',
    location: 'Calaouço dos Enforcados — Baú no fundo da câmara de ossos.',
    rarityOrTier: 'B-Tier',
    synergies: {
      weapons: ['excalibur', 'morning-star', 'thunder-partizan'],
      arcanas: ['talos-hammer', 'blood-thorns']
    },
    recommendedBuilds: ['build-07'],
    iconType: 'charm'
  },
  {
    id: 'crypt-key',
    name: 'Crypt Key (Chave da Cripta)',
    description: 'Uma chave de ferro forjado que ressoa perto de portas secretas, paredes ilusórias e arcas trancadas de séculos passados.',
    effect: 'Revela passagens secretas no minimapa a até 15 metros e aumenta a taxa de drop de itens raros e ouro em 40%.',
    percentagesAndDuration: '+15m detecção de segredos, +40% de taxa de tesouros.',
    location: 'Mausoléu dos Fundadores — No pedestal sob o sarcófago de Leon Belmont.',
    rarityOrTier: 'Utilitário',
    synergies: {
      weapons: ['vampire-killer', 'valmanway'],
      arcanas: ['mirrorwalk']
    },
    recommendedBuilds: ['build-08'],
    iconType: 'key'
  },
  {
    id: 'gloomstone',
    name: 'Gloomstone (Pedra da Penumbra)',
    description: 'Um cristal escuro e fosco que absorve a luz ambiente, tornando o passo do guerreiro silencioso e imperceptível.',
    effect: 'Reduz a distância de alerta e detecção de monstros comuns em 50%. Aumenta o dano de ataques de emboscada pelas costas em 60%.',
    percentagesAndDuration: '-50% alcance de aggro inimigo, +60% dano em golpes pelas costas.',
    location: 'Caverna das Sombras Silenciosas — No coração da fenda rochosa.',
    rarityOrTier: 'Utilitário',
    synergies: {
      weapons: ['vampire-killer', 'valmanway', 'twin-daggers'],
      arcanas: ['mirrorwalk', 'frozen-path']
    },
    recommendedBuilds: ['build-08'],
    iconType: 'stone'
  },
  {
    id: 'cursed-coin',
    name: 'Cursed Coin (Moeda Amaldiçoada)',
    description: 'Uma moeda de ouro manchada por sangue de avarentos, trocando segurança por poder devastador e riqueza súbita.',
    effect: 'Aumenta o dano crítico geral em +35%, mas aumenta o dano recebido pelo jogador em 12%.',
    percentagesAndDuration: '+35% multiplicador crítico, +12% dano sofrido.',
    location: 'Câmara do Tesouro Perdido — Em cima da pilha de ouro guardada pelo Mímico.',
    rarityOrTier: 'A-Tier',
    synergies: {
      weapons: ['valmanway', 'war-and-famine', 'excalibur'],
      arcanas: ['wheel-of-chaos', 'excellence']
    },
    recommendedBuilds: ['build-02', 'build-03'],
    iconType: 'coin'
  },
  {
    id: 'forsaken-ring',
    name: 'Forsaken Ring (Anel do Renegado)',
    description: 'Um anel de ferro frio com inscrições dos cavaleiros banidos da irmandade.',
    effect: 'Quando a vida estiver abaixo de 30%, concede +40% de ataque e reduz o custo de estamina a zero por 10 segundos.',
    percentagesAndDuration: '+40% de ataque quando abaixo de 30% HP durante 10s.',
    location: 'Torre dos Desterrados — No altar fúnebre do topo.',
    rarityOrTier: 'B-Tier',
    synergies: {
      weapons: ['excalibur', 'bernhards-wrath'],
      arcanas: ['blood-thorns', 'life-drain']
    },
    recommendedBuilds: ['build-02', 'build-04'],
    iconType: 'ring'
  },
  {
    id: 'witchs-brew',
    name: "Witch's Brew (Elixir da Feiticeira)",
    description: 'Um frasco de vidro verde borbulhante com essência vegetal tóxica destilada.',
    effect: 'Adiciona dano de veneno persistente a todos os ataques físicos de armas brancas (5 de dano a cada 0.5s durante 4s).',
    percentagesAndDuration: '5 de dano a cada 0.5s por 4 segundos (máx 40 dano total).',
    location: 'Cabana da Bruxa do Pântano Nebuloso — Recompensa secundária.',
    rarityOrTier: 'B-Tier',
    synergies: {
      weapons: ['war-and-famine', 'valmanway'],
      arcanas: ['cursed-flame', 'blood-thorns']
    },
    recommendedBuilds: ['build-03'],
    iconType: 'brew'
  },
  {
    id: 'lichs-mark',
    name: "Lich's Mark (Marca do Lich)",
    description: 'Uma insígnia gravada no osso de um necromante antigo, convertendo ferimentos infligidos em barreira esotérica.',
    effect: 'Cada 100 de dano causado a chefes gera uma pequena barreira protetora que absorve 15 de dano, acumulando até 75 pontos de escudo.',
    percentagesAndDuration: 'Até 75 pontos de sobre-escudo acumulativo.',
    location: 'Cripta Esquecida do Arquilich — Derrote a aparição espectral.',
    rarityOrTier: 'A-Tier',
    synergies: {
      weapons: ['bernhards-wrath', 'alucards-sword-and-shield'],
      arcanas: ['life-drain', 'soul-reaping-scythe']
    },
    recommendedBuilds: ['build-04', 'build-05'],
    iconType: 'lich'
  }
];
