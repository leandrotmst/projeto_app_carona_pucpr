document.addEventListener("DOMContentLoaded", ()=>{
    valida_admin();
});

document.getElementById('sair').addEventListener('click', ()=>{
    logout();
});

async function logout(){
    const retorno = await fetch("../php/admin_logout.php");
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        window.location.href = '../';   
    }
}