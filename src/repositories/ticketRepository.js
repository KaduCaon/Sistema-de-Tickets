const { readDatabase, writeDatabase, getNextId } = require('../database/database');

function findAll() {
  return readDatabase().tickets;
}

function findByUser(usuarioId) {
  return readDatabase().tickets.filter((ticket) => Number(ticket.usuarioId) === Number(usuarioId));
}

function findById(id) {
  return readDatabase().tickets.find((ticket) => Number(ticket.id) === Number(id));
}

function create(ticket) {
  const db = readDatabase();
  const novoTicket = {
    id: getNextId(db.tickets),
    titulo: ticket.titulo,
    descricao: ticket.descricao,
    prioridade: ticket.prioridade,
    categoria: ticket.categoria || 'Geral',
    status: 'aberto',
    usuarioId: ticket.usuarioId,
    dataCriacao: new Date().toISOString(),
    dataAtualizacao: new Date().toISOString()
  };

  db.tickets.push(novoTicket);
  writeDatabase(db);
  return novoTicket;
}

function update(id, dados) {
  const db = readDatabase();
  const index = db.tickets.findIndex((ticket) => Number(ticket.id) === Number(id));

  if (index === -1) return null;

  db.tickets[index] = {
    ...db.tickets[index],
    ...dados,
    dataAtualizacao: new Date().toISOString()
  };

  writeDatabase(db);
  return db.tickets[index];
}

function remove(id) {
  const db = readDatabase();
  const index = db.tickets.findIndex((ticket) => Number(ticket.id) === Number(id));

  if (index === -1) return false;

  db.tickets.splice(index, 1);
  db.respostas = db.respostas.filter((resposta) => Number(resposta.ticketId) !== Number(id));
  writeDatabase(db);
  return true;
}

module.exports = {
  findAll,
  findByUser,
  findById,
  create,
  update,
  remove
};
