# Definição das Rotas

## Organização

As rotas do sistema serão separadas em públicas, privadas e administrativas.

As rotas públicas poderão ser acessadas por qualquer pessoa, mesmo sem estar logada no sistema.

As rotas privadas só poderão ser acessadas depois que o usuário fizer login.

As rotas administrativas serão usadas apenas por usuários com permissão de administrador, como suporte ou responsável pelo sistema.

---

## Rotas Públicas

Essas rotas não precisam de login para serem acessadas.

| Método | Rota | Finalidade |
|---|---|---|
| GET | / | Redirecionar o usuário para a tela de login ou para o dashboard, caso já esteja logado |
| GET | /login | Exibir a tela de login |
| POST | /login | Receber os dados do login e autenticar o usuário |
| GET | /cadastro | Exibir a tela de cadastro de usuário |
| POST | /cadastro | Receber os dados e cadastrar um novo usuário |
| GET | /erro | Exibir uma página de erro |
| GET | /acesso-negado | Exibir a página de acesso negado |

---

## Rotas Privadas

Essas rotas só poderão ser acessadas se o usuário estiver logado.

| Método | Rota | Finalidade |
|---|---|---|
| GET | /dashboard | Exibir a tela inicial do sistema |
| GET | /tickets | Listar os tickets do usuário logado |
| GET | /tickets/novo | Exibir o formulário para criar um novo ticket |
| POST | /tickets | Salvar um novo ticket |
| GET | /tickets/:id | Exibir os detalhes de um ticket |
| GET | /tickets/:id/editar | Exibir o formulário para editar um ticket |
| POST | /tickets/:id/editar | Salvar as alterações feitas no ticket |
| POST | /tickets/:id/excluir | Excluir ou cancelar um ticket |
| POST | /tickets/:id/respostas | Enviar uma resposta para um ticket |
| POST | /logout | Encerrar a sessão do usuário |

---

## Rotas de Administrador

Essas rotas serão usadas apenas por usuários administradores.

| Método | Rota | Finalidade |
|---|---|---|
| GET | /admin/tickets | Listar todos os tickets cadastrados no sistema |
| GET | /admin/usuarios | Listar os usuários cadastrados no sistema |
| POST | /admin/tickets/:id/status | Alterar o status de um ticket |
| POST | /admin/tickets/:id/responder | Responder um ticket como administrador ou suporte |

---

## Separação das Rotas por Arquivos

Para deixar o projeto mais organizado, as rotas serão separadas em arquivos diferentes dentro da pasta routes.

Exemplo de estrutura:

```txt
src/
└── routes/
    ├── authRoutes.js
    ├── ticketRoutes.js
    ├── respostaRoutes.js
    └── usuarioRoutes.js



Arquivo authRoutes.js
    Esse arquivo ficará responsável pelas rotas de login, cadastro e logout.
    Rotas:
    Plain text
    GET /login
    POST /login
    GET /cadastro
    POST /cadastro
    POST /logout
    Funções principais:
    Mostrar a tela de login;
    Processar o login;
    Mostrar a tela de cadastro;
    Cadastrar um novo usuário;
    Encerrar a sessão do usuário.


Arquivo ticketRoutes.js
    Esse arquivo ficará responsável pelas rotas relacionadas aos tickets.
    Rotas:
    Plain text
    GET /tickets
    GET /tickets/novo
    POST /tickets
    GET /tickets/:id
    GET /tickets/:id/editar
    POST /tickets/:id/editar
    POST /tickets/:id/excluir
    Funções principais:
    Listar tickets;
    Criar um novo ticket;
    Visualizar detalhes de um ticket;
    Editar ticket;
    Excluir ou cancelar ticket.


Arquivo respostaRoutes.js
    Esse arquivo ficará responsável pelas respostas enviadas dentro de um ticket.
    Rotas:
    Plain text
    POST /tickets/:id/respostas
    Funções principais:
    Receber a resposta digitada pelo usuário;
    Salvar a resposta;
    Relacionar a resposta com o ticket correto;
    Atualizar o histórico do ticket.


Arquivo usuarioRoutes.js
    Esse arquivo ficará responsável pelas rotas relacionadas aos usuários.
    Rotas:
    Plain text
    GET /admin/usuarios
    Funções principais:
    Listar usuários cadastrados;
    Permitir que o administrador visualize os usuários do sistema.
    Controle de Acesso
    O sistema terá controle de acesso usando middlewares.
    As rotas públicas não precisam de verificação de login.
    As rotas privadas usarão o middleware authMiddleware.
    Esse middleware será responsável por verificar se existe uma sessão ativa. Caso o usuário esteja logado, ele poderá continuar. Caso contrário, será redirecionado para a tela de login.
    As rotas administrativas usarão dois middlewares:
    Plain text
    authMiddleware
    adminMiddleware
    O authMiddleware verifica se o usuário está logado.
    O adminMiddleware verifica se o usuário possui permissão de administrador.
    Exemplo de Funcionamento de uma Rota Privada


Exemplo usando a rota /tickets:
            Plain text
            Usuário acessa /tickets
                    |
                    v
            authMiddleware verifica se existe uma sessão ativa
                    |
                    v
            Usuário está logado?
                    |
                    |--- Sim ---> Acessa o controller de tickets
                    |
                    |--- Não ---> Redireciona para /login
            Exemplo de Fluxo da Rota de Criação de Ticket
            Plain text
            Usuário acessa /tickets/novo
                    |
                    v
            Sistema mostra o formulário de novo ticket
                    |
                    v
            Usuário preenche título, descrição e prioridade
                    |
                    v
            Usuário envia o formulário para POST /tickets
                    |
                    v
            Controller recebe os dados
                    |
                    v
            Service valida as informações
                    |
                    v
            Repository salva o ticket
                    |
                    v
            Sistema redireciona para /tickets


Resumo
    A organização das rotas ajuda a separar melhor as responsabilidades do sistema.
    As rotas de autenticação ficam em authRoutes.js.
    As rotas de tickets ficam em ticketRoutes.js.
    As rotas de respostas ficam em respostaRoutes.js.
    As rotas de usuários ficam em usuarioRoutes.js.
    Essa separação facilita a manutenção do projeto e deixa o código mais organizado.
