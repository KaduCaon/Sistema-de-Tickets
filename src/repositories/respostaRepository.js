const { readDatabase, writeDatabase, getNextId } = require('../database/database');

function findByTicket(ticketId) {
  return readDatabase().respostas.filter((resposta) => Number(resposta.ticketId) === Number(ticketId));
}

function create(resposta) {
  const db = readDatabase();
  const novaResposta = {
    id: getNextId(db.respostas),
    mensagem: resposta.mensagem,
    ticketId: resposta.ticketId,
    usuarioId: resposta.usuarioId,
    dataCriacao: new Date().toISOString()
  };

  db.respostas.push(novaResposta);
  writeDatabase(db);
  return novaResposta;
}

module.exports = {
  findByTicket,
  create
};
