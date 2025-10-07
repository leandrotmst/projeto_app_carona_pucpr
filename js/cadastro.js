document.addEventListener("DOMContentLoaded", () => {
    const tipoUsuarioSelect = document.getElementById("tipoUsuario");
    const campoCarroContainer = document.getElementById("campoCarroContainer");
    const placaCarroInput = document.getElementById("placaCarro");
    const modeloCarroInput = document.getElementById("modeloCarro");
    const anoCarroInput = document.getElementById("anoCarro");
    
    const camposCarro = [placaCarroInput, modeloCarroInput, anoCarroInput];

    function toggleCamposCarro() {
        if (tipoUsuarioSelect.value === "motorista") {
            campoCarroContainer.style.display = "block";
            camposCarro.forEach(input => {
                input.setAttribute("required", "required");
            });
        } else {
            campoCarroContainer.style.display = "none";
            camposCarro.forEach(input => {
                input.removeAttribute("required");
                input.value = ""; 
            });
        }
    }

    const params = new URLSearchParams(window.location.search);
    const tipoUrl = params.get('tipo');

    if (tipoUrl === 'motorista') {
        tipoUsuarioSelect.value = 'motorista';
    } else if (tipoUrl === 'passageiro') {
        tipoUsuarioSelect.value = 'passageiro';
    }
    
    toggleCamposCarro();

    tipoUsuarioSelect.addEventListener("change", toggleCamposCarro);

    document.getElementById("cadastroForm").addEventListener("submit", (event) => {
        event.preventDefault(); 
        
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const tipo = tipoUsuarioSelect.value;
        
        let dadosCadastro = {
            id: Date.now(),
            nome: nome,
            email: email,
            tipo: tipo,
            carro: null 
        };

        if (tipo === "motorista") {
            dadosCadastro.carro = {
                placa: placaCarroInput.value,
                modelo: modeloCarroInput.value,
                ano: anoCarroInput.value
            };
        }

        let listaUsuarios = localStorage.getItem("listaUsuarios") ?
            JSON.parse(localStorage.getItem("listaUsuarios")) : [];

        listaUsuarios.push(dadosCadastro);

        localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));

        window.location.href = "feed.html";
    });
});