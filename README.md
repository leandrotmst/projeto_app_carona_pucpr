🚗 Carona Uni - Sistema de Caronas Universitárias
Visão Geral do Projeto
O Carona Uni é um projeto acadêmico desenvolvido para facilitar a conexão entre alunos e professores de uma universidade que desejam oferecer ou encontrar caronas. O objetivo é criar uma solução prática, segura e econômica para a comunidade universitária, com foco em uma experiência de usuário simples e um modelo de negócios baseado em microtransações.

🚀 Status Atual do Protótipo
Esta versão é um protótipo funcional (Frontend/CRUD Básico) que utiliza JavaScript e LocalStorage para simular o banco de dados.

Funcionalidades Implementadas (Protótipo)
Página Inicial (index.html): Apresentação e direcionamento rápido para Cadastro ou Login.

Cadastro Dinâmico (cadastro.html): Formulário único que se adapta:

Se o usuário selecionar "Motorista", campos adicionais (Placa, Modelo, Ano) são exibidos e salvos.

Se for "Passageiro", apenas os dados básicos são coletados.

Feed de Caronas (feed.html): Visualização de posts simulados de caronas disponíveis (ofertas e buscas).

Filtro Simples: Possibilidade de filtrar o feed entre "Motoristas" e "Passageiros".

CRUD (Criação): Os dados de novos usuários são salvos no localStorage do navegador (listaUsuarios).

🛠️ Tecnologias Utilizadas
Categoria

Tecnologia

Uso no Projeto

Frontend

HTML5

Estrutura das páginas.

Estilização

Tailwind CSS (CDN)

Design moderno, responsivo e limpo (padrão universitário).

Lógica

JavaScript (Puro)

Manipulação do DOM, controle de visibilidade de formulário, lógica de CRUD e gerenciamento de estado (via localStorage).

Backend Futuro

PHP

Será utilizado para a API e comunicação com o banco de dados.

Banco de Dados Futuro

MySQL

Armazenamento persistente de usuários, posts de carona e histórico.

⚙️ Instalação e Execução
Para rodar o protótipo localmente, você só precisa de um navegador moderno:

Clone o Repositório:

git clone [LINK DO SEU REPOSITÓRIO]
cd carona-uni

Abra as Páginas:

Abra o arquivo index.html diretamente no seu navegador.

Como a lógica é puramente frontend (JavaScript), não é necessário um servidor web (como Apache/XAMPP) nesta fase.

📝 Próximos Passos (Roadmap)
Os próximos marcos do desenvolvimento incluem:

Implementação do Backend: Conectar o frontend (via Fetch API/PHP) ao MySQL para persistência de dados.

Sistema de Login/Sessão: Criar o sistema de autenticação real (PHP Sessions).

Módulo de Caronas: Criar formulário para publicar novas ofertas/solicitações de carona.

Sistema de Chat: Implementar a funcionalidade de chat em tempo real dentro de cada post.

Integração de Pagamento: Simular ou integrar uma solução de pagamento web para o modelo de comissão.