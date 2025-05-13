const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const router = express.Router();

router.get('/', (req, res) => {

    db.all(`SELECT * FROM usuarios WHERE tipo = 'Aluno'`, (err, usuarios) => {
        if (err) {
            return res.status(500).send('Erro interno no servidor, por favor verificar!');
        } else {
            res.render('aluno', { usuarios: usuarios || [], usuario: req.session.usuario })
        }
    })


});

router.post('/registro-aluno', middleware, (req, res) => {
    const matricula = req.body.inputMatricula;
    const nome = req.body.inputAluno;
    const curso = req.body.inputCurso;
    const turno = req.body.inputTurno;

    // Verifica se a matrícula já existe antes de tentar cadastrar
    db.get(`SELECT * FROM alunos WHERE matricula = ?`, [matricula], (err, aluno) => {
        if (err) {
            return res.status(500).send('Erro interno no servidor ao buscar aluno.');
        }

        if (aluno) {
            // Matrícula já existe
            db.all(`SELECT * FROM usuarios`, (err, usuarios) => {
                if (err) {
                    return res.status(500).send('Erro interno ao buscar usuários.');
                }

                return res.render('aluno', {
                    usuarios: usuarios || [],
                    usuario: req.session.usuario,
                    error: 'Aluno(a) já cadastrado(a)!'
                });
            });
        } else {
            // Matrícula não existe, prossegue com cadastro
            db.run(`INSERT INTO alunos (matricula, nome, curso, turno) VALUES (?, ?, ?, ?)`,
                [matricula, nome, curso, turno],
                (err) => {
                    if (err) {
                        return res.status(500).send('Erro ao cadastrar aluno.');
                    }

                    db.all(`SELECT * FROM usuarios`, (err, usuarios) => {
                        if (err) {
                            return res.status(500).send('Erro interno no servidor ao buscar usuários.');
                        }

                        return res.render('aluno', {
                            usuarios: usuarios || [],
                            usuario: req.session.usuario,
                            mensagem_sucesso: 'Aluno(a) cadastrado(a) com sucesso!'
                        });
                    });
                }
            );
        }
    });
});

module.exports = router;