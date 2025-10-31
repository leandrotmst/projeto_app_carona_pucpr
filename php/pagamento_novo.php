<?php
    include_once('conexao.php');
    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => []
    ];

    // Simulando as informações que vem do front
    $nome     = $_POST['nome'];
    $numero   = $_POST['numero'];
    $validade = $_POST['validade'];
    $cvv      = $_POST['cvv'];
    $tipo      = $_POST['tipo'];

    // Preparando para inserção no banco de dados
    $stmt = $conexao->prepare("INSERT INTO usuario(nome, numero, validade, cvv,
    tipo) VALUES(?,?,?,?)");
    $stmt->bind_param("sssss",$nome, $numero, $validade, $cvv, $tipo);
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