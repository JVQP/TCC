const express = require('express');
const db = require('../banco');
const router = express.Router();

router.get('/', (req, res) => {
    // Renderizando a página de contato
    res.render('contato');
});

router.post('/mensagem', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const mensagem = req.body.mensagem
    
    db.run(`INSERT INTO mensagens (nome, email, mensagem) VALUES (?, ?, ?)`, [nome, email, mensagem], (err) => {
        if (err) {
            console.error('Erro ao inserir mensagem:', err.message);
            res.render('contato', {mensagem: 'Erro ao enviar mensagem. Tente novamente!.'});
        }
        console.log(`Mensagem de ${nome} enviada com sucesso!`);
        res.redirect('/obrigado');
    });

   

});

module.exports = router;
