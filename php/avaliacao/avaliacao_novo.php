<?php
    include_once('../conexao.php');
    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => []
    ];

    // Simulando as informações que vem do front
    $nome   = $_POST['nome'];
    $modelo = $_POST['modelo'];
    $cor    = $_POST['cor'];
    $ano    = $_POST['ano'];

    // Preparando para inserção no banco de dados
    $stmt = $conexao->prepare("INSERT INTO veiculo(nome, modelo, cor, ano) 
    VALUES(?,?,?,?)");
    $stmt->bind_param("ssss",$nome, $modelo, $cor, $ano);
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

    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);