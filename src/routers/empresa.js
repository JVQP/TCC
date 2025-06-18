const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');
const router = express.Router();




router.get('/', middleware, permisao('Empresa'), (req,res) => {

db.all('SELECT* FROM usuarios WHERE id = ?', [req.session.usuario.id], (err, usuarios) => {
    if(err){
        console.log('Erro ao consultar banco de dados!' + err.message);
        res.redirect('/login');
        return;
    }

   db.all('SELECT * from vagas WHERE empresa = ?', [req.session.usuario.nome], (err, vagas) => {

    if(err){
        console.log('Erro ao consultar banco de dados!' + err.message);
        res.status(500).send('Erro ao consultar banco de dados!');
        return;
    }

    let total = vagas.length
     return res.render('painel_empresa', {
        usuario: req.session.usuario,
        usuarios: usuarios,
        total_vagas: total
    });

   });
    
});

});



module.exports = router;
