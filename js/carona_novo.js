document.getElementById('enviar').addEventListener('click', () => {
    novo();
});

async function novo(){
    var id_usuario  = document.getElementById("id_usuario").value;
    var origem      = document.getElementById("origem").value;
    var destino     = document.getElementById("destino").value;
    var passageiros = document.getElementById("passageiros").value;

    const fd = new FormData();
    fd.append('id_usuario', id_usuario);
    fd.append('origem', origem);
    fd.append('destino', destino);
    fd.append('passageiros', passageiros);

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