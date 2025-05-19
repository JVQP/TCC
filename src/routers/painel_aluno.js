const express = require('express');
const db = require('../banco.js');
const router = express.Router();
const middleware = require('./middleware.js');



router.get('/', (req, res) => {

    db.all('SELECT * FROM usuarios WHERE id = ?', [req.session.usuario.id], (err, usuario) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Erro ao buscar usuário.');
        }
        res.render('painel_aluno', { usuario: req.session.usuario, usuarios: usuario, id: req.session.usuario.id });
    });

});


module.exports = router;