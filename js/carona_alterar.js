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
        document.getElementById('origem').value = registro.origem;
        document.getElementById('destino').value = registro.destino;
        document.getElementById('data_hora_partida').value = registro.data_hora_partida;
        document.getElementById('vagas').value = registro.vagas;
        document.getElementById('distancia').value = registro.distancia;
        document.getElementById('tempo_estimado').value = registro.tempo_estimado;
        document.getElementById('id_carona').value = registro.id_carona;
    }else{
        alert("Erro, não existe: " + resposta.mensagem);
    }
}

document.getElementById('salvar').addEventListener('click', () => {
    alterar();
});

async function alterar(){
    var id_usuario = document.getElementById("id_usuario").value;
    var origem = document.getElementById("origem").value;
    var destino = document.getElementById("destino").value;
    var data_hora_partida = document.getElementById("data_hora_partida").value;
    var id_veiculo = document.getElementById("id_veiculo").value;
    var vagas = document.getElementById("vagas").value;
    var distancia = document.getElementById("distancia").value;
    var tempo_estimado = document.getElementById("tempo_estimado").value;
    var id_carona = document.getElementById("id_carona").value;

    const fd = new FormData();
    fd.append('id_usuario', id_usuario);
    fd.append('origem', origem);
    fd.append('destino', destino);
    fd.append('data_hora_partida', data_hora_partida);
    fd.append('id_veiculo', id_veiculo);
    fd.append('vagas', vagas);
    fd.append('distancia', distancia);
    fd.append('tempo_estimado', tempo_estimado);

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