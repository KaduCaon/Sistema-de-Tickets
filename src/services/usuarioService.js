const bcrypt = require('bcryptjs');
const usuarioRepository = require('../repositories/usuarioRepository');

async function cadastrar({ nome, email, senha, tipo }) {
  if (!nome || !email || !senha) {
    throw new Error('Preencha nome, e-mail e senha.');
  }

  const usuarioExistente = usuarioRepository.findByEmail(email);
  if (usuarioExistente) {
    throw new Error('Este e-mail já está cadastrado.');
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  return usuarioRepository.create({
    nome,
    email,
    senha: senhaCriptografada,
    tipo: tipo || 'comum'
  });
}

function listarUsuarios() {
  return usuarioRepository.findAll();
}

module.exports = {
  cadastrar,
  listarUsuarios
};
