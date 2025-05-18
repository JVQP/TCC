const express = require('express');
const db = require('../banco.js');
const fileUpload = require('express-fileupload');
const middleware = require('./middleware.js');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const app = express();

app.use(fileUpload());




router.get('/:id/:imagem', middleware, (req, res) => {

let id = req.params.id;

    db.all('SELECT * FROM usuarios WHERE id = ?', [id], (err, usuario) => {

        if (err) {
            console.log('Mensagem: ' + err.message);
            return res.status(500).send('Erro de usuário, consulte ao desenvolvedor!');
        } else {
            return res.render('editar_foto', { usuarios: usuario, usuario: req.session.usuario });
        }

    });

});

router.post('/:id/:imagem', middleware, (req, res) => {

let id = req.params.id;
let imagem = req.files.imagemNova.name;
let imagemAntiga = req.params.imagem;

console.log(id, imagem, imagemAntiga);

});


module.exports = router;