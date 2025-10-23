document.addEventListener("DOMContentLoaded", ()=>{
    const params = new URLSearchParams(window.location.search);
    const usuarioId = params.get('id');
    const isEditing = usuarioId !== null; // Pega o ID na URL
    const titulo = document.getElementById("form-titulo"); // Título da página
    const nomeBotao = document.getElementById("enviar"); // Escrita no botão

    if(isEditing){
        // Se achar ID na URL -> Muda o título e nome no botão para edição 
        titulo.textContent = "Atualizar Usuário";
        nomeBotao.textContent = "Salvar Alterações";
        carregarDadosUsuario(usuarioId);
    }
    else{
        // Senão -> Muda o título e nome no botão para cadastro 
        titulo.textContent = "Cadastrar novo Usuário";
        nomeBotao.textContent = "Cadastrar";
    }  
    document.getElementById("enviar").addEventListener("click", function(event){
        event.preventDefault();

        var obj = {nome: "", telefone: "", email:"", nasc: "", tipo: ""};
        obj.nome = document.getElementById("nome").value;
        obj.telefone = document.getElementById("telefone").value;
        obj.email = document.getElementById("email").value;
        obj.nasc = document.getElementById("nasc").value;
        obj.tipo = document.getElementById("tipoUsuario").value;
        
        var listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios") 
        || "[]");

        if(isEditing){
            // Edição
            listaUsuarios[parseInt(usuarioId)] = obj;
        }else{
            // Cadastra
            listaUsuarios.push(obj);
        }

        localStorage.setItem("listaUsuarios",JSON.stringify(listaUsuarios));
        window.location.href = "../../home/user/index.html";
    });
});

// Preenche os dados para edição
function carregarDadosUsuario(usuarioId){
    var listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios")||"[]");
    const id = parseInt(usuarioId);

    if(listaUsuarios[id]){
        document.getElementById("nome").value = listaUsuarios[id].nome;
        document.getElementById("telefone").value = listaUsuarios[id].telefone;
        document.getElementById("nasc").value = listaUsuarios[id].nasc;
        document.getElementById("email").value = listaUsuarios[id].email;
        document.getElementById("tipoUsuario").value = listaUsuarios[id].tipo;
    }else{
        // ID inválido -> Redireciona
        window.location.href = "../../home/user/index.html";
    }
}