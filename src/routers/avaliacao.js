const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const router = express.Router();


router.get('/', middleware, (req, res) => {

    res.render('loginAva');

});

router.post('/avaliar-aluno', middleware, (req, res) => {
    let matricula = req.body.matricula;

    db.get(`SELECT * FROM alunos WHERE matricula = ?`, [matricula], (err, alunos) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar aluno.');
        }

        if (alunos) {
            res.render('avaliacao_aluno', { aluno: alunos, usuario: req.session.usuario });
        } else {
            res.render('loginAva', { error: 'Matrícula não encontrada.' });
        }


    });

});

// router.get('/', middleware, (req, res) => {
//     res.render('avaliacao_aluno', { usuario: req.session.usuario });
// });

router.post('/avaliar-aluno/salvar', middleware, (req, res) => {

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

    db.all(`SELECT * FROM alunos`, (err, alunos) => {

        if (err) {
            console.error(err);
        }

        if (!nome || !professor || !periodo || !nota1 || !nota2 || !nota3 || !nota4 || !nota5 || !nota6 || !nota7 || !nota8 || !media) {
            return res.render('avaliacao_aluno', { error: 'Preencha todos os campos obrigatórios.', aluno:alunos });
        } else {

            db.run(`
  INSERT INTO avaliacao (
    aluno, professor, periodo, comunicacao, trabalho_equipe, responsabilidade, pensamento_critico,
    proatividade, lideranca, adaptabilidade, empatia, media, observacao
  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
`, [nome, professor, periodo, nota1, nota2, nota3, nota4, nota5, nota6, nota7, nota8, media, observacao], (err) => {
                if (err) {
                    console.error(err);
                   return res.render('avaliacao_aluno', { error: `Erro ao salvar a avaliação do aluno: ${nome}`, aluno: alunos });
                } else {
                         return res.redirect('/adm');
                }
              
            });
        }
    });
 });



module.exports = router;