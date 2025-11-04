# **🚗 Carona Uni - Sistema de Caronas Universitárias**

## **Visão Geral do Projeto**

O **Carona Uni** é um projeto acadêmico desenvolvido para facilitar a conexão entre alunos e professores de uma universidade que desejam oferecer ou encontrar caronas. O objetivo é criar uma solução prática, segura e econômica para a comunidade universitária, com foco em uma experiência de usuário simples e um modelo de negócios baseado em microtransações.

## **🚀 Status Atual do Protótipo**

Esta versão é um protótipo funcional (Frontend/CRUD Básico) que utiliza **JavaScript e SQL**.

### **Funcionalidades Implementadas (Protótipo)**

* **Página Inicial (index.html):** Apresentação e direcionamento rápido para Cadastro ou Login.
* **Cadastro Dinâmico (usuario_novo.html):** Formulário único que pede, nome, e-mail, telefone, senha, senha confirmada, tipo (Passageiro ou Motorista).
* **Feed de Caronas (feed.html):** Visualização de posts simulados de caronas disponíveis (ofertas e buscas).
* **Cadastro de pagamento, veículo, avaliação de viagem, carona... (....html):** Formulário único que pede informações importantes para cada uma das funcionalidades.
* **Filtro Simples:** Possibilidade de filtrar o feed entre "Motoristas" e "Passageiros".
* **CRUD (Criação):** Os dados de novos usuários são salvos no **SQL**.

## **🛠️ Tecnologias Utilizadas**

| Categoria | Tecnologia | Uso no Projeto |
| :---- | :---- | :---- |
| **Frontend** | HTML5 | Estrutura das páginas. |
| **Estilização** | Tailwind CSS (CDN) | Design moderno, responsivo e limpo (padrão universitário). |
| **Lógica** | JavaScript (Puro) | Manipulação do DOM, controle de visibilidade de formulário, lógica de CRUD e gerenciamento de estado (via SQL). |
| **Backend** | PHP | Será utilizado para a API e comunicação com o banco de dados. |
| **Banco de Dados** | MySQL | Armazenamento persistente de usuários, posts de carona e histórico. |

---

## **💾 Estrutura do Banco de Dados (projeto_app_carona_pucpr)**

O script SQL para criação do banco de dados e suas tabelas está disponível no arquivo `projeto_app_carona_pucpr.sql`.

### **Tabelas Principais**

| Tabela | Chave Primária | Descrição |
| :---- | :---- | :---- |
| `usuario` | `id_usuario` | Armazena dados de login, contato e tipo (Motorista/Passageiro) dos usuários. |
| `veiculo` | `id_veiculo` | Registra os veículos cadastrados por um `Motorista`. |
| `carona` | `id_carona` | Armazena os detalhes da carona (origem, destino, data, status, vagas). |
| `pagamento` | `id_pagamento` | Guarda os métodos de pagamento (cartão) de um `usuario`. |
| `avaliacao` | `id_avaliacao` | Registra a nota (1 a 5) e comentário de um usuário para outro após uma carona. |

### **Chaves Estrangeiras (Relacionamentos)**

* **`carona`**: Relaciona-se com `usuario` (quem oferece a carona) e `veiculo`.
* **`veiculo`**: Relaciona-se com `usuario` (o proprietário do veículo).
* **`pagamento`**: Relaciona-se com `usuario` (o dono do método de pagamento).
* **`avaliacao`**: Relaciona-se com `carona`, `usuario` (avaliador) e `usuario` (avaliado).

---

## **⚙️ Instalação e Execução**

Para rodar o protótipo localmente, você só precisa de um navegador moderno:

1. **Clone o Repositório:**
   `git clone [LINK DO SEU REPOSITÓRIO]`
   `cd projeto_app_carona_pucpr`

2. **Configuração do Banco de Dados:**
    * Crie um banco de dados MySQL chamado `projeto_app_carona_pucpr`.
    * Importe o script SQL do arquivo `projeto_app_carona_pucpr.sql` para criar as tabelas e popular os dados iniciais.

3. **Abra as Páginas (Fase Protótipo):**
   * Abra o arquivo `index.html` diretamente no seu navegador.
   * Como a lógica é puramente frontend (JavaScript) nesta fase, não é necessário um servidor web (como Apache/XAMPP), **exceto** quando começar a implementar a comunicação com o PHP/MySQL.

## **📝 Próximos Passos (Roadmap)**

1. Como Criar o Banco de Dados
O processo de instalação envolve a criação do banco de dados e a importação do seu script SQL.

Pré-requisitos
O usuário deve ter o MySQL (ou MariaDB, como no seu dump) instalado e um ambiente para executá-lo (como XAMPP, WAMP, MAMP ou um servidor dedicado).

Passos de Instalação (Exemplo com Terminal/Linha de Comando)
Acessar o MySQL:

Bash

mysql -u seu_usuario -p
(Será solicitada a senha do usuário do MySQL).

Criar o Banco de Dados: O nome do banco de dados definido no seu script é projeto_app_carona_pucpr.

SQL

CREATE DATABASE projeto_app_carona_pucpr CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
Usar o Banco de Dados:

SQL

USE projeto_app_carona_pucpr;
Importar o Script SQL: Se o usuário tiver acesso ao arquivo completo (projeto_app_carona_pucpr.sql), a maneira mais fácil é importar diretamente pelo terminal:

Bash

mysql -u seu_usuario -p projeto_app_carona_pucpr < /caminho/para/projeto_app_carona_pucpr.sql
2. Script para Criação da Estrutura (DDL)
Este é o script essencial que define a estrutura de todas as suas tabelas, extraído do arquivo que você enviou.

SQL

-- Definição do Charset e Collation
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Se o banco de dados não existir, ele será criado com o nome abaixo.
-- Caso o usuário prefira criar manualmente (passo 2 do guia acima), esta linha pode ser omitida.
-- CREATE DATABASE IF NOT EXISTS `projeto_app_carona_pucpr` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
-- USE `projeto_app_carona_pucpr`;

--
-- Estrutura da tabela `avaliacao`
--

CREATE TABLE `avaliacao` (
  `id_avaliacao` int(11) NOT NULL,
  `id_carona` int(11) NOT NULL,
  `id_avaliador` int(11) NOT NULL,
  `id_avaliado` int(11) NOT NULL,
  `nota` int(11) DEFAULT NULL CHECK (`nota` between 1 and 5),
  `comentario` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Estrutura da tabela `carona`
--

CREATE TABLE `carona` (
  `id_carona` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_veiculo` int(11) NOT NULL,
  `origem` varchar(100) NOT NULL,
  `destino` varchar(100) NOT NULL,
  `data_hora_partida` datetime NOT NULL,
  `status` enum('Aberta','Fechada','Em Curso','Concluída','Cancelada') NOT NULL DEFAULT 'Aberta',
  `distancia` decimal(6,2) DEFAULT NULL,
  `tempo_estimado` time DEFAULT NULL,
  `vagas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Estrutura da tabela `pagamento`
--

CREATE TABLE `pagamento` (
  `id_pagamento` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `numero` varchar(19) NOT NULL,
  `validade` char(5) NOT NULL,
  `cvv` varchar(4) NOT NULL,
  `tipo` enum('Credito','Debito') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- DADOS DE EXEMPLO para a tabela `pagamento`
--
INSERT INTO `pagamento` (`id_pagamento`, `id_usuario`, `nome`, `numero`, `validade`, `cvv`, `tipo`) VALUES
(1, 13, 'po', '3455', '10/25', '200', 'Credito');

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `tipo` enum('Motorista','Passageiro') NOT NULL,
  `nasc` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- DADOS DE EXEMPLO para a tabela `usuario`
--
INSERT INTO `usuario` (`id_usuario`, `nome`, `telefone`, `email`, `senha`, `tipo`, `nasc`) VALUES
(12, 'dawdawdee', '111111111111111111111111111111111111111', 'testes@teste', 'too', 'Passageiro', '2000-05-11'),
(13, 'arwar', '412222', 'resrse@resr', 'pp', 'Passageiro', '2007-05-11'),
(14, 'dadw', '9099999', 'testes@tese', 'll', 'Passageiro', '2000-02-22'),
(16, 'test', '999999', 'lele@lele', 'lele', 'Passageiro', '2000-05-11'),
(17, 'teste', '000000', 'lele@l', 'oo', 'Passageiro', '1999-05-11'),
(19, 'dadaw', '99999', 'teste@test', '00', 'Passageiro', '2000-05-02'),
(22, 'fawfafaw', 'fesafawf', 'gesfesf@fsefe', 'ii', 'Passageiro', '2000-02-22'),
(23, 'fffffff', 'fffffffff', 'ffffff@ffff', 'ff', 'Passageiro', '2000-11-09'),
(24, 'fffffff', 'fffffff', 'fffffff@teste', 'fff', 'Passageiro', '2000-11-22'),
(25, 'dawdawd', 'd', 'd@d', 'poo', 'Motorista', '2005-11-05'),
(35, 'lele', 'lele', 'lee@lele', 'le', 'Passageiro', '2000-05-11'),
(40, 'lele', '9999999', 'lele@email.com', 'pii', 'Passageiro', '2000-05-12');

--
-- Estrutura da tabela `veiculo`
--

CREATE TABLE `veiculo` (
  `id_veiculo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `placa` varchar(10) DEFAULT NULL,
  `cor` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas (Chaves Primárias e Únicas)
--
ALTER TABLE `avaliacao`
  ADD PRIMARY KEY (`id_avaliacao`),
  ADD KEY `id_carona` (`id_carona`),
  ADD KEY `id_avaliador` (`id_avaliador`),
  ADD KEY `id_avaliado` (`id_avaliado`);

ALTER TABLE `carona`
  ADD PRIMARY KEY (`id_carona`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `fk_carona_veiculo` (`id_veiculo`);

ALTER TABLE `pagamento`
  ADD PRIMARY KEY (`id_pagamento`),
  ADD KEY `id_usuario` (`id_usuario`);

ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `telefone` (`telefone`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `veiculo`
  ADD PRIMARY KEY (`id_veiculo`),
  ADD UNIQUE KEY `placa` (`placa`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT para tabelas
--
ALTER TABLE `avaliacao`
  MODIFY `id_avaliacao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `carona`
  MODIFY `id_carona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `pagamento`
  MODIFY `id_pagamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

ALTER TABLE `veiculo`
  MODIFY `id_veiculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints (Chaves Estrangeiras) para tabelas
--
ALTER TABLE `avaliacao`
  ADD CONSTRAINT `avaliacao_ibfk_1` FOREIGN KEY (`id_carona`) REFERENCES `carona` (`id_carona`),
  ADD CONSTRAINT `avaliacao_ibfk_2` FOREIGN KEY (`id_avaliador`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `avaliacao_ibfk_3` FOREIGN KEY (`id_avaliado`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `carona`
  ADD CONSTRAINT `carona_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `fk_carona_veiculo` FOREIGN KEY (`id_veiculo`) REFERENCES `veiculo` (`id_veiculo`);

ALTER TABLE `pagamento`
  ADD CONSTRAINT `pagamento_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `veiculo`
  ADD CONSTRAINT `veiculo_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

COMMIT;
