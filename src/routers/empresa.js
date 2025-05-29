const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');
const router = express.Router();




router.get('/', middleware, permisao('Empresa'), (req,res) => {

db.all('SELECT* FROM usuarios WHERE tipo = ?', [req.session.usuario.tipo], (err, usuarios) => {
    if(err){
        console.log('Erro ao consultar banco de dados!' + err.message);
        res.status(500).send('Erro ao consultar banco de dados!' + err.message);
        return;
    }

    return res.render('painel_empresa', {
        usuario: req.session.usuario,
        usuarios: usuarios
    })
    

});

});



module.exports = router;
