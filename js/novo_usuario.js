document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const clienteId = params.get('id');

    if (clienteId !== null) {
        carregarDadosUsuario(clienteId);
        document.getElementById('enviar').textContent = 'Salvar Alterações';
    } else {
        document.getElementById('enviar').textContent = 'Salvar Usuário';
    }
});

function carregarDadosUsuario(id) {
    const listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));
    if (listaUsuarios && listaUsuarios[id]) {
        const cliente = listaUsuarios[id];
        document.getElementById("nome").value = cliente.nome;
        document.getElementById("email").value = cliente.email;
        document.getElementById("nasc").value = cliente.nasc;
    }
}

document.getElementById("enviar").addEventListener("click", function() {
    const params = new URLSearchParams(window.location.search);
    const clienteId = params.get('id');

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const nasc = document.getElementById("nasc").value;

    if (!nome || !email || !nasc) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const novoCliente = {
        nome: nome,
        email: email,
        nasc: nasc
    };

    let listaUsuarios = localStorage.getItem("listaUsuarios") ?
        JSON.parse(localStorage.getItem("listaUsuarios")) : [];

    if (clienteId !== null) {
        // Editando
        listaUsuarios[clienteId] = novoCliente;
    } else {
        // Insere
        listaUsuarios.push(novoCliente);
    }

    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
    window.location.href = "index.html"; // Redirecionando
});