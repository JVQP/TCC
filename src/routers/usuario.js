const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const router = express.Router();



router.get('/', middleware , (req, res) => {
    res.render('cadastro_usuarios');
});

router.post('/cadastro', (req, res) => {

let inputEmail = req.body.inputEmail;
let nome_completo = req.body.inputNome;
let data_nascimento = req.body.inputData
let senha = req.body.inputSenha;
let confirmar = req.body.inputConfirmar;
let tipo = req.body.inputTipoUsuario;


// Verificando se os inputs estão vazios
if(inputEmail == "" || nome_completo == "" || data_nascimento == "" || senha == "" || confirmar == ""){
return res.render('cadastro_usuarios', {mensagem3: 'Preencha todos os campos!', usuario: req.session.usuario });
}

// Verificando se as senhas são iguais
if (senha != confirmar) {
    return res.render('cadastro_usuarios', {mensagem2: 'As senhas não conferem, por favor repita novamente!', usuario: req.session.usuario });
}

db.get('SELECT * FROM usuarios WHERE email = ?', [inputEmail], (err, row) => {
    if (err) {
        console.error(err.message);
        return res.render('cadastro_usuarios', {mensagem5: 'Erro ao verificar o email!', usuario: req.session.usuario });
    }
    if (row) {
        return res.render('cadastro_usuarios', {mensagem4: 'Email já cadastrado!', usuario: req.session.usuario });
    } else {
      
        db.run('INSERT INTO usuarios (nome, email, data_nascimento, senha, confirmar_senha, tipo) VALUES (?, ?, ?, ?, ?, ?)', [nome_completo, inputEmail, data_nascimento, senha, confirmar, tipo], function(err) {
            if (err) {
                console.error(err.message);
                return res.render('cadastro_usuarios', {mensagem2: 'Erro ao cadastrar o usuário!', usuario: req.session.usuario });
            } else {
                return res.render('cadastro_usuarios', {mensagem1: 'Usuário cadastrado com sucesso!', usuario: req.session.usuario });
            }
        });
    }
        });
    
    });


module.exports = router;