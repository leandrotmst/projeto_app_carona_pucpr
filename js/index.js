document.getElementById("entrar").addEventListener('click',function(){
    login();
});

async function login(){
    var user  = document.getElementById("user").value;
    var senha = document.getElementById("senha").value;
    
    if(user.trim()==="admin" && senha.trim()==="admin"){
        const fd = new FormData();
        fd.append("user", user);
        fd.append("senha", senha);

        // Login Admin
        window.location.href = "home/admin.html";
    }else{
        const fd = new FormData();
        fd.append("user", user);
        fd.append("senha", senha);
        
        // Login User
        window.location.href = "home/app.html";
    }
}