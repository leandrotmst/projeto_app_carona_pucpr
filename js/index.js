document.getElementById("entrar").addEventListener('click',function(){
    login();
});

async function login(){
    var user  = document.getElementById("user").value;
    var senha = document.getElementById("senha").value;
    
    if(user.trim()==="" || senha.trim()===""){
        alert('Você não digitou nada');
        return;
    }
    if(user.trim()==="admin" && senha.trim()==="admin"){
        const fd = new FormData();
        fd.append("user", user);
        fd.append("senha", senha);

        const retorno = await fetch("php/login.php", {
            method: "POST",
            body: fd
        });
        const resposta = await retorno.json();
        
        localStorage.setItem("sessao",JSON.stringify(resposta));
        
        // Login Admin
        window.location.href = "home/index.html";
    }else{
        const fd = new FormData();
        fd.append("user", user);
        fd.append("senha", senha);
        
        const retorno = await fetch("../php/login.php", {
            method: "POST",
            body: fd
        });
        const resposta = await retorno.json();
        
        localStorage.setItem("sessao",JSON.stringify(resposta));

        // Login User
        window.location.href = "home/app/index.html";
    }
}