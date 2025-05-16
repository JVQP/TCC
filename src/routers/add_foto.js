const express = require('express');
const router = express.Router();
const db = require('../banco.js');
const file = require('express-fileupload');
const middaleware = require('./middleware.js');
const path = require('path');

// Configurando o middleware para o upload de arquivos
const app = express();
app.use(file());

// Adcionando chaves estrangeiras
	db.run("PRAGMA foreign_keys = ON");

router.get('/:id', middaleware, (req, res) => {
    res.render('add_foto', {usuario: req.session.usuario});
});

router.post('/:id', (req, res) => {
    let id = req.params.id;

    if (!req.files || !req.files.imagem) {
        return res.render('add_foto', { usuario: req.session.usuario, erro: 'Selecione uma imagem!' });
    }

    let imagem = req.files.imagem.name;

    db.run(`INSERT INTO imagem_perfil (id_usuario, imagem) VALUES (?, ?)`, [id, imagem], (err) => {
        if (err) {
            console.log(err);
            return res.render('add_foto', { usuario: req.session.usuario, erro: 'Erro ao atualizar imagem!' });
        } else {
           const uploadPath = path.join(__dirname, '..', '..', 'Public', 'imagem', imagem);

            req.files.imagem.mv(uploadPath, (err) => {
                if (err) {
                    console.log(err);
                    return res.redirect(`/add-foto/${id}`);
                } else {
                    return res.redirect('/adm');
                }
            });
        }
    });
});

module.exports = router