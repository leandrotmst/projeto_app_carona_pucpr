document.addEventListener("DOMContentLoaded", ()=>{
    const params = new URLSearchParams(window.location.search);
    const veiculoId = params.get('id');
    const isEditing = veiculoId !== null; // Pega o ID na URL
    const titulo = document.getElementById("form-titulo"); // Título da página
    const nomeBotao = document.getElementById("enviar"); // Escrita no botão

    if(isEditing){
        // Se achar ID na URL -> Muda o título e nome no botão para edição 
        titulo.textContent = "Atualizar Veículo";
        nomeBotao.textContent = "Salvar Alterações";
        carregarDadosVeiculo(veiculoId);
    }
    else{
        // Senão -> Muda o título e nome no botão para cadastro 
        titulo.textContent = "Cadastrar novo veículo";
        nomeBotao.textContent = "Cadastrar";
    }  
    document.getElementById("enviar").addEventListener("click", function(event){
        event.preventDefault();

        var obj = {nome: "", modelo: "", placa:"", cor: ""};
        obj.nome = document.getElementById("nome").value;
        obj.modelo = document.getElementById("modelo").value;
        obj.placa = document.getElementById("placa").value;
        obj.cor = document.getElementById("cor").value;
        
        var listaVeiculos=JSON.parse(localStorage.getItem("listaVeiculos")||"[]");

        if(isEditing){
            // Edição
            listaVeiculos[parseInt(veiculoId)] = obj;
        }else{
            // Cadastra
            listaVeiculos.push(obj);
        }

        localStorage.setItem("listaVeiculos",JSON.stringify(listaVeiculos));
        window.location.href = "../../home/veiculos/index.html";
    });
});

// Preenche os dados para edição
function carregarDadosVeiculo(veiculoId){
    var listaVeiculos = JSON.parse(localStorage.getItem("listaVeiculos")||"[]");
    const id = parseInt(veiculoId);

    if(listaVeiculos[id]){
        document.getElementById("nome").value = listaVeiculos[id].nome;
        document.getElementById("modelo").value = listaVeiculos[id].modelo;
        document.getElementById("placa").value = listaVeiculos[id].placa;
        document.getElementById("cor").value = listaVeiculos[id].cor;
    }else{
        // ID inválido -> Redireciona
        window.location.href = "../../home/veiculos/index.html";
    }
}