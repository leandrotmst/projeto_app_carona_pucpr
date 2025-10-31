<?php
    include_once('conexao.php');
    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => [],
    ];

    if(isset($_GET['id_pagamento'])){
        // Simulando as informações que vem do front
        $nome     = $_POST['nome'];
        $numero   = $_POST['numero'];
        $validade = $_POST['validade'];
        $cvv      = $_POST['cvv'];
        $tipo     = $_POST['tipo'];
    
        // Preparando para inserção no banco de dados
        $stmt = $conexao->prepare("UPDATE pagamento SET nome=?, numero=?, 
        validade=?, cvv=? WHERE id_pagamento=?");
        $stmt->bind_param("sssssi",$nome, $numero, $validade, $cvv, $tipo,
        $_GET['id_pagamento']);
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