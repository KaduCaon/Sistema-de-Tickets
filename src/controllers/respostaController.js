const respostaService = require('../services/respostaService');

function responder(req, res) {
  try {
    respostaService.responder(req.params.id, req.body.mensagem, req.session.usuario);
    res.redirect(`/tickets/${req.params.id}`);
  } catch (error) {
    res.status(400).render('erro', {
      usuario: req.session.usuario,
      mensagem: error.message
    });
  }
}

module.exports = {
  responder
};
