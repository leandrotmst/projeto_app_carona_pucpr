document.addEventListener("DOMContentLoaded", () => {
    if(!validaSessao()){
        window.location.href = '../../home/avaliacao/index.html';
    }else{
        carregaItens();
    }    
});

document.getElementById("novo").addEventListener("click", function(){
    window.location.href = "../../home/avaliacao/nova_avaliacao.html";
});

function validaSessao(){
    if(localStorage.getItem("sessao")){
        return true;
    }else{
        return false;
    }
}

function gerarEstrelas(quantidade) {
    let estrelas = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= quantidade) {
            estrelas += '⭐';
        } else {
            estrelas += '☆';
        }
    }
    return estrelas;
}

function carregaItens(){
    if(localStorage.getItem("listaAvaliacoes")){
        var lista = JSON.parse(localStorage.getItem("listaAvaliacoes"));
        var html = "";
        html += "<table>";
        html += "<tr>";
        html += "<td>Motorista</td>";
        html += "<td>Avaliação</td>";
        html += "<td>Comentário</td>";
        html += "</tr>";

        for(var i=0;i<lista.length;i++){
            html += "<tr>";
            html += "<td>"+lista[i].motorista+"</td>";
            html += "<td>"+gerarEstrelas(lista[i].avaliacao)+"</td>";
            html += "<td>"+lista[i].comentario+"</td>";
            html += "<td>"+new Date(lista[i].data).toLocaleDateString()+"</td>";
            html += "<td><a href='javascript:excluir("+i+")'>Excluir</a></td>";
            html += "</tr>";
        }

        html += "</table>";
        document.getElementById("lista").innerHTML = html;
    }else{
        var lista = [];
        localStorage.setItem("listaAvaliacoes",JSON.stringify(lista));
        window.location.reload();
    }
}

// função para excluir
function excluir(id){
    var listaAvaliacoes = JSON.parse(localStorage.getItem("listaAvaliacoes"));
    listaAvaliacoes.splice(id,1);
    localStorage.setItem("listaAvaliacoes",JSON.stringify(listaAvaliacoes));
    window.location.reload();
}