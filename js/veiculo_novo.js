document.getElementById('enviar').addEventListener('click', () => {
    novo();
});

async function novo(){
    var id_usuario = document.getElementById("id_usuario").value;
    var modelo = document.getElementById("modelo").value;
    var cor = document.getElementById("cor").value;
    var ano = document.getElementById("ano").value;

    const fd = new FormData();
    fd.append('id_usuario', id_usuario);
    fd.append('modelo', modelo);
    fd.append('cor', cor);
    fd.append('ano', ano);

    const retorno = await fetch("../php/veiculo_novo.php",
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
