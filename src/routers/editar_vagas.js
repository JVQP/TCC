const express = require('express');
const router = express.Router();
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');


router.get('/:id', middleware, permisao('Empresa'), (req, res) => {


    let id = req.params.id;

    db.get('SELECT * FROM vagas WHERE id = ?', [id], (err, vaga) => {
        if (err) {
            console.error('Erro ao buscar vaga:', err);
            return res.status(500).send('Erro interno do servidor');
        }

        if (!vaga) {
            res.render('editar_vagas', {
                error: 'Vaga não encontrada',
                usuario: req.session.usuario,
                vagas: vaga
            });
            return;
        }

        // Renderiza a página de edição de vaga com os dados da vaga
        res.render('editar_vagas', {
            usuario: req.session.usuario,
            vagas: vaga
        });
    });

});


router.post('/:id', middleware, permisao('Empresa'), (req, res) => {

    let id = req.params.id;
    let empresa = req.body.inputEmpresa;
    let titulo = req.body.inputTitulo;
    let descricao = req.body.inputDescricao;
    let requisito = req.body.inputRequisito;
    let data = req.body.inputData;
    let situacao = req.body.inputSituacao;
    let tipo_contrato = req.body.inputTipo;
    
    db.all('SELECT * FROM vagas', (err, vaga) => {

        if(err){
            console.log('Erro de consulta de vagas: ' + err.message);
            res.status(500).send('Erro de consulta de vagas: ' + err.message);
            return;
        } 

         db.run('UPDATE vagas SET empresa = ?, titulo_vaga = ?, descricao = ?, requisitos = ?, data = ?, situacao = ?, tipo_contrato = ? WHERE id = ?', [empresa, titulo, descricao, requisito, data, situacao, tipo_contrato, id ], (err) => {

            if(err){
                console.log('Erro ao editar vaga: ' + err.message);
                res.render('editar_vagas', {
                    usuario: req.session.usuario,
                    vagas: vaga,
                    error: 'Erro ao editar vaga, tente novamente mais tarde!'
                });
            
            
            } else {
                console.log('Vaga editada com sucesso!');
                res.render('editar_vagas', {
                    usuario: req.session.usuario,
                    vagas: vaga,
                    mensagem: 'Vaga editada com sucesso!'
                });
            }

        });

    });

});

module.exports = router;