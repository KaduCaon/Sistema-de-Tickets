# Sistema de Tickets

Aplicação web desenvolvida em Node.js e Express para cadastro, login, abertura, listagem e resposta de tickets.

## Como rodar

```bash
npm install
npm start
```

Depois acesse:

```txt
http://localhost:3000
```

## Login inicial

O sistema cria automaticamente um usuário administrador:

```txt
E-mail: admin@email.com
Senha: 123456
```

## Estrutura

O projeto utiliza arquitetura em camadas:

```txt
Controller -> Service -> Repository
```

Também possui sessões, middlewares, rotas públicas e privadas.
