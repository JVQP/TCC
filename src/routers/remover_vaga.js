const express = require('express');
const middleware = require('./middleware.js');
const db = require('../banco.js');
const permisao = require('./permisao.js');
const router = express.Router();



router.get('/:id', permisao('Empresa'), (req, res) => {

    let id = req.params.id;

   db.run('DELETE FROM vagas WHERE id = ?', [id], (err) => {
        if(err){
            console.log('Erro ao remover vaga: ' + err.message);
            res.status(500).send('Erro ao remover vaga: ' + err.message);
            return;
        }

        db.all('SELECT * FROM vagas WHERE empresa = ?', [req.session.usuario.nome], (err, vaga) => {

            if(err){
                console.log('Erro ao consultar vagas: ' + err.message);
                res.status(500).send('Erro ao consultar vagas: ' + err.message);
                return;
            } else {
                res.render('lista_vagas', {
                    usuario: req.session.usuario,
                    vagas: vaga,
                    mensagem: 'Vaga removida!'
                });
            }
        });
   });

});


module.exports = router;