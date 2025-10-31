document.addEventListener('DOMContentLoaded', () => {
    buscar();
});

document.getElementById('novo').addEventListener('click', () => {
    window.location.href = "pagamento_novo.html";
});

async function buscar() {
    const retorno = await fetch ("../php/pagamento_get.php");
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        preencherTabela(resposta.data);
    }
}

async function excluir(id){
    const retorno = await fetch('../php/pagamento_excluir.php?id_pagamento='+id);
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
                <th> Nome Cartão </th>
                <th> | </th>
                <th> Número Cartão </th>
                <th> | </th>
                <th> Validade </th>
                <th> | </th>
                <th> Cvv </th>
                <th> | </th>
                <th> Tipo </th>
            </tr>
    `;
    
    for(var i=0;i<tabela.length;i++){
        html += `
            <tr>
                <td> ${tabela[i].nome} </td>
                <td> | </td>
                <td> ${tabela[i].numero} </td>
                <td> | </td>
                <td> ${tabela[i].validade} </td>
                <td> | </td>
                <td> ${tabela[i].cvv} </td>
                <td> | </td>
                <td> ${tabela[i].tipo} </td>
                <td>
                    <a href='pagamento_alterar.html?id_pagamento=${tabela[i].id}'>Alterar</a>
                    <a href='#' onClick='excluir(${tabela[i].id})'>Excluir</a>
                </td>
            </tr>
        `;

    }
    html += '</table>';
    document.getElementById('lista').innerHTML = html;
}