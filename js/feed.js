document.addEventListener("DOMContentLoaded", () => {
    // --- DADOS SIMULADOS (Mock Data) ---
    // Em um projeto real, esses dados viriam do seu servidor (PHP) e Banco de Dados
    const mockPosts = [
        {
            id: 1,
            tipo: "motorista", // Oferta de carona
            usuario: "Ana Clara S.",
            origem: "Bairro Morumbi, Campinas",
            destino: "Universidade X",
            horario: "07:30",
            vagas: 3,
            valor: "R$ 6,00",
            detalhes: "Carro cinza, ar condicionado. Saída pontual."
        },
        {
            id: 2,
            tipo: "passageiro", // Solicitação de carona
            usuario: "João Pedro L.",
            origem: "Universidade X",
            destino: "Centro, São Paulo",
            horario: "19:00",
            vagas: 1,
            valor: "R$ 15,00",
            detalhes: "Preciso de carona urgente. Pago na hora, flexível no ponto de encontro."
        },
        {
            id: 3,
            tipo: "motorista",
            usuario: "Prof. Ricardo M.",
            origem: "Valinhos (Próximo ao Shopping)",
            destino: "Universidade X",
            horario: "08:15",
            vagas: 2,
            valor: "R$ 10,00",
            detalhes: "Veículo grande. Apenas para quem for para o bloco de Exatas."
        },
        {
            id: 4,
            tipo: "passageiro",
            usuario: "Mariana R.",
            origem: "Rua das Flores, 123",
            destino: "Universidade X",
            horario: "12:00",
            vagas: 1,
            valor: "R$ 7,50",
            detalhes: "Busco carona para o turno da tarde."
        },
    ];

    const feedContainer = document.getElementById("feed-container");
    const filtroTipo = document.getElementById("filtroTipo");

    // --- FUNÇÃO DE RENDERIZAÇÃO ---
    function renderFeed(posts) {
        feedContainer.innerHTML = ""; // Limpa o container antes de renderizar
        
        if (posts.length === 0) {
            feedContainer.innerHTML = '<p class="text-center text-gray-500 mt-8 p-4 bg-white rounded-xl shadow">Nenhuma carona encontrada para o filtro selecionado.</p>';
            return;
        }

        posts.forEach(post => {
            // Define estilos com base no tipo de postagem (Motorista = Oferta (Azul), Passageiro = Busca (Laranja))
            const isMotorista = post.tipo === "motorista";
            const corPrimaria = isMotorista ? 'uni-blue' : 'uni-accent';
            const icone = isMotorista ? '🚗' : '🚶';
            const textoTipo = isMotorista ? 'OFERTA de Carona' : 'BUSCA por Carona';

            // Cria o HTML do Card da Postagem
            const postHtml = `
                <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-${corPrimaria}">
                    
                    <!-- Cabeçalho do Post -->
                    <div class="flex items-center justify-between mb-4 pb-2 border-b">
                        <span class="text-sm font-semibold px-3 py-1 rounded-full bg-${corPrimaria}/10 text-${corPrimaria} transition-all duration-300">
                            ${icone} ${textoTipo}
                        </span>
                        <div class="text-lg font-bold text-gray-800">${post.valor}</div>
                    </div>
                    
                    <!-- Detalhes da Rota -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <p class="text-sm text-gray-500">Origem:</p>
                            <p class="font-medium text-gray-900">${post.origem}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Destino:</p>
                            <p class="font-medium text-gray-900">${post.destino}</p>
                        </div>
                    </div>

                    <!-- Horário e Vagas -->
                    <div class="flex justify-between items-center text-sm mb-4 border-t pt-2">
                        <div class="text-gray-600">
                            <span class="font-semibold text-uni-blue">Horário:</span> ${post.horario}
                        </div>
                        <div class="text-gray-600">
                            <span class="font-semibold text-uni-blue">Vagas:</span> ${post.vagas}
                        </div>
                    </div>
                    
                    <!-- Detalhes e Ação -->
                    <div class="text-gray-700 mb-4 italic text-sm border-b pb-4">
                        "${post.detalhes}"
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="text-sm text-gray-500">Postado por: <span class="font-semibold">${post.usuario}</span></p>
                        
                        <!-- Botão que levaria para a página de chat/detalhes -->
                        <button onclick="verDetalhes(${post.id})" class="px-4 py-2 bg-uni-blue text-white font-semibold rounded-lg shadow-md hover:bg-uni-light transition duration-200 focus:outline-none focus:ring-2 focus:ring-uni-blue focus:ring-opacity-50">
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
        // Em um projeto real, isso redirecionaria para a página de chat,
        // passando o ID do post: window.location.href = `chat.html?postId=${postId}`;
        alert(`Abrindo chat/detalhes para o Post ID: ${postId}.`);
    }
});
