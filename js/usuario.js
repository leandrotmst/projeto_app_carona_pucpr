document.addEventListener('DOMContentLoaded', () => {
    buscar();
});

document.getElementById('novo').addEventListener('click', () => {
    window.location.href = "usuario_novo.html";
});

async function buscar(){
    const retorno = await fetch ("../php/usuario_get.php");
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        preencherTabela(resposta.data);
    }
}

async function excluir(id_usuario){
    const retorno = await fetch('../php/usuario_excluir.php?id_usuario='+id_usuario);
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
                    <th>ID Usuário</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>E-mail</th>
                    <th>Senha</th>
                    <th>Nascimento</th>
                    <th>Tipo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for(var i=0; i < tabela.length; i++){
        html += `
            <tr>
                <td> ${tabela[i].id_usuario} </td>
                <td> ${tabela[i].nome} </td>
                <td> ${tabela[i].telefone} </td>
                <td> ${tabela[i].email} </td>
                <td> ${tabela[i].senha} </td>
                <td> ${tabela[i].nasc} </td>
                <td> ${tabela[i].tipo} </td>
                <td>
                    <a href='usuario_alterar.html?id_usuario=${tabela[i].id_usuario}' class='btn-alterar'>Alterar</a>
                    <a href='#' onClick='excluir(${tabela[i].id_usuario})' class='btn-excluir'>Excluir</a>
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