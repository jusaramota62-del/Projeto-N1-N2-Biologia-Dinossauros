const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, 'public');
const IMAGENS = path.join(PUBLIC, 'imagens');
const UA = 'ProjetoEscolarBiologiaDinossauros/1.0 (trabalho escolar; uso educacional)';
const DINOS = [
 {
  "arquivo": "alossauro",
  "wiki": [
   "Allosaurus",
   "Allosaurus fragilis"
  ]
 },
 {
  "arquivo": "anquilossauro",
  "wiki": [
   "Ankylosaurus",
   "Ankylosaurus magniventris"
  ]
 },
 {
  "arquivo": "apatossauro",
  "wiki": [
   "Apatosaurus",
   "Apatosaurus louisae"
  ]
 },
 {
  "arquivo": "archaeopteryx",
  "wiki": [
   "Archaeopteryx",
   "Archaeopteryx lithographica"
  ]
 },
 {
  "arquivo": "argentinossauro",
  "wiki": [
   "Argentinosaurus",
   "Argentinosaurus huinculensis"
  ]
 },
 {
  "arquivo": "braquiossauro",
  "wiki": [
   "Brachiosaurus",
   "Brachiosaurus altithorax"
  ]
 },
 {
  "arquivo": "carnotauro",
  "wiki": [
   "Carnotaurus",
   "Carnotaurus sastrei"
  ]
 },
 {
  "arquivo": "compsognato",
  "wiki": [
   "Compsognathus",
   "Compsognathus longipes"
  ]
 },
 {
  "arquivo": "deinonico",
  "wiki": [
   "Deinonychus",
   "Deinonychus antirrhopus"
  ]
 },
 {
  "arquivo": "dilofossauro",
  "wiki": [
   "Dilophosaurus",
   "Dilophosaurus wetherilli"
  ]
 },
 {
  "arquivo": "diplodoco",
  "wiki": [
   "Diplodocus",
   "Diplodocus carnegii"
  ]
 },
 {
  "arquivo": "espinossauro",
  "wiki": [
   "Spinosaurus",
   "Spinosaurus aegyptiacus"
  ]
 },
 {
  "arquivo": "estegossauro",
  "wiki": [
   "Stegosaurus",
   "Stegosaurus stenops"
  ]
 },
 {
  "arquivo": "estiracossauro",
  "wiki": [
   "Styracosaurus",
   "Styracosaurus albertensis"
  ]
 },
 {
  "arquivo": "galimimo",
  "wiki": [
   "Gallimimus",
   "Gallimimus bullatus"
  ]
 },
 {
  "arquivo": "giganotossauro",
  "wiki": [
   "Giganotosaurus",
   "Giganotosaurus carolinii"
  ]
 },
 {
  "arquivo": "iguanodonte",
  "wiki": [
   "Iguanodon",
   "Iguanodon bernissartensis"
  ]
 },
 {
  "arquivo": "microraptor",
  "wiki": [
   "Microraptor",
   "Microraptor gui"
  ]
 },
 {
  "arquivo": "oviraptor",
  "wiki": [
   "Oviraptor",
   "Oviraptor philoceratops"
  ]
 },
 {
  "arquivo": "paquicefalossauro",
  "wiki": [
   "Pachycephalosaurus",
   "Pachycephalosaurus wyomingensis"
  ]
 },
 {
  "arquivo": "parassaurolofo",
  "wiki": [
   "Parasaurolophus",
   "Parasaurolophus walkeri"
  ]
 },
 {
  "arquivo": "t-rex",
  "wiki": [
   "Tyrannosaurus",
   "Tyrannosaurus rex"
  ]
 },
 {
  "arquivo": "terizinossauro",
  "wiki": [
   "Therizinosaurus",
   "Therizinosaurus cheloniformis"
  ]
 },
 {
  "arquivo": "triceratops",
  "wiki": [
   "Triceratops",
   "Triceratops horridus"
  ]
 },
 {
  "arquivo": "velociraptor",
  "wiki": [
   "Velociraptor",
   "Velociraptor mongoliensis"
  ]
 }
];

const EXT = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const semHtml = (s) => String(s || '').replace(/<[^>]*>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();

const POSITIVAS = [
  [/life restoration|restoration of|in life/, 4],
  [/restoration|reconstruction/, 5],
  [/illustration|illustrated|paleoart|artwork|art by|artist/, 4],
  [/drawing|painting|painted|rendering|digital/, 2],
  [/\balive\b|\bliving\b/, 1],
];
// "fortes": descarta se aparecer no título OU na descrição
const FORTES = /skeleton|skeletal|skull|specimen|\bcast\b|\bmount(ed)?\b|museum|exhibit|holotype|footprint|\btrack|\bmap\b|\bsize\b|comparison|diagram|chart|timeline|cladogram|quarry|vertebra|femur|humerus|logo|icon|flag|stamp|coin|poster|lego|\btoy\b|jurassic park|jurassic world/;
// "fracas": descarta se aparecer no título; na descrição só tiram pontos
const FRACAS = /fossil|\bbones?\b|teeth|tooth|\beggs?\b|\bnest\b|statue|sculpture|\bmodel\b|film|movie|\bcrop(ped)?\b|\bdetail\b|\bclaws?\b|\bhead of\b|\btails?\b/;

function nota(c) {
  const titulo = c.titulo.toLowerCase();
  const desc = c.descricao.toLowerCase();
  if (FORTES.test(titulo) || FORTES.test(desc) || FRACAS.test(titulo)) return -1;
  let n = 0;
  for (const [re, pts] of POSITIVAS) if (re.test(titulo + ' ' + desc)) n += pts;
  if (FRACAS.test(desc)) n -= 2;
  return n;
}

async function pedir(url, tentativas = 4) {
  for (let i = 0; i < tentativas; i++) {
    const r = await fetch(url, { headers: { 'User-Agent': UA } });
    if (r.status === 429 || r.status >= 500) { await dormir(2000 * (i + 1)); continue; }
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r;
  }
  throw new Error('muitas tentativas');
}

const META = '&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=900' +
  '&iiextmetadatafilter=ImageDescription|Artist|LicenseShortName';

function lerPaginas(dados) {
  const paginas = Object.values((dados.query && dados.query.pages) || {});
  const lista = [];
  for (const p of paginas) {
    const info = p.imageinfo && p.imageinfo[0];
    if (!info || !EXT[info.mime] || (info.width || 0) < 500 || !info.thumburl) continue;
    const meta = info.extmetadata || {};
    lista.push({
      titulo: p.title || '',
      url: info.thumburl,
      largura: info.width || 0,
      proporcao: (info.width || 1) / (info.height || 1),
      descricao: semHtml(meta.ImageDescription && meta.ImageDescription.value),
      autor: semHtml(meta.Artist && meta.Artist.value),
      licenca: semHtml(meta.LicenseShortName && meta.LicenseShortName.value),
    });
  }
  return lista;
}

// imagens que aparecem na página da Wikipédia
async function candidatasDaPagina(titulo) {
  const api = 'https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&generator=images&gimlimit=max' +
    META + '&titles=' + encodeURIComponent(titulo);
  return lerPaginas(await (await pedir(api)).json());
}

// busca direta de arquivos no Wikimedia Commons
async function candidatasDoCommons(termo) {
  const api = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search' +
    '&gsrnamespace=6&gsrlimit=40' + META + '&gsrsearch=' + encodeURIComponent(termo);
  return lerPaginas(await (await pedir(api)).json());
}

async function fotoPrincipal(titulo) {
  const api =
    'https://en.wikipedia.org/w/api.php?action=query&redirects=1&prop=pageimages&piprop=thumbnail' +
    '&pithumbsize=900&format=json&titles=' + encodeURIComponent(titulo);
  const dados = await (await pedir(api)).json();
  const paginas = Object.values((dados.query && dados.query.pages) || {});
  const t = paginas[0] && paginas[0].thumbnail && paginas[0].thumbnail.source;
  return t ? { titulo: '(foto principal da página "' + titulo + '")', url: t, descricao: '', autor: '', licenca: '' } : null;
}

// nomes que a imagem precisa citar para ser deste dinossauro
function nomesValidos(dino) {
  const base = [dino.wiki[0].toLowerCase()];
  if (dino.arquivo === 't-rex') base.push('t. rex', 't-rex', 'trex');
  return base;
}

function melhor(lista, dino, usadas) {
  const nomes = nomesValidos(dino);
  return lista
    .filter((c) => !usadas.has(c.titulo))
    .filter((c) => { const t = (c.titulo + ' ' + c.descricao).toLowerCase(); return nomes.some((n) => t.includes(n)); })
    .filter((c) => c.proporcao >= 0.55 && c.proporcao <= 2.6)
    .map((c) => ({ ...c, nota: nota(c) + (c.proporcao >= 1.1 && c.proporcao <= 1.9 ? 1 : 0) }))
    .filter((c) => c.nota >= 3)
    .sort((a, b) => b.nota - a.nota || b.largura - a.largura)[0] || null;
}

async function escolher(dino, usadas) {
  const genero = dino.wiki[0];
  // 1) imagens da página do dinossauro
  for (const titulo of dino.wiki) {
    const m = melhor(await candidatasDaPagina(titulo), dino, usadas);
    if (m) return { ...m, ilustracao: true };
  }
  // 2) busca no Commons
  for (const termo of [genero + ' life restoration', genero + ' restoration', genero + ' illustration']) {
    const m = melhor(await candidatasDoCommons(termo), dino, usadas);
    if (m) return { ...m, ilustracao: true };
    await dormir(300);
  }
  // 3) foto principal da página (pode ser fóssil)
  for (const titulo of dino.wiki) {
    const f = await fotoPrincipal(titulo);
    if (f) return { ...f, ilustracao: false };
  }
  return null;
}

async function baixar(escolha, slug) {
  const r = await pedir(escolha.url);
  const tipo = (r.headers.get('content-type') || '').split(';')[0].trim();
  const ext = EXT[tipo] || path.extname(new URL(escolha.url).pathname).toLowerCase() || '.jpg';
  for (const f of fs.readdirSync(IMAGENS)) if (path.parse(f).name === slug) fs.unlinkSync(path.join(IMAGENS, f));
  const nome = slug + ext;
  fs.writeFileSync(path.join(IMAGENS, nome), Buffer.from(await r.arrayBuffer()));
  return nome;
}

function atualizarReferencias(slug, nome) {
  const alvos = [path.join(PUBLIC, 'dinossauros.html'), path.join(PUBLIC, 'dinossauros', slug + '.html')];
  const re = new RegExp('imagens/' + slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\.[a-z0-9]+', 'g');
  for (const f of alvos) {
    if (!fs.existsSync(f)) continue;
    const txt = fs.readFileSync(f, 'utf8');
    const novo = txt.replace(re, 'imagens/' + nome);
    if (novo !== txt) fs.writeFileSync(f, novo, 'utf8');
  }
}

const MARCA_CSS = '/* IMAGENS DOS DINOSSAUROS (fotos-ilustradas.js) */';
function arrumarCss() {
  const f = path.join(PUBLIC, 'style.css');
  if (!fs.existsSync(f)) { console.log('Aviso: não achei public/style.css'); return; }
  const css = fs.readFileSync(f, 'utf8');
  if (css.includes(MARCA_CSS)) return;
  fs.writeFileSync(f, css + `\n\n${MARCA_CSS}\n.dinossauros .card img,\n.dinossauros .especie-imagem img {\n    object-fit: contain;\n    background-color: #ffffff;\n}\n`, 'utf8');
  console.log('style.css ajustado: as imagens dos dinossauros agora aparecem inteiras (sem corte).\n');
}

async function principal() {
  if (!fs.existsSync(PUBLIC)) { console.log('ERRO: rode este comando dentro da pasta do projeto (onde fica o server.js).'); return; }
  fs.mkdirSync(IMAGENS, { recursive: true });
  arrumarCss();
  const creditos = [];
  const usadas = new Set();
  const fallback = [];
  const falhas = [];
  let ilustracoes = 0;

  for (let i = 0; i < DINOS.length; i++) {
    const d = DINOS[i];
    process.stdout.write(`[${i + 1}/${DINOS.length}] ${d.arquivo} ... `);
    try {
      const esc = await escolher(d, usadas);
      if (esc) usadas.add(esc.titulo);
      if (!esc) { falhas.push(d.arquivo); console.log('nada encontrado'); continue; }
      const nome = await baixar(esc, d.arquivo);
      atualizarReferencias(d.arquivo, nome);
      if (esc.ilustracao) { ilustracoes++; console.log('ilustração -> ' + nome); }
      else { fallback.push(d.arquivo); console.log('só achei a foto principal -> ' + nome); }
      const link = esc.titulo.startsWith('File:')
        ? 'https://commons.wikimedia.org/wiki/' + encodeURI(esc.titulo.replace(/ /g, '_')) : '(Wikipédia)';
      creditos.push(`${d.arquivo}: ${esc.titulo}\n   ${link}\n   Autor: ${esc.autor || 'ver página'} | Licença: ${esc.licenca || 'ver página'}`);
    } catch (e) {
      falhas.push(d.arquivo);
      console.log('erro: ' + e.message);
    }
    await dormir(400);
  }

  fs.writeFileSync(path.join(IMAGENS, 'CREDITOS.txt'),
    'Imagens dos dinossauros: Wikipédia / Wikimedia Commons.\nConfira autor e licença em cada link abaixo.\n\n' + creditos.join('\n\n') + '\n', 'utf8');

  console.log('\n==================== PRONTO ====================');
  console.log(`Ilustrações encontradas: ${ilustracoes} de ${DINOS.length}`);
  if (fallback.length) {
    console.log('\nEstes ficaram com a FOTO PRINCIPAL da Wikipédia (pode ser fóssil/esqueleto):');
    console.log('  ' + fallback.join(', '));
    console.log('Se quiser, troque à mão: salve a imagem que preferir em public/imagens/ com o MESMO nome e a MESMA extensão do arquivo que já está lá.');
  }
  if (falhas.length) console.log('\nFalharam (rode de novo): ' + falhas.join(', '));
  console.log('\nAtualize o navegador com Ctrl+F5. Os créditos estão em public/imagens/CREDITOS.txt');
}

principal();