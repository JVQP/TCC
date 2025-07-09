const express = require('express');
const db = require('../banco.js');
const router = express.Router();
const middleware = require('./middleware.js');
const permisao = require('./permisao.js')



router.get('/', middleware, permisao('Aluno'), (req, res) => {

    db.all(`SELECT * FROM usuarios WHERE nome = ? `, [req.session.usuario.nome], (err, usuario) => {
        if (err) {
            console.error(err.message);
            return res.redirect('/login');
        }
        db.all(`SELECT * FROM candidatos WHERE  status = 'Aprovado'`,(err, candidatos) => {

            if (err) {
                console.log('Erro ao consultar candidatos ' + err.message);
                res.status(500).send('Erro ao consultar candidatos ' + err.message);
                return;
            }

            db.all(`SELECT * FROM usuarios`, (err, usuarios_completo) => {
                if(err){
                    console.log('Erro ao consultar tabela de usuários ', err.message);
                    res.status(500).send('Erro ao consultar tabela de usuários ', err.message);
                    return;
                }
                
            let ip = req.socket.remoteAddress;
            ip = ip.replace('::ffff:', '');
            console.log('Usuário logado: ' + usuario[0].nome);
            console.log('Tipo de usuário: ' + usuario[0].tipo);
            console.log('Ip: ' + ip);

                
            res.render('painel_aluno', {
                usuario: req.session.usuario,
                usuarios: usuario,
                id: req.session.usuario.id,
                candidatos: candidatos,
                todosUsuarios: usuarios_completo
            });
            return;
            });

        });
    });

});


module.exports = router;