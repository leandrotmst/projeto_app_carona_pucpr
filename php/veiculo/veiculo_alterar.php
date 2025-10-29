<?php
    include_once('../conexao.php');
    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => [],
    ];

    if(isset($_GET['id_veiculo'])){
        // Simulando as informações que vem do front
        $nome   = $_POST['nome'];
        $modelo = $_POST['modelo'];
        $cor    = $_POST['cor'];
        $ano    = $_POST['ano'];
    
        // Preparando para inserção no banco de dados
        $stmt = $conexao->prepare("UPDATE veiculo SET nome=?, modelo=?, cor=?, 
        ano=? WHERE id_veiculo=?");
        $stmt->bind_param("ssssi",$nome, $modelo, $cor, $ano, 
        $_GET['id_veiculo']);
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