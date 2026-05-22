# Descrição do Projeto

## Nome do Sistema

Sistema de Tickets - HelpDesk Web

## Tema Escolhido

Sistema de abertura, acompanhamento e resposta de tickets de suporte.

## Objetivo do Sistema

O objetivo do sistema é permitir que usuários registrem solicitações de suporte por meio de tickets, acompanhem o andamento dessas solicitações e recebam respostas da equipe responsável.

O sistema também permitirá que usuários administradores ou atendentes visualizem os tickets cadastrados, respondam às solicitações e alterem o status dos atendimentos.

## Descrição Geral do Funcionamento

O sistema funcionará como uma aplicação web desenvolvida em Node.js com Express.

O usuário poderá realizar cadastro e login no sistema. Após estar autenticado, poderá acessar uma área privada onde será possível criar novos tickets, visualizar seus tickets já cadastrados e acompanhar as respostas recebidas.

Cada ticket terá informações como título, descrição, status, prioridade, data de criação e usuário responsável pela abertura. Os tickets poderão receber respostas, criando um histórico de comunicação entre o usuário e o suporte.

Usuários comuns poderão visualizar apenas seus próprios tickets. Usuários administradores poderão visualizar todos os tickets, responder solicitações e alterar o status dos atendimentos.

O controle de acesso será feito com sessões e middlewares, protegendo as rotas privadas do sistema.

## Público-Alvo

O sistema é destinado a empresas, escolas, equipes de suporte técnico ou qualquer organização que precise controlar solicitações de atendimento de forma organizada.

## Funcionalidades Principais

- Cadastro de usuários;
- Login de usuários;
- Logout;
- Controle de sessão;
- Acesso a páginas públicas e privadas;
- Criação de tickets;
- Listagem de tickets;
- Visualização detalhada de um ticket;
- Edição de tickets;
- Exclusão ou cancelamento de tickets;
- Resposta a tickets;
- Alteração de status do ticket;
- Página de acesso negado;
- Página de erro;
- Separação do projeto em camadas:
  - Controller;
  - Service;
  - Repository;
  - Middlewares.
