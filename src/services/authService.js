const bcrypt = require('bcryptjs');
const usuarioRepository = require('../repositories/usuarioRepository');

async function login(email, senha) {
  if (!email || !senha) {
    throw new Error('Informe e-mail e senha.');
  }

  const usuario = usuarioRepository.findByEmail(email);
  if (!usuario) {
    throw new Error('Usuário ou senha inválidos.');
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    throw new Error('Usuário ou senha inválidos.');
  }

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo
  };
}

module.exports = {
  login
};
