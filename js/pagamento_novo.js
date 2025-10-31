document.getElementById('enviar').addEventListener('click', () => {
    novo();
});

async function novo(){
    var nome     = document.getElementById("nome").value;
    var numero   = document.getElementById("numero").value;
    var validade = document.getElementById("validade").value;
    var cvv      = document.getElementById("cvv").value;
    var tipo     = document.getElementById("tipo").value;

    const fd = new FormData();
    fd.append('nome', nome);
    fd.append('numero', numero);
    fd.append('validade', validade);
    fd.append('cvv', cvv);
    fd.append('tipo', tipo);

    const retorno = await fetch("../php/pagamento_novo.php",
    {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();

    if(resposta.status=='ok'){
        alert("Sucesso: " + resposta.mensagem);
        window.location.href = 'pagamento.html';
    }else{
        alert("Erro: " + resposta.mensagem);
    }
}