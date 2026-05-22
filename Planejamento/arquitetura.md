# Planejamento Técnico

## Arquitetura do Projeto

O sistema será desenvolvido utilizando Node.js com Express, seguindo uma arquitetura em camadas:

Controller → Service → Repository

Essa separação tem como objetivo organizar melhor o código, dividir responsabilidades e facilitar manutenção, testes e evolução do sistema.

## Estrutura de Pastas

sistema-tickets/
│
├── src/
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── usuarioController.js
│   │   ├── ticketController.js
│   │   └── respostaController.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── usuarioService.js
│   │   ├── ticketService.js
│   │   └── respostaService.js
│   │
│   ├── repositories/
│   │   ├── usuarioRepository.js
│   │   ├── ticketRepository.js
│   │   └── respostaRepository.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── usuarioRoutes.js
│   │   ├── ticketRoutes.js
│   │   └── respostaRoutes.js
│   │
│   ├── views/
│   │   ├── login.html
│   │   ├── cadastro.html
│   │   ├── dashboard.html
│   │   ├── tickets.html
│   │   ├── ticket-form.html
│   │   ├── ticket-detalhes.html
│   │   ├── erro.html
│   │   └── acesso-negado.html
│   │
│   ├── public/
│   │   ├── css/
│   │   │   └── style.css
│   │   │
│   │   ├── js/
│   │   │   └── script.js
│   │   │
│   │   └── img/
│   │
│   ├── database/
│   │   └── database.js
│   │
│   └── app.js
│
├── Planejamento/
│   ├── descricao.md
│   ├── prototipos.pdf
│   ├── fluxo.pdf
│   ├── arquitetura.md
│   ├── tarefas.md
│   └── rotas.md
│
├── package.json
└── README.md

## Responsabilidades das Camadas

### Controller

Os controllers serão responsáveis por receber as requisições das rotas, chamar os services correspondentes e devolver uma resposta para o usuário.

Exemplos de responsabilidades:

- Receber dados dos formulários;
- Chamar a camada de service;
- Renderizar páginas HTML;
- Redirecionar o usuário após uma ação;
- Retornar mensagens de erro ou sucesso.

Arquivos principais:

- authController.js
- usuarioController.js
- ticketController.js
- respostaController.js

### Service

Os services serão responsáveis pelas regras de negócio do sistema.

Exemplos de responsabilidades:

- Validar campos obrigatórios;
- Verificar se o e-mail já está cadastrado;
- Validar login e senha;
- Verificar permissões de acesso;
- Definir status inicial do ticket;
- Validar envio de respostas.

Arquivos principais:

- authService.js
- usuarioService.js
- ticketService.js
- respostaService.js

### Repository

Os repositories serão responsáveis pelo acesso aos dados do sistema.

Exemplos de responsabilidades:

- Buscar usuário por e-mail;
- Cadastrar usuário;
- Criar ticket;
- Listar tickets;
- Buscar ticket por ID;
- Salvar respostas;
- Atualizar status do ticket.

Arquivos principais:

- usuarioRepository.js
- ticketRepository.js
- respostaRepository.js

### Middlewares

Os middlewares serão responsáveis por interceptar requisições antes de chegarem aos controllers.

Exemplos de responsabilidades:

- Verificar se o usuário está logado;
- Bloquear rotas privadas;
- Verificar se o usuário é administrador;
- Tratar erros do sistema.

Arquivos principais:

- authMiddleware.js
- adminMiddleware.js
- errorMiddleware.js

## Organização das Rotas

As rotas serão separadas por responsabilidade.

### Rotas de autenticação

Arquivo:

authRoutes.js

Responsável por:

- Login;
- Cadastro;
- Logout.

### Rotas de usuários

Arquivo:

usuarioRoutes.js

Responsável por:

- Listagem de usuários;
- Visualização de perfil;
- Controle de usuários administrativos.

### Rotas de tickets

Arquivo:

ticketRoutes.js

Responsável por:

- Listar tickets;
- Criar ticket;
- Editar ticket;
- Visualizar ticket;
- Alterar status;
- Excluir ou cancelar ticket.

### Rotas de respostas

Arquivo:

respostaRoutes.js

Responsável por:

- Criar respostas;
- Listar respostas vinculadas a um ticket.

## Entidades do Sistema

### Usuário

Representa uma pessoa cadastrada no sistema.

Campos sugeridos:

- id
- nome
- email
- senha
- tipo
- dataCriacao

Tipos de usuário:

- comum
- admin

### Ticket

Representa uma solicitação de suporte aberta por um usuário.

Campos sugeridos:

- id
- titulo
- descricao
- status
- prioridade
- usuarioId
- dataCriacao
- dataAtualizacao

Status possíveis:

- aberto
- em_andamento
- finalizado
- cancelado

Prioridades possíveis:

- baixa
- media
- alta

### Resposta

Representa uma mensagem enviada dentro de um ticket.

Campos sugeridos:

- id
- mensagem
- ticketId
- usuarioId
- dataCriacao

## Relacionamento entre Entidades

### Usuário e Ticket

Um usuário pode abrir vários tickets.

Usuário 1 -------- N Ticket

Cada ticket pertence a um único usuário.

### Ticket e Resposta

Um ticket pode possuir várias respostas.

Ticket 1 -------- N Resposta

Cada resposta pertence a um único ticket.

### Usuário e Resposta

Um usuário pode enviar várias respostas.

Usuário 1 -------- N Resposta

Cada resposta pertence a um único usuário.

## Resumo dos Relacionamentos

Usuário:
- possui muitos Tickets;
- possui muitas Respostas.

Ticket:
- pertence a um Usuário;
- possui muitas Respostas.

Resposta:
- pertence a um Ticket;
- pertence a um Usuário.
