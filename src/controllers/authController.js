const authService = require('../services/authService');
const usuarioService = require('../services/usuarioService');

function mostrarLogin(req, res) {
  if (req.session.usuario) return res.redirect('/dashboard');
  res.render('login', { erro: null });
}

async function fazerLogin(req, res) {
  try {
    const usuario = await authService.login(req.body.email, req.body.senha);
    req.session.usuario = usuario;
    res.redirect('/dashboard');
  } catch (error) {
    res.render('login', { erro: error.message });
  }
}

function mostrarCadastro(req, res) {
  res.render('cadastro', { erro: null });
}

async function cadastrar(req, res) {
  try {
    await usuarioService.cadastrar(req.body);
    res.redirect('/login');
  } catch (error) {
    res.render('cadastro', { erro: error.message });
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}

module.exports = {
  mostrarLogin,
  fazerLogin,
  mostrarCadastro,
  cadastrar,
  logout
};
