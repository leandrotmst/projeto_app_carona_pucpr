document.addEventListener('DOMContentLoaded', () => {
    buscar();
});

document.getElementById('novo').addEventListener('click', () => {
    window.location.href = "pagamento_novo.html";
});

async function buscar(){
    const retorno = await fetch ("../php/pagamento_get.php");
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        preencherTabela(resposta.data);
    }
}

async function excluir(id_pagamento){
    const retorno = await fetch('../php/pagamento_excluir.php?id_pagamento='+id_pagamento);
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
                    <th> Nome Cartão </th>
                    <th> Número Cartão </th>
                    <th> Validade </th>
                    <th> Cvv </th>
                    <th> Tipo </th>
                    <th> Ações </th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for(var i=0; i < tabela.length; i++){
        html += `
            <tr>
                <td> ${tabela[i].nome} </td>
                <td> ${tabela[i].numero} </td>
                <td> ${tabela[i].validade} </td>
                <td> ${tabela[i].cvv} </td>
                <td> ${tabela[i].tipo} </td>
                <td>
                    <a href='pagamento_alterar.html?id_pagamento=${tabela[i].id_pagamento}' class='btn-alterar'>Alterar</a>
                    <a href='#' onClick='excluir(${tabela[i].id_pagamento})' class='btn-excluir'>Excluir</a>
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