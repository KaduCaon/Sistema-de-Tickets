function errorMiddleware(err, req, res, next) {
  console.error(err);
  res.status(500).render('erro', {
    mensagem: err.message || 'Ocorreu um erro inesperado.',
    usuario: req.session.usuario || null
  });
}

module.exports = errorMiddleware;
