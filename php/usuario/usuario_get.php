<?php
    include_once('../conexao.php');
    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => []
    ];
    
    // Recuperando informações do Banco de Dados
    if(isset($_GET['id'])){
        // Segunda situação - RECEBENDO O ID por GET
        $stmt = $conexao->prepare("SELECT * FROM usuario WHERE id_usuario=?");
        $stmt->bind_param("i",$_GET['id']);
    }else{
        // Primeira situação - SEM RECEBER O ID por GET
        $stmt = $conexao->prepare("SELECT * FROM usuario");
    }

    // Recuperando informações do Banco de Dados
    // Vou executar a query
    $stmt->execute();
    $resultado = $stmt->get_result();
    // Criando um array vazio para receber o resultado
    // do banco de Dados
    $tabela = [];
    if($resultado->num_rows > 0){
        while($linha = $resultado->fetch_assoc()){
            $tabela[] = $linha;
        }
        $retorno = [
            'status'   => 'ok',
            'mensagem' => 'Sucesso consulta efetuada',
            'data'     => $tabela
        ];
    }else{
        $retorno = [
            'status'   => 'nok',
            'mensagem' => "Não encontrou registros",
            'data'     => []
        ];
    }
    // Fechamentio do estado e conexão
    $stmt->close();
    $conexao->close();
    
    // Estou enviando para o FRONT o array RETORNO
    // mas no formato JSON
    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);