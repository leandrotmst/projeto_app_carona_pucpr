document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get('id_carona');

    buscar(id);
});

async function buscar(id){
    const retorno = await 
    fetch("../php/carona_get.php?id_carona="+id);
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        var registro = resposta.data[0];

        document.getElementById('id_usuario').value  = registro.id_usuario;
        document.getElementById('origem').value      = registro.origem;
        document.getElementById('destino').value     = registro.destino;
        document.getElementById('passageiros').value = registro.passageiros;
        document.getElementById('id_carona').value = registro.id_carona;
    }else{
        alert("Erro, não existe: " + resposta.mensagem);
    }
}

document.getElementById('salvar').addEventListener('click', () => {
    alterar();
});

async function alterar(){
    var id_usuario  = document.getElementById("id_usuario").value;
    var origem      = document.getElementById("origem").value;
    var destino     = document.getElementById("destino").value;
    var passageiros = document.getElementById("passageiros").value;
    var id_carona = document.getElementById("id_carona").value;

    const fd = new FormData();
    fd.append('id_usuario', id_usuario);
    fd.append('origem', origem);
    fd.append('destino', destino);
    fd.append('passageiros', passageiros);

    const retorno = await 
    fetch("../php/carona_alterar.php?id_carona="+id_carona,
    {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        alert("Sucesso: " + resposta.mensagem);
        window.location.href = 'carona.html';
    }else{
        alert("Erro: " + resposta.mensagem);
    }
}