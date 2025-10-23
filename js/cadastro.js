document.getElementById("cadastroForm").addEventListener("submit", (event) => {
    event.preventDefault(); 
    
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confsenha = document.getElementById("confsenha").value;
    const nasc = document.getElementById("nasc").value;
    const tipo = document.getElementById("tipoUsuario").value;
    
    if(senha===confsenha){
        let dadosCadastro = {
            id: Date.now(),
            nome: nome,
            telefone: telefone,
            email: email,
            senha: senha,
            nasc: nasc,
            tipo: tipo
        };
        
        let listaUsuarios = localStorage.getItem("listaUsuarios") ?
            JSON.parse(localStorage.getItem("listaUsuarios")) : [];
    
        listaUsuarios.push(dadosCadastro);
    
        localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
    
    }else{
        alert("Senhas diferentes");
    }
    
    window.location.href = "feed.html";
});