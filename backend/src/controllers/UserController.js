const db = require('../config/db');

module.exports = {
  async index(req, res) {
    try {
      const result = await db.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (error) {
      console.error('🔥 Erro detalhado:', error);  // 👈 mostra o erro no terminal
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }
};
