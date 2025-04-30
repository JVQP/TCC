const express = require('express');
const middleware = require('./middleware.js');
const router = express.Router();


    router.get('/', middleware, (req, res) => {
        res.render('adm', { title: 'Administrador', usuario: req.session.usuario });
    })


    module.exports = router;