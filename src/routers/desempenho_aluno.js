const express = require('express');
const db = require('../banco.js');
const router = express.Router();
const middleware = require('./middleware.js');



router.get('/', middleware, (req, res) => {

    res.render('loginDesem', { usuario: req.session.usuario });

});


router.post('/desempenho', middleware, (req, res) => {

let matricula = req.body.matricula;

db.get('SELECT * FROM avaliacao WHERE matricula = ?', [matricula], (err, avaliacao) => {
    if (err) {
        console.error(err.message);
        res.status(500).send('Erro ao buscar aluno');
        return;
    }

    if (!avaliacao) {
        res.render('loginDesem', { usuario: req.session.usuario, error: 'Matrícula não encontrada',avaliacao:avaliacao });
        return;
    }

  return res.render('desempenho_aluno', { usuario: req.session.usuario, avaliacao: avaliacao });

});

});


module.exports = router;