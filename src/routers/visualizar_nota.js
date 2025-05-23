const express = require('express');
const permisao = require('./permisao');
const middleware = require('./middleware');
const db = require('../banco.js');
const router = express.Router();


router.get('/:matricula', middleware, permisao('Professor'), (req, res) => {

let matricula = req.params.matricula;

db.get('SELECT * FROM avaliacao WHERE matricula = ?', [matricula], (err, avaliacao) => {

    if(err){
        console.log('Erro de consulta do banco de dados!', err.message);
        return res.status(500).send('Erro de consulta do banco de dados!', err.message);
    } else {
        res.render('visualizar_nota', {
            usuario: req.session.usuario,
            avaliacao: avaliacao
        })
    }

});


});


module.exports = router