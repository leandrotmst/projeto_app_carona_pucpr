<?php
    include_once('conexao.php');
    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => []
    ];

    // Simulando as informações que vem do front
    $id_usuario     = (int)$_POST['id_usuario'];
    $origem         = $_POST['origem'];
    $destino        = $_POST['destino'];
    $distancia      = $_POST['distancia'];
    $tempo_estimado = $_POST['tempo_estimado'];

    // Preparando para inserção no banco de dados
    // Inclui id_usuario (chave estrangeira) na inserção
    $stmt = $conexao->prepare("INSERT INTO rota(id_usuario, origem, destino, 
    distancia, tempo_estimado) VALUES(?,?,?,?,?)");
    $stmt->bind_param("issssi",$id_usuario, $origem, $destino, $distancia, 
    $tempo_estimado);
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