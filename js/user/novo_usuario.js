document.getElementById('enviar').addEventListener('click', () => {
    novo();
});

async function novo(){
    var nome = document.getElementById("nome").value;
    var telefone = document.getElementById("telefone").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var confsenha = document.getElementById("confsenha").value;
    var nasc = document.getElementById("nasc").value;
    var tipo = document.getElementById("tipoUsuario").value;

    if(senha===confsenha){
        const fd = new FormData();
        fd.append('nome', nome);
        fd.append('telefone', telefone);
        fd.append('email', email);
        fd.append('senha', senha);
        fd.append('nasc', nasc);
        fd.append('tipo', tipo);

        const retorno = await fetch("../../php/usuario/usuario_novo.php",
        {
            method: "POST",
            body: fd
        });
        const resposta = await retorno.json();

        if(resposta.status=='ok'){
            alert("Sucesso: " + resposta.mensagem);
            window.location.href = 'feed.html';
        }else{
            alert("Erro: " + resposta.mensagem);
        }
    }
    else{
        alert('As senhas devem ser as mesmas');
    }
}