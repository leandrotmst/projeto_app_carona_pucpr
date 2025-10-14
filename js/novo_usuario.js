document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastroForm");
    const enviarButton = document.getElementById('enviar');
    const formTitulo = document.getElementById('form-titulo');

    const tipoUsuarioSelect = document.getElementById('tipoUsuario');
    const campoCarroContainer = document.getElementById('campoCarroContainer');
    const camposCarro = campoCarroContainer.querySelectorAll('input');

    const params = new URLSearchParams(window.location.search);
    const usuarioId = params.get('id');
    const isEditing = usuarioId !== null;

    function toggleCamposCarro() {
        if (tipoUsuarioSelect.value === 'motorista') {
            campoCarroContainer.style.display = 'block';
            camposCarro.forEach(input => input.setAttribute('required', 'required'));
        } else {
            campoCarroContainer.style.display = 'none';
            camposCarro.forEach(input => input.removeAttribute('required'));
        }
    }

    function carregarDadosUsuario(id) {
        const listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios") || "[]");
        const usuario = listaUsuarios[parseInt(id)];

        if (usuario) {
            formTitulo.textContent = 'Editar Usuário';
            
            document.getElementById("nome").value = usuario.nome || '';
            document.getElementById("telefone").value = usuario.telefone || '';
            document.getElementById("email").value = usuario.email || '';
            document.getElementById("endereco").value = usuario.endereco || '';

            tipoUsuarioSelect.value = usuario.tipo || '';

            document.getElementById("nasc").value = usuario.nasc || '';

            if (usuario.tipo === 'motorista' && usuario.carro) {
                document.getElementById("placaCarro").value = usuario.carro.placa || '';
                document.getElementById("modeloCarro").value = usuario.carro.modelo || '';
                document.getElementById("anoCarro").value = usuario.carro.ano || '';
            }

            toggleCamposCarro();

            enviarButton.textContent = 'Salvar Alterações';

        } else if (isEditing) {
            alert("Usuário não encontrado.");
            window.location.href = "index.html";
        }
    }

    if (isEditing) {
        carregarDadosUsuario(usuarioId); 
    } else {
        formTitulo.textContent = 'Cadastrar Novo Usuário';
        enviarButton.textContent = 'Cadastrar';
        campoCarroContainer.style.display = 'none';
    }
    
    tipoUsuarioSelect.addEventListener('change', toggleCamposCarro);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const nome = document.getElementById("nome").value;
        const telefone = document.getElementById("telefone").value;
        const email = document.getElementById("email").value;
        const endereco = document.getElementById("endereco").value;
        const tipo = tipoUsuarioSelect.value;
        const nasc = document.getElementById("nasc").value;
        
        let novoUsuario = {
            nome: nome,
            telefone: telefone,
            email: email,
            endereco: endereco,
            tipo: tipo,
            nasc: nasc,
            carro: null
        };

        if (tipo === 'motorista') {
            novoUsuario.carro = {
                placa: document.getElementById("placaCarro").value,
                modelo: document.getElementById("modeloCarro").value,
                ano: document.getElementById("anoCarro").value
            };
        }

        let listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios") || "[]");

        if (isEditing) {
            listaUsuarios[parseInt(usuarioId)] = novoUsuario;
        } else {
            listaUsuarios.push(novoUsuario);
        }

        localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
        
        console.log("Usuário salvo:", novoUsuario);

        window.location.href = "index.html"; 
    });
});