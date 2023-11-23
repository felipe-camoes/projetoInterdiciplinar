const produtosJson = {
    lanche: [
      {
        imagem: "Imagens/icon_lanche.png",
        nome: "x-tudo",
        preço: "R$ 25.99",
      },
      {
        imagem: "Imagens/icon_lanche.png",
        nome: "x-salada",
        preço: "R$ 29.99",
      },
      {
        imagem: "Imagens/icon_lanche.png",
        nome: "x-bacon",
        preço: "R$ 28.99",
      },
      {
        imagem: "Imagens/icon_lanche.png",
        nome: "x-bacon-egg",
        preço: "R$ 29.99",
      },
      {
        imagem: "Imagens/icon_lanche.png",
        nome: "x-egg",
        preço: "R$ 27.99",
      },
      {
        imagem: "Imagens/icon_lanche.png",
        nome: "hot-dog",
        preço: "R$ 22.99",
      },
    ],
    bebida: [
      {
        imagem: "Imagens/icon_bebida.png",
        nome: "fanta-laranja",
        preço: "R$ 7.99",
      },
      {
        imagem: "Imagens/icon_bebida.png",
        nome: "fanta-uva",
        preço: "R$ 7.99",
      },
      {
        imagem: "Imagens/icon_bebida.png",
        nome: "cola-cola",
        preço: "R$ 7.99",
      },
      {
        imagem: "Imagens/icon_bebida.png",
        nome: "guarana",
        preço: "R$ 6.49",
      },
      {
        imagem: "Imagens/icon_bebida.png",
        nome: "sprite",
        preço: "R$ 6.49",
      },
      {
        imagem: "Imagens/icon_bebida.png",
        nome: "h2oh",
        preço: "R$ 6.49",
      },
    ],
    acompnhamento: [
      {
        imagem: "Imagens/icon_acompanhamento.png",
        nome: "bata-frita pequena",
        preço: "R$ 9.99",
      },
      {
        imagem: "Imagens/icon_acompanhamento.png",
        nome: "bata-frita média",
        preço: "R$ 11.99",
      },
      {
        imagem: "Imagens/icon_acompanhamento.png",
        nome: "bata-frita grande",
        preço: "R$ 12.99",
      },
      {
        imagem: "Imagens/icon_acompanhamento.png",
        nome: "10 nuggets",
        preço: "R$ 11.99",
      },
    ],
    sobremesa: [
      {
        imagem: "Imagens/icon_sobremesa.png",
        nome: "sundae",
        preço: "R$ 5.99",
      },
      {
        imagem: "Imagens/icon_sobremesa.png",
        nome: "casquinha",
        preço: "R$ 2.99",
      },
      {
        imagem: "Imagens/icon_sobremesa.png",
        nome: "torta",
        preço: "R$ 9.99",
      },
      {
        imagem: "Imagens/icon_sobremesa.png",
        nome: "top sundae",
        preço: "R$ 8.99",
      },
      {
        imagem: "Imagens/icon_sobremesa.png",
        nome: "milk-shake",
        preço: "R$ 11.99",
      },
    ],
  };


  
  // Exibição dos produtos

  const exibirProduto = function () {
    const containerProdutos = document.querySelector(".container__produtos");

    for (const categoria in produtosJson) {
      const containerCategoria = document.createElement("div");
      containerCategoria.className = "container__categoria--produtos";

      for (const produto of produtosJson[categoria]) {
        const divProduto = document.createElement("div");
        divProduto.className = "produto";

        const imagemProduto = document.createElement("img");
        imagemProduto.className = "imagem__produto";
        imagemProduto.src = produto.imagem;

        const descricaoProduto = document.createElement("div");
        descricaoProduto.className = "descricao__produto";
        descricaoProduto.textContent = produto.nome;

        const precoProduto = document.createElement("div");
        precoProduto.className = "preco__produto";
        precoProduto.textContent = produto.preço;

        divProduto.appendChild(imagemProduto);
        divProduto.appendChild(descricaoProduto);
        divProduto.appendChild(precoProduto);

        containerCategoria.appendChild(divProduto);
      }
      containerProdutos.appendChild(containerCategoria);
    }
  };

  exibirProduto();

// integraçao com o indexDB
let db;
const request = indexedDB.open('NomeDoSeuBancoDeDados', 1);

request.onupgradeneeded = function (event) {
  db = event.target.result;


  const lancheStore = db.createObjectStore('lanche', { keyPath: 'nome' });
  const bebidaStore = db.createObjectStore('bebida', { keyPath: 'nome' });
  const acompanhamentoStore = db.createObjectStore('acompanhamento', { keyPath: 'nome' });
  const sobremesaStore = db.createObjectStore('sobremesa', { keyPath: 'nome' });


  produtosJson.lanche.forEach(item => lancheStore.add(item));
  produtosJson.bebida.forEach(item => bebidaStore.add(item));
  produtosJson.acompnhamento.forEach(item => acompanhamentoStore.add(item));
  produtosJson.sobremesa.forEach(item => sobremesaStore.add(item));
};



const produtos = document.querySelectorAll(".produto");
const showProduto = document.querySelector("#show__produto");
const showPreco = document.querySelector("#show__preco");
const showQuantidade = document.querySelector("#show__quantidade");
const botaoMais = document.querySelector(".botao__mais");
const botaoMenos = document.querySelector(".botao__menos");
const botaoAdicionar = document.querySelector(".botao__adicionar");
const botaoFinalizar = document.querySelector(".botao__finalizar")
const produtosSelecionados = [];
const produto = [];
let numero = 0
let pedidosFazendo = []

// Clicar Produto
produtos.forEach((el) => {
    el.addEventListener("click", () => {
        showProduto.value = el.childNodes[1].innerHTML;
        showPreco.value = el.childNodes[2].innerHTML
    });
});
botaoMais.addEventListener("click", somar);
botaoMenos.addEventListener("click", subtrair);
botaoAdicionar.addEventListener("click", adicionar);
botaoFinalizar.addEventListener("click", finalizar);

// Função somar unidade produto
function somar() {
    if (showQuantidade.value >= 1 && showQuantidade.value < 30 && showProduto.value != "") {
        showQuantidade.value = Number(showQuantidade.value) + 1;
    }
}

// Função subtrair unidade produto
function subtrair() {
    if (showQuantidade.value > 1 && showQuantidade.value <= 30 && showProduto.value != "") {
        showQuantidade.value = Number(showQuantidade.value) - 1;
    }
}

// Função adicionar produto ao display
function adicionar() {
    if (showProduto.value !== "") {
        let produtoNome = showProduto.value;
        let quantidade = Number(showQuantidade.value);
        let valorProduto = Number(showPreco.value.slice(2))

        const produtoExistente = produtosSelecionados.find(
            (el) => el[0] === produtoNome
        );
        if (produtoExistente) {
            produtoExistente[1] += quantidade;
        } else {
            produtosSelecionados.push([produtoNome, quantidade, valorProduto]);
        }
        showProduto.value = "";
        showPreco.value = "R$ 0.00";
        showQuantidade.value = "1";
        display(produtosSelecionados);
    }
}

// Exibição dos produtos
function display(produtos) {
    document.querySelectorAll(".tela__produto").forEach((el) => {
        el.remove();
    });
    produtos.forEach((el) => {
        const telaProduto = document.createElement("div");
        const item = document.createElement("div");
        const un = document.createElement("div");
        const total = document.createElement("div");
        const remover = document.createElement("div");

        telaProduto.classList.add("tela__produto")
        item.classList.add("item");
        un.classList.add("un");
        total.classList.add("total");
        remover.classList.add("remover");

        item.innerHTML = `${el[0]}`;
        un.innerHTML = `${el[1]}`;
        total.innerHTML = `R$ ${Number(el[2] * el[1]).toFixed(2)}`;
        remover.innerHTML = "X";

        remover.addEventListener('click', removerProduto)

        telaProduto.appendChild(item);
        telaProduto.appendChild(un);
        telaProduto.appendChild(total);
        telaProduto.appendChild(remover);

        document.querySelector(".tela").appendChild(telaProduto)
        preco(produtosSelecionados)
    });

}

// Remover produto 
function removerProduto() {
    produtosSelecionados.forEach((el, ind) => {
        if (el[0] == this.parentNode.firstChild.innerHTML) {
            produtosSelecionados.splice(ind, 1)
            this.parentNode.remove()
            preco(produtosSelecionados)
        }
    })
}

// Preço final 
function preco(produtos) {
    let total = 0
    produtos.forEach((el) => {
        total += el[2] * el[1]
    });
    document.querySelector(".total__produtos--valor").value = `R$ ${total.toFixed(2)}`
}

// Finalizar pedido
function finalizar() {
    if (produtosSelecionados.length != 0) {
        displayCozinheiro(produtosSelecionados)
        produtosSelecionados.splice(0, produtosSelecionados.length)
        display(produtosSelecionados)
        preco(produtosSelecionados)
    }
}

// Display cozinheiro
function displayCozinheiro(produtos) {

    numero = numero + 1


    const display = document.querySelector('.tela__produto_finalizacao')

    const containerPedido = document.createElement("div")
    containerPedido.classList.add("container__pedido")
    // Label pedido 
    const labelPedido = document.createElement("div")
    const pedido = document.createElement("div")
    const numeroPedido = document.createElement("div")

    labelPedido.classList.add("label__pedido")
    numeroPedido.classList.add("numero__pedido", "une")

    pedido.innerHTML = "pedido"
    numeroPedido.innerHTML = `# ${numero}`

    labelPedido.append(pedido, numeroPedido)
    containerPedido.appendChild(labelPedido)

    // Container finalizacao
    const containerFinalizacao = document.createElement("div")
    containerFinalizacao.classList.add("container__produtos_finalizacao")

    produtos.forEach((el) => {
        const descriPedido = document.createElement("div")
        descriPedido.innerHTML = el[0]
        const unePedido = document.createElement("div")
        unePedido.innerHTML = el[1]
        unePedido.classList.add("une")
        containerFinalizacao.append(descriPedido, unePedido)
        containerPedido.appendChild(containerFinalizacao)
    })

    // Botao finalizar
    const botaoFinalizar = document.createElement("div")
    const label = document.createElement("label")
    const botao = document.createElement("button")

    botaoFinalizar.classList.add("botao__finalizacao")
    label.innerHTML = "FINALIZAR :"
    botao.setAttribute("id", "botaoPedido")
    botao.classList.add("botao__fin")
    botao.innerHTML = "X"
    botaoFinalizar.append(label, botao)
    botao.addEventListener("click", finalizarPedido)

    containerPedido.appendChild(botaoFinalizar)

    // Diplay
    display.appendChild(containerPedido)

    produtoFazendo(`# ${numero}`)

}

// Finaliza o pedido
function finalizarPedido() {
    this.parentNode.parentNode.remove()
    const numeroPedido = this.parentNode.parentNode.firstChild.lastChild.innerHTML
    produtoPronto(numeroPedido)
}

// Mostra os produtos prontos
function produtoPronto(pedido) {
    const produtoPronto = document.querySelector(".container__produto__pronto")
    const numeroPedido = document.createElement("div")

    numeroPedido.innerHTML = `${pedido}`
    numeroPedido.classList.add("produto__pronto")
    produtoPronto.appendChild(numeroPedido)
    produtoFazendo(null, pedido)
}

// Mostra os produtos fazendo
function produtoFazendo(pedido, pedidoFazendo) {
    function listaElementos() {
        const d = document.querySelectorAll(".numeroFazendo")
        return d
    }
    if (pedido != null){
        const displayFazendo = document.querySelector(".container__produto__fazendo")
        const elementoFazendo = document.createElement("div")
    
        elementoFazendo.innerHTML = pedido
        elementoFazendo.classList.add("numeroFazendo")
        displayFazendo.append(elementoFazendo)
    
    }
    
    const elementos = listaElementos()
    elementos.forEach((el) => {
        if (pedidoFazendo == el.innerHTML) {
            el.remove()
        }
    })
}


