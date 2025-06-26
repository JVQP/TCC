const express = require('express');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');
const db = require('../banco.js');
const router = express.Router();

router.get('/', middleware, permisao('Professor'), (req, res) => {
  db.all('SELECT * FROM usuarios WHERE id = ? ', [req.session.usuario.id], (err, usuario) => {
    if (err) {
      console.log('Mensagem: ' + err.message);
      return res.status(500).send('Mensagem: ' + err.message);
    }

    db.all(`SELECT * FROM candidatos WHERE status = 'Aprovado'`, (err, candidatos) => {
      if (err) {
        console.log('Erro ao consultar candidatos ' + err.message);
        return res.status(500).send('Erro ao consultar candidatos ' + err.message);
      }

      db.all(`SELECT * FROM usuarios`, (err, usuarios_completo) => {
        if (err) {
          console.log('Erro ao consultar tabela de usuários ', err.message);
          return res.status(500).send('Erro ao consultar tabela de usuários ', err.message);
        }

        let ip = req.socket.remoteAddress;
        ip = ip.replace('::ffff:', '');

        console.log('Usuário logado: ' + usuario[0].nome);
        console.log('Tipo de usuário: ' + usuario[0].tipo);
        console.log('Ip: ' + ip);

        console.log('Candidatos: ', candidatos);

        res.render('painel_aluno', {
          usuario: req.session.usuario,
          usuarios: usuario,
          id: req.session.usuario.id,
          candidatos: candidatos,
          todosUsuarios: usuarios_completo
        });
      });
    });
  });
});

module.exports = router;
