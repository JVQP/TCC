const express = require('express');
const router = express.Router();
const middleware = require('./middleware.js');


    router.get('/', middleware, (req, res) => {
        res.render('home');
    })


    module.exports = router;