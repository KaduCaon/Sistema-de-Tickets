const ticketRepository = require('../repositories/ticketRepository');
const respostaRepository = require('../repositories/respostaRepository');
const usuarioRepository = require('../repositories/usuarioRepository');

function usuarioPodeAcessar(ticket, usuario) {
  return usuario.tipo === 'admin' || Number(ticket.usuarioId) === Number(usuario.id);
}

function listarPorUsuario(usuario) {
  if (usuario.tipo === 'admin') {
    return ticketRepository.findAll();
  }

  return ticketRepository.findByUser(usuario.id);
}

function criarTicket(dados, usuario) {
  if (!dados.titulo || !dados.descricao || !dados.prioridade) {
    throw new Error('Preencha título, descrição e prioridade.');
  }

  return ticketRepository.create({
    titulo: dados.titulo,
    descricao: dados.descricao,
    prioridade: dados.prioridade,
    categoria: dados.categoria,
    usuarioId: usuario.id
  });
}

function buscarDetalhes(id, usuario) {
  const ticket = ticketRepository.findById(id);

  if (!ticket) {
    throw new Error('Ticket não encontrado.');
  }

  if (!usuarioPodeAcessar(ticket, usuario)) {
    throw new Error('Você não tem permissão para acessar este ticket.');
  }

  const respostas = respostaRepository.findByTicket(id).map((resposta) => ({
    ...resposta,
    usuario: usuarioRepository.findById(resposta.usuarioId)
  }));

  return {
    ticket,
    respostas,
    criador: usuarioRepository.findById(ticket.usuarioId)
  };
}

function atualizarTicket(id, dados, usuario) {
  const ticket = ticketRepository.findById(id);

  if (!ticket) {
    throw new Error('Ticket não encontrado.');
  }

  if (!usuarioPodeAcessar(ticket, usuario)) {
    throw new Error('Você não tem permissão para editar este ticket.');
  }

  return ticketRepository.update(id, {
    titulo: dados.titulo,
    descricao: dados.descricao,
    prioridade: dados.prioridade,
    categoria: dados.categoria,
    status: dados.status || ticket.status
  });
}

function excluirTicket(id, usuario) {
  const ticket = ticketRepository.findById(id);

  if (!ticket) {
    throw new Error('Ticket não encontrado.');
  }

  if (!usuarioPodeAcessar(ticket, usuario)) {
    throw new Error('Você não tem permissão para excluir este ticket.');
  }

  return ticketRepository.remove(id);
}

function alterarStatus(id, status, usuario) {
  if (usuario.tipo !== 'admin') {
    throw new Error('Apenas administradores podem alterar o status.');
  }

  const statusPermitidos = ['aberto', 'em_andamento', 'finalizado', 'cancelado'];

  if (!statusPermitidos.includes(status)) {
    throw new Error('Status inválido.');
  }

  return ticketRepository.update(id, { status });
}

module.exports = {
  listarPorUsuario,
  criarTicket,
  buscarDetalhes,
  atualizarTicket,
  excluirTicket,
  alterarStatus
};
