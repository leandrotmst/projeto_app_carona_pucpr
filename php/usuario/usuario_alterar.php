<?php
    include_once('../conexao.php');

    if(isset($_GET['id'])){
        // Simulando as informações que vem do front
        $nome       = "alterado - Leandro"; // $_POST['nome'];
        $telefone   = "alterado - foo";
        $email      = "alterado - foo@bla";
        $senha      = "alterado - foo";
        $nasc       = "alterado - foobla";
        $tipo       = "alterado - passageiro";
    
        // Preparando para inserção no banco de dados
        $stmt = $conexao->prepare("UPDATE usuario SET nome = ?, telefone = ?, 
        email = ?, senha = ?, nasc = ?, tipo = ? WHERE id = ?");
        $stmt->bind_param("sssss",$nome, $telefone, $email, $senha, 
        $nasc, $tipo, $_GET['id']);
        $stmt->execute();
        $stmt->close();
    }else{
        echo "Não posso alterar um registro sem um ID informado";
    }
    $conexao->close();