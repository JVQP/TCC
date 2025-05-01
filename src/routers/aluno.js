const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const router = express.Router();

router.get('/', (req, res) => {

        db.all(`SELECT * FROM usuarios`, (err, usuarios) => {
                if(err){
                    return res.status(500).send('Erro interno no servidor, por favor verificar!');
                } else {
                    res.render('aluno', {usuarios: usuarios})
                }
        })


});

module.exports = router;