const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.mostrarLogin);
router.post('/login', authController.fazerLogin);
router.get('/cadastro', authController.mostrarCadastro);
router.post('/cadastro', authController.cadastrar);
router.post('/logout', authController.logout);

module.exports = router;
