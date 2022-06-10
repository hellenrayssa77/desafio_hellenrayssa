const form = document.querySelector('#infos-prod');
const tabela = document.querySelector('#tbody');
const divErro = document.querySelector('#msg-erro');
let idx = form.idx.value;

let usuarioId = Number(sessionStorage.getItem('logado'));
const session = localStorage.getItem("session");

logadoOuNao();

function logadoOuNao(){
    if(session){
        sessionStorage.setItem("log" , session);
        usuarioId = session;
    }
}

console.log(usuarioId);

const atualizarLocalStorage = (produtos) => {
    localStorage.setItem('produtos', JSON.stringify(produtos));
};

const recuperarLocalStorage = () => { 
    const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
    return produtos;
};

const salvarProduto = (event) => {
    event.preventDefault()

    console.log("acabou de passar pelo evento!");

    divErro.innerHTML = "";
    const nome = form.nome.value;
    const preco = Number(form.preco.value);
    const prime = form.prime.checked;
    const erros = [];

    if( !nome || nome.length <2){
        erros.push("<p>nome inválido</p>");
    }

    if( !preco || preco <=0){
        erros.push("<p>preço inválido</p>");
    }

    if( erros.length >0){
        divErro.innerHTML = erros.join("");
        return;
    }

    console.log(idx)

    if(idx == 'novo') {
        const produtos = recuperarLocalStorage();
        let idp = 0;
        for( const pro of produtos){
            if(pro.usuarioId === usuarioId){
                idp = Number(pro.id);
            }
        }

        produtos.push({id: idp += 1 , nome, preco, prime, usuarioId});
        atualizarLocalStorage(produtos);
        preencherTabela();
        form.reset();
        console.log(idx, "teste")
    }else{
    let produto = {id: idx, nome, preco, prime, usuarioId}
    atualizarProduto(idx, produto);
    preencherTabela();
    form.reset();
    idx = 'novo';
    console.log('editar' , idx);
    }
}

  const preencherTabela = () =>{
      const produtos = recuperarLocalStorage();
      tabela.innerHTML = '';
      for (const produto of produtos){
        if (produto.usuarioId === usuarioId){
          tabela.innerHTML += `

          <tr>
          <th scope= "row">${produto.id}</th>
          <td>${produto.nome}</td>
          <td>${produto.preco}</td>
          <td>${produto.prime ? "sim" : "não"}</td>

          <td>
          <img type="button" width="40" src="icons8-delete-48.png" onclick="removerProduto(${produto.id})" />
          <img type= "button" width="40" src="icons8-edit-48.png" onclick="editarProduto(${produto.id})" />
          </tr>

          `;
      }}
  }

const removerProduto = (id) =>{
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id)
    console.log(produtos[indexProduto]);

    if (indexProduto < 0)return;
    produtos.splice(indexProduto, 1);
    atualizarLocalStorage(produtos);
    alert ('o produto foi removido!')
    preencherTabela();
}

    const editarProduto = (id) => {
        const produtos = recuperarLocalStorage();
        const indexProduto = produtos.findIndex((produto)=> produto.id === id)
       form.nome.value = produtos [indexProduto].nome;
       form.preco.value = produtos [indexProduto].preco;
       form.prime.checked = produtos[indexProduto].prime;
       idx = id;
       console.log(idx)
            
        }
    
     atualizarProduto = (idx,produto) => {
            const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
            const indexProduto = produtos.findIndex((produto) => produto.id ===id)
            produtos[indexProduto] = produto;
            localStorage.setItem("produtos" , JSON.stringify(produtos));

        }

        form.addEventListener('submit', salvarProduto)
        document.addEventListener('DOMContentLoaded' , preencherTabela);
        let sair = document.querySelector('#sair');

        sair.addEventListener('click' , function(){
            saindo()
        });

        function saindo(){
            sessionStorage.removeItem("logado");
            localStorage.removeItem("session");
            window.location.href = "cadastro.html"
        }

        form === null || form === void 0 ? void 0 : form.addEventListener('submit', salvarProduto);
        document.addEventListener('DOMContentLoaded', preencherTabela);