document.getElementById("entrar").addEventListener('click',function(){
    login();
});

async function login(){
    var user = document.getElementById("user").value;
    var senha = document.getElementById("senha").value;

    if(user==="admin" && senha==="admin"){
        const fd = new FormData();
        fd.append("user", user);
        fd.append("senha", senha);

        const retorno = await fetch("php/login.php",{
            method: "POST",
            body: fd
        });
        const resposta = await retorno.json();
        
        // Login Admin
        window.location.href = "home/index.html";
    }
    else{
        const fd = new FormData();
        fd.append("user", user);
        fd.append("senha", senha);

        const retorno = await fetch("php/login.php",{
            method: "POST",
            body: fd
        });
        const resposta = await retorno.json();
        
        localStorage.setItem("sessao",JSON.stringify(resposta));

        // Login User
        window.location.href = "app/index.html";
    }
}