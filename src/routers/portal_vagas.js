const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const router = express.Router();


router.get('/', middleware, (req, res) => {

res.render('portal_vagas', {usuario: req.session.usuario});

});



module.exports = router;