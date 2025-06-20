const express = require('express');
const router = express.Router();
const middleware = require('./middleware.js');
const db = require('../banco.js');


const filtro = (valor) => valor ? `%${valor}%` : '%%';

router.post('/', middleware, (req, res) => {
    const tipo = req.session.usuario.tipo;

    const pesquisa = req.body.pesquisa || '';
    const empresa = req.body.inputSelectEmpresa || '';
    const optn = req.body.inputSelectOptn || '';
    const contrato = req.body.inputSelectContrato || '';

    const rotas = {
        Aluno: '/painel-aluno',
        Professor: '/adm',
        Empresa: '/painel-empresa'
    };

    const voltar = rotas[tipo] || '/';

    console.log('Pesquisa:', pesquisa);
    console.log('Empresa:', empresa);
    console.log('Opção: ', optn);
    console.log('Contrato:', contrato);

    const params = [
        filtro(pesquisa),
        filtro(empresa),
        filtro(optn),
        filtro(contrato)
    ];

    const query = `
        SELECT * FROM vagas 
        WHERE titulo_vaga LIKE ? 
        AND empresa LIKE ? 
        AND ramo_empresarial LIKE ? 
        AND tipo_contrato LIKE ?
    `;

    db.all(query, params, (err, vagas) => {
        if (err) {
            console.error('Erro ao buscar vagas:', err);
            return res.render('portal_vagas', {
                usuario: req.session.usuario,
                voltar,
                mensagem: 'Erro ao buscar vagas',
                vagas: [],
                pesquisa,
                empresa,
                optn,
                contrato
            });
        }

        res.render('portal_vagas', {
            usuario: req.session.usuario,
            voltar,
            vagas,
            pesquisa,
            empresa,
            optn,
            contrato
        });
    });
});

module.exports = router;
