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

        document.getElementById('id_usuario').value = registro.id_usuario;
        document.getElementById('origem').value     = registro.origem;
        document.getElementById('destino').value    = registro.destino;
        document.getElementById('vagas').value      = registro.vagas;
    }else{
        alert("Erro, não existe: " + resposta.mensagem);
    }
}

document.getElementById('enviar').addEventListener('click', () => {
    alterar();
});

async function alterar(){
    var id_usuario = document.getElementById("id_usuario").value;
    var destino    = document.getElementById("destino").value;
    var origem     = document.getElementById("origem").value;
    var vagas      = document.getElementById("vagas").value;

    const fd = new FormData();
    fd.append('id_usuario', id_usuario);
    fd.append('destino', destino);
    fd.append('origem', origem);
    fd.append('vagas', vagas);

    const retorno = await 
    fetch("../php/carona_alterar.php?id_carona="+id,
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