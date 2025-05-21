const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const router = express.Router();



router.get('/', middleware, (req, res) => {

res.render('loginGrafico', {usuario: req.session.usuario});    

});

router.post('/grafico-aluno', (req, res) => {
    let matricula = req.body.matricula;

db.all('SELECT * FROM avaliacao WHERE matricula = ?', [matricula], (err, avaliacoes) => {
    if (err) {
        console.error(err.message);
        res.status(500).send('Erro ao buscar aluno');
        return;
    }

    console.log(avaliacoes);

    if (avaliacoes.length === 0) {
        res.render('loginGrafico', { usuario: req.session.usuario, error: `Nenhuma nota registrada para você (${req.session.usuario.nome}), volte mais tarde!`, avaliacoes });
        return;
    }

  return res.render('grafico', { usuario: req.session.usuario, avaliacoes });

});

});


module.exports = router