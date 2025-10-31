document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault(); 
    
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    
    // GET -> Verificar email e senha
    
    // Redireciona para o feed se tudo der certo!
    window.location.href = "feed.html";
});