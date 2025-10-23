document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault(); 
    
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    
    // Verificar email e senha
    // Enviar código para login
    
    // Redireciona para o feed se tudo der certo!
    window.location.href = "feed.html";
});