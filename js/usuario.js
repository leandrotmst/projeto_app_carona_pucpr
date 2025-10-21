document.addEventListener("DOMContentLoaded", () => {
    if(!validaSessao()){
        window.location.href = '../index.html';
    }else{
        carregaItens();
    }    
});

document.getElementById("novo").addEventListener("click", function(){
    window.location.href = "novo_usuario.html";
});

function validaSessao(){
    if(localStorage.getItem("sessao")){
        return true;
    }else{
        return false;
    }
}

function carregaItens(){
    if(localStorage.getItem("listaUsuarios")){
        var lista = JSON.parse(localStorage.getItem("listaUsuarios"));
        var html = "";
        html += "<table>";
        html += "<tr>";
        html += "<td>#</td>";
        html += "<td>Nome</td>";
        html += "<td>EMail</td>";
        html += "<td>Nasc</td>";
        html += "<td>Tipo</td>";
        html += "</tr>";

        for(var i=0;i<lista.length;i++){
            html += "<tr>";
            html += "<td><a href='javascript:excluir("+i+")'>Excluir</a></td>";
            html += "<td>"+lista[i].nome+"</td>";
            html += "<td>"+lista[i].email+"</td>";
            html += "<td>"+lista[i].nasc+"</td>";
            html += "<td>"+lista[i].tipo+"</td>";
            html += "</tr>";
        }

        html += "</table>";
        document.getElementById("lista").innerHTML = html;
    }else{
        var obj = {nome: "teste", telefone: "teste", email:"teste@teste", endereco: "Rua teste 55", nasc: "2007-11-05", tipo: "Passageiro"};
        var lista = [];
        lista.push(obj);
        localStorage.setItem("listaClientes",JSON.stringify(lista));
        window.location.reload();
    }
}

function excluir(id){
    var listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));
    listaUsuarios.splice(id,1);
    localStorage.setItem("listaUsuarios",JSON.stringify(listaUsuarios));
    window.location.reload();
}