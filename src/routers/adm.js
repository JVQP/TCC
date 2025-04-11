const express = require('express');
const router = express.Router();


    router.get('/', (req, res) => {
        res.render('adm', { title: 'Administrador' });
    })


    module.exports = router;