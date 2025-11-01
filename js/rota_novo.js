document.getElementById('enviar').addEventListener('click', () => {
    novo();
});

async function novo(){
    var id_usuario     = document.getElementById("id_usuario").value;
    var origem         = document.getElementById("origem").value;
    var destino        = document.getElementById("destino").value;
    var distancia      = document.getElementById("distancia").value;
    var tempo_estimado = document.getElementById("tempo_estimado").value;

    const fd = new FormData();
    fd.append('id_usuario', id_usuario);
    fd.append('origem', origem);
    fd.append('destino', destino);
    fd.append('distancia', distancia);
    fd.append('tempo_estimado', tempo_estimado);

    const retorno = await fetch("../php/rota_novo.php",
    {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        window.location.href = 'index.html';
    }else{
        alert("Erro: " + resposta.mensagem);
    }
}
