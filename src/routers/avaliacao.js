const express = require('express');
const db = require('../banco.js'); 
const middleware = require('./middleware.js');
const router = express.Router();


router.get('/', middleware, (req, res) => {
  
    res.render('loginAva');

});

router.post('/avaliar-aluno', middleware, (req, res) => {
    let matricula = req.body.matricula;

    db.get(`SELECT * FROM alunos WHERE matricula = ?`, [matricula], (err, alunos) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar aluno.');
        }

        if (alunos) {
            res.render('avaliacao_aluno', { aluno: alunos, usuario: req.session.usuario });
        } else {
            res.render('loginAva', { error: 'Matrícula não encontrada.' });
        }

        
    });

});



module.exports = router;