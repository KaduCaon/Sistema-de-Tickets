const express = require('express');
const respostaController = require('../controllers/respostaController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/tickets/:id/respostas', authMiddleware, respostaController.responder);

module.exports = router;
