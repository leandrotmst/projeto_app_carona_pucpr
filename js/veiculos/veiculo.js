document.addEventListener('DOMContentLoaded', () => {
    buscar();
});

document.getElementById('novo').addEventListener('click', () => {
    window.location.href = "novo_veiculo.html";
});

async function buscar(){
    const retorno = await fetch ("../../php/veiculo/veiculo_get.php");
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        preencherTabela(resposta.data);
    }
}

async function excluir(id){
    const retorno = await fetch('../../php/veiculo/veiculo_excluir.php?id='+id);
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
                <th> Nome </th>
                <th> Modelo </th>
                <th> Placa </th>
                <th> Cor </th>
            </tr>
    `;
    
    for(var i=0;i<tabela.length;i++){
        html += `
            <tr>
                <td> ${tabela[i].nome} </td>
                <td> ${tabela[i].modelo} </td>
                <td> ${tabela[i].placa} </td>
                <td> ${tabela[i].cor} </td>
                <td>
                    <a href='usuario_alterar.html?id=${tabela[i].id}'>Alterar</a>
                    <a href='#' onClick='excluir(${tabela[i].id})'>Excluir</a>
                </td>
            </tr>
        `;

    }
    html += '</table>';
    document.getElementById('lista').innerHTML = html;
}