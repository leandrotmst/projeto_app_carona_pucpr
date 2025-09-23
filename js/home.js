document.addEventListener("DOMContentLoaded", () => {
  if(localStorage.getItem("sessao")){
    var sessao = JSON.parse(localStorage.getItem("sessao"));
    document.getElementById("retorno").innerHTML = sessao.email;
  } else{
    window.location.href = "../aula8/index.html";
  }
});