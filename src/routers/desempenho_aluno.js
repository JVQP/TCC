const express = require('express');
const db = require('../banco.js');
const router = express.Router();
const middleware = require('./middleware.js');



router.get('/', middleware, (req, res) => {


    if(req.session.usuario.tipo === 'Aluno'){
        
             return res.render('loginAvaliacao', { usuario: req.session.usuario });

    } else {
        return res.redirect('/login')
    }

  

});


router.post('/desempenho', middleware, (req, res) => {

let matricula = req.body.matricula;

db.all('SELECT * FROM avaliacao WHERE matricula = ?', [matricula], (err, avaliacoes) => {
    if (err) {
        console.error(err.message);
        res.status(500).send('Erro ao buscar aluno');
        return;
    }

    console.log(avaliacoes);

    if (avaliacoes.length === 0) {
        res.render('loginAvaliacao', { usuario: req.session.usuario, error: `Nenhuma nota registrada para você (${req.session.usuario.nome}), volte mais tarde!`, avaliacoes });
        return;
    }

  return res.render('desempenho_aluno', { usuario: req.session.usuario, avaliacoes });

});

});


module.exports = router;