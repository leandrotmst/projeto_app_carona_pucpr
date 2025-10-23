document.addEventListener("DOMContentLoaded", () => {
    if(!validaSessao()){
        window.location.href = '../../home/veiculos/index.html';
    }else{
        carregaItens();
    }    
});

document.getElementById("novo").addEventListener("click", function(){
    window.location.href = "../../home/veiculos/novo_veiculo.html";
});

function validaSessao(){
    if(localStorage.getItem("sessao")){
        return true;
    }else{
        return false;
    }
}

function carregaItens(){
    if(localStorage.getItem("listaVeiculos")){
        var lista = JSON.parse(localStorage.getItem("listaVeiculos"));
        var html = "";
        html += "<table>";
        html += "<tr>";
        html += "<td>Nome</td>";
        html += "<td>Modelo</td>";
        html += "<td>Placa</td>";
        html += "<td>Cor</td>";
        html += "</tr>";

        for(var i=0;i<lista.length;i++){
            html += "<tr>";
            html += "<td>"+lista[i].nome+"</td>";
            html += "<td>"+lista[i].modelo+"</td>";
            html += "<td>"+lista[i].placa+"</td>";
            html += "<td>"+lista[i].cor+"</td>";
            html += "<td><a href='javascript:excluir("+i+")'>Excluir</a></td>";
            html += "<td><a href='javascript:editar("+i+")'>Editar</a></td>";
            html += "</tr>";
        }

        html += "</table>";
        document.getElementById("lista").innerHTML = html;
    }else{
        var obj = {nome: "teste", modelo: "teste", placa:"teste", cor: "2000-01-01"};
        var lista = [];
        lista.push(obj);
        localStorage.setItem("listaVeiculos",JSON.stringify(lista));
        window.location.reload();
    }
}

// função para excluir
function excluir(id){
    var listaVeiculos = JSON.parse(localStorage.getItem("listaVeiculos"));
    listaVeiculos.splice(id,1);
    localStorage.setItem("listaVeiculos",JSON.stringify(listaVeiculos));
    window.location.reload();
}

// função para editar
function editar(id){
    // Redireciona e manda o ID na URL
    window.location.href = '../../home/veiculos/novo_veiculo.html?id='+id;
}