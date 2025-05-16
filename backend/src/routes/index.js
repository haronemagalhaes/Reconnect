const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const DesafioController = require('../controllers/DesafioController'); // ✅ Novo

// Rota de teste
router.get('/', (req, res) => {
  res.send('API funcionando!');
});

// 👤 Usuários
router.get('/users', UserController.index);

// 🔐 Autenticação
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// 🔑 Recuperação de senha
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);

// 🎯 Desafios
router.get('/desafios', DesafioController.listar);       // Lista todos os desafios
router.get('/desafios/sortear', DesafioController.sortear); // Sorteia um desafio aleatório

module.exports = router;