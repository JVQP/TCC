const express = require('express');
const db = require('../banco.js');
const router = express.Router();
const middleware = require('./middleware.js');



router.get('/', middleware, (req, res) => {

    db.all(`SELECT * FROM usuarios WHERE id = ? `, [req.session.usuario.id], (err, usuario) => {
        if (err) {
            console.error(err.message);
            return res.redirect('/login');
        }
        res.render('painel_aluno', { usuario: req.session.usuario, usuarios: usuario, id: req.session.usuario.id });
    });

});


module.exports = router;