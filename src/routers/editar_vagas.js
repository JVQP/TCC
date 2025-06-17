const express = require('express');
const router = express.Router();
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');


router.get('/:id', middleware, permisao('Empresa'), (req, res) => {


    let id = req.params.id;

    db.get('SELECT * FROM vagas WHERE id = ?', [id], (err, vaga) => {
        if (err) {
            console.error('Erro ao buscar vaga:', err);
            return res.status(500).send('Erro interno do servidor');
        }

        if (!vaga) {
            res.render('editar_vagas', {
                error: 'Vaga não encontrada',
                usuario: req.session.usuario,
                vagas: vaga
            });
                return;
        }

        // Renderiza a página de edição de vaga com os dados da vaga
             res.render('editar_vagas', {
                usuario: req.session.usuario,
                vagas: vaga
            });
    });

});


module.exports = router;