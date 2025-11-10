<?php
    include_once('conexao.php');
    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => []
    ];

    // Simulando as informações que vem do front
    $id_usuario = (int)$_POST['id_usuario']; // ID do motorista
    $modelo = $_POST['modelo'];
    $placa    = $_POST['placa'];
    $cor    = $_POST['cor'];

    // Preparando para inserção no banco de dados
    $stmt = $conexao->prepare("INSERT INTO veiculo(id_usuario, modelo, cor, placa) 
    VALUES(?,?,?,?)");
    $stmt->bind_param("isss",$id_usuario, $modelo, $cor, $placa);
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