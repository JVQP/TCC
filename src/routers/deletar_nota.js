const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');
const router = express.Router();


router.get('/:id', middleware, permisao('Professor'), (req, res) => {


    // Rota para deletar uma avaliação
    const id = req.params.id;

        
        db.run('DELETE FROM avaliacao WHERE id = ?', [id], (err) => {

            if(err){
                console.log('Erro ao deletar ' + err.message);
               return res.status(500).send('Erro ao deletar, por favor consulte ao desenvolvedor!');
            }

                    return res.redirect('/lista_alunos');

        });

});


module.exports = router;