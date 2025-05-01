const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const router = express.Router();

router.get('/', middleware, (req, res) => {
   
    let query = `SELECT usuarios.nome FROM aluno
    INNER JOIN usuarios ON `
   
    res.render('aluno');
});

module.exports = router;