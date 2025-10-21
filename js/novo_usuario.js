document.getElementById("enviar").addEventListener("click", function(){
    armazenar();
    window.location.href = "index.html";
});

function armazenar(){
    var listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));
    var obj = {nome: "", telefone: "", email:"", endereco: "", nasc: "", tipo: ""};
    obj.nome = document.getElementById("nome").value;
    obj.telefone = document.getElementById("telefone").value;
    obj.email = document.getElementById("email").value;
    obj.endereco = document.getElementById("endereco").value;
    obj.nasc = document.getElementById("nasc").value;
    obj.email = document.getElementById("email").value;
    obj.tipo = document.getElementById("tipo").value;
    listaUsuarios.push(obj);
    localStorage.setItem("listaUsuarios",JSON.stringify(listaUsuarios));    
}