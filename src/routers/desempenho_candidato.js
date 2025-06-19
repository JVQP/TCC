const express = require('express');
const router = express.Router();
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');
const db = require('../banco.js');


router.get('/:nome', middleware, permisao('Empresa'), (req, res) => {

db.all(`SELECT * FROM avaliacao WHERE aluno = ?`, [req.params.nome], (err, avaliacoes) => {

        if(err){
            console.error(err);
            return res.status(500).send('Erro ao buscar avaliações');
        }

        res.render('desempenho_candidato', {
            usuario: req.session.usuario,
            avaliacoes: avaliacoes
        });
                return;
}); 
});

module.exports = router;