<?php
    include_once('conexao.php');
    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => []
    ];

    // Simulando as informações que vem do front
    $id_usuario  = (int)$_POST['id_usuario'];
    $origem      = $_POST['origem'];
    $destino     = $_POST['destino'];
    $passageiros = (int)$_POST['passageiros'];

    // Preparando para inserção no banco de dados
    $stmt = $conexao->prepare("INSERT INTO carona(id_usuario, origem, destino, 
    passageiros) VALUES(?,?,?,?)");
    $stmt->bind_param("issi",$id_usuario, $origem, $destino, $passageiros);
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