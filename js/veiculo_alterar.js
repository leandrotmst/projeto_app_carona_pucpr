document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get('id_veiculo');

    buscar(id);
});

async function buscar(id){
    const retorno = await fetch("../php/veiculo_get.php?id_veiculo="+id);
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        var registro = resposta.data[0];

        document.getElementById('id_usuario').value   = registro.id_usuario
        document.getElementById('modelo').value = registro.modelo;
        document.getElementById('placa').value  = registro.placa;
        document.getElementById('cor').value    = registro.cor
        document.getElementById('id_veiculo').value = registro.id_veiculo
    }
}

document.getElementById('salvar').addEventListener('click', () => {
    alterar();
});

async function alterar(){
    var id_usuario   = document.getElementById("id_usuario").value;
    var modelo = document.getElementById("modelo").value;
    var placa  = document.getElementById("placa").value;
    var cor    = document.getElementById("cor").value;
    var id_veiculo = document.getElementById("id_veiculo").value;

    const fd = new FormData();
    fd.append('id_usuario', id_usuario);
    fd.append('modelo', modelo);
    fd.append('placa', placa);
    fd.append('cor', cor);

    const retorno = await 
    fetch("../php/veiculo_alterar.php?id_veiculo="+id_veiculo,
    {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        alert("Sucesso: " + resposta.mensagem);
        window.location.href = 'veiculo.html';
    }else{
        alert("Erro: " + resposta.mensagem);
    }
}