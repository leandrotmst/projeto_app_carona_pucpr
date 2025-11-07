document.addEventListener('DOMContentLoaded', () => {
    valida_admin();
    buscar();
});

document.getElementById('novo').addEventListener('click', () => {
    window.location.href = "veiculo_novo.html";
});

async function buscar(){
    const retorno = await fetch ("../php/veiculo_get.php");
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        preencherTabela(resposta.data);
    }
}

async function excluir(id_veiculo){
    const retorno = await fetch('../php/veiculo_excluir.php?id_veiculo='+id_veiculo);
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
                    <th> ID usuário </th>
                    <th> Modelo </th>
                    <th> Placa </th>
                    <th> Cor </th>
                    <th> Ações </th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for(var i=0; i < tabela.length; i++){
        html += `
            <tr>
                <td> ${tabela[i].id_usuario} </td>
                <td> ${tabela[i].modelo} </td>
                <td> ${tabela[i].placa} </td>
                <td> ${tabela[i].cor} </td>
                <td>
                    <a href='veiculo_alterar.html?id_veiculo=${tabela[i].id_veiculo}' class='btn-alterar'>Alterar</a>
                    <a href='#' onClick='excluir(${tabela[i].id_veiculo})' class='btn-excluir'>Excluir</a>
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