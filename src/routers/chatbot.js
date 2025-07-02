const express = require('express');
const middleware = require('./middleware.js');
const db = require('../banco.js');
const router = express.Router();

router.get('/', middleware, (req, res) => {
 
    const tipo = req.session.usuario.tipo;

    const rotas = {
        Aluno: '/painel-aluno',
        Administrador: '/adm',
        Professor: '/painel-educador',
        Empresa: '/painel-empresa'
    };

    const voltar = rotas[tipo] || '/';

    db.all(`SELECT * FROM usuarios WHERE nome = ?`, [req.session.usuario.nome], (err, usuarios) => {
    if (err) {
      console.log('Erro interno no servidor: ' + err);
      return res.status(500).send('Erro interno no servidor: ' + err);
    }

    db.all(`SELECT * FROM mensagens`, (err, mensagens) => {
      if (err) {
        console.log('Erro interno servidor: ' + err);
        return res.status(500).send('Erro interno no servidor: ' + err);
      }

      res.render('chatbot', {
        usuario: req.session.usuario,
        usuarios: usuarios,
        mensagens: mensagens,
        total: mensagens.length,
        voltar
      });
    });
  });
});

module.exports = router;
