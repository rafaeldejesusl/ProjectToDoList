const textoTarefa = document.querySelector('#texto-tarefa');
const criarTarefa = document.querySelector('#criar-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');

function adicionar() {
  const novo = document.createElement('li');
  novo.innerText = textoTarefa.value;
  novo.className = 'itemlista';
  listaTarefas.appendChild(novo);
  textoTarefa.value = '';
}
criarTarefa.addEventListener('click', adicionar);

const itemLista = listaTarefas.children;
function selecao(event) {
  const evt = event.target;
  if (evt !== listaTarefas) {
    for (let i = 0; i < itemLista.length; i += 1) {
      itemLista[i].classList.remove('selected');
    }
    evt.className = `${evt.className} selected`;
  }
}
listaTarefas.addEventListener('click', selecao);

function riscar(event) {
  const evt = event.target;
  if (evt.classList.contains('completed') === true) {
    evt.classList.remove('completed');
  } else {
    evt.className = `${evt.className} completed`;
  }
}
listaTarefas.addEventListener('dblclick', riscar);

const apagaTudo = document.querySelector('#apaga-tudo');
function apagar() {
  for (let i = itemLista.length; i > 0; i -= 1) {
    listaTarefas.removeChild(listaTarefas.lastChild);
  }
}
apagaTudo.addEventListener('click', apagar);

const removerFinalizados = document.querySelector('#remover-finalizados');
function remover() {
  for (let i = itemLista.length - 1; i >= 0; i -= 1) {
    if (itemLista[i].classList.contains('completed') === true) {
      listaTarefas.removeChild(itemLista[i]);
    }
  }
}
removerFinalizados.addEventListener('click', remover);

const salvarTarefas = document.querySelector('#salvar-tarefas');
function salvar() {
  localStorage.clear();
  for (let i = 0; i < itemLista.length; i += 1) {
    const objeto = {
      classe: itemLista[i].className,
      conteudo: itemLista[i].innerText,
    };
    const local = JSON.stringify(i);
    localStorage.setItem(local, JSON.stringify(objeto));
  }
}
salvarTarefas.addEventListener('click', salvar);

const moverCima = document.querySelector('#mover-cima');
function subir() {
  const selected = document.querySelector('.selected');
  if (selected !== itemLista[0] && selected !== null) {
    listaTarefas.insertBefore(selected, selected.previousSibling);
  }
}
moverCima.addEventListener('click', subir);

const moverBaixo = document.querySelector('#mover-baixo');
function descer() {
  const selected = document.querySelector('.selected');
  if (selected !== itemLista[itemLista.length - 1] && selected !== null) {
    listaTarefas.insertBefore(selected, selected.nextSibling.nextSibling);
  }
}
moverBaixo.addEventListener('click', descer);

const removerSelecionado = document.querySelector('#remover-selecionado');
function remover1() {
  for (let i = itemLista.length - 1; i >= 0; i -= 1) {
    if (itemLista[i].classList.contains('selected') === true) {
      listaTarefas.removeChild(itemLista[i]);
    }
  }
}
removerSelecionado.addEventListener('click', remover1);

function carregamento() {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i += 1) {
      const objeto = JSON.parse(localStorage[i]);
      const novo = document.createElement('li');
      novo.innerText = objeto.conteudo;
      novo.className = objeto.classe;
      listaTarefas.appendChild(novo);
    }
  }
}
window.addEventListener('load', carregamento);
