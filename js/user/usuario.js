document.addEventListener("DOMContentLoaded", () => {
    if(!validaSessao()){
        window.location.href = '../../home/user/index.html';
    }else{
        carregaItens();
    }    
});

document.getElementById("novo").addEventListener("click", function(){
    window.location.href = "../../home/user/novo_usuario.html";
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
        html += "<td>Nome</td>";
        html += "<td>E-Mail</td>";
        html += "<td>Nasc</td>";
        html += "<td>Tipo</td>";
        html += "<td>Ações</td>";
        html += "</tr>";

        for(var i=0;i<lista.length;i++){
            html += "<tr>";
            html += "<td>"+lista[i].nome+"</td>";
            html += "<td>"+lista[i].email+"</td>";
            html += "<td>"+lista[i].nasc+"</td>";
            html += "<td>"+lista[i].tipo+"</td>";
            html += "<td><a href='javascript:excluir("+i+")'>Excluir</a></td>";
            html += "<td><a href='javascript:editar("+i+")'>Editar</a></td>";
            html += "</tr>";
        }

        html += "</table>";
        document.getElementById("lista").innerHTML = html;
    }else{
        var obj = {nome: "teste", telefone: "teste", email:"teste@teste", nasc: "2000-01-01", tipo: "Passageiro"};
        var lista = [];
        lista.push(obj);
        localStorage.setItem("listaUsuarios",JSON.stringify(lista));
        window.location.reload();
    }
}

// função para excluir
function excluir(id){
    var listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));
    listaUsuarios.splice(id,1);
    localStorage.setItem("listaUsuarios",JSON.stringify(listaUsuarios));
    window.location.reload();
}

// função para editar
function editar(id){
    // Redireciona e manda o ID na URL
    window.location.href = '../../home/user/novo_usuario.html?id='+id;
}