document.getElementById('avaliacaoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    novo();
});

async function novo(){
    var idCarona = document.getElementById("id_carona").value;
    var idAvaliado = document.getElementById("id_avaliado").value;
    var idAvaliador = document.getElementById("id_avaliador").value;
    var notaEl = document.querySelector('input[name="nota"]:checked');
    var nota = notaEl ? notaEl.value : null;
    var comentario = document.getElementById("comentario").value;

    if(!nota){
        alert("Por favor selecione uma nota (1 a 5)");
        return;
    }

    const fd = new FormData();
    fd.append('id_carona', idCarona);
    fd.append('id_avaliado', idAvaliado);
    fd.append('id_avaliador', idAvaliador);
    fd.append('nota', nota);
    fd.append('comentario', comentario);

    const retorno = await fetch("../php/avaliacao_novo.php",
    {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        alert("Sucesso: " + resposta.mensagem);
        window.location.href = 'avaliacao.html';
    }else{
        alert("Erro: " + resposta.mensagem);
    }
}