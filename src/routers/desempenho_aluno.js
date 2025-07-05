const express = require('express');
const db = require('../banco.js');
const router = express.Router();
const permisao = require('./permisao.js');
const middleware = require('./middleware.js');



router.get('/', middleware, permisao('Aluno'), (req, res) => {

  let user = req.session.usuario.nome;

  db.all('SELECT * FROM avaliacao WHERE aluno = ?', [user], (err, avaliacoes) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao buscar aluno');
      return;
    }

    db.all(`SELECT * FROM usuarios WHERE nome = ?`, [user], (err, usuario) => {
      if (err) {
        console.log('Erro interno no servidor: ' + err.message);
        return res.status(500).send('Erro interno no servidor: ' + err.message);
      }

      db.all(`SELECT * FROM usuarios`, (err, usuarios_completo) => {
        if (err) {
          console.log('Erro interno no servidor: ' + err.message);
          return res.status(500).send('Erro interno no servidor: ' + err.message);
        }

        db.all(`SELECT * FROM candidatos WHERE status = 'Aprovado'`, (err, candidatos) => {

           if (err) {
          console.log('Erro interno no servidor: ' + err.message);
          return res.status(500).send('Erro interno no servidor: ' + err.message);
        }

        console.log(avaliacoes);

        if (avaliacoes.length === 0) {
          res.render('painel_aluno', {
            usuario: req.session.usuario,
            error: `Nenhuma nota registrada no momento ou matricula não existe, tente novamente mais tarde!`,
            avaliacoes,
            candidatos: candidatos,
            todosUsuarios: usuarios_completo,
            usuarios: usuario
          });
          return;
        }

        return res.render('desempenho_aluno', {
          usuario: req.session.usuario,
          avaliacoes
        });

        });

      });

    });

  });

});

module.exports = router;