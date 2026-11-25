const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, 'public');
const IMAGENS = path.join(PUBLIC, 'imagens');
const BACKUP = path.join(__dirname, 'public_backup_antes_da_atualizacao');
const FORCAR = process.argv.includes('--forcar');
const UA = 'ProjetoEscolarBiologiaDinossauros/1.0 (trabalho escolar; uso educacional)';

const ESPECIES = [
 {
  "pasta": "biologia",
  "arquivo": "agua-viva",
  "wiki": [
   "Aurelia aurita",
   "Moon jelly"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "baleia-azul",
  "wiki": [
   "Balaenoptera musculus",
   "Blue whale"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "barracuda",
  "wiki": [
   "Sphyraena barracuda",
   "Great barracuda"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "caranguejo-real",
  "wiki": [
   "Paralithodes camtschaticus",
   "Red king crab"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "cavalo-marinho",
  "wiki": [
   "Hippocampus kuda",
   "Spotted seahorse"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "estrela-girassol",
  "wiki": [
   "Pycnopodia helianthoides",
   "Sunflower sea star"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "golfinho",
  "wiki": [
   "Tursiops truncatus",
   "Common bottlenose dolphin"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "lagosta",
  "wiki": [
   "Homarus americanus",
   "American lobster"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "lontra-marinha",
  "wiki": [
   "Enhydra lutris",
   "Sea otter"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "lula-gigante",
  "wiki": [
   "Architeuthis dux",
   "Giant squid"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "marlim-azul",
  "wiki": [
   "Makaira nigricans",
   "Atlantic blue marlin"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "moreia",
  "wiki": [
   "Gymnothorax javanicus",
   "Giant moray"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "nautilo",
  "wiki": [
   "Nautilus pompilius",
   "Emperor nautilus"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "orca",
  "wiki": [
   "Orcinus orca",
   "Killer whale"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "ourico-do-mar",
  "wiki": [
   "Echinometra mathaei",
   "Burrowing urchin"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "peixe-espada",
  "wiki": [
   "Xiphias gladius",
   "Swordfish"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "peixe-palhaco",
  "wiki": [
   "Amphiprion ocellaris",
   "Ocellaris clownfish"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "pinguim-imperador",
  "wiki": [
   "Aptenodytes forsteri",
   "Emperor penguin"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "polvo-gigante",
  "wiki": [
   "Enteroctopus dofleini",
   "Giant Pacific octopus"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "raia-manta",
  "wiki": [
   "Mobula birostris",
   "Giant oceanic manta ray"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "tartaruga-de-couro",
  "wiki": [
   "Dermochelys coriacea",
   "Leatherback sea turtle"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "tartaruga-verde",
  "wiki": [
   "Chelonia mydas",
   "Green sea turtle"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "tubarao-baleia",
  "wiki": [
   "Rhincodon typus",
   "Whale shark"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "tubarao-branco",
  "wiki": [
   "Carcharodon carcharias",
   "Great white shark"
  ]
 },
 {
  "pasta": "biologia",
  "arquivo": "tubarao-martelo",
  "wiki": [
   "Sphyrna lewini",
   "Scalloped hammerhead shark"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "alossauro",
  "wiki": [
   "Allosaurus",
   "Allosaurus fragilis"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "anquilossauro",
  "wiki": [
   "Ankylosaurus",
   "Ankylosaurus magniventris"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "apatossauro",
  "wiki": [
   "Apatosaurus",
   "Apatosaurus louisae"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "archaeopteryx",
  "wiki": [
   "Archaeopteryx",
   "Archaeopteryx lithographica"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "argentinossauro",
  "wiki": [
   "Argentinosaurus",
   "Argentinosaurus huinculensis"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "braquiossauro",
  "wiki": [
   "Brachiosaurus",
   "Brachiosaurus altithorax"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "carnotauro",
  "wiki": [
   "Carnotaurus",
   "Carnotaurus sastrei"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "compsognato",
  "wiki": [
   "Compsognathus",
   "Compsognathus longipes"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "deinonico",
  "wiki": [
   "Deinonychus",
   "Deinonychus antirrhopus"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "dilofossauro",
  "wiki": [
   "Dilophosaurus",
   "Dilophosaurus wetherilli"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "diplodoco",
  "wiki": [
   "Diplodocus",
   "Diplodocus carnegii"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "espinossauro",
  "wiki": [
   "Spinosaurus",
   "Spinosaurus aegyptiacus"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "estegossauro",
  "wiki": [
   "Stegosaurus",
   "Stegosaurus stenops"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "estiracossauro",
  "wiki": [
   "Styracosaurus",
   "Styracosaurus albertensis"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "galimimo",
  "wiki": [
   "Gallimimus",
   "Gallimimus bullatus"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "giganotossauro",
  "wiki": [
   "Giganotosaurus",
   "Giganotosaurus carolinii"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "iguanodonte",
  "wiki": [
   "Iguanodon",
   "Iguanodon bernissartensis"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "microraptor",
  "wiki": [
   "Microraptor",
   "Microraptor gui"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "oviraptor",
  "wiki": [
   "Oviraptor",
   "Oviraptor philoceratops"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "paquicefalossauro",
  "wiki": [
   "Pachycephalosaurus",
   "Pachycephalosaurus wyomingensis"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "parassaurolofo",
  "wiki": [
   "Parasaurolophus",
   "Parasaurolophus walkeri"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "t-rex",
  "wiki": [
   "Tyrannosaurus",
   "Tyrannosaurus rex"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "terizinossauro",
  "wiki": [
   "Therizinosaurus",
   "Therizinosaurus cheloniformis"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "triceratops",
  "wiki": [
   "Triceratops",
   "Triceratops horridus"
  ]
 },
 {
  "pasta": "dinossauros",
  "arquivo": "velociraptor",
  "wiki": [
   "Velociraptor",
   "Velociraptor mongoliensis"
  ]
 }
];
const DINOS = [
 {
  "arquivo": "alossauro",
  "nome": "Alossauro",
  "cient": "Allosaurus fragilis",
  "desc": "Grande predador do período Jurássico."
 },
 {
  "arquivo": "anquilossauro",
  "nome": "Anquilossauro",
  "cient": "Ankylosaurus magniventris",
  "desc": "Herbívoro blindado, com uma clava óssea na cauda."
 },
 {
  "arquivo": "apatossauro",
  "nome": "Apatossauro",
  "cient": "Apatosaurus louisae",
  "desc": "Saurópode gigante de pescoço e cauda longos."
 },
 {
  "arquivo": "archaeopteryx",
  "nome": "Archaeopteryx",
  "cient": "Archaeopteryx lithographica",
  "desc": "Ave primitiva que liga os dinossauros às aves modernas."
 },
 {
  "arquivo": "argentinossauro",
  "nome": "Argentinossauro",
  "cient": "Argentinosaurus huinculensis",
  "desc": "Um dos maiores dinossauros terrestres já conhecidos."
 },
 {
  "arquivo": "braquiossauro",
  "nome": "Braquiossauro",
  "cient": "Brachiosaurus altithorax",
  "desc": "Herbívoro de pescoço altíssimo e patas dianteiras longas."
 },
 {
  "arquivo": "carnotauro",
  "nome": "Carnotauro",
  "cient": "Carnotaurus sastrei",
  "desc": "Predador com chifres acima dos olhos e braços minúsculos."
 },
 {
  "arquivo": "compsognato",
  "nome": "Compsognato",
  "cient": "Compsognathus longipes",
  "desc": "Um dos menores dinossauros carnívoros conhecidos."
 },
 {
  "arquivo": "deinonico",
  "nome": "Deinonico",
  "cient": "Deinonychus antirrhopus",
  "desc": "Predador ágil com uma garra em forma de foice."
 },
 {
  "arquivo": "dilofossauro",
  "nome": "Dilofossauro",
  "cient": "Dilophosaurus wetherilli",
  "desc": "Carnívoro com duas cristas sobre a cabeça."
 },
 {
  "arquivo": "diplodoco",
  "nome": "Diplodoco",
  "cient": "Diplodocus carnegii",
  "desc": "Saurópode muito comprido, de cauda longa e fina."
 },
 {
  "arquivo": "espinossauro",
  "nome": "Espinossauro",
  "cient": "Spinosaurus aegyptiacus",
  "desc": "Predador com uma vela nas costas e hábitos ligados à água."
 },
 {
  "arquivo": "estegossauro",
  "nome": "Estegossauro",
  "cient": "Stegosaurus stenops",
  "desc": "Herbívoro com placas nas costas e espinhos na cauda."
 },
 {
  "arquivo": "estiracossauro",
  "nome": "Estiracossauro",
  "cient": "Styracosaurus albertensis",
  "desc": "Dinossauro com um colar de espinhos ao redor da cabeça."
 },
 {
  "arquivo": "galimimo",
  "nome": "Galimimo",
  "cient": "Gallimimus bullatus",
  "desc": "Dinossauro veloz que lembrava um avestruz."
 },
 {
  "arquivo": "giganotossauro",
  "nome": "Giganotossauro",
  "cient": "Giganotosaurus carolinii",
  "desc": "Um dos maiores predadores terrestres já descobertos."
 },
 {
  "arquivo": "iguanodonte",
  "nome": "Iguanodonte",
  "cient": "Iguanodon bernissartensis",
  "desc": "Herbívoro com grandes espinhos nos polegares."
 },
 {
  "arquivo": "microraptor",
  "nome": "Microraptor",
  "cient": "Microraptor gui",
  "desc": "Pequeno dinossauro com penas e quatro asas."
 },
 {
  "arquivo": "oviraptor",
  "nome": "Oviraptor",
  "cient": "Oviraptor philoceratops",
  "desc": "Dinossauro de bico sem dentes, encontrado junto a ninhos."
 },
 {
  "arquivo": "paquicefalossauro",
  "nome": "Paquicefalossauro",
  "cient": "Pachycephalosaurus wyomingensis",
  "desc": "Herbívoro de crânio grosso em formato de cúpula."
 },
 {
  "arquivo": "parassaurolofo",
  "nome": "Parassaurolofo",
  "cient": "Parasaurolophus walkeri",
  "desc": "Herbívoro com uma longa crista tubular na cabeça."
 },
 {
  "arquivo": "t-rex",
  "nome": "Tiranossauro rex",
  "cient": "Tyrannosaurus rex",
  "desc": "Um dos mais conhecidos predadores do período Cretáceo."
 },
 {
  "arquivo": "terizinossauro",
  "nome": "Terizinossauro",
  "cient": "Therizinosaurus cheloniformis",
  "desc": "Dinossauro com garras gigantescas nas mãos."
 },
 {
  "arquivo": "triceratops",
  "nome": "Triceratops",
  "cient": "Triceratops horridus",
  "desc": "Herbívoro conhecido por seus três chifres."
 },
 {
  "arquivo": "velociraptor",
  "nome": "Velociraptor",
  "cient": "Velociraptor mongoliensis",
  "desc": "Pequeno dinossauro predador que viveu na Ásia."
 }
];
const NOVAS = {
 "alossauro": {
  "periodo": "Viveu durante o período Jurássico Superior, há aproximadamente 155 a 145 milhões de anos.",
  "alimentacao": "Era carnívoro e se alimentava de grandes herbívoros, como saurópodes e estegossauros.",
  "caracteristicas": "Era um predador bípede com cabeça grande, mandíbulas com dentes serrilhados, pequenas cristas acima dos olhos e três dedos com garras em cada mão.",
  "curiosidades": [
   "Seu nome significa “lagarto diferente”.",
   "Seus fósseis foram encontrados principalmente na América do Norte.",
   "Era um dos maiores predadores da sua época, com cerca de 8 a 9 metros de comprimento."
  ]
 },
 "apatossauro": {
  "periodo": "Viveu durante o período Jurássico Superior, há aproximadamente 152 a 151 milhões de anos.",
  "alimentacao": "Era herbívoro e se alimentava de folhas, ramos e outras plantas.",
  "caracteristicas": "Era um saurópode enorme, com pescoço longo e grosso, corpo robusto, patas fortes e uma cauda longa e fina.",
  "curiosidades": [
   "Seu nome significa “lagarto enganador”.",
   "Podia ultrapassar 20 metros de comprimento.",
   "Seus fósseis foram encontrados na América do Norte."
  ]
 },
 "archaeopteryx": {
  "periodo": "Viveu durante o período Jurássico Superior, há aproximadamente 150 milhões de anos.",
  "alimentacao": "Provavelmente se alimentava de insetos e de pequenos animais.",
  "caracteristicas": "Era pequeno, com tamanho próximo ao de um corvo, e tinha penas, asas, dentes, garras nas asas e uma longa cauda óssea.",
  "curiosidades": [
   "Seu nome significa “asa antiga”.",
   "Seus fósseis foram encontrados na Alemanha.",
   "É considerado um exemplo importante da ligação entre os dinossauros e as aves."
  ]
 },
 "argentinossauro": {
  "periodo": "Viveu durante o período Cretáceo, há aproximadamente 97 a 94 milhões de anos.",
  "alimentacao": "Era herbívoro e se alimentava de plantas.",
  "caracteristicas": "Era um saurópode gigantesco, com pescoço e cauda longos, e está entre os maiores dinossauros terrestres já conhecidos.",
  "curiosidades": [
   "Seu nome significa “lagarto da Argentina”.",
   "Seus fósseis foram encontrados na Argentina.",
   "Seu tamanho é estimado a partir de ossos incompletos, por isso os números variam entre os estudos."
  ]
 },
 "carnotauro": {
  "periodo": "Viveu durante o período Cretáceo, há aproximadamente 72 a 69 milhões de anos.",
  "alimentacao": "Era carnívoro e provavelmente caçava animais de médio porte.",
  "caracteristicas": "Tinha dois chifres curtos acima dos olhos, crânio curto e altura elevada, pernas longas e braços extremamente pequenos.",
  "curiosidades": [
   "Seu nome significa “touro carnívoro”.",
   "Seus fósseis foram encontrados na Argentina.",
   "O fóssil encontrado preservou marcas da pele, com pequenas escamas."
  ]
 },
 "compsognato": {
  "periodo": "Viveu durante o período Jurássico Superior, há aproximadamente 150 milhões de anos.",
  "alimentacao": "Era carnívoro e se alimentava de pequenos animais, como lagartos e insetos.",
  "caracteristicas": "Era um dos menores dinossauros carnívoros conhecidos, com cerca de 1 metro de comprimento, corpo leve, pernas longas e cauda comprida.",
  "curiosidades": [
   "Seu nome significa “mandíbula elegante”.",
   "Seus fósseis foram encontrados na Europa.",
   "Um dos fósseis preservou um pequeno lagarto no local do estômago."
  ]
 },
 "deinonico": {
  "periodo": "Viveu durante o período Cretáceo, há aproximadamente 115 a 108 milhões de anos.",
  "alimentacao": "Era carnívoro e se alimentava de outros animais, inclusive de herbívoros maiores que ele.",
  "caracteristicas": "Era um predador ágil, com cerca de 3 metros de comprimento, cauda rígida e uma grande garra em forma de foice no segundo dedo de cada pé.",
  "curiosidades": [
   "Seu nome significa “garra terrível”.",
   "Seus fósseis foram encontrados na América do Norte.",
   "Sua descoberta ajudou a mudar a ideia de que os dinossauros eram animais lentos."
  ]
 },
 "dilofossauro": {
  "periodo": "Viveu durante o período Jurássico Inferior, há aproximadamente 193 milhões de anos.",
  "alimentacao": "Era carnívoro e provavelmente se alimentava de pequenos e médios animais.",
  "caracteristicas": "Tinha cerca de 6 metros de comprimento, corpo esguio e duas cristas finas sobre a cabeça.",
  "curiosidades": [
   "Seu nome significa “lagarto de duas cristas”.",
   "Seus fósseis foram encontrados na América do Norte.",
   "Não há provas de que cuspisse veneno ou tivesse uma gola, como aparece em filmes."
  ]
 },
 "estiracossauro": {
  "periodo": "Viveu durante o período Cretáceo, há aproximadamente 75 milhões de anos.",
  "alimentacao": "Era herbívoro e se alimentava de plantas baixas.",
  "caracteristicas": "Tinha um grande chifre no nariz e um colar ósseo com longos espinhos ao redor da cabeça.",
  "curiosidades": [
   "Seu nome significa “lagarto com espigão”.",
   "Seus fósseis foram encontrados no Canadá.",
   "Foram achados sítios com muitos indivíduos juntos, o que sugere que vivia em grupos."
  ]
 },
 "galimimo": {
  "periodo": "Viveu durante o período Cretáceo, há aproximadamente 70 milhões de anos.",
  "alimentacao": "Provavelmente era onívoro e se alimentava de plantas, insetos e pequenos animais.",
  "caracteristicas": "Tinha pernas longas, pescoço comprido, cabeça pequena e bico sem dentes, e se parecia com um avestruz.",
  "curiosidades": [
   "Seu nome significa “imitador de galinha”.",
   "Seus fósseis foram encontrados no deserto de Gobi, na Mongólia.",
   "Acredita-se que fosse um corredor muito rápido."
  ]
 },
 "giganotossauro": {
  "periodo": "Viveu durante o período Cretáceo, há aproximadamente 99 a 97 milhões de anos.",
  "alimentacao": "Era carnívoro e provavelmente caçava grandes herbívoros.",
  "caracteristicas": "Era um dos maiores predadores terrestres conhecidos, com cerca de 12 metros de comprimento, crânio enorme e dentes cortantes.",
  "curiosidades": [
   "Seu nome significa “grande lagarto do sul”.",
   "Seus fósseis foram encontrados na Argentina.",
   "Seu crânio tinha mais de 1 metro de comprimento."
  ]
 },
 "iguanodonte": {
  "periodo": "Viveu durante o período Cretáceo Inferior, há aproximadamente 126 a 122 milhões de anos.",
  "alimentacao": "Era herbívoro e se alimentava de plantas, que cortava com o bico.",
  "caracteristicas": "Era grande, com cerca de 10 metros de comprimento, e tinha um espinho no lugar do polegar de cada mão. Podia andar sobre duas ou quatro patas.",
  "curiosidades": [
   "Seu nome significa “dente de iguana”.",
   "Foi um dos primeiros dinossauros a receber nome científico.",
   "Seus fósseis foram encontrados na Europa."
  ]
 },
 "microraptor": {
  "periodo": "Viveu durante o período Cretáceo Inferior, há aproximadamente 125 a 120 milhões de anos.",
  "alimentacao": "Era carnívoro e se alimentava de pequenos animais, como peixes e aves.",
  "caracteristicas": "Era pequeno, com cerca de 80 centímetros de comprimento, e tinha penas nos braços e nas pernas, o que lhe dava a aparência de ter quatro asas.",
  "curiosidades": [
   "Seu nome significa “pequeno ladrão”.",
   "Seus fósseis foram encontrados na China.",
   "Estudos sugerem que suas penas eram pretas, com brilho iridescente."
  ]
 },
 "oviraptor": {
  "periodo": "Viveu durante o período Cretáceo, há aproximadamente 75 a 71 milhões de anos.",
  "alimentacao": "Não se sabe ao certo, mas pode ter comido ovos, pequenos animais e plantas.",
  "caracteristicas": "Tinha cerca de 1,6 metro de comprimento, bico sem dentes, uma crista na cabeça, pernas longas e penas.",
  "curiosidades": [
   "Seu nome significa “ladrão de ovos”, mas isso parece ter sido um engano.",
   "Os ovos encontrados perto dele eram de dinossauros da mesma família, e hoje se acredita que cuidavam dos próprios ovos.",
   "Seus fósseis foram encontrados na Mongólia."
  ]
 },
 "paquicefalossauro": {
  "periodo": "Viveu durante o período Cretáceo, há aproximadamente 70 a 66 milhões de anos.",
  "alimentacao": "Provavelmente era herbívoro e se alimentava de folhas, frutos e sementes.",
  "caracteristicas": "Andava sobre duas patas e tinha o topo do crânio muito grosso, em forma de cúpula, cercado por pequenos espinhos ósseos.",
  "curiosidades": [
   "Seu nome significa “lagarto de cabeça grossa”.",
   "Seus fósseis foram encontrados na América do Norte.",
   "Os cientistas ainda discutem para que servia a cúpula do crânio."
  ]
 },
 "parassaurolofo": {
  "periodo": "Viveu durante o período Cretáceo, há aproximadamente 76 a 73 milhões de anos.",
  "alimentacao": "Era herbívoro e se alimentava de folhas, ramos e outras plantas.",
  "caracteristicas": "Tinha bico de pato e uma longa crista oca na cabeça, que podia passar de 1 metro de comprimento.",
  "curiosidades": [
   "Seu nome significa “quase lagarto com crista”.",
   "Sua crista pode ter servido para emitir sons e se comunicar.",
   "Seus fósseis foram encontrados na América do Norte."
  ]
 },
 "terizinossauro": {
  "periodo": "Viveu durante o período Cretáceo, há aproximadamente 70 milhões de anos.",
  "alimentacao": "Provavelmente era herbívoro e se alimentava de plantas.",
  "caracteristicas": "Tinha pescoço longo, cabeça pequena com bico e garras enormes nas mãos, que podiam chegar a cerca de 50 centímetros.",
  "curiosidades": [
   "Seu nome significa “lagarto ceifador”.",
   "Pertencia ao grupo dos terópodes, formado em sua maioria por carnívoros, mas provavelmente comia plantas.",
   "Seus fósseis foram encontrados na Mongólia."
  ]
 }
};

const EXT = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif' };
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ler = (f) => fs.readFileSync(f, 'utf8');
const gravar = (f, t) => fs.writeFileSync(f, t, 'utf8');

// download
async function pedir(url, tentativas = 4) {
  for (let i = 0; i < tentativas; i++) {
    const r = await fetch(url, { headers: { 'User-Agent': UA } });
    if (r.status === 429 || r.status >= 500) { await dormir(2000 * (i + 1)); continue; }
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r;
  }
  throw new Error('muitas tentativas');
}

async function urlDaFoto(titulo) {
  const api =
    'https://en.wikipedia.org/w/api.php?action=query&redirects=1&prop=pageimages&piprop=thumbnail' +
    '&pithumbsize=900&format=json&titles=' + encodeURIComponent(titulo);
  const dados = await (await pedir(api)).json();
  const paginas = Object.values((dados.query && dados.query.pages) || {});
  return (paginas[0] && paginas[0].thumbnail && paginas[0].thumbnail.source) || null;
}

function arquivoExistente(nome) {
  if (!fs.existsSync(IMAGENS)) return null;
  return fs.readdirSync(IMAGENS).find((f) => path.parse(f).name === nome) || null;
}

async function baixarFoto(esp) {
  const existente = arquivoExistente(esp.arquivo);
  if (existente && !FORCAR) return existente;
  for (const titulo of esp.wiki) {
    const url = await urlDaFoto(titulo);
    if (!url) continue;
    const r = await pedir(url);
    const tipo = (r.headers.get('content-type') || '').split(';')[0].trim();
    const ext = EXT[tipo] || path.extname(new URL(url).pathname).toLowerCase() || '.jpg';
    const nome = esp.arquivo + ext;
    if (existente && existente !== nome) fs.unlinkSync(path.join(IMAGENS, existente));
    fs.writeFileSync(path.join(IMAGENS, nome), Buffer.from(await r.arrayBuffer()));
    return nome;
  }
  return null;
}

// ------------------------------------------------------------------ fichas
const RE_IMG_FICHA = /(<div class="especie-imagem">\s*<img\s[^>]*?src=")[^"]*"+/;

function trocarFoto(txt, arquivoImg) {
  if (!RE_IMG_FICHA.test(txt)) return null;
  return txt.replace(RE_IMG_FICHA, (m, ini) => `${ini}../imagens/${arquivoImg}"`);
}

function fichaDino(slug, nomes, d, arquivoImg) {
  const lis = d.curiosidades.map((c) => `                <li>${esc(c).replace(/&quot;/g, '"')}</li>`).join('\n');
  return `<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(nomes.nome)}</title>

    <link rel="stylesheet" href="../style.css">
</head>

<body>

    <header>
        <h1>${esc(nomes.nome)}</h1>

        <nav>
            <a href="../index.html">Início</a>
            <a href="../biologia.html">Biologia Marinha</a>
            <a href="../dinossauros.html">Dinossauros</a>
        </nav>
    </header>

    <main class="dinossauros">

        <section class="especie">

            <div class="especie-imagem">
                <img src="../imagens/${arquivoImg}" alt="${esc(nomes.nome)}">
            </div>

            <div class="especie-info">

                <h2>${esc(nomes.nome)}</h2>

                <p class="nome-cientifico">
                    ${esc(nomes.cient)}
                </p>

                <div class="informacao">
                    <h3>Período</h3>
                    <p>
                        ${d.periodo}
                    </p>
                </div>

                <div class="informacao">
                    <h3>Alimentação</h3>
                    <p>
                        ${d.alimentacao}
                    </p>
                </div>

                <div class="informacao">
                    <h3>Características</h3>
                    <p>
                        ${d.caracteristicas}
                    </p>
                </div>

            </div>

        </section>

        <section class="curiosidades">

            <h2>Curiosidades</h2>

            <ul>
${lis}
            </ul>

        </section>

        <a class="voltar" href="../dinossauros.html">
            ← Voltar para Dinossauros
        </a>

    </main>

</body>

</html>
`;
}

// principal
async function principal() {
  if (!fs.existsSync(PUBLIC)) {
    console.log('ERRO: não achei a pasta "public". Rode este comando dentro da pasta do projeto (onde fica o server.js).');
    return;
  }

  // 0. backup
  if (!fs.existsSync(BACKUP)) {
    fs.cpSync(PUBLIC, BACKUP, { recursive: true });
    console.log('Backup criado em: public_backup_antes_da_atualizacao\n');
  } else {
    console.log('(o backup já existia, mantido como está)\n');
  }

  fs.mkdirSync(IMAGENS, { recursive: true });
  const avisos = [];
  const semFoto = [];
  const arquivosImg = {}; 

  // 1. fotos
  console.log('PASSO 1: baixando as fotos (pode levar 1 a 2 minutos)...');
  for (let i = 0; i < ESPECIES.length; i++) {
    const esp = ESPECIES[i];
    process.stdout.write(`  [${i + 1}/${ESPECIES.length}] ${esp.arquivo} ... `);
    try {
      const nome = await baixarFoto(esp);
      if (nome) { arquivosImg[esp.arquivo] = nome; console.log('ok'); }
      else { semFoto.push(esp.arquivo); console.log('sem foto encontrada'); }
    } catch (e) {
      semFoto.push(esp.arquivo);
      console.log('erro: ' + e.message);
    }
    await dormir(400);
  }
  const imgDe = (slug) => arquivosImg[slug] || slug + '.jpg';

  // 2 e 4. fichas
  console.log('\nPASSO 2: arrumando as fichas...');
  let fichasCriadas = 0, fichasArrumadas = 0;
  for (const esp of ESPECIES) {
    const arq = path.join(PUBLIC, esp.pasta, esp.arquivo + '.html');
    if (!fs.existsSync(arq)) { avisos.push(`FALTA o arquivo public/${esp.pasta}/${esp.arquivo}.html`); continue; }
    let txt = ler(arq);

    const ehCopiaDoTrex = esp.pasta === 'dinossauros' && esp.arquivo !== 't-rex' &&
      NOVAS[esp.arquivo] && txt.includes('<h2>Tiranossauro rex</h2>');

    if (ehCopiaDoTrex) {
      const nomes = DINOS.find((d) => d.arquivo === esp.arquivo);
      gravar(arq, fichaDino(esp.arquivo, nomes, NOVAS[esp.arquivo], imgDe(esp.arquivo)));
      fichasCriadas++;
      continue;
    }

    if (esp.arquivo === 'nautilo' && txt.includes('flor de quatro pétalas')) {
      txt = txt.replace(/(<h3>Características<\/h3>\s*<p>\s*)[\s\S]*?(\s*<\/p>)/,
        '$1Possui uma concha externa em espiral, dividida em várias câmaras, e cerca de 90 tentáculos ' +
        'sem ventosas. A concha tem listras marrons e a abertura é protegida por uma estrutura chamada capuz.$2');
    }

    const novo = trocarFoto(txt, imgDe(esp.arquivo));
    if (novo === null) { avisos.push(`${esp.pasta}/${esp.arquivo}.html: não achei o lugar da foto`); continue; }
    gravar(arq, novo);
    fichasArrumadas++;

    if (!/href="\.\.\/style\.css"/.test(novo)) avisos.push(`${esp.pasta}/${esp.arquivo}.html: o CSS deveria ser href="../style.css"`);
    if (esp.pasta === 'dinossauros' && !/<main class="dinossauros"/.test(novo))
      avisos.push(`dinossauros/${esp.arquivo}.html: <main> sem class="dinossauros" (fica sem o tema verde)`);
  }
  console.log(`  ${fichasCriadas} fichas de dinossauro criadas do zero e ${fichasArrumadas} com a foto trocada.`);

  // 3. cards de biologia
  console.log('\nPASSO 3: arrumando os cards de biologia.html...');
  const fb = path.join(PUBLIC, 'biologia.html');
  if (fs.existsSync(fb)) {
    let b = ler(fb);
    let n = 0;
    b = b.replace(/<a href="([^"]+\.html)" class="card">([\s\S]*?)<\/a>/g, (m, href, resto) => {
      let slug = path.basename(href, '.html');
      if (slug === 'Água-viva-lua') slug = 'agua-viva';
      n++;
      resto = resto.replace(/<img src="[^"]*"/, `<img src="imagens/${imgDe(slug)}"`);
      return `<a href="biologia/${slug}.html" class="card">${resto}</a>`;
    });
    gravar(fb, b);
    console.log(`  ${n} cards arrumados.` + (n !== 25 ? '  (atenção: o esperado eram 25)' : ''));
  } else avisos.push('FALTA public/biologia.html');

  // 5. cards de dinossauros
  console.log('\nPASSO 4: refazendo os cards de dinossauros.html...');
  const fd = path.join(PUBLIC, 'dinossauros.html');
  if (fs.existsSync(fd)) {
    let d = ler(fd);
    const marca = '<section class="cards">';
    const ini = d.indexOf(marca);
    const fim = d.indexOf('</section>', ini);
    if (ini === -1 || fim === -1) {
      avisos.push('dinossauros.html: não achei <section class="cards"> ... </section>');
    } else {
      const cards = DINOS.map((x) => `        <a href="dinossauros/${x.arquivo}.html" class="card">
            <img src="imagens/${imgDe(x.arquivo)}" alt="${esc(x.nome)}">

            <h3>${esc(x.nome)}</h3>
            <p>${esc(x.cient)}</p>
            <p>${esc(x.desc)}</p>
        </a>
`).join('\n');
      d = d.slice(0, ini + marca.length) + '\n\n' + cards + '\n    ' + d.slice(fim);
      gravar(fd, d);
      console.log(`  ${DINOS.length} cards criados.`);
    }
  } else avisos.push('FALTA public/dinossauros.html');

  // resumo
  console.log('\n==================== PRONTO ====================');
  console.log(`Fotos baixadas: ${Object.keys(arquivosImg).length} de ${ESPECIES.length}`);
  if (semFoto.length) {
    console.log('Ficaram SEM foto (rode o comando de novo; se persistir, ponha a imagem à mão em public/imagens/):');
    console.log('  ' + semFoto.join(', '));
  }
  if (avisos.length) { console.log('\nPontos para conferir:'); avisos.forEach((a) => console.log(' - ' + a)); }
  console.log('\nAgora reinicie o servidor (Ctrl+C e depois: node server.js) e atualize o navegador com Ctrl+F5.');
}

principal();