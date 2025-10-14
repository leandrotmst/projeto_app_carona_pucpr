document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("sessao")) {
        carregaPassageiros();
    } else {
        window.location.href = "../index.html"; 
    }
});

function carregaPassageiros() {
    const listaCompleta = JSON.parse(localStorage.getItem("listaUsuarios") || "[]");
    
    const listaPassageiros = listaCompleta.filter(usuario => usuario.tipo === "passageiro");
    
    let html = "";
    
    if (listaPassageiros.length > 0) {
        html += "<table border='1' style='width: 100%; border-collapse: collapse; text-align: left; margin-top: 20px;'>";
        html += "<tr>";
        html += "<th style='padding: 8px;'> Nome </th>";
        html += "<th style='padding: 8px;'> E-mail </th>";
        html += "<th style='padding: 8px;'> Data de Nascimento </th>";
        html += "<th style='padding: 8px;'> Ações </th>";
        html += "</tr>";

        for (var i = 0; i < listaPassageiros.length; i++) {
            const passageiro = listaPassageiros[i];
            
            html += "<tr>";
            html += "<td style='padding: 8px;'>" + passageiro.nome + "</td>";
            html += "<td style='padding: 8px;'>" + passageiro.email + "</td>";
            html += "<td style='padding: 8px;'>" + passageiro.nasc + "</td>";
            
            html += "<td style='padding: 8px;'>";
            const idOriginal = listaCompleta.indexOf(passageiro);
            html += `<a href='javascript:editar(${idOriginal})'>Editar</a> | `;
            html += `<a href='javascript:excluir(${idOriginal})'>Excluir</a>`;
            html += "</td>";
            html += "</tr>";
        }
        html += "</table>";
    } else {
        html += "<p>Nenhum passageiro cadastrado.</p>";
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