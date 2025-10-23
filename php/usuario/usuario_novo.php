<?php
    include_once('../conexao.php');

    // Simulando as informações que vem do front
    $nome       = "Leandro"; // $_POST['nome'];
    $telefone   = "foo";
    $email      = "foo@bla";
    $senha      = "foo";
    $nasc       = "foobla";
    $tipo       = "passageiro";

    // Preparando para inserção no banco de dados
    $stmt = $conexao->prepare("INSERT INTO cliente(nome, telefone, email, 
    senha, nasc, tipo) VALUES(?,?,?,?,?,?)");
    $stmt->bind_param("ssssss",$nome, $telefone, $email, $senha, $nasc, $tipo);
    $stmt->execute();
    $stmt->close();
    $conexao->close();