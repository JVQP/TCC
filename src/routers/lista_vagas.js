const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');
const router = express.Router();



router.get('/', middleware, permisao('Empresa'), (req, res) => {

    db.all('SELECT * FROM vagas WHERE empresa = ?', [req.session.usuario.nome], (err, vagas) => {

        if(err){
            console.log('Erro ao listar vagas: ' + err.message);
        } else {
           let total = vagas.length
            res.render('lista_vagas', {
                usuario: req.session.usuario,
                vagas: vagas,
                total: total
                
            });
        }

    });

});


module.exports = router;

