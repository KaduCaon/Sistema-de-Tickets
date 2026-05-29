const express = require('express');
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/dashboard', authMiddleware, ticketController.dashboard);
router.get('/tickets', authMiddleware, ticketController.listar);
router.get('/tickets/novo', authMiddleware, ticketController.novo);
router.post('/tickets', authMiddleware, ticketController.criar);
router.get('/tickets/:id', authMiddleware, ticketController.detalhes);
router.get('/tickets/:id/editar', authMiddleware, ticketController.editar);
router.post('/tickets/:id/editar', authMiddleware, ticketController.atualizar);
router.post('/tickets/:id/excluir', authMiddleware, ticketController.excluir);
router.get('/base-conhecimento', authMiddleware, ticketController.baseConhecimento);
router.get('/relatorios', authMiddleware, ticketController.relatorios);
router.get('/configuracoes', authMiddleware, ticketController.configuracoes);

router.get('/admin/tickets', authMiddleware, adminMiddleware, ticketController.adminTickets);
router.get('/admin/usuarios', authMiddleware, adminMiddleware, ticketController.adminUsuarios);
router.post('/admin/tickets/:id/status', authMiddleware, adminMiddleware, ticketController.alterarStatus);
router.post('/admin/tickets/:id/responder', authMiddleware, adminMiddleware, (req, res) => {
  res.redirect(`/tickets/${req.params.id}`);
});

module.exports = router;
