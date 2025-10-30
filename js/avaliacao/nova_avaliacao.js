document.getElementById('enviar').addEventListener('click', () => {
    novo();
});

async function novo(){
    var idCarona = document.getElementById("id_carona").value;
    var idAvaliado = document.getElementById("id_avaliado").value;
    var idAvaliador = document.getElementById("id_avaliador").value;
    var nota = document.getElementById("nota").value;
    var comentario = document.getElementById("comentario").value;

    const fd = new FormData();
    fd.append('id_carona', idCarona);
    fd.append('id_avaliado', idAvaliado);
    fd.append('id_avaliador', idAvaliador);
    fd.append('nota', nota);
    fd.append('comentario', comentario);

    const retorno = await fetch("../../php/usuario/avaliacao_novo.php",
    {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        alert("Sucesso: " + resposta.mensagem);
        window.location.href = 'feed.html';
    }else{
        alert("Erro: " + resposta.mensagem);
    }
}