document.addEventListener('DOMContentLoaded', () => {
    buscar();
});

document.getElementById('novo').addEventListener('click', () => {
    window.location.href = "../avaliacao/nova_avaliacao.html";
});

async function buscar(){
    const retorno = await fetch ("../../php/avaliacao/avaliacao_get.php");
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        preencherTabela(resposta.data);
    }
}

async function excluir(id){
    const retorno = await fetch('../../php/avaliacao/avaliacao_excluir.php?id_avaliacao='+id);
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
        <table>
            <tr>
                <th> ID Carona </th>
                <th> | </th>
                <th> ID Motorista </th>
                <th> | </th>
                <th> ID Passageiro </th>
                <th> | </th>
                <th> Nota </th>
                <th> | </th>
                <th> Comentário </th>
                <th> | </th>
                <th> Ações </th>
            </tr>
    `;
    
    for(var i=0;i<tabela.length;i++){
        html += `
            <tr>
                <td> ${tabela[i].id_carona} </td>
                <td> | </td>
                <td> ${tabela[i].id_avaliado} </td>
                <td> | </td>
                <td> ${tabela[i].id_avaliador} </td>
                <td> | </td>
                <td> ${tabela[i].nota} </td>
                <td> | </td>
                <td> ${tabela[i].comentario} </td>
                <td> | </td>
                <td>
                    <a href='avaliacao_alterar.html?id_avaliacao=${tabela[i].id_avaliacao}'>Alterar</a>
                    <a href='#' onClick='excluir(${tabela[i].id_avaliacao})'>Excluir</a>
                </td>
            </tr>
        `;

    }
    html += '</table>';
    document.getElementById('lista').innerHTML = html;
}