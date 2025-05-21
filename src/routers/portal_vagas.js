const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const router = express.Router();


router.get('/', middleware, (req, res) => {

let tipo = req.session.usuario.tipo;

let rotas = {
    Aluno: '/painel-aluno',
    Professor: '/adm',
    Empresa: '/painel-empresa'
}

let voltar = rotas[tipo] || '/';

res.render('portal_vagas', {usuario: req.session.usuario, voltar});

});



module.exports = router;