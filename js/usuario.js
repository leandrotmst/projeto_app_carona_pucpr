document.addEventListener("DOMContentLoaded", () => {
    if (!validaSessao()) {
        window.location.href = "../index.html";
    } else {
        carregaItens();
    }
});

document.getElementById("novo").addEventListener("click", function () {
    window.location.href = "novo_usuario.html";
});

function validaSessao() {
    if (localStorage.getItem("sessao")) {
        return true;
    } else {
        return false;
    }
}

function carregaItens() {
    const listaUsuariosJSON = localStorage.getItem("listaUsuarios");

    if (listaUsuariosJSON) {
        var lista = JSON.parse(listaUsuariosJSON);
        var html = "";

        html +=
            "<table border='1' style='width: 100%; border-collapse: collapse; text-align: left; margin-top: 20px;'>";
        html += "<tr>";
        html += "<th style='padding: 8px;'> Nome </th>";
        html += "<th style='padding: 8px;'> E-mail </th>";
        html += "<th style='padding: 8px;'> Endereco </th>";
        html += "<th style='padding: 8px;'> Data de Nascimento </th>";
        html += "<th style='padding: 8px;'> Ações </th>";
        html += "</tr>";

        for (var i = 0; i < lista.length; i++) {
            const usuario = lista[i];
            html += "<tr>";
            html += "<td style='padding: 8px;'>" + usuario.nome + "</td>";
            html += "<td style='padding: 8px;'>" + usuario.email + "</td>";
            html += "<td style='padding: 8px;'>" + usuario.endereco + "</td>";
            html += "<td style='padding: 8px;'>" + usuario.nasc + "</td>";
            html += "<td style='padding: 8px;'>";
            html += "<a href='javascript:editar(" + i + ")'>Editar</a> | ";
            html += "<a href='javascript:excluir(" + i + ")'>Excluir</a>";
            html += "</td>";
            html += "</tr>";
        }

        html += "</table>";
        document.getElementById("lista").innerHTML = html;
    } else {
        document.getElementById("lista").innerHTML =
            "<p>Nenhum usuário cadastrado.</p>";
    }
}

function excluir(id) {
    var listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));
    listaUsuarios.splice(id, 1);
    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
    window.location.reload();
}

function editar(id) {
    window.location.href = "novo_usuario.html?id=" + id;
}
