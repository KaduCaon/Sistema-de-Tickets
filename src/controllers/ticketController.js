const ticketService = require('../services/ticketService');
const usuarioService = require('../services/usuarioService');

function dashboard(req, res) {
  const tickets = ticketService.listarPorUsuario(req.session.usuario);

  const resumo = {
    abertos: tickets.filter((t) => t.status === 'aberto').length,
    andamento: tickets.filter((t) => t.status === 'em_andamento').length,
    finalizados: tickets.filter((t) => t.status === 'finalizado').length,
    cancelados: tickets.filter((t) => t.status === 'cancelado').length
  };

  res.render('dashboard', {
    usuario: req.session.usuario,
    resumo
  });
}

function listar(req, res) {
  const tickets = ticketService.listarPorUsuario(req.session.usuario);
  res.render('tickets', {
    usuario: req.session.usuario,
    tickets
  });
}

function novo(req, res) {
  res.render('ticket-form', {
    usuario: req.session.usuario,
    ticket: null,
    erro: null
  });
}

function criar(req, res) {
  try {
    ticketService.criarTicket(req.body, req.session.usuario);
    res.redirect('/tickets');
  } catch (error) {
    res.render('ticket-form', {
      usuario: req.session.usuario,
      ticket: null,
      erro: error.message
    });
  }
}

function detalhes(req, res) {
  try {
    const dados = ticketService.buscarDetalhes(req.params.id, req.session.usuario);
    res.render('ticket-detalhes', {
      usuario: req.session.usuario,
      ...dados,
      erro: null
    });
  } catch (error) {
    res.status(403).render('acesso-negado', { usuario: req.session.usuario });
  }
}

function editar(req, res) {
  try {
    const { ticket } = ticketService.buscarDetalhes(req.params.id, req.session.usuario);
    res.render('ticket-form', {
      usuario: req.session.usuario,
      ticket,
      erro: null
    });
  } catch (error) {
    res.status(403).render('acesso-negado', { usuario: req.session.usuario });
  }
}

function atualizar(req, res) {
  try {
    ticketService.atualizarTicket(req.params.id, req.body, req.session.usuario);
    res.redirect(`/tickets/${req.params.id}`);
  } catch (error) {
    res.status(400).render('erro', {
      usuario: req.session.usuario,
      mensagem: error.message
    });
  }
}

function excluir(req, res) {
  try {
    ticketService.excluirTicket(req.params.id, req.session.usuario);
    res.redirect('/tickets');
  } catch (error) {
    res.status(400).render('erro', {
      usuario: req.session.usuario,
      mensagem: error.message
    });
  }
}

function alterarStatus(req, res) {
  try {
    ticketService.alterarStatus(req.params.id, req.body.status, req.session.usuario);
    res.redirect(`/tickets/${req.params.id}`);
  } catch (error) {
    res.status(403).render('acesso-negado', { usuario: req.session.usuario });
  }
}

function adminTickets(req, res) {
  const tickets = ticketService.listarPorUsuario(req.session.usuario);
  res.render('tickets', {
    usuario: req.session.usuario,
    tickets
  });
}

function adminUsuarios(req, res) {
  const usuarios = usuarioService.listarUsuarios();
  res.render('usuarios', {
    usuario: req.session.usuario,
    usuarios
  });
}

function baseConhecimento(req, res) {
  res.render('base-conhecimento', {
    usuario: req.session.usuario
  });
}

function relatorios(req, res) {
  const tickets = ticketService.listarPorUsuario(req.session.usuario);
  const total = tickets.length;
  const finalizados = tickets.filter((t) => t.status === 'finalizado').length;
  const emAberto = tickets.filter((t) => t.status === 'aberto' || t.status === 'em_andamento').length;

  res.render('relatorios', {
    usuario: req.session.usuario,
    total,
    finalizados,
    emAberto
  });
}

function configuracoes(req, res) {
  res.render('configuracoes', {
    usuario: req.session.usuario
  });
}

module.exports = {
  dashboard,
  listar,
  novo,
  criar,
  detalhes,
  editar,
  atualizar,
  excluir,
  alterarStatus,
  adminTickets,
  adminUsuarios,
  baseConhecimento,
  relatorios,
  configuracoes
};
