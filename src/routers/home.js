const express = require('express');
const router = express.Router();
const middleware = require('./middleware.js');


    router.get('/', (req, res) => {
        res.render('home');
    })


    module.exports = router;