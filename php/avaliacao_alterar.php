<?php
    include_once('conexao.php');
    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => [],
    ];

    if(isset($_GET['id_avaliacao'])){
        // Simulando as informações que vem do front
        $id_carona    = (int)$_POST['id_carona'];
        $id_avaliador = (int)$_POST['id_avaliador'];
        $id_avaliado  = (int)$_POST['id_avaliado'];
        $nota         = (int)$_POST['nota'];
        $comentario   = $_POST['comentario'];
    
        // Preparando para inserção no banco de dados
        $stmt = $conexao->prepare("UPDATE avaliacao SET id_carona=?,id_avaliador=?, 
        id_avaliado=?, nota=?, comentario=? WHERE id_avaliacao=?");
        $stmt->bind_param("iiiisi",$id_carona, $id_avaliador, $id_avaliado, 
        $nota, $comentario, $_GET['id_avaliacao']);
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