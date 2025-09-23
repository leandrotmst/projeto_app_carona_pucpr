// email + senha
// id = "entrar"

document.getElementById("criar_conta").addEventListener("click", function(){
  window.location.href = "registrar/index.html";
});

document.getElementById("entrar").addEventListener("click", function(){
  login();
});

async function login() {
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  const fd = new FormData();
  fd.append("email", email);
  fd.append("senha", senha);

  const retorno = await fetch("../aula8/php/login.php",{
    method: "POST",
    body: fd
  });

  const resposta = await retorno.json();
  console.log(resposta);

  // Repositório localstorage
  localStorage.setItem("sessao", JSON.stringify(resposta));

  // Deu certo!
  window.location.href = "home/index.html";
}