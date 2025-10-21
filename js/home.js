document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("sessao")){
        var sessao = JSON.parse(localStorage.getItem("sessao"));
        var pagina = "Seja bem vindo admin";
        document.getElementById("retorno").innerHTML = pagina;
    }else{
        window.location.href = "../index.html";
    }
});