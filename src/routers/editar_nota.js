
const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');
const router = express.Router();

router.post('/', middleware, permisao('Professor'), (req, res) => {



    let matricula = req.body.avaMatricula;
    let nome = req.body.avaNome;
    let professor = req.body.avaProfessor;
    let periodo = req.body.avaPeriodo;
    let nota1 = req.body.avaNota1;
    let nota2 = req.body.avaNota2;
    let nota3 = req.body.avaNota3;
    let nota4 = req.body.avaNota4;
    let nota5 = req.body.avaNota5;
    let nota6 = req.body.avaNota6;
    let nota7 = req.body.avaNota7;
    let nota8 = req.body.avaNota8;
    let media = req.body.media;
    let observacao = req.body.avaObservacao;


    db.run('SELECT * FROM avaliacao', (err) => {

        if (err) {
            console.error('Erro ao consultar o banco de dados:', err.message);
            return res.status(500).send('Erro ao consultar o banco de dados.');
        } else {

            // Atualizando os dados no banco de dados

            db.run(`UPDATE avaliacao SET
        aluno = ?,
        professor = ?,
        periodo = ?,
        comunicacao = ?,
        trabalho_equipe = ?,
        responsabilidade = ?,
        pensamento_critico = ?,
        proatividade = ?,
        lideranca = ?,
        adaptabilidade = ?,
        empatia = ?,
        media = ?,
        observacao = ?
      WHERE matricula = ?`,
                [nome, professor, periodo, nota1, nota2, nota3, nota4, nota5, nota6, nota7, nota8, media, observacao, matricula],
                function (err) {
                    if (err) {
                        console.error('Erro ao atualizar os dados:', err.message);
                        return res.redirect('/erro-nota');
                    }
                });
            return res.redirect(`/lista_alunos`);
        }
    });


});




module.exports = router