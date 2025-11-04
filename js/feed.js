document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    dados_simulados();
});

document.getElementById('logout').addEventListener('click', ()=>{
    logout();
});

async function logout(){
    const retorno = await fetch("../php/usuario_logout.php");
    const resposta = await retorno.json();
    if(resposta.status=='ok'){
        window.location.href="../home/login.html";
    }
}

async function dados_simulados() {
    // --- DADOS SIMULADOS (Mock Data) ---
    const mockPosts = [
        {
            id: 1, tipo: "motorista", usuario: "Ana Clara S.",
            origem: "Bairro Morumbi, Campinas", destino: "Universidade X",
            horario: "07:30", vagas: 3, valor: "R$ 6,00",
            detalhes: "Carro cinza, ar condicionado. Saída pontual."
        },
        {
            id: 2, tipo: "passageiro", usuario: "João Pedro L.",
            origem: "Universidade X", destino: "Centro, São Paulo",
            horario: "19:00", vagas: 1, valor: "R$ 15,00",
            detalhes: "Preciso de carona urgente. Pago na hora, flexível no ponto de encontro."
        },
        {
            id: 3, tipo: "motorista", usuario: "Prof. Ricardo M.",
            origem: "Valinhos (Próximo ao Shopping)", destino: "Universidade X",
            horario: "08:15", vagas: 2, valor: "R$ 10,00",
            detalhes: "Veículo grande. Apenas para quem for para o bloco de Exatas."
        },
        {
            id: 4, tipo: "passageiro", usuario: "Mariana R.",
            origem: "Rua das Flores, 123", destino: "Universidade X",
            horario: "12:00", vagas: 1, valor: "R$ 7,50",
            detalhes: "Busco carona para o turno da tarde."
        },
    ];

    const feedContainer = document.getElementById("feed-container");
    const filtroTipo = document.getElementById("filtroTipo");

    // --- FUNÇÃO DE RENDERIZAÇÃO ---
    function renderFeed(posts) {
        feedContainer.innerHTML = ""; // Limpa o container
        
        if (posts.length === 0) {
            feedContainer.innerHTML = '<p class="text-center text-muted mt-4 p-3 bg-white rounded-3 shadow-sm">Nenhuma carona encontrada para o filtro selecionado.</p>';
            return;
        }

        posts.forEach(post => {
            // Define estilos com base no tipo
            const isMotorista = post.tipo === "motorista";
            const corPrimaria = isMotorista ? 'uni-blue' : 'uni-accent';
            const corBg = isMotorista ? 'bg-uni-blue' : 'bg-uni-accent';
            const classeBorda = isMotorista ? 'card-motorista' : 'card-passageiro';
            const icone = isMotorista ? '🚗' : '🚶';
            const textoTipo = isMotorista ? 'OFERTA de Carona' : 'BUSCA por Carona';

            // CRIAÇÃO DO HTML DO CARD (MIGRADO PARA BOOTSTRAP)
            const postHtml = `
                <div class="card p-4 rounded-3 shadow-sm ${classeBorda}">
                    
                    <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                        <span class="badge rounded-pill ${corBg}/10 text-${corPrimaria} fw-semibold" style="color: var(--${corPrimaria}); background-color: rgba(var(--${corPrimaria}-rgb), 0.1);">
                            ${icone} ${textoTipo}
                        </span>
                        <div class="fs-5 fw-bold text-dark">${post.valor}</div>
                    </div>
                    
                    <div class="row text-center mb-3">
                        <div class="col-sm-6 mb-2 mb-sm-0">
                            <p class="mb-0 text-muted small">Origem:</p>
                            <p class="fw-medium text-dark">${post.origem}</p>
                        </div>
                        <div class="col-sm-6">
                            <p class="mb-0 text-muted small">Destino:</p>
                            <p class="fw-medium text-dark">${post.destino}</p>
                        </div>
                    </div>

                    <div class="mb-3 pt-2 border-top">
                        <div class="d-flex justify-content-between align-items-center small text-muted mb-1">
                            <span><span class="fw-bold text-uni-blue">Horário:</span> ${post.horario}</span>
                            <span><span class="fw-bold text-uni-blue">Vagas:</span> ${post.vagas}</span>
                        </div>
                        <p class="text-secondary small fst-italic border-bottom pb-3 mb-3">
                            "${post.detalhes}"
                        </p>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <p class="mb-0 small text-muted">Postado por: <span class="fw-semibold">${post.usuario}</span></p>
                        
                        <button onclick="verDetalhes(${post.id})" class="btn btn-sm btn-uni-blue fw-semibold shadow-sm">
                            Ver Detalhes / Chat
                        </button>
                    </div>

                </div>
            `;
            feedContainer.insertAdjacentHTML('beforeend', postHtml);
        });
    }
    // --- FUNÇÃO DE FILTRAGEM ---
    function filterFeed() {
        const filtro = filtroTipo.value;
        let postsFiltrados;
    
        if (filtro === 'todos') {
            postsFiltrados = mockPosts;
        } else {
            postsFiltrados = mockPosts.filter(post => post.tipo === filtro);
        }
        
        renderFeed(postsFiltrados);
    }
    
    // --- INICIALIZAÇÃO E EVENTOS ---
    
    // 1. Carrega o feed completo ao iniciar a página
    filterFeed(); 
    
    // 2. Adiciona o listener para o filtro
    filtroTipo.addEventListener("change", filterFeed);
    
    // 3. Função de demonstração para o botão "Ver Detalhes / Chat"
    window.verDetalhes = function(postId) {
        alert(`Abrindo chat/detalhes para o Post ID: ${postId}.`);
    }
}
