const express = require('express');
const middleware = require('./middleware.js');
const db = require('../banco.js');
const router = express.Router();


router.get('/', middleware, (req, res) => {

    
    db.all('SELECT * FROM usuarios WHERE id = ? ', [req.session.usuario.id], (err, usuario) => {

            if(err){
                console.log('Mensagem: ' + err.message);
                return res.status(500).send('Mensagem: ' + err.message);
            } else{
                return res.render('adm', {usuarios: usuario, usuario: req.session.usuario});
            }
    });
});


module.exports = router;