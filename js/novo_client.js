document.getElementById("enviar").addEventListener("click", function(){
    armazenar();
    window.location.href = "index.html";
});

function armazenar(){
    var listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
    var obj = {nome: "", email:"", nasc: ""};
    obj.nome = document.getElementById("nome").value;
    obj.nasc = document.getElementById("nasc").value;
    obj.email = document.getElementById("email").value;
    listaClientes.push(obj);
    localStorage.setItem("listaClientes",JSON.stringify(listaClientes));    
}