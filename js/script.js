const areaEntrada = document.getElementById('area-entrada');
const botaoIniciar = document.getElementById('botao-iniciar');
const chkOrdemAleatoria = document.getElementById('ordem-aleatoria');
const chkOrdemOriginal = document.getElementById('ordem-original');
const areaQuiz = document.getElementById('area-quiz');
const textoPergunta = document.getElementById('texto-pergunta');
const textoResposta = document.getElementById('texto-resposta');
const botaoMostrarResposta = document.getElementById('botao-mostrar-resposta');
const botaoAcertou = document.getElementById('botao-acertou');
const botaoErrou = document.getElementById('botao-errou');
const telaFinal = document.getElementById('tela-final');
const listaAcertos = document.getElementById('lista-acertos');
const listaErros = document.getElementById('lista-erros');

let cartoes = [];
let conjuntoAtual = [];
let indiceAtual = 0;
let acertos = [];
let erros = [];

function interpretarEntrada(texto) {
  return texto.split('\n').map(linha => {
    const match = linha.match(/P:\s*(.*?)\s*\/\s*R:\s*(.*)/);
    return match ? { pergunta: match[1], resposta: match[2] } : null;
  }).filter(Boolean);
}

function embaralhar(lista) {
  for (let i = lista.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }
  return lista;
}

function iniciarQuiz() {
  cartoes = interpretarEntrada(areaEntrada.value);
  if (cartoes.length === 0) {
    alert('Adicione perguntas válidas!');
    return;
  }
  indiceAtual = 0;
  acertos = [];
  erros = [];
  conjuntoAtual = chkOrdemOriginal.checked ? cartoes.slice() : embaralhar(cartoes.slice());

  document.querySelector('.container-entrada').style.display = 'none';
  areaQuiz.style.display = 'block';
  telaFinal.style.display = 'none';
  mostrarProximo();
}

function mostrarProximo() {
  if (indiceAtual >= conjuntoAtual.length) {
    finalizarQuiz();
    return;
  }
  const cartao = conjuntoAtual[indiceAtual];
  textoPergunta.textContent = `P: ${cartao.pergunta}`;
  textoResposta.textContent = `R: ${cartao.resposta}`;
  textoResposta.classList.add('oculto');
  botaoAcertou.classList.add('oculto');
  botaoErrou.classList.add('oculto');
}

function mostrarResposta() {
  textoResposta.classList.remove('oculto');
  botaoAcertou.classList.remove('oculto');
  botaoErrou.classList.remove('oculto');
}

function registrarResposta(correto) {
  const cartao = conjuntoAtual[indiceAtual];
  if (correto) {
    acertos.push(cartao);
  } else {
    erros.push(cartao);
  }
  indiceAtual++;
  mostrarProximo();
}

function finalizarQuiz() {
  areaQuiz.style.display = 'none';
  telaFinal.style.display = 'block';
  listaAcertos.innerHTML = acertos.map(c => `<li class="acerto">P: ${c.pergunta} / R: ${c.resposta}</li>`).join('');
  listaErros.innerHTML = erros.map(c => `<li class="erro">P: ${c.pergunta} / R: ${c.resposta}</li>`).join('');
}

function reiniciar(somenteErros) {
  conjuntoAtual = somenteErros ? erros.slice() : cartoes.slice();
  if (chkOrdemAleatoria.checked) conjuntoAtual = embaralhar(conjuntoAtual);
  indiceAtual = 0;
  acertos = [];
  erros = [];
  telaFinal.style.display = 'none';
  areaQuiz.style.display = 'block';
  mostrarProximo();
}

botaoIniciar.addEventListener('click', iniciarQuiz);
botaoMostrarResposta.addEventListener('click', mostrarResposta);
botaoAcertou.addEventListener('click', () => registrarResposta(true));
botaoErrou.addEventListener('click', () => registrarResposta(false));

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && areaEntrada.value.trim()) {
    iniciarQuiz();
  }
});
