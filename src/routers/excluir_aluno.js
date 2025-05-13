const express = require('express');
const db = require('../banco.js');
const router = express.Router();



router.get('/:id', (req, res) => {

    const id = req.params.id;
  
    db.run(`DELETE FROM alunos WHERE id = ?`, [id], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Erro ao excluir o aluno.');
        }
        res.redirect('/lista_alunos');
    }); 

});


module.exports = router;