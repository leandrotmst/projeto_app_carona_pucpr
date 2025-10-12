document.addEventListener("DOMContentLoaded", () => {
  // Referências aos elementos HTML
  const form = document.getElementById("cadastroForm");
  const tipoUsuarioSelect = document.getElementById("tipoUsuario");
  const campoCarroContainer = document.getElementById("campoCarroContainer");

  // Inputs dos detalhes do carro
  const placaCarroInput = document.getElementById("placaCarro");
  const modeloCarroInput = document.getElementById("modeloCarro");
  const anoCarroInput = document.getElementById("anoCarro");
  const camposCarro = [placaCarroInput, modeloCarroInput, anoCarroInput];

  // Obtém o ID da URL (se estiver em modo de edição)
  const params = new URLSearchParams(window.location.search);
  // Usamos 'id' para buscar o índice do usuário no array
  const usuarioId = params.get("id");
  const isEditing = usuarioId !== null;

  // --- FUNÇÃO PARA MOSTRAR/ESCONDER CAMPOS ---
  function toggleCamposCarro() {
    if (tipoUsuarioSelect.value === "motorista") {
      campoCarroContainer.style.display = "block";
      // Torna os campos do carro obrigatórios
      camposCarro.forEach((input) =>
        input.setAttribute("required", "required")
      );
    } else {
      campoCarroContainer.style.display = "none";
      // Remove a obrigatoriedade
      camposCarro.forEach((input) => input.removeAttribute("required"));

      // Limpa os valores apenas no modo de criação ou se o usuário mudar de motorista para passageiro
      // No modo de edição, os valores podem estar lá, mas a lógica de salvamento os ignora se o tipo não for 'motorista'.
      if (
        !isEditing ||
        (!isEditing && tipoUsuarioSelect.value === "passageiro")
      ) {
        camposCarro.forEach((input) => (input.value = ""));
      }
    }
  }

  // --- FUNÇÃO CRUCIAL PARA CARREGAR DADOS NO MODO EDIÇÃO ---
  function carregarDadosUsuario(id) {
    // Usa a chave 'listaUsuarios'
    const listaUsuarios = JSON.parse(
      localStorage.getItem("listaUsuarios") || "[]"
    );
    // O ID é o índice (0, 1, 2...) no array do LocalStorage
    const usuario = listaUsuarios[id];

    if (usuario) {
      document.querySelector("h1").textContent = "Editar Usuário";

      // 1. Preenche campos básicos (os IDs devem corresponder ao HTML)
      document.getElementById("nome").value = usuario.nome || "";
      document.getElementById("telefone").value = usuario.telefone || "";
      document.getElementById("email").value = usuario.email || "";
      document.getElementById("endereco").value = usuario.endereco || "";
      document.getElementById("nasc").value = usuario.nasc || "";

      // 2. Define o tipo de usuário
      tipoUsuarioSelect.value = usuario.tipo;

      // 3. Preenche campos do carro se for motorista
      if (usuario.tipo === "motorista" && usuario.carro) {
        placaCarroInput.value = usuario.carro.placa || "";
        modeloCarroInput.value = usuario.carro.modelo || "";
        anoCarroInput.value = usuario.carro.ano || "";
      }

      // 4. Garante que o contêiner do carro seja exibido/ocultado corretamente
      toggleCamposCarro();

      document.getElementById("cadastrar").textContent = "Salvar Alterações";
    } else {
      // Se o ID for inválido, redireciona
      console.error("ID de usuário inválido para edição.");
      window.location.href = "index.html";
    }
  }

  // --- INICIALIZAÇÃO ---
  if (isEditing) {
    carregarDadosUsuario(usuarioId);
  } else {
    document.getElementById("cadastrar").textContent = "Cadastrar Novo";
    // Garante que o estado inicial (Passageiro) está correto
    toggleCamposCarro();
  }

  // Adiciona o listener para a MUDANÇA (CHANGE) no campo de seleção
  tipoUsuarioSelect.addEventListener("change", toggleCamposCarro);

  // --- LÓGICA DE SALVAMENTO (CREATE/UPDATE) ---
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Coletando TODOS os dados do formulário
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const endereco = document.getElementById("endereco").value;
    const nasc = document.getElementById("nasc").value;
    const tipo = tipoUsuarioSelect.value;

    let listaUsuarios = JSON.parse(
      localStorage.getItem("listaUsuarios") || "[]"
    );

    // Objeto de dados (ID preservado ou novo)
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
      // Anexa os detalhes do carro APENAS se for motorista
      dadosUsuario.carro = {
        placa: placaCarroInput.value,
        modelo: modeloCarroInput.value,
        ano: anoCarroInput.value,
      };
    }

    // Simulação de checagem de e-mail (apenas para criação OU se o e-mail for alterado na edição)
    const emailExists = listaUsuarios.some(
      (u, index) => u.email === email && (isEditing ? index != usuarioId : true)
    );

    if (emailExists && !isEditing) {
      alert("Este e-mail já está cadastrado. Não é possível salvar.");
      return;
    }

    if (isEditing) {
      // MODO EDIÇÃO (UPDATE)
      listaUsuarios[usuarioId] = dadosUsuario;
    } else {
      // MODO CRIAÇÃO (CREATE)
      listaUsuarios.push(dadosUsuario);
    }

    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));

    console.log("Usuário salvo/atualizado:", dadosUsuario);

    // Redireciona de volta para a lista de gerenciamento
    window.location.href = "index.html";
  });
});
