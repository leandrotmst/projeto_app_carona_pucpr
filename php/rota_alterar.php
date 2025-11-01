<?php
    include_once('conexao.php');
    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => [],
    ];

    if(isset($_GET['id_rota'])){
        // Simulando as informações que vem do front
        $id_usuario     = (int)$_POST['id_usuario'];
        $origem         = $_POST['origem'];
        $destino        = $_POST['destino'];
        $distancia      = $_POST['distancia'];
        $tempo_estimado = $_POST['tempo_estimado'];
    
        // Preparando para inserção no banco de dados
        $stmt = $conexao->prepare("UPDATE rota SET id_usuario=? origem=?, 
        destino=?, distancia=?, tempo_estimado=? WHERE id_rota=?");
        $stmt->bind_param("issssi", $id_usuario, $origem, $destino, $distancia, $tempo_estimado, 
        $_GET['id_rota']);
        $stmt->execute();

        if($stmt->affected_rows > 0){
            $retorno = [
                'status'   => 'ok',
                'mensagem' => 'Registro alterado com sucesso!',
                'data'     => []
            ];
        }else{
            $retorno = [
                'status'   => 'nok',
                'mensagem' => 'Não foi possível alterar o registro',
                'data'     => []
            ];
        }
        
        $stmt->close();
    }else{
        $retorno = [
            'status'   => 'nok',
            'mensagem' => "Não posso alterar um registro sem um ID informado",
            'data'     => []
        ];
    }
    $conexao->close();

    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);