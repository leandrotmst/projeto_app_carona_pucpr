document.addEventListener("DOMContentLoaded", ()=>{
    const params = new URLSearchParams(window.location.search);
    const avaliacaoId = params.get('id');
    const isEditing = avaliacaoId !== null; // Pega o ID na URL
    const titulo = document.getElementById("form-titulo"); // Título da página
    const nomeBotao = document.getElementById("enviar"); // Escrita no botão

    if(isEditing){
        // Se achar ID na URL -> Muda o título e nome no botão para edição 
        titulo.textContent = "Editar Avaliação";
        nomeBotao.textContent = "Salvar Alterações";
        carregarDadosAvaliacao(avaliacaoId);
    }
    else{
        // Senão -> Muda o título e nome no botão para cadastro 
        titulo.textContent = "Nova Avaliação";
        nomeBotao.textContent = "Enviar Avaliação";
    }  

    // Adiciona animação ao hover das estrelas
    const stars = document.querySelectorAll('.rating label');
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const currentStarValue = this.getAttribute('for').replace('star', '');
            highlightStars(currentStarValue);
        });
    });

    const ratingContainer = document.querySelector('.rating');
    ratingContainer.addEventListener('mouseout', function() {
        const selectedStar = document.querySelector('input[name="rating"]:checked');
        if (selectedStar) {
            highlightStars(selectedStar.value);
        } else {
            resetStars();
        }
    });

    document.getElementById("enviar").addEventListener("click", function(event){
        event.preventDefault();

        var obj = {
            motorista: document.getElementById("motorista").value,
            avaliacao: document.querySelector('input[name="rating"]:checked').value,
            tipo_comentario: document.querySelector
            ('input[name="tipo_comentario"]:checked').value,
            comentario: document.getElementById("comentario").value,
            data: new Date().toISOString()
        };
        
        var listaAvaliacoes = JSON.parse(localStorage.getItem("listaAvaliacoes")||"[]");

        if(isEditing){
            // Edição
            listaAvaliacoes[parseInt(avaliacaoId)] = obj;
        }else{
            // Cadastra
            listaAvaliacoes.push(obj);
        }

        localStorage.setItem("listaAvaliacoes", JSON.stringify(listaAvaliacoes));
        window.location.href = "../../home/avaliacao/index.html";
    });
});

// Preenche os dados para edição
function carregarDadosAvaliacao(avaliacaoId){
    var listaAvaliacoes = JSON.parse(localStorage.getItem("listaAvaliacoes")||"[]");
    const id = parseInt(avaliacaoId);

    if(listaAvaliacoes[id]){
        document.getElementById("motorista").value = listaAvaliacoes[id].motorista;
        document.querySelector(`input[name="rating"][value="
            ${listaAvaliacoes[id].avaliacao}"]`).checked = true;
        document.querySelector(`input[name="tipo_comentario"]
            [value="${listaAvaliacoes[id].tipo_comentario}"]`).checked = true;
        document.getElementById("comentario").value = listaAvaliacoes[id].comentario;
        highlightStars(listaAvaliacoes[id].avaliacao);
    }else{
        // ID inválido -> Redireciona
        window.location.href = "../../home/avaliacao/index.html";
    }
}

function highlightStars(value) {
    const stars = document.querySelectorAll('.rating label');
    stars.forEach(star => {
        const starValue = star.getAttribute('for').replace('star', '');
        if (starValue <= value) {
            star.style.color = '#ffd700';
        } else {
            star.style.color = '#ddd';
        }
    });
}

function resetStars() {
    const stars = document.querySelectorAll('.rating label');
    stars.forEach(star => {
        star.style.color = '#ddd';
    });
}
