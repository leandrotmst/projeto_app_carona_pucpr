document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get('id');

    buscar(id);
});

async function buscar(id){
    const retorno = await fetch("../php/rota_get.php?id_rota="+id);
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        var registro = resposta.data[0];

        document.getElementById('origem').value         = registro.origem
        document.getElementById('destino').value        = registro.destino;
        document.getElementById('distancia').value      = registro.distancia;
        document.getElementById('tempo_estimado').value = registro.tempo_estimado

        window.location.href = "rota.html";
    }
}

document.getElementById('salvar').addEventListener('click', () => {
    alterar();
});

async function alterar(){
    var id_usuario     = document.getElementById("id_usuario").value;
    var origem         = document.getElementById("origem").value;
    var destino        = document.getElementById("destino").value;
    var distancia      = document.getElementById("distancia").value;
    var tempo_estimado = document.getElementById("tempo_estimado").value;
    var id_rota        = document.getElementById("id_rota").value;



    if(senha===confsenha){
        const fd = new FormData();
        fd.append('id_usuario', id_usuario);
        fd.append('origem', origem);
        fd.append('destino', destino);
        fd.append('distancia', distancia);
        fd.append('tempo_estimado', tempo_estimado);

        const retorno = await 
        fetch("../php/rota_alterar.php?id_rota="+id_rota,
        {
            method: "POST",
            body: fd
        });
        const resposta = await retorno.json();

        if(resposta.status=='ok'){
            alert("Sucesso: " + resposta.mensagem);
            window.location.href = 'rota.html';
        }else{
            alert("Erro: " + resposta.mensagem);
        }
    }
    else{
        alert('As senhas devem ser as mesmas');
    }
}