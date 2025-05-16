const express = require('express');
const middleware = require('./middleware.js');
const db = require('../banco.js');
const router = express.Router();


    router.get('/', middleware, (req, res) => {
    
  db.all(`SELECT * FROM imagem_perfil WHERE id_usuario = ?`, [req.session.usuario.id], (err, imagem) => {

        if(err){
            console.log(err);
            return res.send('Erro ao buscar imagem de perfil');
        } else {
            console.log(imagem);
            return res.render('adm', { usuario: req.session.usuario, perfil: imagem});
        }

  });
      
    })


    module.exports = router;