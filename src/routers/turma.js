const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const router = express.Router();


router.get('/', middleware, (req, res) => {
    res.render('turma', {usuario: req.session.usuario} );
});

router.post('/registro_turmas', (req, res) => {

    let turma = req.body.inputTurma;
    let data_inicio = req.body.dataInicio;

    res.render('turma', {usuario: req.session.usuario});
    console.log(turma, data_inicio);
});


module.exports = router;