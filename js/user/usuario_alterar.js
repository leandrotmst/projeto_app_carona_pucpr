document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get('id');

    buscar(id);
});

async function buscar(id){
    const retorno = await fetch("../../php/usuario/usuario_get.php?id="+id);
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        var registro = resposta.data[0];

        document.getElementById('nome').value = registro.nome
        document.getElementById('telefone').value = registro.telefone;
        document.getElementById('email').value = registro.email;
        document.getElementById('senha').value = registro.senha
        document.getElementById('nasc').value = registro.nasc
        document.getElementById('tipoUsuario').value = registro.tipo;

        window.location.href = "../home/user/index.html";
    }
}