<?php
    include_once('../conexao.php');
    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => [],
    ];

    if(isset($_GET['id_usuario'])){
        // Simulando as informações que vem do front
        $nome     = $_POST['nome'];
        $telefone = $_POST['telefone'];
        $email    = $_POST['email'];
        $senha    = $_POST['senha'];
        $tipo     = $_POST['tipo'];
        $nasc     = $_POST['nasc'];
    
        // Preparando para inserção no banco de dados
        $stmt = $conexao->prepare("UPDATE usuario SET nome=?, telefone=?, 
        email=?, senha=?, tipo=?, nasc=? WHERE id_usuario=?");
        $stmt->bind_param("ssssssi",$nome, $telefone, $email, $senha, $tipo,
        $nasc, $_GET['id_usuario']);
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