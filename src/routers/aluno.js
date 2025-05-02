const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const router = express.Router();

router.get('/', (req, res) => {

        db.all(`SELECT * FROM usuarios`, (err, usuarios) => {
                if(err){
                    return res.status(500).send('Erro interno no servidor, por favor verificar!');
                } else {
                    res.render('aluno', {usuarios: usuarios, usuario: req.session.usuario })
                }
        })


});

router.post('/registro-aluno', (req, res) => {

        let nome = req.body.inputAluno;
        let curso = req.body.inputCurso;

        db.run(`INSERT INTO alunos (nome, curso) VALUES (?, ?);`, [nome, curso], (err) => {
            if(err){
                return res.render('aluno', {error: 'Erro interno no servidor, por favor verificar!',
                    usuario: req.session.usuario 
                }); 
            } else {

                db.all(`SELECT * FROM usuarios`, (err, usuarios) => {
                    if(err){
                        return res.status(500).send('Erro interno no servidor, por favor verificar!');
                    } 
                        res.render('aluno', {usuarios: usuarios,
                            mensagem_sucesso: 'Aluno registrado com sucesso!',
                            usuario: req.session.usuario 
                        });
                    
            });
            }
           
        });
       
        });


module.exports = router;