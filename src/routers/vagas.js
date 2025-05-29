const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');
const router = express.Router();



router.get('/', middleware, permisao('Empresa'), (req, res) => {

res.render('publicar_vaga', {usuario: req.session.usuario});

});

router.post('/vaga-publicada', middleware, permisao('Empresa'), (req, res) => {

    const {inputEmpresa, inputTitulo, inputDescricao, inputRequisito, inputData, inputSituacao, inputTipo} = req.body;


    console.log('Dados: ', inputEmpresa, inputTitulo, inputDescricao, inputRequisito, inputData, inputSituacao, inputTipo);

});

module.exports = router;