const express = require('express');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');
const db = require('../banco.js');
const router = express.Router();


router.get('/', middleware, permisao('Professor'),  (req, res) => {
    db.all('SELECT * FROM usuarios WHERE id = ? ', [req.session.usuario.id], (err, usuario) => {

        if (err) {
            console.log('Mensagem: ' + err.message);
            return res.status(500).send('Mensagem: ' + err.message);
        } else {
          
            let ip = req.socket.remoteAddress;
            ip = ip.replace('::ffff:', '');

            console.log('Usuário logado: ' + usuario[0].nome);
            console.log('Tipo de usuário: ' + usuario[0].tipo);
            console.log('Ip: ' + ip);
            return res.render('adm', { usuarios: usuario, usuario: req.session.usuario });

        }
    });
});


module.exports = router;