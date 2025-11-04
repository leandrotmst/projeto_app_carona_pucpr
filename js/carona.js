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

async function excluir(id_carona){
    const retorno = await fetch('../php/carona_excluir.php?id_carona='+id_carona);
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
                    <th>ID Usuário (Motorista)</th>
                    <th>Origem</th>
                    <th>Destino</th>
                    <th>Data e hora de partida</th>
                    <th>ID Veículo</th>
                    <th>Vagas</th>
                    <th>Distância</th>
                    <th>Tempo Estimado</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for(var i=0; i < tabela.length; i++){
        html += `
            <tr>
                <td> ${tabela[i].id_usuario} </td>
                <td> ${tabela[i].origem} </td>
                <td> ${tabela[i].destino} </td>
                <td> ${tabela[i].data_hora_partida} </td>
                <td> ${tabela[i].veiculo} </td>
                <td> ${tabela[i].vagas} </td>
                <td> ${tabela[i].distancia} </td>
                <td> ${tabela[i].tempo_estimado} </td>
                <td>
                    <a href='carona_alterar.html?id_carona=${tabela[i].id_carona}' class='btn-alterar'>Alterar</a>
                    <a href='#' onClick='excluir(${tabela[i].id_carona})' class='btn-excluir'>Excluir</a>
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