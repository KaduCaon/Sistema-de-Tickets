function adminMiddleware(req, res, next) {
  if (!req.session.usuario || req.session.usuario.tipo !== 'admin') {
    return res.status(403).render('acesso-negado', {
      usuario: req.session.usuario || null
    });
  }

  next();
}

module.exports = adminMiddleware;
