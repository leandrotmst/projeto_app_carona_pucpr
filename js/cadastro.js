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
            nome: nome,
            email: email,
            tipo: tipo,
        };

        if (tipo === "motorista") {
            dadosCadastro.placa = placaCarroInput.value;
            dadosCadastro.modelo = modeloCarroInput.value;
            dadosCadastro.ano = anoCarroInput.value;
        }

        window.location.href("../app/feed.html");
    });
});
