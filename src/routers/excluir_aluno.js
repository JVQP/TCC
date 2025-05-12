const express = require('express');
const db = require('../banco.js');
const router = express.Router();



router.get('/:id', (req, res) => {

    const id = req.params.id;
    console.log(id);
     res.redirect('/lista_alunos');

});


module.exports = router;