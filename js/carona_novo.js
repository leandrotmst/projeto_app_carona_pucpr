document.getElementById('enviar').addEventListener('click', () => {
    novo();
});

async function novo(){
    var id_usuario = document.getElementById("id_usuario").value;
    var origem = document.getElementById("origem").value;
    var destino = document.getElementById("destino").value;
    var data_hora_partida = document.getElementById("data_hora_partida").value;
    var id_veiculo = document.getElementById("id_veiculo").value;
    var vagas = document.getElementById("vagas").value;
    var distancia = document.getElementById("distancia").value;
    var tempo_estimado = document.getElementById("tempo_estimado").value;

    const fd = new FormData();
    fd.append('id_usuario', id_usuario);
    fd.append('origem', origem);
    fd.append('destino', destino);
    fd.append('data_hora_partida', data_hora_partida);
    fd.append('id_veiculo', id_veiculo);
    fd.append('vagas', vagas);
    fd.append('distancia', distancia);
    fd.append('tempo_estimado', tempo_estimado);

    const retorno = await fetch("../php/carona_novo.php",
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