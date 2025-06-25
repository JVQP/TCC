const express = require('express');
const router = express.Router();
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');

router.post('/', middleware, permisao('Empresa'), async (req, res) => {

    let id = req.body.id;
    console.log('ID do candidato a ser excluído: ' + id);
    db.all(`SELECT * FROM candidatos WHERE id = ?`, [id], (err, candidatos) => {

        if(err) {
            console.log('Erro ao consultar candidato: ' + err.message);
            res.status(500).send('Erro ao consultar candidato: ' + err.message);
            return;
        }
            db.run(`DELETE FROM candidatos WHERE id = ?`, [id], (err) => {
                if(err) {
                    console.log('Erro ao excluir candidato: ' + err.message);
                    res.status(500).send('Erro ao excluir candidato: ' + err.message);
                    return;
                } else {
                    console.log('Candidato excluído com sucesso');
                    res.redirect('/listar-candidatos');
                }
            });
});

});

module.exports = router;