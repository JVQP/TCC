const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const router = express.Router();

router.get('/', (req, res) => {

        db.all(`SELECT * FROM usuarios`, (err, usuarios) => {
                if(err){
                    return res.status(500).send('Erro interno no servidor, por favor verificar!');
                } else {
                    res.render('aluno', {usuarios: usuarios || [], usuario: req.session.usuario })
                }
        })


});

router.post('/registro-aluno', middleware, (req, res) => {

        let matricula = req.body.inputMatricula;
        let nome = req.body.inputAluno;
        let curso = req.body.inputCurso;
        let Turno = req.body.inputTurno;


        db.run(`INSERT INTO alunos (matricula, nome, curso, turno) VALUES (?, ?, ?, ?)`, [matricula, nome, curso, Turno], function(err) {
                if(err){
                    db.all(`SELECT * FROM usuarios`, (err, usuarios) => {
                        if (err) {
                            return res.status(500).send('Erro interno no servidor ao buscar usuários.');
                        }
                        res.render('aluno', {
                            usuarios: usuarios || [],
                            usuario: req.session.usuario,
                            error: `Erro ao cadastrar aluno, por favor verificar!`
                        });
                      
                    });
                    
                } else {
                      db.all(`SELECT * FROM usuarios`, (err, usuarios) => {
                        if(err){
                            return res.status(500).send('Erro interno no servidor, por favor verificar!');
                        } else {
                            res.render('aluno', {
                                usuarios: usuarios || [],
                                mensagem_sucesso: 'Aluno cadastrado com sucesso!',
                                usuario: req.session.usuario
                            });
                            
                        }
                      });
                }
        });

});


module.exports = router;