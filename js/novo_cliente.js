document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastroForm");
  const tipoUsuarioSelect = document.getElementById("tipoUsuario");
  const campoCarroContainer = document.getElementById("campoCarroContainer");

  const placaCarroInput = document.getElementById("placaCarro");
  const modeloCarroInput = document.getElementById("modeloCarro");
  const anoCarroInput = document.getElementById("anoCarro");
  const camposCarro = [placaCarroInput, modeloCarroInput, anoCarroInput];

  const params = new URLSearchParams(window.location.search);
  const usuarioId = params.get("id");
  const isEditing = usuarioId !== null;

  function toggleCamposCarro() {
    if (tipoUsuarioSelect.value === "motorista") {
      campoCarroContainer.style.display = "block";
      camposCarro.forEach((input) =>
        input.setAttribute("required", "required")
      );
    } else {
      campoCarroContainer.style.display = "none";
      camposCarro.forEach((input) => input.removeAttribute("required"));

      if (
        !isEditing ||
        (!isEditing && tipoUsuarioSelect.value === "passageiro")
      ) {
        camposCarro.forEach((input) => (input.value = ""));
      }
    }
  }

  function carregarDadosUsuario(id) {
    const listaUsuarios = JSON.parse(
      localStorage.getItem("listaUsuarios") || "[]"
    );
    const usuario = listaUsuarios[id];

    if (usuario) {
      document.querySelector("h1").textContent = "Editar Usuário";

      // 1. Preenche campos básicos (os IDs devem corresponder ao HTML)
      document.getElementById("nome").value = usuario.nome || "";
      document.getElementById("telefone").value = usuario.telefone || "";
      document.getElementById("email").value = usuario.email || "";
      document.getElementById("endereco").value = usuario.endereco || "";
      document.getElementById("nasc").value = usuario.nasc || "";

      tipoUsuarioSelect.value = usuario.tipo;

      if (usuario.tipo === "motorista" && usuario.carro) {
        placaCarroInput.value = usuario.carro.placa || "";
        modeloCarroInput.value = usuario.carro.modelo || "";
        anoCarroInput.value = usuario.carro.ano || "";
      }

      toggleCamposCarro();

      document.getElementById("cadastrar").textContent = "Salvar Alterações";
    } else {
      // Se o ID for inválido, redireciona
      console.error("ID de usuário inválido para edição.");
      window.location.href = "index.html";
    }
  }

  if (isEditing) {
    carregarDadosUsuario(usuarioId);
  } else {
    document.getElementById("cadastrar").textContent = "Cadastrar Novo";
    toggleCamposCarro();
  }

  tipoUsuarioSelect.addEventListener("change", toggleCamposCarro);

  // --- LÓGICA DE SALVAMENTO ---
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const endereco = document.getElementById("endereco").value;
    const nasc = document.getElementById("nasc").value;
    const tipo = tipoUsuarioSelect.value;

    let listaUsuarios = JSON.parse(
      localStorage.getItem("listaUsuarios") || "[]"
    );

    let dadosUsuario = {
      id: isEditing ? listaUsuarios[usuarioId].id : Date.now(),
      nome: nome,
      telefone: telefone,
      email: email,
      endereco: endereco,
      nasc: nasc,
      tipo: tipo,
      carro: null,
    };

    if (tipo === "motorista") {
      dadosUsuario.carro = {
        placa: placaCarroInput.value,
        modelo: modeloCarroInput.value,
        ano: anoCarroInput.value,
      };
    }

    const emailExists = listaUsuarios.some(
      (u, index) => u.email === email && (isEditing ? index != usuarioId : true)
    );

    if (emailExists && !isEditing) {
      alert("Este e-mail já está cadastrado. Não é possível salvar.");
      return;
    }

    if (isEditing) {
      listaUsuarios[usuarioId] = dadosUsuario;
    } else {
      listaUsuarios.push(dadosUsuario);
    }

    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));

    console.log("Usuário salvo/atualizado:", dadosUsuario);

    window.location.href = "index.html";
  });
});
