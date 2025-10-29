document.addEventListener('DOMContentLoaded', () => {
    buscar();
});

document.getElementById('novo').addEventListener('click', () => {
    window.location.href = "../app/cadastro.html";
});

async function buscar(){
    const retorno = await fetch ("../../php/usuario/usuario_get.php");
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        preencherTabela(resposta.data);
    }
}

async function excluir(id){
    const retorno = await fetch('../../php/usuario/usuario_excluir.php?id_usuario='+id);
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
                <th> | </th>
                <th> Telefone </th>
                <th> | </th>
                <th> E-mail </th>
                <th> | </th>
                <th> Senha </th>
                <th> | </th>
                <th> Nascimento </th>
                <th> | </th>
                <th> Tipo </th>
                <th> | </th>
                <th> Ações </th>
            </tr>
    `;
    
    for(var i=0;i<tabela.length;i++){
        html += `
            <tr>
                <td> ${tabela[i].nome} </td>
                <td> | </td>
                <td> ${tabela[i].telefone} </td>
                <td> | </td>
                <td> ${tabela[i].email} </td>
                <td> | </td>
                <td> ${tabela[i].senha} </td>
                <td> | </td>
                <td> ${tabela[i].nasc} </td>
                <td> | </td>
                <td> ${tabela[i].tipo} </td>
                <td> | </td>
                <td>
                    <a href='usuario_alterar.html?id_usuario=${tabela[i].id_usuario}'>Alterar</a>
                    <a href='#' onClick='excluir(${tabela[i].id_usuario})'>Excluir</a>
                </td>
            </tr>
        `;

    }
    html += '</table>';
    document.getElementById('lista').innerHTML = html;
}