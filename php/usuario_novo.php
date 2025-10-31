<?php
    include_once('conexao.php');
    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => []
    ];

    // Simulando as informações que vem do front
    $nome     = $_POST['nome'];
    $telefone = $_POST['telefone'];
    $email    = $_POST['email'];
    $senha    = $_POST['senha'];
    $nasc     = $_POST['nasc'];
    $tipo     = $_POST['tipo'];

    // Preparando para inserção no banco de dados
    $stmt = $conexao->prepare("INSERT INTO usuario(nome, telefone, email, senha, 
    nasc, tipo) VALUES(?,?,?,?,?,?)");
    $stmt->bind_param("ssssss",$nome, $telefone, $email, $senha, $nasc, $tipo);
    $stmt->execute();

    if($stmt->affected_rows > 0){
        $retorno = [
            'status'   => 'ok',
            'mensagem' => 'Registro inserido com sucesso',
            'data'     => []
        ];
    }else{
        $retorno = [
            'status'   => 'nok',
            'mensagem' => 'Falha ao inserir o registro',
            'data'     => []
        ];
    }

    $stmt->close();
    $conexao->close();

    header("Content-type:application/json; charset=utf-8");
    echo json_encode($retorno);