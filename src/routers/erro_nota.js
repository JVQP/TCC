const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');
const router = express.Router();


router.get('/', middleware, permisao('Professor'), (req, res) => {

res.render('error_nota', {
    title: 'Erro ao editar nota',
    messagem: 'Ocorreu um erro ao tentar editar a nota. Por favor, tente novamente mais tarde.',
    usuario: req.session.usuario
  });
});

module.exports = router;