const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');
const router = express.Router();




router.get('/', (req,res) => {


    res.render('painel_empresa', {usuario: req.session.usuario});


});



module.exports = router;
