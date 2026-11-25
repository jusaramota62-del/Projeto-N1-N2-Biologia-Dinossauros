// quiz.js — lógica do quiz (gerado por novidades.js)
// Para ADICIONAR perguntas, acrescente um item em PERGUNTAS.biologia ou PERGUNTAS.dinossauros:
//   { p: "Pergunta?", o: ["Certa", "Errada 1", "Errada 2", "Errada 3"], c: 0, e: "Explicação." }
// "c" é a posição (começando em 0) da resposta certa dentro de "o". As opções são embaralhadas sozinhas.

const PERGUNTAS = {
  "biologia": [
    {
      "p": "Qual é o maior animal que existe atualmente?",
      "o": [
        "Baleia-azul",
        "Tubarão-baleia",
        "Lula-gigante",
        "Orca"
      ],
      "c": 0,
      "e": "A baleia-azul pode passar de 30 metros de comprimento e é o maior animal conhecido que já viveu."
    },
    {
      "p": "Do que a baleia-azul se alimenta principalmente?",
      "o": [
        "Krill",
        "Tubarões",
        "Algas",
        "Lulas"
      ],
      "c": 0,
      "e": "O krill são pequenos animais parecidos com camarões."
    },
    {
      "p": "Qual é o maior peixe do mundo?",
      "o": [
        "Tubarão-baleia",
        "Tubarão-branco",
        "Marlim-azul",
        "Raia-manta"
      ],
      "c": 0,
      "e": "O tubarão-baleia pode passar de 12 metros e se alimenta filtrando plâncton."
    },
    {
      "p": "Quantos braços tem um polvo?",
      "o": [
        "6",
        "8",
        "10",
        "12"
      ],
      "c": 1,
      "e": "O polvo tem oito braços cobertos de ventosas."
    },
    {
      "p": "Onde vive o pinguim-imperador?",
      "o": [
        "Antártida",
        "Ártico",
        "Ilhas Galápagos",
        "Costa do Brasil"
      ],
      "c": 0,
      "e": "É a maior espécie de pinguim e vive na Antártida, adaptado ao frio extremo."
    },
    {
      "p": "Qual é a maior tartaruga marinha do mundo?",
      "o": [
        "Tartaruga-de-couro",
        "Tartaruga-verde",
        "Tartaruga-de-pente",
        "Tartaruga-oliva"
      ],
      "c": 0,
      "e": "A tartaruga-de-couro tem uma carapaça flexível, parecida com couro, e não um casco duro."
    },
    {
      "p": "Nos cavalos-marinhos, quem carrega os filhotes?",
      "o": [
        "O macho",
        "A fêmea",
        "Os dois, em revezamento",
        "Ninguém: os ovos ficam soltos no mar"
      ],
      "c": 0,
      "e": "O macho guarda os ovos em uma bolsa e é ele quem libera os filhotes."
    },
    {
      "p": "Entre o que o peixe-palhaço costuma viver protegido?",
      "o": [
        "Anêmonas-do-mar",
        "Esponjas",
        "Algas gigantes",
        "Corais mortos"
      ],
      "c": 0,
      "e": "Ele vive entre os tentáculos das anêmonas, que o protegem de predadores."
    },
    {
      "p": "O que a lontra-marinha faz com pedras?",
      "o": [
        "Usa como ferramenta para abrir moluscos",
        "Constrói a própria casa",
        "Engole para mergulhar mais fundo",
        "Usa para afiar os dentes"
      ],
      "c": 0,
      "e": "Ela apoia a pedra no peito e bate os moluscos nela para abri-los."
    },
    {
      "p": "Por que o náutilo é chamado de “fóssil vivo”?",
      "o": [
        "Seu grupo existe há centenas de milhões de anos e mudou pouco",
        "Porque vive dentro de fósseis",
        "Porque sua concha é feita de pedra",
        "Porque só existe em museus"
      ],
      "c": 0,
      "e": "Ele tem uma concha em espiral e pertence a um grupo muito antigo de animais."
    },
    {
      "p": "A orca pertence a qual grupo?",
      "o": [
        "Família dos golfinhos",
        "Família dos tubarões",
        "Família das focas",
        "Família das baleias-azuis"
      ],
      "c": 0,
      "e": "A orca é o maior membro da família dos golfinhos."
    },
    {
      "p": "Qual é a característica mais marcante do tubarão-martelo?",
      "o": [
        "Cabeça achatada em forma de martelo",
        "Bico em forma de espada",
        "Corpo coberto de espinhos",
        "Quatro nadadeiras dorsais"
      ],
      "c": 0,
      "e": "O nome vem do formato da cabeça, larga e achatada."
    },
    {
      "p": "Quantos braços a estrela-do-mar-girassol pode ter?",
      "o": [
        "Mais de 20",
        "Apenas 5",
        "Apenas 2",
        "Nenhum"
      ],
      "c": 0,
      "e": "Ela é uma das maiores estrelas-do-mar e pode ter até cerca de 24 braços."
    },
    {
      "p": "O que a lula-gigante tem de enorme?",
      "o": [
        "Os olhos",
        "As nadadeiras",
        "Os dentes",
        "A cauda"
      ],
      "c": 0,
      "e": "Seus olhos estão entre os maiores do reino animal, com cerca de 25 centímetros."
    },
    {
      "p": "O que o tubarão-branco tem na boca?",
      "o": [
        "Várias fileiras de dentes serrilhados",
        "Apenas um par de presas",
        "Uma placa sem dentes",
        "Dentes que nunca caem"
      ],
      "c": 0,
      "e": "Quando um dente cai, outro da fileira de trás ocupa o lugar."
    },
    {
      "p": "Onde a moreia costuma se esconder?",
      "o": [
        "Em tocas e fendas de rochas e recifes",
        "Enterrada na areia o tempo todo",
        "Entre algas flutuantes",
        "Em mar aberto, longe da costa"
      ],
      "c": 0,
      "e": "Ela fica escondida em tocas e sai para caçar."
    },
    {
      "p": "Como a raia-manta nada?",
      "o": [
        "Movimentando as grandes nadadeiras como asas",
        "Batendo a cauda de um lado para o outro",
        "Expulsando água como um jato",
        "Rastejando no fundo"
      ],
      "c": 0,
      "e": "Suas nadadeiras largas lembram asas e dão a ela um nado gracioso."
    },
    {
      "p": "Qual peixe tem o focinho alongado em forma de espada?",
      "o": [
        "Peixe-espada (espadarte)",
        "Barracuda",
        "Moreia",
        "Peixe-palhaço"
      ],
      "c": 0,
      "e": "O espadarte usa o focinho alongado e é um nadador muito veloz."
    },
    {
      "p": "O golfinho-nariz-de-garrafa é…",
      "o": [
        "Um mamífero",
        "Um peixe",
        "Um réptil",
        "Um molusco"
      ],
      "c": 0,
      "e": "Golfinhos respiram ar, amamentam os filhotes e são mamíferos."
    },
    {
      "p": "O que a tartaruga-verde adulta come principalmente?",
      "o": [
        "Algas e plantas marinhas",
        "Águas-vivas",
        "Peixes grandes",
        "Corais"
      ],
      "c": 0,
      "e": "Os filhotes comem de tudo um pouco, mas os adultos são principalmente herbívoros."
    }
  ],
  "dinossauros": [
    {
      "p": "O que significa o nome Tyrannosaurus rex?",
      "o": [
        "Rei dos lagartos tiranos",
        "Lagarto de três chifres",
        "Garra terrível",
        "Ladrão veloz"
      ],
      "c": 0,
      "e": "O nome vem do grego e do latim e quer dizer “rei dos lagartos tiranos”."
    },
    {
      "p": "Quantos chifres tinha o Triceratops?",
      "o": [
        "Três",
        "Dois",
        "Cinco",
        "Nenhum"
      ],
      "c": 0,
      "e": "O nome significa “rosto com três chifres”."
    },
    {
      "p": "Onde foram encontrados principalmente os fósseis do Velociraptor?",
      "o": [
        "Mongólia",
        "Brasil",
        "Canadá",
        "Austrália"
      ],
      "c": 0,
      "e": "Seus fósseis foram achados principalmente na Mongólia."
    },
    {
      "p": "Qual destes é um dos maiores dinossauros terrestres já conhecidos?",
      "o": [
        "Argentinossauro",
        "Compsognato",
        "Microraptor",
        "Velociraptor"
      ],
      "c": 0,
      "e": "As estimativas indicam um gigante de mais de 30 metros, encontrado na Argentina."
    },
    {
      "p": "Qual destes era um dos menores dinossauros carnívoros?",
      "o": [
        "Compsognato",
        "Giganotossauro",
        "Espinossauro",
        "Tiranossauro rex"
      ],
      "c": 0,
      "e": "O Compsognato tinha cerca de 1 metro de comprimento."
    },
    {
      "p": "O que o Estegossauro tinha nas costas e na cauda?",
      "o": [
        "Placas e espinhos",
        "Uma vela",
        "Uma clava",
        "Penas longas"
      ],
      "c": 0,
      "e": "Ele tinha placas ao longo das costas e espinhos na cauda."
    },
    {
      "p": "Qual dinossauro tinha uma clava óssea na ponta da cauda?",
      "o": [
        "Anquilossauro",
        "Estegossauro",
        "Triceratops",
        "Iguanodonte"
      ],
      "c": 0,
      "e": "O Anquilossauro era blindado e usava a clava para se defender."
    },
    {
      "p": "Qual dinossauro tinha uma grande vela nas costas?",
      "o": [
        "Espinossauro",
        "Tiranossauro rex",
        "Triceratops",
        "Galimimo"
      ],
      "c": 0,
      "e": "O Espinossauro tinha uma vela nas costas e hábitos ligados à água."
    },
    {
      "p": "Por que o Archaeopteryx é tão importante?",
      "o": [
        "Liga os dinossauros às aves modernas",
        "Foi o maior dinossauro",
        "Vivia no fundo do mar",
        "Era o maior predador"
      ],
      "c": 0,
      "e": "Ele tinha penas e asas, mas também dentes e cauda longa, como um dinossauro."
    },
    {
      "p": "Por que o Microraptor parecia ter quatro asas?",
      "o": [
        "Tinha penas nos braços e nas pernas",
        "Tinha dois pares de braços",
        "Tinha uma membrana como a dos morcegos",
        "Tinha asas saindo das costelas"
      ],
      "c": 0,
      "e": "Penas longas nos quatro membros davam a ele essa aparência."
    },
    {
      "p": "O que o Parassaurolofo tinha na cabeça?",
      "o": [
        "Uma longa crista oca",
        "Três chifres",
        "Uma cúpula óssea",
        "Dois espinhos no nariz"
      ],
      "c": 0,
      "e": "A crista pode ter servido para emitir sons e se comunicar."
    },
    {
      "p": "Qual dinossauro tinha o crânio grosso em forma de cúpula?",
      "o": [
        "Paquicefalossauro",
        "Parassaurolofo",
        "Carnotauro",
        "Oviraptor"
      ],
      "c": 0,
      "e": "O nome significa “lagarto de cabeça grossa”."
    },
    {
      "p": "O que o Terizinossauro tinha de mais impressionante?",
      "o": [
        "Garras gigantescas nas mãos",
        "Uma clava na cauda",
        "Um chifre no nariz",
        "Asas com penas longas"
      ],
      "c": 0,
      "e": "Suas garras podiam chegar a cerca de 50 centímetros."
    },
    {
      "p": "O que o Iguanodonte tinha no lugar dos polegares?",
      "o": [
        "Espinhos",
        "Garras em forma de foice",
        "Placas",
        "Penas"
      ],
      "c": 0,
      "e": "Os espinhos nos polegares são a marca mais conhecida do Iguanodonte."
    },
    {
      "p": "Nos filmes, o Dilofossauro cospe veneno. O que se sabe sobre isso?",
      "o": [
        "Não há provas de que ele fazia isso",
        "Estudos comprovaram que cuspia",
        "Só cuspia quando estava com fome",
        "Só cuspia quando era filhote"
      ],
      "c": 0,
      "e": "O veneno e a gola foram invenções do cinema."
    },
    {
      "p": "Por que o Oviraptor recebeu o nome “ladrão de ovos”?",
      "o": [
        "Foi achado junto a ovos e acharam que os roubava",
        "Só comia ovos de outros dinossauros",
        "Vivia dentro de ninhos de aves",
        "Colocava seus ovos em ninhos alheios"
      ],
      "c": 0,
      "e": "Foi um engano: hoje se acredita que os ovos eram da própria família dele e que ele os chocava."
    },
    {
      "p": "Em qual período viveu o Tiranossauro rex?",
      "o": [
        "Cretáceo",
        "Triássico",
        "Jurássico",
        "Permiano"
      ],
      "c": 0,
      "e": "Ele viveu há cerca de 68 a 66 milhões de anos, no fim do período Cretáceo."
    },
    {
      "p": "Qual dinossauro lembrava um avestruz e corria muito rápido?",
      "o": [
        "Galimimo",
        "Anquilossauro",
        "Estegossauro",
        "Braquiossauro"
      ],
      "c": 0,
      "e": "O nome Galimimo significa “imitador de galinha”."
    },
    {
      "p": "O que o Carnotauro tinha acima dos olhos?",
      "o": [
        "Dois pequenos chifres",
        "Uma crista oca",
        "Uma vela",
        "Um bico de pato"
      ],
      "c": 0,
      "e": "Seu nome significa “touro carnívoro” e seus braços eram minúsculos."
    },
    {
      "p": "Qual destes dinossauros tinha o pescoço muito longo?",
      "o": [
        "Diplodoco",
        "Tiranossauro rex",
        "Velociraptor",
        "Compsognato"
      ],
      "c": 0,
      "e": "O Diplodoco era um saurópode, com pescoço e cauda muito longos."
    }
  ]
};

const POR_RODADA = 10;
const NOMES = { biologia: 'Biologia Marinha', dinossauros: 'Dinossauros' };

const $ = (id) => document.getElementById(id);
const principal = $('quiz');

let area = null;
let rodada = [];
let indice = 0;
let pontos = 0;
let respondida = false;

function embaralhar(lista) {
  const a = lista.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function lerRecorde(a) {
  try { const v = localStorage.getItem('quiz-recorde-' + a); return v === null ? null : Number(v); } catch (e) { return null; }
}
function gravarRecorde(a, v) {
  try { localStorage.setItem('quiz-recorde-' + a, String(v)); } catch (e) { /* sem armazenamento: tudo bem */ }
}

function mostrarRecordes() {
  for (const a of Object.keys(NOMES)) {
    const r = lerRecorde(a);
    $('recorde-' + a).textContent = r === null ? '' : 'Seu recorde: ' + r + '/' + POR_RODADA;
  }
}

function mostrarTela(nome) {
  $('tela-escolha').hidden = nome !== 'escolha';
  $('tela-pergunta').hidden = nome !== 'pergunta';
  $('tela-final').hidden = nome !== 'final';
}

function iniciar(novaArea) {
  area = novaArea;
  principal.className = area === 'biologia' ? 'marinha' : 'dinossauros';
  rodada = embaralhar(PERGUNTAS[area]).slice(0, POR_RODADA).map((q) => ({
    pergunta: q.p,
    explicacao: q.e,
    opcoes: embaralhar(q.o.map((texto, i) => ({ texto, certa: i === q.c }))),
  }));
  indice = 0;
  pontos = 0;
  mostrarTela('pergunta');
  mostrarPergunta();
}

function mostrarPergunta() {
  const q = rodada[indice];
  respondida = false;

  $('quiz-progresso').textContent = 'Pergunta ' + (indice + 1) + ' de ' + rodada.length;
  $('quiz-pontos').textContent = 'Acertos: ' + pontos;
  $('quiz-barra-cheia').style.width = (indice / rodada.length) * 100 + '%';
  $('quiz-enunciado').textContent = q.pergunta;
  $('quiz-explicacao').hidden = true;
  $('quiz-proxima').hidden = true;

  const caixa = $('quiz-opcoes');
  caixa.textContent = '';
  q.opcoes.forEach((op) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'quiz-opcao';
    b.textContent = op.texto;
    b.addEventListener('click', () => responder(b, op));
    caixa.appendChild(b);
  });
}

function responder(botao, opcao) {
  if (respondida) return;
  respondida = true;
  const q = rodada[indice];

  if (opcao.certa) pontos++;

  const botoes = Array.from($('quiz-opcoes').children);
  botoes.forEach((b, i) => {
    b.disabled = true;
    if (q.opcoes[i].certa) b.classList.add('certa');
  });
  if (!opcao.certa) botao.classList.add('errada');

  const exp = $('quiz-explicacao');
  exp.textContent = (opcao.certa ? '✅ Correto! ' : '❌ Não foi dessa vez. ') + q.explicacao;
  exp.hidden = false;

  $('quiz-pontos').textContent = 'Acertos: ' + pontos;
  $('quiz-barra-cheia').style.width = ((indice + 1) / rodada.length) * 100 + '%';

  const proxima = $('quiz-proxima');
  proxima.textContent = indice === rodada.length - 1 ? 'Ver resultado' : 'Próxima pergunta →';
  proxima.hidden = false;
  proxima.focus();
}

function proxima() {
  if (indice < rodada.length - 1) {
    indice++;
    mostrarPergunta();
  } else {
    terminar();
  }
}

function terminar() {
  const total = rodada.length;
  $('quiz-placar').textContent = 'Você acertou ' + pontos + ' de ' + total + ' perguntas';

  let msg;
  const prop = pontos / total;
  if (prop === 1) msg = 'Perfeito! Você é um expert em ' + NOMES[area] + '! 🏆';
  else if (prop >= 0.7) msg = 'Muito bem! Você conhece bastante sobre o assunto. 👏';
  else if (prop >= 0.5) msg = 'Bom resultado! Explore as páginas do site e tente de novo. 🙂';
  else msg = 'Continue explorando o site e tente outra vez. Você consegue! 💪';
  $('quiz-mensagem').textContent = msg;

  const antigo = lerRecorde(area);
  if (antigo === null || pontos > antigo) {
    gravarRecorde(area, pontos);
    $('quiz-recorde-final').textContent = antigo === null ? 'Primeiro recorde registrado: ' + pontos + '/' + total : '🎉 Novo recorde: ' + pontos + '/' + total + '!';
  } else {
    $('quiz-recorde-final').textContent = 'Seu recorde: ' + antigo + '/' + total;
  }

  mostrarTela('final');
}

function voltarAoInicio() {
  principal.className = '';
  area = null;
  mostrarRecordes();
  mostrarTela('escolha');
}

document.querySelectorAll('.quiz-area').forEach((b) => b.addEventListener('click', () => iniciar(b.dataset.area)));
$('quiz-proxima').addEventListener('click', proxima);
$('quiz-repetir').addEventListener('click', () => iniciar(area));
$('quiz-trocar').addEventListener('click', voltarAoInicio);

mostrarRecordes();
