const express = require('express');
const permisao = require('./permisao');
const middleware = require('./middleware');
const db = require('../banco.js');
const router = express.Router();


router.get('/:matricula', middleware, permisao('Professor'), (req, res) => {

let matricula = req.params.matricula

db.all('SELECT * FROM avaliacao WHERE matricula = ?', [matricula], (err, avaliacoes) => {
    if (err) {
        console.error(err.message);
        res.status(500).send('Erro ao buscar aluno');
        return;
    }

    console.log(avaliacoes);

  if (!avaliacoes || avaliacoes.length === 0) {
    return res.render('visualizar_nota', {
        usuario: req.session.usuario,
        avaliacoes: [],
        mensagem: 'Nenhuma nota registrada para esse aluno(a)!'
    });
}


  return res.render('visualizar_nota', { usuario: req.session.usuario, avaliacoes});

});
});


module.exports = router;