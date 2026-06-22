import type { Mount, MountCategory } from '../types';

const W = import.meta.env.DEV ? '/wiki-images' : 'https://www.tibiawiki.com.br/images';

const mountImage = (path: string) => `${W}/${path}`;

export const sampleMounts: Mount[] = [
  // === TAMEABLE ===
  { id: 'alpha-demonosaur', name: 'Alpha Demonosaur', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('d/da/Alpha_Demonosaur.gif'), items: [{ name: 'Demon in a Golden Box', amount: 1 }], requirements: [] },
  { id: 'battlefrazzle', name: 'Battlefrazzle', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('8/88/Battlefrazzle.gif'), items: [{ name: 'Marinated Sturgeon', amount: 1 }], requirements: [] },
  { id: 'black-sheep', name: 'Black Sheep', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('1/14/Black_Sheep_%28Mount%29.gif'), items: [{ name: 'Reins', amount: 1 }], requirements: [] },
  { id: 'crystal-wolf', name: 'Crystal Wolf', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('f/f2/Crystal_Wolf_%28Mount%29.gif'), items: [{ name: 'Diapason', amount: 1 }], requirements: [] },
  { id: 'donkey', name: 'Donkey', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('2/24/Donkey.gif'), items: [{ name: 'Bag of Apple Slices', amount: 1 }], requirements: [] },
  { id: 'dragonling', name: 'Dragonling', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('5/51/Dragonling_%28Mount%29.gif'), items: [{ name: 'Decorative Ribbon', amount: 1 }], requirements: ['Alternativa: Music Box'] },
  { id: 'draptor', name: 'Draptor', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('b/b5/Draptor_%28Mount%29.gif'), items: [{ name: 'Harness', amount: 1 }], requirements: ['Alternativa: Music Box'] },
  { id: 'dromedary', name: 'Dromedary', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('f/f4/Dromedary_%28Mount%29.gif'), items: [{ name: 'Fist on a Stick', amount: 1 }], requirements: [] },
  { id: 'fleeting-knowledge', name: 'Fleeting Knowledge', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('d/d8/Fleeting_Knowledge.gif'), items: [{ name: 'Library Ticket', amount: 1 }], requirements: [] },
  { id: 'foxmouse', name: 'Foxmouse', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('4/49/Foxmouse_%28Mount%29.gif'), items: [{ name: 'Toy Ball', amount: 1 }], requirements: ['Remover maldição Were primeiro'] },
  { id: 'giant-beaver', name: 'Giant Beaver', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('9/94/Giant_Beaver_%28Mount%29.gif'), items: [{ name: 'Colourful Water Lily', amount: 1 }], requirements: [] },
  { id: 'gloom-maw', name: 'Gloom Maw', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('3/34/Gloom_Maw_%28Mount%29.gif'), items: [], requirements: ['Bloody Tusks Quest'] },
  { id: 'gloothomotive', name: 'Gloothomotive', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('f/f7/Gloothomotive.gif'), items: [{ name: 'Wind-Up Key', amount: 1 }], requirements: [] },
  { id: 'gnarlhound', name: 'Gnarlhound', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('c/cd/Gnarlhound_%28Mount%29.gif'), items: [{ name: 'Golem Wrench', amount: 1 }], requirements: [] },
  { id: 'gryphon', name: 'Gryphon', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('d/db/Gryphon_%28Mount%29.gif'), items: [{ name: 'The Regalia of Suon', amount: 1 }], requirements: ['Gryphon Mask equipada'] },
  { id: 'haze', name: 'Haze', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('d/d8/Haze.gif'), items: [{ name: 'Spectral Scrap of Cloth', amount: 1 }], requirements: [] },
  { id: 'hell-demonosaur', name: 'Hell Demonosaur', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('3/34/Hell_Demonosaur.gif'), items: [{ name: 'Demon in a Red Box', amount: 1 }], requirements: [] },
  { id: 'hibernal-moth', name: 'Hibernal Moth', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('c/ca/Hibernal_Moth_%28Mount%29.gif'), items: [{ name: 'Purple Tendril Lantern', amount: 1 }], requirements: [] },
  { id: 'ironblight', name: 'Ironblight', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('1/12/Ironblight_%28Mount%29.gif'), items: [{ name: 'Iron Loadstone', amount: 1 }], requirements: ['Alternativa: Music Box'] },
  { id: 'kingly-deer', name: 'Kingly Deer', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('0/07/Kingly_Deer.gif'), items: [{ name: 'Golden Fir Cone', amount: 1 }], requirements: ['Alternativa: Music Box'] },
  { id: 'lacewing-moth', name: 'Lacewing Moth', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('9/92/Lacewing_Moth_%28Mount%29.gif'), items: [{ name: 'Turquoise Tendril Lantern', amount: 1 }], requirements: [] },
  { id: 'ladybug', name: 'Ladybug', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('a/a8/Ladybug_%28Mount%29.gif'), items: [{ name: 'Four-Leaf Clover', amount: 1 }], requirements: [] },
  { id: 'magma-crawler', name: 'Magma Crawler', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('2/26/Magma_Crawler_%28Mount%29.gif'), items: [{ name: 'Glow Wine', amount: 1 }], requirements: ['Alternativa: Music Box'] },
  { id: 'manta-ray', name: 'Manta Ray', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('2/22/Manta_Ray_%28Mount%29.gif'), items: [{ name: 'Foxtail', amount: 1 }], requirements: [] },
  { id: 'midnight-panther', name: 'Midnight Panther', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('1/1f/Midnight_Panther_%28Mount%29.gif'), items: [{ name: 'Leather Whip', amount: 1 }], requirements: ['Alternativa: Music Box'] },
  { id: 'mole', name: 'Mole', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('0/09/Mole_%28Mount%29.gif'), items: [{ name: 'Candle Stump', amount: 1 }], requirements: [] },
  { id: 'mutated-abomination', name: 'Mutated Abomination', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('f/f5/Mutated_Abomination_%28Mount%29.gif'), items: [], requirements: ['Derrotar The Monster boss', 'Usar alavanca no laboratório do Doutor Marrow'] },
  { id: 'neon-sparkid', name: 'Neon Sparkid', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('3/30/Neon_Sparkid.gif'), items: [{ name: 'Crackling Egg', amount: 1 }], requirements: [] },
  { id: 'noble-lion', name: 'Noble Lion', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('5/54/Noble_Lion_%28Mount%29.gif'), items: [{ name: "The Lion's Heart", amount: 1 }], requirements: [] },
  { id: 'pegasus', name: 'Pegasus', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('9/92/Pegasus.gif'), items: [{ name: 'Pegasus Feather', amount: 1 }], requirements: [] },
  { id: 'phantasmal-jade', name: 'Phantasmal Jade', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('7/7f/Phantasmal_Jade.gif'), items: [{ name: 'Spectral Horseshoe', amount: 4 }, { name: 'Spectral Horse Tack', amount: 1 }, { name: 'Spectral Saddle', amount: 1 }], requirements: ['Soul War Quest'] },
  { id: 'primal-demonosaur', name: 'Primal Demonosaur', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('8/8c/Primal_Demonosaur.gif'), items: [{ name: 'Demon In A Green Box', amount: 1 }], requirements: [] },
  { id: 'racing-bird', name: 'Racing Bird', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('d/d1/Racing_Bird.gif'), items: [{ name: 'Carrot on a Stick', amount: 1 }], requirements: [] },
  { id: 'rapid-boar', name: 'Rapid Boar', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('9/9e/Rapid_Boar.gif'), items: [{ name: 'Hunting Horn', amount: 1 }], requirements: [] },
  { id: 'reliable-ram', name: 'Reliable Ram', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('9/90/Reliable_Ram.gif'), items: [{ name: 'Bunch of Turnips', amount: 1 }], requirements: [] },
  { id: 'ripptor', name: 'Ripptor', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('5/5f/Ripptor.gif'), items: [], requirements: ['Primal Ordeal Quest - Hazard System nível 6', 'Falar com NPC Gnomadness'] },
  { id: 'scorpion-king', name: 'Scorpion King', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('4/45/Scorpion_King.gif'), items: [{ name: 'Scorpion Sceptre', amount: 1 }], requirements: [] },
  { id: 'shellodon', name: 'Shellodon', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('1/1e/Shellodon.gif'), items: [{ name: 'Eldritch Crystal', amount: 1 }], requirements: ['Matar The Brainstealer'] },
  { id: 'shock-head', name: 'Shock Head', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('b/b4/Shock_Head_%28Mount%29.gif'), items: [{ name: 'Nightmare Horn', amount: 1 }], requirements: [] },
  { id: 'singeing-steed', name: 'Singeing Steed', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('5/5f/Singeing_Steed.gif'), items: [{ name: 'Fiery Horseshoe', amount: 4 }], requirements: ['The Abomination World Raid'] },
  { id: 'sparkion', name: 'Sparkion', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('f/f1/Sparkion_%28Mount%29.gif'), items: [{ name: 'Vibrant Egg', amount: 1 }], requirements: [] },
  { id: 'spirit-of-purity', name: 'Spirit of Purity', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('a/af/Spirit_of_Purity.gif'), items: [{ name: 'Spiritual Horseshoe', amount: 4 }], requirements: ['Rotten Blood Quest'] },
  { id: 'stone-rhino', name: 'Stone Rhino', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('c/c7/Stone_Rhino_%28Mount%29.gif'), items: [{ name: 'Astral Shaper Rune', amount: 1 }], requirements: [] },
  { id: 'tamed-panda', name: 'Tamed Panda', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('6/62/Tamed_Panda.gif'), items: [{ name: 'Bamboo Leaves', amount: 1 }], requirements: ['Alternativa: Music Box'] },
  { id: 'the-hellgrip', name: 'The Hellgrip', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('5/58/The_Hellgrip.gif'), items: [{ name: 'Nail Case', amount: 5 }], requirements: ['The Gravedigger of Drefia Quest'] },
  { id: 'tiger-slug', name: 'Tiger Slug', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('c/cc/Tiger_Slug.gif'), items: [{ name: 'Slug Drug', amount: 1 }], requirements: [] },
  { id: 'tin-lizzard', name: 'Tin Lizzard', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('c/c2/Tin_Lizzard.gif'), items: [{ name: 'Tin Key', amount: 1 }], requirements: [] },
  { id: 'titanica', name: 'Titanica', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('3/32/Titanica.gif'), items: [{ name: 'Giant Shrimp', amount: 1 }], requirements: [] },
  { id: 'undead-cavebear', name: 'Undead Cavebear', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('8/86/Undead_Cavebear_%28Mount%29.gif'), items: [{ name: 'Maxilla Maximus', amount: 1 }], requirements: [] },
  { id: 'uniwheel', name: 'Uniwheel', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('e/e5/Uniwheel.gif'), items: [{ name: 'Golden Can of Oil', amount: 1 }], requirements: [] },
  { id: 'ursagrodon', name: 'Ursagrodon', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('b/bc/Ursagrodon.gif'), items: [{ name: 'Melting Horn', amount: 1 }], requirements: [] },
  { id: 'vortexion', name: 'Vortexion', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('4/4d/Vortexion.gif'), items: [{ name: 'Menacing Egg', amount: 1 }], requirements: [] },
  { id: 'walker', name: 'Walker', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('7/7d/Walker_%28Mount%29.gif'), items: [{ name: 'Control Unit', amount: 1 }], requirements: [] },
  { id: 'war-bear', name: 'War Bear', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('e/e5/War_Bear.gif'), items: [{ name: 'Slingshot', amount: 1 }], requirements: [] },
  { id: 'war-horse', name: 'War Horse', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('e/e7/War_Horse.gif'), items: [{ name: 'Sugar Oat', amount: 1 }], requirements: ['Alternativa: Music Box'] },
  { id: 'water-buffalo', name: 'Water Buffalo', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('d/d6/Water_Buffalo_%28Mount%29.gif'), items: [{ name: 'Leech', amount: 1 }], requirements: [] },
  { id: 'white-lion', name: 'White Lion', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('3/34/White_Lion_%28Mount%29.gif'), items: [{ name: 'Red Silk Flower', amount: 1 }], requirements: [] },
  { id: 'widow-queen', name: 'Widow Queen', category: 'tameable', premium: true, tamed: false, imageUrl: mountImage('3/36/Widow_Queen.gif'), items: [{ name: 'Sweet Smelling Bait', amount: 1 }], requirements: ['Alternativa: Music Box'] },

  // === ARENA ===
  { id: 'phant', name: 'Phant', category: 'arena', premium: true, tamed: false, imageUrl: mountImage('4/47/Phant_%28Mount%29.gif'), items: [], requirements: ['8000 Drome Points na Tibiadrome'] },

  // === CUSTOMIZABLE ===
  { id: 'krakoloss', name: 'Krakoloss', category: 'customizable', premium: true, tamed: false, imageUrl: mountImage('b/b7/Krakoloss.gif'), items: [], requirements: ["Matar boss Tentugly's Head"] },
  { id: 'gorgon-hydra', name: 'Gorgon Hydra', category: 'customizable', premium: false, tamed: false, imageUrl: mountImage('b/b4/Gorgon_Hydra.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'guardian-lion', name: 'Guardian Lion', category: 'customizable', premium: false, tamed: false, imageUrl: mountImage('e/e5/Guardian_Lion.gif'), items: [], requirements: ['Comprar na Store'] },

  // === RENTED ===
  { id: 'rented-horse-marrom-escuro', name: 'Rented Horse (Marrom Escuro)', category: 'rented', premium: false, tamed: false, imageUrl: mountImage('b/b7/Rented_Horse_%28Marrom_Escuro%29.gif'), items: [], requirements: ['Alugar por 500gp em Thais/Venore'] },

  // === EVENTS ===
  { id: 'blazebringer', name: 'Blazebringer', category: 'event', premium: true, tamed: false, imageUrl: mountImage('e/ea/Blazebringer.gif'), items: [], requirements: ['Evento The Lightbearer - Deed of Ownership'] },
  { id: 'blue-rolling-barrel', name: 'Blue Rolling Barrel', category: 'event', premium: true, tamed: false, imageUrl: mountImage('2/27/Blue_Rolling_Barrel.gif'), items: [{ name: 'Decorative Blue Sheet', amount: 1 }], requirements: ['Evento Orcsoberfest'] },
  { id: 'green-rolling-barrel', name: 'Green Rolling Barrel', category: 'event', premium: true, tamed: false, imageUrl: mountImage('8/8a/Green_Rolling_Barrel.gif'), items: [{ name: 'Decorative Green Sheet', amount: 1 }], requirements: ['Evento Orcsoberfest'] },
  { id: 'red-rolling-barrel', name: 'Red Rolling Barrel', category: 'event', premium: true, tamed: false, imageUrl: mountImage('e/ed/Red_Rolling_Barrel.gif'), items: [{ name: 'Decorative Red Sheet', amount: 1 }], requirements: ['Evento Orcsoberfest'] },
  { id: 'cold-percht-sleigh', name: 'Cold Percht Sleigh', category: 'event', premium: true, tamed: false, imageUrl: mountImage('3/30/Cold_Percht_Sleigh.gif'), items: [{ name: 'Percht Skull', amount: 1 }], requirements: ['Evento Winterlight Solstice', 'Derrotar The Percht Queen'] },
  { id: 'bright-percht-sleigh', name: 'Bright Percht Sleigh', category: 'event', premium: true, tamed: false, imageUrl: mountImage('8/89/Bright_Percht_Sleigh.gif'), items: [{ name: 'Percht Skull', amount: 1 }], requirements: ['Evento Winterlight Solstice', 'Derrotar The Percht Queen'] },
  { id: 'dark-percht-sleigh', name: 'Dark Percht Sleigh', category: 'event', premium: true, tamed: false, imageUrl: mountImage('9/93/Dark_Percht_Sleigh.gif'), items: [{ name: 'Percht Skull', amount: 1 }], requirements: ['Evento Winterlight Solstice', 'Derrotar The Percht Queen'] },
  { id: 'cold-percht-sleigh-variant', name: 'Cold Percht Sleigh Variant', category: 'event', premium: true, tamed: false, imageUrl: mountImage('1/17/Cold_Percht_Sleigh_Variant.gif'), items: [{ name: 'Percht Skull', amount: 1 }], requirements: ['Evento Winterlight Solstice - 2 edições', 'Versão básica necessária'] },
  { id: 'bright-percht-sleigh-variant', name: 'Bright Percht Sleigh Variant', category: 'event', premium: true, tamed: false, imageUrl: mountImage('0/03/Bright_Percht_Sleigh_Variant.gif'), items: [{ name: 'Percht Skull', amount: 1 }], requirements: ['Evento Winterlight Solstice - 2 edições', 'Versão básica necessária'] },
  { id: 'dark-percht-sleigh-variant', name: 'Dark Percht Sleigh Variant', category: 'event', premium: true, tamed: false, imageUrl: mountImage('f/fa/Dark_Percht_Sleigh_Variant.gif'), items: [{ name: 'Percht Skull', amount: 1 }], requirements: ['Evento Winterlight Solstice - 2 edições', 'Versão básica necessária'] },
  { id: 'finished-bright-percht-sleigh', name: 'Finished Bright Percht Sleigh', category: 'event', premium: true, tamed: false, imageUrl: mountImage('6/6d/Finished_Bright_Percht_Sleigh.gif'), items: [{ name: 'Percht Skull', amount: 1 }], requirements: ['Evento Winterlight Solstice - 3 edições', 'Versão básica necessária'] },
  { id: 'finished-cold-percht-sleigh', name: 'Finished Cold Percht Sleigh', category: 'event', premium: true, tamed: false, imageUrl: mountImage('3/3c/Finished_Cold_Percht_Sleigh.gif'), items: [{ name: 'Percht Skull', amount: 1 }], requirements: ['Evento Winterlight Solstice - 3 edições', 'Versão básica necessária'] },
  { id: 'finished-dark-percht-sleigh', name: 'Finished Dark Percht Sleigh', category: 'event', premium: true, tamed: false, imageUrl: mountImage('4/49/Finished_Dark_Percht_Sleigh.gif'), items: [{ name: 'Percht Skull', amount: 1 }], requirements: ['Evento Winterlight Solstice - 3 edições', 'Versão básica necessária'] },

  // === INVASION ===
  { id: 'draptor-invasion', name: 'Draptor (Invasão)', category: 'invasion', premium: true, tamed: false, imageUrl: mountImage('b/b5/Draptor_%28Mount%29.gif'), items: [{ name: 'Harness', amount: 1 }], requirements: ['Invasão de Draptors'] },
  { id: 'midnight-panther-invasion', name: 'Midnight Panther (Invasão)', category: 'invasion', premium: true, tamed: false, imageUrl: mountImage('1/1f/Midnight_Panther_%28Mount%29.gif'), items: [{ name: 'Leather Whip', amount: 1 }], requirements: ['Invasão de Panthers'] },

  // === OFFERS ===
  { id: 'benevolent-coral-rhea', name: 'Benevolent Coral Rhea', category: 'offer', premium: false, tamed: false, imageUrl: mountImage('c/c1/Benevolent_Coral_Rhea.gif'), items: [], requirements: ['Oferta Especial'] },
  { id: 'benevolent-snowman-rhea', name: 'Benevolent Snowman Rhea', category: 'offer', premium: false, tamed: false, imageUrl: mountImage('2/2b/Benevolent_Snowman_Rhea.gif'), items: [], requirements: ['Oferta Especial'] },

  // === STORE (sample) ===
  { id: 'armadillo', name: 'Armadillo', category: 'store', premium: false, tamed: false, imageUrl: mountImage('7/75/Armadillo.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'black-stag', name: 'Black Stag', category: 'store', premium: false, tamed: false, imageUrl: mountImage('3/37/Black_Stag.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'blue-mechanical-spider', name: 'Blue Mechanical Spider', category: 'store', premium: false, tamed: false, imageUrl: mountImage('f/fb/Blue_Mechanical_Spider.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'bone-beak', name: 'Bone Beak', category: 'store', premium: false, tamed: false, imageUrl: mountImage('4/41/Bone_Beak.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'courageous-foal', name: 'Courageous Foal', category: 'store', premium: false, tamed: false, imageUrl: mountImage('5/50/Courageous_Foal.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'dawn-strider', name: 'Dawn Strider', category: 'store', premium: false, tamed: false, imageUrl: mountImage('4/4d/Dawn_Strider.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'deevril', name: 'Deevril', category: 'store', premium: false, tamed: false, imageUrl: mountImage('3/39/Deevril.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'desert-king', name: 'Desert King', category: 'store', premium: false, tamed: false, imageUrl: mountImage('1/12/Desert_King.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'devourer', name: 'Devourer', category: 'store', premium: false, tamed: false, imageUrl: mountImage('b/ba/Devourer.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'dusk-weaver', name: 'Dusk Weaver', category: 'store', premium: false, tamed: false, imageUrl: mountImage('5/5a/Dusk_Weaver.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'giant-shark', name: 'Giant Shark', category: 'store', premium: false, tamed: false, imageUrl: mountImage('3/3f/Giant_Shark.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'golden-armoured-widow', name: 'Golden Armoured Widow', category: 'store', premium: false, tamed: false, imageUrl: mountImage('b/b3/Golden_Armoured_Widow.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'golden-sandbug', name: 'Golden Sandbug', category: 'store', premium: false, tamed: false, imageUrl: mountImage('3/35/Golden_Sandbug.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'hailstorm-fly', name: 'Hailstorm Fly', category: 'store', premium: false, tamed: false, imageUrl: mountImage('a/a3/Hailstorm_Fly.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'hibernal-hare', name: 'Hibernal Hare', category: 'store', premium: false, tamed: false, imageUrl: mountImage('e/ed/Hibernal_Hare.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'honey-drake', name: 'Honey Drake', category: 'store', premium: false, tamed: false, imageUrl: mountImage('8/80/Honey_Drake.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'icebreacher', name: 'Icebreacher', category: 'store', premium: false, tamed: false, imageUrl: mountImage('0/02/Icebreacher.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'leafscorcher', name: 'Leafscorcher', category: 'store', premium: false, tamed: false, imageUrl: mountImage('9/93/Leafscorcher.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'lightpaw', name: 'Lightpaw', category: 'store', premium: false, tamed: false, imageUrl: mountImage('e/e8/Lightpaw.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'molten-maned-hunter', name: 'Molten Maned Hunter', category: 'store', premium: false, tamed: false, imageUrl: mountImage('7/7d/Molten_Maned_Hunter.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'nightwing', name: 'Nightwing', category: 'store', premium: false, tamed: false, imageUrl: mountImage('9/95/Nightwing.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'ornamented-mule', name: 'Ornamented Mule', category: 'store', premium: false, tamed: false, imageUrl: mountImage('4/4c/Ornamented_Mule.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'panic-hunter', name: 'Panic Hunter', category: 'store', premium: false, tamed: false, imageUrl: mountImage('a/ae/Panic_Hunter.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'percht-sleigh', name: 'Percht Sleigh', category: 'store', premium: false, tamed: false, imageUrl: mountImage('5/55/Percht_Sleigh.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'plaguesmith', name: 'Plaguesmith', category: 'store', premium: false, tamed: false, imageUrl: mountImage('f/f0/Plaguesmith.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'poisonbane', name: 'Poisonbane', category: 'store', premium: false, tamed: false, imageUrl: mountImage('1/15/Poisonbane.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'predator-pup', name: 'Predator Pup', category: 'store', premium: false, tamed: false, imageUrl: mountImage('9/9e/Predator_Pup.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'radiant-sphinx', name: 'Radiant Sphinx', category: 'store', premium: false, tamed: false, imageUrl: mountImage('d/d5/Radiant_Sphinx.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'raptor-horseclops', name: 'Raptor Horseclops', category: 'store', premium: false, tamed: false, imageUrl: mountImage('7/72/Raptor_Horseclops.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'red-ladybug', name: 'Red Ladybug', category: 'store', premium: false, tamed: false, imageUrl: mountImage('0/0d/Red_Ladybug.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'shadow-dragon', name: 'Shadow Dragon', category: 'store', premium: false, tamed: false, imageUrl: mountImage('0/06/Shadow_Dragon.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'sheep-booster', name: 'Sheep Booster', category: 'store', premium: false, tamed: false, imageUrl: mountImage('b/b8/Sheep_Booster.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'skeleton-horde', name: 'Skeleton Horde', category: 'store', premium: false, tamed: false, imageUrl: mountImage('8/87/Skeleton_Horde.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'smoke-scorpion', name: 'Smoke Scorpion', category: 'store', premium: false, tamed: false, imageUrl: mountImage('9/9c/Smoke_Scorpion.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'steel-bee', name: 'Steel Bee', category: 'store', premium: false, tamed: false, imageUrl: mountImage('9/9d/Steel_Bee.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'swamp-lurker', name: 'Swamp Lurker', category: 'store', premium: false, tamed: false, imageUrl: mountImage('c/cf/Swamp_Lurker.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'tempest', name: 'Tempest', category: 'store', premium: false, tamed: false, imageUrl: mountImage('8/80/Tempest.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'terracotta-armourshell', name: 'Terracotta Armourshell', category: 'store', premium: false, tamed: false, imageUrl: mountImage('9/9f/Terracotta_Armourshell.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'the-unwelcome', name: 'The Unwelcome', category: 'store', premium: false, tamed: false, imageUrl: mountImage('2/28/The_Unwelcome.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'toxic-percht-sleigh', name: 'Toxic Percht Sleigh', category: 'store', premium: false, tamed: false, imageUrl: mountImage('4/4b/Toxic_Percht_Sleigh.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'undead-horse', name: 'Undead Horse', category: 'store', premium: false, tamed: false, imageUrl: mountImage('0/0a/Undead_Horse.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'warmaster', name: 'Warmaster', category: 'store', premium: false, tamed: false, imageUrl: mountImage('3/39/Warmaster.gif'), items: [], requirements: ['Comprar na Store'] },
  { id: 'winter-wolf', name: 'Winter Wolf', category: 'store', premium: false, tamed: false, imageUrl: mountImage('3/35/Winter_Wolf.gif'), items: [], requirements: ['Comprar na Store'] },

  // === HUNTING ===
  { id: 'cerberus-champion', name: 'Cerberus Champion', category: 'hunting', premium: true, tamed: false, imageUrl: mountImage('0/0d/Cerberus_Champion.gif'), items: [], requirements: ['Hunting Tasks'] },
  { id: 'retributor', name: 'Retributor', category: 'hunting', premium: true, tamed: false, imageUrl: mountImage('8/8d/Retributor.gif'), items: [], requirements: ['Hunting Tasks'] },

  // === WORLD CHANGE ===
  { id: 'crystal-wolf-wc', name: 'Crystal Wolf (World Change)', category: 'worldchange', premium: true, tamed: false, imageUrl: mountImage('f/f2/Crystal_Wolf_%28Mount%29.gif'), items: [{ name: 'Diapason', amount: 1 }], requirements: ['World Change / Mini World Change'] },

  // === TIBIADROME ===
  { id: 'phant-tibiadrome', name: 'Phant (Tibiadrome)', category: 'tibiadrome', premium: true, tamed: false, imageUrl: mountImage('4/47/Phant_%28Mount%29.gif'), items: [], requirements: ['Tibiadrome'] },

  // === QUESTS ===
  { id: 'hazard-ripper', name: 'Hazard Ripper', category: 'quest', premium: true, tamed: false, imageUrl: mountImage('1/1c/Hazard_Ripper.gif'), items: [], requirements: ['Primal Ordeal Quest'] },
];

export const mountCategories: Record<MountCategory, { label: { 'pt-BR': string; en: string }; icon: string }> = {
  tameable: { label: { 'pt-BR': 'Domáveis', en: 'Tameable' }, icon: '🐾' },
  store: { label: { 'pt-BR': 'Store', en: 'Store' }, icon: '🛒' },
  quest: { label: { 'pt-BR': 'Quests', en: 'Quests' }, icon: '📜' },
  event: { label: { 'pt-BR': 'Eventos', en: 'Events' }, icon: '🎉' },
  invasion: { label: { 'pt-BR': 'Invasões', en: 'Invasions' }, icon: '⚔️' },
  offer: { label: { 'pt-BR': 'Ofertas', en: 'Offers' }, icon: '🏷️' },
  arena: { label: { 'pt-BR': 'Arenas', en: 'Arenas' }, icon: '🏟️' },
  customizable: { label: { 'pt-BR': 'Customizáveis', en: 'Customizable' }, icon: '🎨' },
  rented: { label: { 'pt-BR': 'Aluguel', en: 'Rented' }, icon: '🐴' },
  hunting: { label: { 'pt-BR': 'Hunting Tasks', en: 'Hunting Tasks' }, icon: '🎯' },
  worldchange: { label: { 'pt-BR': 'World Changes', en: 'World Changes' }, icon: '🌍' },
  tibiadrome: { label: { 'pt-BR': 'Tibiadrome', en: 'Tibiadrome' }, icon: '🏆' },
};
