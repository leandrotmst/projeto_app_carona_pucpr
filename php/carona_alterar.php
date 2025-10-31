<?php
    include_once('conexao.php');
    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => [],
    ];

    if(isset($_GET['id_carona'])){
        // Simulando as informações que vem do front
        $id_usuario  = (int)$_POST['id_usuario'];
        $origem      = $_POST['origem'];
        $destino     = $_POST['destino'];
        $origem      = $_POST['origem'];
        $passageiros = (int)$_POST['passageiros'];
    
        // Preparando para inserção no banco de dados
        $stmt = $conexao->prepare("UPDATE carona SET id_usuario=?, origem=?, 
        destino=?, origem=?, passageiros=? WHERE id_carona=?");
        $stmt->bind_param("isssii",$id_usuario, $origem, $destino, $origem, 
        $passageiros, $_GET['id_carona']);
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