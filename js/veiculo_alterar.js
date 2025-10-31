document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get('id');

    buscar(id);
});

async function buscar(id){
    const retorno = await fetch("../php/veiculo_get.php?id_veiculo="+id);
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        var registro = resposta.data[0];

        document.getElementById('nome').value   = registro.nome
        document.getElementById('modelo').value = registro.modelo;
        document.getElementById('placa').value  = registro.placa;
        document.getElementById('cor').value    = registro.cor

        window.location.href = "veiculo.html";
    }
}

document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alterar();
});

async function alterar(){
    var nome   = document.getElementById("nome").value;
    var modelo = document.getElementById("modelo").value;
    var placa  = document.getElementById("placa").value;
    var cor    = document.getElementById("cor").value;
    var id     = document.getElementById("id_veiculo").value;

    if(senha===confsenha){
        const fd = new FormData();
        fd.append('nome', nome);
        fd.append('modelo', modelo);
        fd.append('placa', placa);
        fd.append('cor', cor);

        const retorno = await 
        fetch("../php/veiculo_alterar.php?id_veiculo="+id,
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
    else{
        alert('As senhas devem ser as mesmas');
    }
}