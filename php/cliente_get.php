<?php
    include_once('conexao.php');

    // Recuperando informações do Banco de Dados

    if(isset($_GET['id'])){
        // Segunda situação - RECEBENDO O ID por GET
        $stmt = $conexao->prepare("SELECT * FROM cliente WHERE id=?");
        $stmt->bind_param("i",$_GET['id']);
    }else{
        // Primeira situação - SEM RECEBER O ID por GET
        $stmt = $conexao->prepare("SELECT * FROM cliente");
    }


    // Vou executar a query
    $stmt->execute();
    $resultado = $stmt->get_result();
    // Criando um array vazio para receber o resultado
    // do banco de Dados
    $tabela = [];
    if($resultado->num_rows > 0){
        while($linha = $resultado->fetch_assoc()){
            $tabela[] = $linha;
        }
    }else{
        echo "Não encontrou registros";
    }
    // Fechamentio do estado e conexão
    $stmt->close();
    $conexao->close();
    
    echo"<pre>";
    var_dump($tabela);
    echo"</pre>";