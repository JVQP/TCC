const express = require('express');
const router = express.Router();
const db = require('../banco.js');
const middleware = require('./middleware.js');


router.get('/', middleware, (req, res) => {


db.all('SELECT * FROM alunos', (err, alunos) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Erro ao acessar o banco de dados.');
    }
    res.render('lista_alunos', { alunos: alunos, usuario: req.session.usuario});

});
});


module.exports = router