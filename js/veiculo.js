document.addEventListener('DOMContentLoaded', () => {
    buscar();
});

document.getElementById('novo').addEventListener('click', () => {
    window.location.href = "novo_veiculo.html";
});

async function buscar(){
    const retorno = await fetch ("../php/veiculo_get.php");
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        preencherTabela(resposta.data);
    }
}

async function excluir(id){
    const retorno = await fetch('../php/veiculo_excluir.php?id_veiculo='+id);
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
                <th> ID usuário </th>
                <th> | </th>
                <th> Modelo </th>
                <th> | </th>
                <th> Placa </th>
                <th> | </th>
                <th> Cor </th>
                <th> | </th>
                <th> Ações </th>
            </tr>
    `;
    
    for(var i=0;i<tabela.length;i++){
        html += `
            <tr>
                <td> ${tabela[i].id_usuario} </td>
                <td> | </td>
                <td> ${tabela[i].modelo} </td>
                <td> | </td>
                <td> ${tabela[i].placa} </td>
                <td> | </td>
                <td> ${tabela[i].cor} </td>
                <td> | </td>
                <td>
                    <a href='veiculo_alterar.html?id_veiculo=${tabela[i].id_veiculo}'>Alterar</a>
                    <a href='#' onClick='excluir(${tabela[i].id_veiculo})'>Excluir</a>
                </td>
                <td> | </td>
            </tr>
        `;

    }
    html += '</table>';
    document.getElementById('lista').innerHTML = html;
}