const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao banco de dados');
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) return res.status(500).send('Erro no servidor');

    if (results.length > 0) {
      const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  });
});

// Rota protegida
app.get('/profile', verifyToken, (req, res) => {
  res.send('Área protegida');
});

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token não fornecido');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Token inválido');
    req.userId = decoded.id;
    next();
  });
}

app.listen(5000, () => console.log('Backend rodando na porta 5000'));
