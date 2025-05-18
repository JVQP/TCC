const express = require('express');
const db = require('../banco.js');
const fileUpload = require('express-fileupload');
const router = express.Router();
const path = require('path');
const middleware = require('./middleware.js');

let app = express();
app.use(fileUpload());


router.get('/', (req, res) => {
    res.render('cadastro_usuarios');
});



router.post('/cadastro', middleware, (req, res) => {
    const { inputEmail, inputNome, inputData, inputSenha, inputConfirmar, inputTipoUsuario } = req.body;

    if (!inputEmail || !inputNome || !inputData || !inputSenha || !inputConfirmar) {
        return res.render('cadastro_usuarios', {
            mensagem3: 'Preencha todos os campos!',
            usuario: req.session.usuario
        });
    }

    if (inputSenha !== inputConfirmar) {
        return res.render('cadastro_usuarios', {
            mensagem2: 'As senhas não conferem, por favor repita novamente!',
            usuario: req.session.usuario
        });
    }

    db.get('SELECT * FROM usuarios WHERE email = ?', [inputEmail], (err, usuario) => {
        if (err) {
            console.error(err.message);
            return res.render('cadastro_usuarios', {
                mensagem5: 'Erro ao verificar o email!',
                usuario: req.session.usuario
            });
        }

        if (usuario) {
            return res.render('cadastro_usuarios', {
                mensagem4: 'Email já cadastrado!',
                usuario: req.session.usuario
            });
        }

        let imagem = null;
        if (req.files && req.files.inputImagem) {
            imagem = req.files.inputImagem.name;
        }

        db.run('INSERT INTO usuarios (imagem, nome, email, data_nascimento, senha, confirmar_senha, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [imagem, inputNome, inputEmail, inputData, inputSenha, inputConfirmar, inputTipoUsuario],
            function (err) {
                if (err) {
                    console.error(err.message);
                    return res.render('cadastro_usuarios', {
                        mensagem2: 'Erro ao cadastrar o usuário!',
                        usuario: req.session.usuario
                    });
                }

             
                if (imagem) {
                    const uploadPath = path.join(__dirname, '..', '..', 'Public', 'imagem', imagem);
                    req.files.inputImagem.mv(uploadPath, (err) => {
                        if (err) {
                            console.log('Erro ao salvar imagem:', err);
                        } else {
                            console.log('Imagem salva com sucesso!');
                        }

                        return res.render('cadastro_usuarios', {
                            mensagem1: 'Usuário cadastrado com sucesso!',
                            usuario: req.session.usuario
                        });
                    });
                } else {
                    return res.render('cadastro_usuarios', {
                        mensagem1: 'Usuário cadastrado com sucesso (sem imagem de perfil)!',
                        usuario: req.session.usuario
                    });
                }
            });
    });
});



module.exports = router;