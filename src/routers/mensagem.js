const express = require('express');
const middlewre = require('./middleware');
const permisao = require('./permisao.js');
const db = require('../banco.js');
const router = express.Router();

router.get('/', middlewre, permisao('Administrador'), (req, res) => {

    db.all(`SELECT * FROM mensagens`, (err, mensagens) => {
        if(err){
            console.log('Erro ao exibir mensagem ' + err);
            res.status(500).send('Erro interno no servidor: ' + err);
            return;
        }

        db.all(`SELECT * FROM usuarios WHERE nome = ?`, [req.session.usuario.nome], (err, usuarios) => {
              if(err){
            console.log('Erro ao exibir usuário ' + err);
            res.status(500).send('Erro interno no servidor: ' + err);
            return;
        }

        res.render('mensagem', {
            usuario: req.session.usuario,
            usuarios: usuarios,
            mensagens: mensagens,
            total: mensagens.length
        })

        });

    });

});

router.post('/:id/concluir', (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM mensagens WHERE id = ?`, [id], (err) => {
    if (err) {
      console.error('Erro ao concluir mensagem:', err);
      return res.status(500).send('Erro interno');
    }
    res.redirect('/mensagem');
  });
});


module.exports = router;