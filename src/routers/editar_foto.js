const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const router = express.Router();
const path = require('path');
const fs = require('fs');


router.get('/:id/:imagem', middleware, (req, res) => {
    const id = req.params.id;
    const tipo = req.session.usuario.tipo;

    let rota = {
        Aluno: '/painel-aluno',
        Professor: '/adm',
        Empresa: '/painel-empresa'
    };

    let voltar = rota[tipo] || '/';

    db.all('SELECT * FROM usuarios WHERE id = ?', [id], (err, usuario) => {
        if (err) {
            console.log('Mensagem: ' + err.message);
            return res.status(500).send('Erro de usuário, consulte o desenvolvedor!');
        }

        if (!usuario || usuario.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        return res.render('editar_foto', {
            usuarios: usuario,
            usuario: req.session.usuario,
            voltar
        });
    });
});

router.post('/:id/:imagem', middleware, (req, res) => {
    const id = req.params.id;
    const tipo = req.session.usuario.tipo;

    let rota = {
        Aluno: '/painel-aluno',
        Professor: '/adm',
        Empresa: '/painel-empresa'
    };

    let voltar = rota[tipo] || '/';

    if (!req.files || !req.files.imagemNova) {
        db.all('SELECT * FROM usuarios WHERE id = ?', [req.session.usuario.id], (err, usuario) => {
            if (err) {
                console.log('Mensagem: ' + err.message);
                return res.status(500).render('editar_foto', {
                    error: 'Erro ao editar a imagem, consulte ao desenvolvedor.',
                    usuario: req.session.usuario,
                    usuarios: usuario,
                    voltar
                });
            }

            return res.render('editar_foto', {
                usuarios: usuario,
                error: 'Nenhum arquivo foi enviado.',
                usuario: req.session.usuario,
                voltar
            });
        });

        return;
    }


    const imagemNova = req.files.imagemNova.name;

 
    const uploadDir = path.join(__dirname, '..', '..', 'Public', 'imagem');

    
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, imagemNova);

    db.run('UPDATE usuarios SET imagem = ? WHERE id = ?', [imagemNova, id], (err) => {
        if (err) {
            console.log('Mensagem: ' + err.message);
            return res.status(500).render('editar_foto', {
                error: 'Erro ao editar a imagem, consulte ao desenvolvedor.',
                usuario: req.session.usuario,
                voltar
            });
        }

      
        req.files.imagemNova.mv(uploadPath, (err) => {
            if (err) {
                console.error('Erro ao mover imagem:', err);
                return res.status(500).render('editar_foto', {
                    error: 'Erro ao mover a imagem, consulte o desenvolvedor.',
                    usuario: req.session.usuario,
                    voltar
                });
            }

          
            const imagemAntiga = req.params.imagem;
            if (imagemAntiga !== 'user.png') {
                const removerPath = path.join(uploadDir, imagemAntiga);
                fs.unlink(removerPath, (err) => {
                    if (err) {
                        console.log('Erro ao apagar imagem antiga:', err.message);
                    }
                });
            }

           
            let destino = rota[tipo] || '/';
            return res.redirect(destino);
        });
    });
});

module.exports = router;
