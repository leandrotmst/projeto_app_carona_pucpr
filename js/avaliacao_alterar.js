document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get('id_avaliacao');

    buscar(id);
});

async function buscar(id){
    const retorno = await 
    fetch("../php/avaliacao_get.php?id_avaliacao="+id);
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        var registro = resposta.data[0];

        document.getElementById('id_carona').value    = registro.id_carona;
        document.getElementById('id_avaliado').value  = registro.id_avaliado;
        document.getElementById('id_avaliador').value = registro.id_avaliador;
        document.getElementById('comentario').value   = registro.comentario;
        document.getElementById('id_avaliacao').value = registro.id_avaliacao;
        var nota = String(registro.nota);
        var el = document.querySelector('input[name="nota"][value="'+nota+'"]');
        if(el) el.checked = true;
    }else{
        alert("Erro, não existe: " + resposta.mensagem);
    }
}

document.getElementById('salvar').addEventListener('click', () => {
    alterar();
});

async function alterar(){
    var id_carona    = document.getElementById("id_carona").value;
    var id_avaliado  = document.getElementById("id_avaliado").value;
    var id_avaliador = document.getElementById("id_avaliador").value;
    var nota         = String(registro.nota);
    var radio = document.querySelector('input[name="nota"][value="'+nota+'"]');
    if(radio) radio.checked = true;
    var comentario   = document.getElementById("comentario").value;
    var id_avaliacao   = document.getElementById("id_avaliacao").value;

    const fd = new FormData();
    fd.append('id_carona', id_carona);
    fd.append('id_avaliado', id_avaliado);
    fd.append('id_avaliador', id_avaliador);
    fd.append('senha', senha);
    fd.append('comentario', comentario);

    const retorno = await 
    fetch("../php/avaliacao_alterar.php?id_avaliacao="+id_avaliacao,
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