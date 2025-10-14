document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("sessao")) {
        carregaMotoristas();
    } else {
        window.location.href = "../index.html";
    }
});

function carregaMotoristas() {
    const listaCompleta = JSON.parse(
        localStorage.getItem("listaUsuarios") || "[]"
    );

    const listaMotoristas = listaCompleta.filter(
        (usuario) => usuario.tipo === "motorista"
    );

    let html = "";

    if (listaMotoristas.length > 0) {
        html +=
            "<table border='1' style='width: 100%; border-collapse: collapse; text-align: left; margin-top: 20px;'>";
        html += "<tr>";
        html += "<th style='padding: 8px;'> Nome </th>";
        html += "<th style='padding: 8px;'> E-mail </th>";
        html += "<th style='padding: 8px;'> Veículo </th>"; // Título da coluna do carro
        html += "<th style='padding: 8px;'> Placa </th>";
        html += "<th style='padding: 8px;'> Ações </th>";
        html += "</tr>";
        for (var i = 0; i < listaMotoristas.length; i++) {
            const motorista = listaMotoristas[i];

            html += "<tr>";
            html += "<td style='padding: 8px;'>" + motorista.nome + "</td>";
            html += "<td style='padding: 8px;'>" + motorista.email + "</td>";
            html +=
                "<td style='padding: 8px;'>" +
                (motorista.carro ? motorista.carro.modelo : "N/A") +
                "</td>";
            html +=
                "<td style='padding: 8px;'>" +
                (motorista.carro ? motorista.carro.placa : "N/A") +
                "</td>";

            html += "<td style='padding: 8px;'>";

            const idOriginal = listaCompleta.indexOf(motorista);
            html += `<a href='javascript:editar(${idOriginal})'>Editar</a> | `;
            html += `<a href='javascript:excluir(${idOriginal})'>Excluir</a>`;
            html += "</td>";
            html += "</tr>";
        }
        html += "</table>";
    } else {
        html += "<p>Nenhum motorista cadastrado.</p>";
    }

    document.getElementById("lista").innerHTML = html;
}

function excluir(id) {
    const listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios") || "[]");
    listaUsuarios.splice(id, 1);
    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
    window.location.reload();
}

function editar(id) {
    window.location.href = "../user/novo_usuario.html?id=" + id;
}