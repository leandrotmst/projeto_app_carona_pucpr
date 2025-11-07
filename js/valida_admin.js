async function valida_admin(){
    const retorno = await fetch("../php/valida_admin.php");
    const resposta = await retorno.json();
    if(resposta.status == "nok"){
        window.location.href = '../';
    }
}