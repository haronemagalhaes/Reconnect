// src/controllers/DesafioController.js
const db = require('../config/db');

module.exports = {
    async listar(req, res) {
        try {
            const result = await db.query('SELECT * FROM desafios ORDER BY id');
            return res.json(result.rows);
        } catch (error) {
            console.error('Erro ao buscar desafios:', error);
            return res.status(500).json({ error: 'Erro ao buscar desafios' });
        }
    },

    async sortear(req, res) {
        try {
            const result = await db.query('SELECT * FROM desafios ORDER BY RANDOM() LIMIT 1');
            return res.json(result.rows[0]);
        } catch (error) {
            console.error('Erro ao sortear desafio:', error);
            return res.status(500).json({ error: 'Erro ao sortear desafio' });
        }
    }
};