// Carrega variáveis do .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(routes);

// Rota de verificação da API
app.get('/status', (req, res) => {
  res.json({ status: 'OK', message: 'API online' });
});

// Tratamento de erros genéricos
app.use((err, req, res, next) => {
  console.error('Erro inesperado:', err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
