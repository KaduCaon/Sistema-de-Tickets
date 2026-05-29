const { readDatabase, writeDatabase, getNextId } = require('../database/database');

function findAll() {
  return readDatabase().usuarios;
}

function findByEmail(email) {
  return readDatabase().usuarios.find((usuario) => usuario.email === email);
}

function findById(id) {
  return readDatabase().usuarios.find((usuario) => Number(usuario.id) === Number(id));
}

function create(usuario) {
  const db = readDatabase();
  const novoUsuario = {
    id: getNextId(db.usuarios),
    nome: usuario.nome,
    email: usuario.email,
    senha: usuario.senha,
    tipo: usuario.tipo || 'comum',
    dataCriacao: new Date().toISOString()
  };

  db.usuarios.push(novoUsuario);
  writeDatabase(db);
  return novoUsuario;
}

module.exports = {
  findAll,
  findByEmail,
  findById,
  create
};
