const express = require('express');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcryptjs');

const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const respostaRoutes = require('./routes/respostaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const usuarioRepository = require('./repositories/usuarioRepository');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'sistema-tickets-secret',
  resave: false,
  saveUninitialized: false
}));

async function criarAdminInicial() {
  const admin = usuarioRepository.findByEmail('admin@email.com');

  if (!admin) {
    const senha = await bcrypt.hash('123456', 10);
    usuarioRepository.create({
      nome: 'Administrador',
      email: 'admin@email.com',
      senha,
      tipo: 'admin'
    });
  }
}

app.get('/', (req, res) => {
  if (req.session.usuario) return res.redirect('/dashboard');
  return res.redirect('/login');
});

app.use(authRoutes);
app.use(ticketRoutes);
app.use(respostaRoutes);
app.use(usuarioRoutes);

app.get('/erro', (req, res) => {
  res.render('erro', {
    usuario: req.session.usuario || null,
    mensagem: 'Ocorreu um erro no sistema.'
  });
});

app.get('/acesso-negado', (req, res) => {
  res.render('acesso-negado', {
    usuario: req.session.usuario || null
  });
});

app.use(errorMiddleware);

criarAdminInicial().then(() => {
  app.listen(PORT, () => {
    console.log(`Sistema rodando em http://localhost:${PORT}`);
  });
});
