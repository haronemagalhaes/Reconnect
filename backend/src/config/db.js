require('dotenv').config();
const { Pool } = require('pg');

// Verificação segura
const requiredVars = ['DB_USER', 'DB_PASS', 'DB_HOST', 'DB_PORT', 'DB_NAME'];
requiredVars.forEach(key => {
  if (!process.env[key]) {
    throw new Error(`Variável de ambiente ${key} não está definida no .env`);
  }
});

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME
});

module.exports = pool;
