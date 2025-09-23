document.getElementById("criar_conta").addEventListener("click", function(){
  if(email.includes("@pucpr.edu.br") && senha_criada === verificar_senha){
    registrar_conta();
  };
});

async function login() {
  var nome = document.getElementById("nome");
  var email = document.getElementById("email");
  var senha_criada = document.getElementById("senha_criada");
  var verificar_senha = document.getElementById("verificar_senha");
  var matricula = document.getElementById("matricula");

  const fd = new FormData();
  fd.append("nome", nome);
  fd.append("email", email);
  fd.append("senha", verificar_senha);
  fd.append("matricula", matricula);

  const retorno = await fetch("../aula8/php/registrar.php",{
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