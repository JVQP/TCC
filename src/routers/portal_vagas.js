const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const router = express.Router();


router.get('/', middleware, (req, res) => {

let tipo = req.session.usuario.tipo;

let rotas = {
    Aluno: '/painel-aluno',
    Professor: '/adm',
    Empresa: '/painel-empresa'
}

let voltar = rotas[tipo] || '/';

db.all('SELECT * FROM vagas', (err, vagas) => {

    if(err){
        console.log('Erro de consultar vagas ' + err.message);
        return res.status(500).send('Erro de consultar vagas ' + err.message);
    }

        return res.render('portal_vagas', {usuario: req.session.usuario, 
            voltar,
            vagas: vagas
        });

});

});



module.exports = router;