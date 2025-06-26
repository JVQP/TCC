const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');
const router = express.Router();



router.post('/', middleware, permisao('Empresa'), (req, res) => {

    let id = req.body.pesquisa

    db.all('SELECT * FROM vagas WHERE id= ?', [id], (err, vagas) => {

        if(err){
            console.log('Erro ao listar vagas: ' + err.message);
        } 

        if(!vagas){
         
           let total = vagas.length;  
            res.render('FiltroLista_vagas', {
                usuario: req.session.usuario,
                mensagem_error: 'Vaga não encontrada!',
                vagas: vagas,
                total: total
                
            });
                return;
        } 
           
            let total = vagas.length
            res.render('FiltroLista_vagas', {
                usuario: req.session.usuario,
                vagas: vagas,
                total: total
                
            });
        
            return;
    });

});


module.exports = router;

