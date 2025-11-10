document.getElementById('enviar').addEventListener('click', () => {
    novo();
});

async function novo(){
    var id_usuario = document.getElementById("id_usuario").value;
    var modelo = document.getElementById("modelo").value;
    var placa = document.getElementById("placa").value;
    var cor = document.getElementById("cor").value;

    const fd = new FormData();
    fd.append('id_usuario', id_usuario);
    fd.append('modelo', modelo);
    fd.append('placa', placa);
    fd.append('cor', cor);

    const retorno = await fetch("../php/veiculo_novo.php",
    {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        window.location.href = 'veiculo.html';
    }else{
        alert("Erro: " + resposta.mensagem);
    }
}
