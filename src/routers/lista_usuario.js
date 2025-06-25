const express = require('express');
const db = require('../banco.js');
const router = express.Router();
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');


router.get('/', middleware, permisao('Professor'), (req, res) => {

    db.all(`SELECT * FROM usuarios ORDER BY nome ASC`, (err, usuario) => {
        if (err) {
            return res.status(500).send('Erro interno no servidor, por favor verificar!');
        } else {
            res.render('lista_usuario', { usuarios: usuario || [], usuario: req.session.usuario, total: usuario.length });
        }
    })

});

router.get('/remover/:id', middleware, permisao('Professor'), (req, res) => {
    const id = req.params.id;

    db.run(`DELETE FROM usuarios WHERE id = ?`, [id], (err) => {
        if (err) {
            return res.status(500).send('Erro interno no servidor, por favor verificar!');
        } else {
            res.redirect('/lista-usuario');
        }
    });
});




module.exports = router;