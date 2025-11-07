document.getElementById('entrar').addEventListener('click', ()=>{
    login();
});

async function login(){
    var usuario = document.getElementById('usuario').value;
    var senha = document.getElementById('senha').value;
    const fd = new FormData();
    fd.append("usuario", usuario);
    fd.append("senha", senha);

    const retorno = await fetch('../projeto_app_carona_pucpr/php/admin_login.php',{
            method: "POST",
            body: fd
        }
    );
    const resposta = await retorno.json();
    if(resposta.status=='ok'){
        window.location.href = "../projeto_app_carona_pucpr/home/admin.html";
    }else{
        alert('Credenciais inválidas');
    }
}