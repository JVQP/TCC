const express = require('express');
const router = express.Router();
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');

router.get('/', middleware, permisao('Professor'), (req, res) => {

    db.all('SELECT * FROM avaliacao', (err, avaliacao) => {
        if (err) {
            console.log('Erro de consulta no banco de dados!', err.message);
            return res.status(500).send('Erro de consulta no banco de dados!', err.message);
        } else {


            db.all('SELECT * FROM alunos', (err, alunos) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Erro ao acessar o banco de dados.');
                }
                     return res.render('lista_alunos', { alunos: alunos, 
                        total: alunos.length, 
                        usuario: req.session.usuario,
                         avaliacao: avaliacao });
            });

        }
    })


});


router.post('/pesquisa', middleware, permisao('Professor'), (req, res) => {

    let pesquisa = req.body.pesquisa;

    db.all(`
        SELECT * FROM alunos 
        WHERE 
            matricula LIKE ? OR 
            nome LIKE ? OR 
            curso LIKE ? OR 
            turno LIKE ?
    `, [`%${pesquisa}%`], (err, alunos) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao acessar o banco de dados.');
        }

        if (alunos.length === 0) {
            res.render('pesquisa_aluno', { error: 'Nenhum aluno encontrado', alunos: [], usuario: req.session.usuario });
        } else {
            let total = alunos.length;
            res.render('pesquisa_aluno', { alunos: alunos, total: total });
        }

    });



});

module.exports = router