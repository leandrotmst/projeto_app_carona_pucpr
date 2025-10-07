document.addEventListener("DOMContentLoaded", () => {
    if(!validaSessao()){
        window.location.href = '../index.html';
    }else{
        carregaItens();
    }    
});

document.getElementById("novo").addEventListener("click", function(){
    window.location.href = "novo_cliente.html";
});

function validaSessao(){
    if(localStorage.getItem("sessao")){
        return true;
    }else{
        return false;
    }
}

function carregaItens(){
    if(localStorage.getItem("listaClientes")){
        var lista = JSON.parse(localStorage.getItem("listaClientes"));
        var html = "";
        html += "<table>";
        html += "<tr>";
        html += "<td>#</td>";
        html += "<td>Nome</td>";
        html += "<td>EMail</td>";
        html += "<td>Nasc</td>";
        html += "</tr>";

        for(var i=0;i<lista.length;i++){
            html += "<tr>";
            html += "<td><a href='javascript:excluir("+i+")'>Excluir</a></td>";
            html += "<td>"+lista[i].nome+"</td>";
            html += "<td>"+lista[i].email+"</td>";
            html += "<td>"+lista[i].nasc+"</td>";
            html += "</tr>";
        }

        html += "</table>";
        document.getElementById("lista").innerHTML = html;
    }else{
        var obj = {nome: "teste", email: "teste", nasc: "teste"};
        var lista = [];
        lista.push(obj);
        localStorage.setItem("listaClientes",JSON.stringify(lista));
        window.location.reload();
    }
}

function excluir(id){
    var listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
    listaClientes.splice(id,1);
    localStorage.setItem("listaClientes",JSON.stringify(listaClientes));
    window.location.reload();
}