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
                <th> Telefone </th>
                <th> E-mail </th>
                <th> Senha </th>
                <th> Nascimento </th>
                <th> Tipo </th>
            </tr>
    `;
    
    for(var i=0;i<tabela.length;i++){
        html += `
            <tr>
                <td> ${tabela[i].nome} </td>
                <td> ${tabela[i].telefone} </td>
                <td> ${tabela[i].email} </td>
                <td> ${tabela[i].senha} </td>
                <td> ${tabela[i].nasc} </td>
                <td> ${tabela[i].tipo} </td>
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