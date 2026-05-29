const express = require('express');
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/usuarios', authMiddleware, adminMiddleware, ticketController.adminUsuarios);

module.exports = router;
