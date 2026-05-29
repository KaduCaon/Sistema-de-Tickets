const respostaRepository = require('../repositories/respostaRepository');
const ticketRepository = require('../repositories/ticketRepository');

function responder(ticketId, mensagem, usuario) {
  if (!mensagem || mensagem.trim().length < 3) {
    throw new Error('Digite uma resposta válida.');
  }

  const ticket = ticketRepository.findById(ticketId);

  if (!ticket) {
    throw new Error('Ticket não encontrado.');
  }

  const podeResponder = usuario.tipo === 'admin' || Number(ticket.usuarioId) === Number(usuario.id);

  if (!podeResponder) {
    throw new Error('Você não tem permissão para responder este ticket.');
  }

  return respostaRepository.create({
    mensagem: mensagem.trim(),
    ticketId,
    usuarioId: usuario.id
  });
}

module.exports = {
  responder
};
