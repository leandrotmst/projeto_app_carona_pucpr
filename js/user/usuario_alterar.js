document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get('id_usuario');

    buscar(id);
});

async function buscar(id){
    const retorno = await 
    fetch("../../php/usuario/usuario_get.php?id_usuario="+id);
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        var registro = resposta.data[0];

        document.getElementById('nome').value       = registro.nome;
        document.getElementById('telefone').value   = registro.telefone;
        document.getElementById('email').value      = registro.email;
        document.getElementById('senha').value      = registro.senha;
        document.getElementById('confsenha').value  = registro.senha;
        document.getElementById('nasc').value       = registro.nasc;
        document.getElementById('tipo').value       = registro.tipo;
        document.getElementById("id_usuario").value = registro.id_usuario;
    }else{
        alert("Erro, não existe: " + resposta.mensagem);
    }
}

document.getElementById('salvar').addEventListener('click', () => {
    alterar();
});

async function alterar(){
    var nome      = document.getElementById("nome").value;
    var telefone  = document.getElementById("telefone").value;
    var email     = document.getElementById("email").value;
    var senha     = document.getElementById("senha").value;
    var confsenha = document.getElementById("confsenha").value;
    var nasc      = document.getElementById("nasc").value;
    var tipo      = document.getElementById("tipo").value;
    var id        = document.getElementById("id_usuario").value;

    if(senha===confsenha){
        const fd = new FormData();
        fd.append('nome', nome);
        fd.append('telefone', telefone);
        fd.append('email', email);
        fd.append('senha', senha);
        fd.append('nasc', nasc);
        fd.append('tipo', tipo);

        const retorno = await 
        fetch("../../php/usuario/usuario_alterar.php?id_usuario="+id,
        {
            method: "POST",
            body: fd
        });
        const resposta = await retorno.json();

        if(resposta.status=='ok'){
            alert("Sucesso: " + resposta.mensagem);
            window.location.href = '../user/index.html';
        }else{
            alert("Erro: " + resposta.mensagem);
        }
    }
    else{
        alert('As senhas devem ser as mesmas');
    }
}