const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    const tipo = req.session.usuario.tipo;

    const rotas = {
        Aluno: '/painel-aluno',
        Administrador: '/adm',
        Professor: '/painel-educador',
        Empresa: '/painel-empresa'
    };

    const voltar = rotas[tipo] || '/';

    res.render('obrigado', {
        voltar
    });
})


module.exports = router;