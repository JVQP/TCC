const express = require('express');
const db = require('../banco.js');
const router = express.Router();


    router.get('/', (req, res) => {
        res.render('login');
    })

  router.post('/autenticacao', (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    let query = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;

    db.get(query, [email, senha], (err, usuario) => {

        if(err) {
            console.error(err.message);
            res.render('login', { error: 'E-Mail ou senha inválidos, tente novamente mais tarde!.' });
            return;
        } 
      
        if(usuario) {
                req.session.usuario = usuario;
                return res.redirect('/adm');
            } else {
                res.render('login', { error: 'E-Mail ou senha inválidos, tente novamente mais tarde!.' });
            }

  });
});
      

    module.exports = router;