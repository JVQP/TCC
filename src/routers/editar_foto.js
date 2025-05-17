const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const router = express.Router();


router.all('/:id/:imagem', (req, res) => {

res.render('editar_foto');

});



module.exports = router;