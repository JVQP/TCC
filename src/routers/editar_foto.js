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
    const id = req.params.id;

    let tipo = req.session.usuario.tipo;

    let rota = {
        Aluno: '/painel-aluno',
        Professor: '/adm',
        Empresa: '/painel-empresa'
    }

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
        if (!req.files || !req.files.imagemNova) {
       db.all('SELECT * FROM usuarios WHERE id = ?', [req.session.usuario.id], (err, usuario) => {

            if (err) {
                console.log('Mensagem: ' + err.message);
                return res.status(500).render('editar_foto', {
                    error: 'Erro ao editar a imagem, consulte o desenvolvedor.',
                    usuario: req.session.usuario,
                    
                });
            }
            return res.render('editar_foto', {
                usuarios: usuario,
                error: 'Nenhum arquivo foi enviado.',
                usuario: req.session.usuario,
                
            });

       });

       return;

    }


  const imagemNova = req.files.imagemNova.name;


    db.run('UPDATE usuarios SET imagem = ? WHERE id = ?', [imagemNova, id], (err) => {
        if (err) {
            console.log('Mensagem: ' + err.message);
            return res.status(500).render('editar_foto', {
                error: 'Erro ao editar a imagem, consulte o desenvolvedor.',
                usuario: req.session.usuario,
                
            });
        }
    
        const uploadPath = path.join(__dirname, '..', '..', 'Public', 'imagem', imagemNova);
        req.files.imagemNova.mv(uploadPath, (err) => {
            if (err) {
                console.log('Mensagem: ' + err.message);
                return res.status(500).render('editar_foto', {
                    error: 'Erro ao mover a imagem, consulte o desenvolvedor.',
                    usuario: req.session.usuario,
                    
                });
            }
            if (imagemNova) {
                const uploadPath = path.join(__dirname, '..', '..', 'Public', 'imagem', imagemNova);
                req.files.imagemNova.mv(uploadPath, (err) => {
                    if (err) {
                        console.log('Erro ao salvar imagem:', err.message);
                    }
                });
            }

         const imagemAntiga = req.params.imagem;

            if (imagemAntiga) {
                const RemoverImagem = path.join(__dirname, '..', '..', 'Public', 'imagem', imagemAntiga);
                fs.unlink(RemoverImagem, (err) => {
                    if (err) {
                        console.log('Erro ao apagar imagem antiga:', err.message);
                    }
                });
            }

          let destino;
          switch (req.session.usuario.tipo) {
              case 'Aluno':
                  destino = '/painel-aluno';
                  break;
              case 'Professor':
                  destino = '/adm';
                  break;
              case 'Empresa':
                  destino = '/painel-empresa';
                  break;
              default:
                  destino = '/';
          }

            return res.redirect(destino);
        });
    });
});


module.exports = router;
