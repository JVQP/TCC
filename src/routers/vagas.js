const express = require('express');
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');
const router = express.Router();



router.get('/', middleware, permisao('Empresa'), (req, res) => {

    res.render('publicar_vaga', { usuario: req.session.usuario });

});

router.post('/vaga-publicada', middleware, permisao('Empresa'), (req, res) => {

    const { inputEmpresa, inputEmail, inputTitulo, inputDescricao, inputRequisito, inputData, inputSituacao, inputRamo, inputTipo } = req.body;


    db.run('INSERT INTO vagas (empresa, email, titulo_vaga, descricao, requisitos, data, situacao, ramo_empresarial, tipo_contrato) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [inputEmpresa, inputEmail, inputTitulo, inputDescricao, inputRequisito, inputData, inputSituacao, inputRamo, inputTipo], (err) => {

        if (!err) {
            console.log('Vaga publicada com sucesso!');
            return res.render('publicar_vaga', { usuario: req.session.usuario, mensagem: 'Vaga publica com sucesso!' });
        }
        console.log('Erro ao publicar vaga: ' + err.message);
        return res.render('publicar_vaga', { usuario: req.session.usuario, error: 'Error ao publicar vaga, tente novamente mais tarde!' });
        
    });

});

module.exports = router;