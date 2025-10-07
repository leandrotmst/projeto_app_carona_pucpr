document.addEventListener("DOMContentLoaded", () => {
    // Verifica se há um ID para editar
    const params = new URLSearchParams(window.location.search);
    const clienteId = params.get('id');

    if (clienteId !== null) {
        carregarDadosCliente(clienteId);
        document.getElementById('enviar').textContent = 'Salvar Alterações';
    } else {
        document.getElementById('enviar').textContent = 'Salvar Cliente';
    }
});

function carregarDadosCliente(id) {
    const listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
    if (listaClientes && listaClientes[id]) {
        const cliente = listaClientes[id];
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

    let listaClientes = localStorage.getItem("listaClientes") ?
        JSON.parse(localStorage.getItem("listaClientes")) : [];

    if (clienteId !== null) {
        // Editando
        listaClientes[clienteId] = novoCliente;
    } else {
        // Insere
        listaClientes.push(novoCliente);
    }

    localStorage.setItem("listaClientes", JSON.stringify(listaClientes));
    window.location.href = "index.html"; // Redirecionando
});