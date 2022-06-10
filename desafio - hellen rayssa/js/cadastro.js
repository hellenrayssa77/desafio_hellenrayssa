//criar fora do evento um vetor - variavel composta - ela recebe mais de um valor 
//let db = [];

document.querySelector('#cadastro').addEventListener('click', (w) => {
    w.preventDefault();
    let email = document.querySelector('#login').value;
    let senha = document.querySelector('#senha').value;
    
    if( email === '' || senha === ''){
        alert('preencha todos os campos!')
    }else if( email != '' || senha != ''){
        salvar( email , senha);
    }
});

function salvar(e, s) {
    let db = JSON.parse(localStorage.getItem('usuarios') || '[]');
    let usuario = {
        id: db.length + 1, login: e, senha: s
    }
    
    db.push(usuario);
   
    localStorage.setItem('usuarios', JSON.stringify(db));
    
    location.href = 'login.html';
} 

