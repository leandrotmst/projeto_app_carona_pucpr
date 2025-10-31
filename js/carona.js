document.addEventListener('DOMContentLoaded', () => {
    buscar();
});

document.getElementById('novo').addEventListener('click', () => {
    window.location.href = "carona_novo.html";
});

async function buscar(){
    const retorno = await fetch ("../php/carona_get.php");
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        preencherTabela(resposta.data);
    }
}

async function excluir(id){
    const retorno = await fetch('../php/carona_excluir.php?id_carona='+id);
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
                <th> ID Usuário </th>
                <th> | </th>
                <th> Origem </th>
                <th> | </th>
                <th> Destino </th>
                <th> | </th>
                <th> Vagas </th>
            </tr>
    `;
    
    for(var i=0;i<tabela.length;i++){
        html += `
            <tr>
                <td> ${tabela[i].id_usuario} </td>
                <td> | </td>
                <td> ${tabela[i].origem} </td>
                <td> | </td>
                <td> ${tabela[i].destino} </td>
                <td> | </td>
                <td> ${tabela[i].vagas} </td>
                <td>
                    <a href='carona_alterar.html?id_carona=${tabela[i].id_carona}'>Alterar</a>
                    <a href='#' onClick='excluir(${tabela[i].id_carona})'>Excluir</a>
                </td>
            </tr>
        `;

    }
    html += '</table>';
    document.getElementById('lista').innerHTML = html;
}