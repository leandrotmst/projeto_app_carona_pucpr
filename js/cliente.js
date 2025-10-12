document.addEventListener("DOMContentLoaded", () => {
  // Nota: Usamos a chave 'listaUsuarios' para ser consistente com o cadastro/login.
  if (!validaSessao()) {
    // Redireciona se não houver sessão ativa
    window.location.href = "../index.html";
  } else {
    carregaItens();
  }
});

document.getElementById("novo").addEventListener("click", function () {
  // Redireciona para o formulário de cadastro
  window.location.href = "novo_cliente.html";
});

function validaSessao() {
  // Simulação de validação de sessão
  if (localStorage.getItem("sessao")) {
    return true;
  } else {
    return false;
  }
}

function carregaItens() {
  // Usa a chave 'listaUsuarios'
  const listaUsuariosJSON = localStorage.getItem("listaUsuarios");

  if (listaUsuariosJSON) {
    var lista = JSON.parse(listaUsuariosJSON);
    var html = "";

    html +=
      "<table border='1' style='width: 100%; border-collapse: collapse; text-align: left; margin-top: 20px;'>";
    html += "<tr>";
    html += "<th style='padding: 8px;'> Nome </th>";
    html += "<th style='padding: 8px;'> E-mail </th>";
    html += "<th style='padding: 8px;'> Tipo </th>";
    html += "<th style='padding: 8px;'> Veículo </th>";
    html += "<th style='padding: 8px;'> Ações </th>";
    html += "</tr>";

    for (var i = 0; i < lista.length; i++) {
      const usuario = lista[i];
      const tipo = usuario.tipo.charAt(0).toUpperCase() + usuario.tipo.slice(1); // Capitaliza

      let veiculo = "N/A";
      if (usuario.tipo === "motorista" && usuario.carro) {
        const carro = usuario.carro;
        veiculo = `${carro.modelo} (${carro.placa}) - ${carro.ano}`;
      }

      html += "<tr>";
      html += "<td style='padding: 8px;'>" + usuario.nome + "</td>";
      html += "<td style='padding: 8px;'>" + usuario.email + "</td>";
      html += "<td style='padding: 8px;'><strong>" + tipo + "</strong></td>";
      html += "<td style='padding: 8px;'>" + veiculo + "</td>";
      html += "<td style='padding: 8px;'>";
      html += "<a href='javascript:editar(" + i + ")'>Editar</a> | ";
      html += "<a href='javascript:excluir(" + i + ")'>Excluir</a>";
      html += "</td>";
      html += "</tr>";
    }

    html += "</table>";
    document.getElementById("lista").innerHTML = html;
  } else {
    // Inicializa com dados de teste, usando a nova estrutura
    var obj = {
      id: Date.now(),
      nome: "Admin Teste",
      email: "teste@uni.br",
      nasc: "2000-01-01",
      tipo: "motorista",
      telefone: "999999999",
      endereco: "Rua Exemplo, 123",
      carro: { placa: "ABC-1234", modelo: "Fusca", ano: "1980" },
    };
    localStorage.setItem("listaUsuarios", JSON.stringify([obj]));
    window.location.reload();
  }
}

function excluir(id) {
  // Usa a chave 'listaUsuarios'
  var listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));

  // Confirmação (seria melhor com um modal)
  if (
    confirm(
      `Tem certeza que deseja excluir o usuário ${listaUsuarios[id].nome}?`
    )
  ) {
    listaUsuarios.splice(id, 1);
    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
    window.location.reload();
  }
}

function editar(id) {
  // Redireciona para o novo_cliente.html (seu formulário unificado)
  window.location.href = "novo_cliente.html?id=" + id;
}
