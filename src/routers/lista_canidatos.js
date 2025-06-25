const express = require('express');
const middleware = require('./middleware.js');
const db = require('../banco.js');
const permisao = require('./permisao.js');
const router = express.Router();

router.get('/', middleware, permisao('Empresa'), (req, res) => {

    db.all(`SELECT * FROM candidatos WHERE empresa = ?`, [req.session.usuario.nome], (err, candidatos) => {
        if (err) {
            console.log('Erro ao consultar candidatos: ' + err.message);
            return res.status(500).send('Erro ao consultar candidatos: ' + err.message);
        }

        console.log('Candidatos encontrados:', candidatos);

        res.render('lista_candidatos', {
            usuario: req.session.usuario,
            candidatos: candidatos,
            total: candidatos.length
        });
    });
});

module.exports = router;
