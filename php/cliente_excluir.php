<?php
    include_once('conexao.php');

    // Recuperando informações do Banco de Dados

    if(isset($_GET['id'])){
        // Segunda situação - RECEBENDO O ID por GET
        $stmt = $conexao->prepare("DELETE * FROM cliente WHERE id=?");
        $stmt->bind_param("i",$_GET['id']);
        $stmt->execute();
        $stmt->close();
    }else{
        echo "É necessário informar um ID para exclusão";
    }
    $conexao->close();