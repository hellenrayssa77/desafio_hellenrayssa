document.querySelector('#logar').addEventListener('click', (e)=>{
    e.preventDefault();
    entrar()
})

function entrar(){
    let usuario = document.querySelector('#login');
    let senha = document.querySelector('#senha');

    let listaUser = [];

    let usuarioValido = {
        login: '', senha: ''
    }

    listaUser = JSON.parse(localStorage.getItem('usuarios'));

    listaUser.forEach(documento=>{
        if(usuario.value === documento.login && senha.value === documento.senha){
            usuarioValido = {
                id: documento.id, login: documento.login, senha: documento.senha
            }
        }
    })

    if(usuario.value === usuarioValido.login && senha.value === usuarioValido.senha){
        alert('tudo ok :)')
        saveSession(usuarioValido.id);
        window.location.href ='home.html';
    }else{
        alert('algo não esta correto, tente consertar :(')
    }

    console.log(usuarioValido);
}

function saveSession(data){
    if(saveSession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logado", JSON.stringify(data));

}