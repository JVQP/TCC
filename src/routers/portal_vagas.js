const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const router = express.Router();

router.get('/', middleware, (req, res) => {
    const tipo = req.session.usuario.tipo;

    const rotas = {
        Aluno: '/painel-aluno',
        Professor: '/adm',
        Empresa: '/painel-empresa'
    };

    const voltar = rotas[tipo] || '/';

    db.all(`SELECT * FROM vagas WHERE situacao = 'Ativa'`, (err, vagas) => {
        if (err) {
            console.error('Erro ao consultar vagas: ' + err.message);
            return res.status(500).send('Erro ao consultar vagas: ' + err.message);
        }

        res.render('portal_vagas', {
            usuario: req.session.usuario,
            voltar,
            vagas,
            pesquisa: '',
            empresa: '',
            optn: '',
            contrato: ''
        });
    });
});




module.exports = router;