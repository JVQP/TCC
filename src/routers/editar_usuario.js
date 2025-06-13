const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');
const router = express.Router();


router.get('/:id', middleware, permisao('Professor'), (req, res) => {


    db.get('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (err, usuario) => {

        if (err) {
            console.log('Erro ao buscar usuário: ' + err.message);
            return res.status(500).send('Erro ao buscar usuário: ' + err.message);
        }

        return res.render('editar_usuario', {
            usuario: req.session.usuario,
            usuarios: usuario
        });


    });
});

router.post('/:id/editar_usuario', middleware, permisao('Professor'), (req, res) => {


  const { inputEmail, inputNome, inputData, inputSenha, inputConfirmar, inputTipoUsuario, inputId } = req.body;

    // if (!inputEmail || !inputNome || !inputData || !inputSenha || !inputConfirmar || inputTipoUsuario){
    //     return res.render('editar_usuario', {
    //         mensagem1: 'Preencha todos os campos!',
    //         usuarios: req.session.usuario
    //     });
    // }

    if (inputSenha !== inputConfirmar) {
        return res.render('editar_usuario', {
            mensagem2: 'As senhas não conferem, por favor repita novamente!',
            usuarios: req.session.usuario
        });
    }

   db.run(`UPDATE usuarios SET nome = ?, 
    email = ?, 
    data_nascimento = ?, 
    senha = ?, 
    confirmar_senha = ?,
    tipo = ?
    WHERE id = ? `, [inputNome, inputEmail, inputData, inputSenha, inputConfirmar, inputTipoUsuario, inputId], (err) => {
        if(err){
            console.log('Erro ao editar usuário: ' + err.message);
            return res.status(500).send('Erro ao editar usuário, consulte ao desenvolvedor!' + err.message);
        }
            return res.redirect('/lista-usuario');
    
    });




});



module.exports = router;