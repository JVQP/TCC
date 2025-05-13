const express = require('express');
const db = require('../banco.js');
const { string } = require('i/lib/util.js');
const e = require('express');
const router = express.Router();


router.get('/:id', (req, res) => {

    const id = req.params.id;


    db.all('SELECT * FROM alunos WHERE id = ?', [id], (err, alunos) => {

        if (err) {
            res.status(500).send('Erro ao buscar aluno: ' + err.message);
            console.log(err);
        } else {
            res.render('editar_aluno', { aluno: alunos[0] });
        }

    });


});


router.post('/:id', (req, res) => {

    const id = req.params.id;
    let editarMatricula = req.body.editarMatricula;
    let editarNome = req.body.editarNome;
    let editarCurso = req.body.editarCurso;
    let editarTurno = req.body.editarTurno;
 
    db.run('UPDATE alunos SET matricula = ?, nome = ?, curso = ?, turno = ? WHERE id = ?', [editarMatricula, editarNome, editarCurso, editarTurno, id], (err) => {
        if (err) {
            res.status(500).send('Erro ao editar aluno: ' + err.message);
            console.log(err);
        } else {
            res.redirect('/lista_alunos');
        }
    });



});

module.exports = router;