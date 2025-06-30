const express = require('express');
const router = express.Router();
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');
const db = require('../banco.js');

router.get('/:nome', middleware, permisao('Empresa'), (req, res) => {
    db.all(`SELECT * FROM avaliacao WHERE aluno = ?`, [req.params.nome], (err, avaliacoes) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar avaliações');
        }

        db.get(`SELECT * FROM alunos WHERE nome = ?`, [req.params.nome], (err, aluno) => {
            if (err) {
                console.log('Erro ao fazer consulta de alunos: ' + err.message);
                return res.status(500).send('Erro ao fazer consulta de alunos: ' + err.message);
            }

            if (!aluno) {
                return res.render('desempenho_candidato', {
                    usuario: req.session.usuario,
                    mensagem_error: 'Nota não registrada para esse aluno(a)',
                    avaliacoes: avaliacoes,
                    alunos: null
                });
            }

            res.render('desempenho_candidato', {
                usuario: req.session.usuario,
                mensagem_error: null,
                avaliacoes: avaliacoes,
                alunos: aluno
            });
        });
    });
});

module.exports = router;
