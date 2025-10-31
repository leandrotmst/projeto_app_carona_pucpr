<?php
    include_once('conexao.php');
    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => []
    ];

    // Simulando as informações que vem do front
    $id_carona    = (int)$_POST['id_carona'];
    $id_avaliador = (int)$_POST['id_avaliador'];
    $id_avaliado  = (int)$_POST['id_avaliado'];
    $nota         = (int)$_POST['nota'];
    $comentario   = $_POST['comentario'];

    // Preparando para inserção no banco de dados
    $stmt = $conexao->prepare("INSERT INTO avaliacao(id_carona, id_avaliador, 
    id_avaliado, nota, comentario) 
    VALUES(?,?,?,?,?)");
    $stmt->bind_param("iiiis",$id_carona, $id_avaliador, $id_avaliado, $nota, 
    $comentario);
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