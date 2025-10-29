document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get('id');

    buscar(id);
});

async function buscar(id){
    const retorno = await fetch("../../php/veiculo/veiculo_get.php?id_veiculo="+id);
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        var registro = resposta.data[0];

        document.getElementById('nome').value = registro.nome
        document.getElementById('modelo').value = registro.modelo;
        document.getElementById('placa').value = registro.placa;
        document.getElementById('cor').value = registro.cor

        window.location.href = "../home/veiculos/index.html";
    }
}