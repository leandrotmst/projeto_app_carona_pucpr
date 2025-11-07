document.addEventListener('DOMContentLoaded', () => {
    valida_admin();
    buscar();
});

document.getElementById('novo').addEventListener('click', () => {
    window.location.href = "avaliacao_novo.html";
});

async function buscar(){
    const retorno = await fetch ("../php/avaliacao_get.php");
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        preencherTabela(resposta.data);
    }
}

async function excluir(id_avaliacao){
    const retorno = await fetch('../php/avaliacao_excluir.php?id_avaliacao='+id_avaliacao);
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        alert(resposta.mensagem);
        window.location.reload();
    }else{
        alert(resposta.mensagem);
    }
}

function preencherTabela(tabela){
    var html = `
        <table class="table-custom">
            <thead>
                <tr>
                    <th>ID Carona</th>
                    <th>ID Motorista</th>
                    <th>ID Passageiro</th>
                    <th>Nota</th>
                    <th>Comentário</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for(var i=0; i < tabela.length; i++){
        html += `
            <tr>
                <td> ${tabela[i].id_carona} </td>
                <td> ${tabela[i].id_avaliado} </td>
                <td> ${tabela[i].id_avaliador} </td>
                <td> ${tabela[i].nota} </td>
                <td> ${tabela[i].comentario} </td>
                <td>
                    <a href='avaliacao_alterar.html?id_avaliacao=${tabela[i].id_avaliacao}' class='btn-alterar'>Alterar</a>
                    <a href='#' onClick='excluir(${tabela[i].id_avaliacao})' class='btn-excluir'>Excluir</a>
                </td>
            </tr>
        `;
    }

    html += `
            </tbody>
        </table>
    `;
    document.getElementById('lista').innerHTML = html;
}