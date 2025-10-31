document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get('id_pagamento');

    buscar(id);
});

async function buscar(id){
    const retorno = await 
    fetch("../php/pagamento_get.php?id_pagamento="+id);
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        var registro = resposta.data[0];
        document.getElementById("id_usuario").value   = registro.id_usuario;
        document.getElementById('nome').value         = registro.nome;
        document.getElementById('numero').value       = registro.numero;
        document.getElementById('validade').value     = registro.validade;
        document.getElementById('cvv').value          = registro.cvv;
        document.getElementById('tipo').value         = registro.tipo;
        document.getElementById("id_pagamento").value = registro.id_pagamento;
    }else{
        alert("Erro, não existe: " + resposta.mensagem);
    }
}

document.getElementById('salvar').addEventListener('click', () => {
    alterar();
});

async function alterar(){
    var id_usuario = document.getElementById("id_usuario").value;
    var nome       = document.getElementById("nome").value;
    var numero     = document.getElementById("numero").value;
    var validade   = document.getElementById("validade").value;
    var cvv        = document.getElementById("cvv").value;
    var tipo       = document.getElementById("tipo").value;
    var id         = document.getElementById("id_pagamento").value;

    const fd = new FormData();
    fd.append('id_usuario', id_usuario);
    fd.append('nome', nome);
    fd.append('numero', numero);
    fd.append('validade', validade);
    fd.append('cvv', cvv);
    fd.append('tipo', tipo);

    const retorno = await 
    fetch("../php/pagamento_alterar.php?id_pagamento="+id,
    {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        alert("Sucesso: " + resposta.mensagem);
        window.location.href = '../home/pagamento.html';
    }else{
        alert("Erro: " + resposta.mensagem);
    }
}