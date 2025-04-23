const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.render('cadastro_usuarios');
});

router.post('/cadastro', (req, res) => {

let inputEmail = req.body.inputEmail;
let nome_completo = req.body.inputNome;
let senha = req.body.inputSenha;
let confirmar = req.body.inputConfirmar;
let tipo = inputTipoUsuario;



});

module.exports = router;