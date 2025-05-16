const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
      }

      const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'E-mail ou senha inválidos' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'segredo123',
        { expiresIn: '1h' }
      );

      return res.json({
        message: 'Login bem-sucedido',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' });
      }

      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'E-mail inválido' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await db.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, hashedPassword]
      );

      return res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return res.status(500).json({ error: 'Erro ao registrar' });
    }
  },

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];

      if (!user) {
        return res.status(404).json({ error: 'E-mail não encontrado' });
      }

      const token = uuidv4().substring(0, 8);
      const expires = new Date(Date.now() + 15 * 60000); // 15 minutos

      await db.query(
        'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE id = $3',
        [token, expires, user.id]
      );

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Recuperação de Senha - Reconnect',
        text: `Olá, ${user.name}. Seu código para redefinição de senha é: ${token}`
      });

      return res.json({ message: 'Código enviado para o e-mail!' });
    } catch (error) {
      console.error('Erro ao enviar e-mail de recuperação:', error);
      return res.status(500).json({ error: 'Erro ao processar solicitação' });
    }
  },

  async resetPassword(req, res) {
    const { email, token, newPassword } = req.body;

    try {
      if (!email || !token || !newPassword) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ error: 'A nova senha deve ter no mínimo 6 caracteres' });
      }

      const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];

      if (!user || user.reset_token !== token) {
        return res.status(400).json({ error: 'Token inválido' });
      }

      if (new Date() > new Date(user.reset_token_expires)) {
        return res.status(400).json({ error: 'Token expirado' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await db.query(
        'UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE id = $2',
        [hashedPassword, user.id]
      );

      return res.json({ message: 'Senha redefinida com sucesso!' });
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      return res.status(500).json({ error: 'Erro interno ao redefinir senha.' });
    }
  }
};
