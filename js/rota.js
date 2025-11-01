document.addEventListener('DOMContentLoaded', () => {
    buscar();
});

document.getElementById('novo').addEventListener('click', () => {
    window.location.href = "rota_novo.html";
});

async function buscar() {
    const retorno = await fetch("../php/rota_get.php");
    const resposta = await retorno.json();

    if (resposta.status == 'ok') {
        preencherTabela(resposta.data);
    }
}

async function excluir(id) {
    const retorno = await fetch('../php/rota_excluir.php?id_rota='+id);
    const resposta = await retorno.json();

    if (resposta.status == 'ok') {
        alert(resposta.mensagem);
        window.location.reload();
    } else {
        alert(resposta.mensagem);
    }
}

function preencherTabela(tabela) {
    var html = `
        <table>
            <tr>
                <th> ID usuário </th>
                <th> Origem </th>
                <th> Destino </th>
                <th> Distância </th>
                <th> Tempo Estimado </th>
            </tr>
    `;

    for (var i = 0; i < tabela.length; i++) {
        html += `
            <tr>
                <td> ${tabela[i].id_usuario} </td>
                <td> ${tabela[i].origem} </td>
                <td> ${tabela[i].destino} </td>
                <td> ${tabela[i].distancia} </td>
                <td> ${tabela[i].tempo_estimado} </td>
                <td>
                    <a href='rota_alterar.html?id_rota=${tabela[i].id_rota}'>Alterar</a>
                    <a href='#' onClick='excluir(${tabela[i].id_rota})'>Excluir</a>
                </td>
            </tr>
        `;

    }
    html += '</table>';
    document.getElementById('lista').innerHTML = html;
}