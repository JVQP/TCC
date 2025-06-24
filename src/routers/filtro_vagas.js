const express = require('express');
const router = express.Router();
const middleware = require('./middleware.js');
const db = require('../banco.js');

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

    const where = [];
    const params = [];

    // Filtros personalizados
    if (pesquisa.trim()) {
        where.push("titulo_vaga LIKE ?");
        params.push(`%${pesquisa}%`);
    }

    if (empresa.trim() && empresa !== "Selecione...") {
        where.push("empresa LIKE ?");
        params.push(`%${empresa}%`);
    }

    if (optn.trim() && optn !== "Selecione...") {
        where.push("ramo_empresarial LIKE ?");
        params.push(`%${optn}%`);
    }

    if (contrato.trim() && contrato !== "Selecione...") {
        where.push("tipo_contrato LIKE ?");
        params.push(`%${contrato}%`);
    }

    // Começa a query com vagas ativas
    let query = "SELECT * FROM vagas WHERE situacao = 'Ativa'";

    // Adiciona filtros com AND
    if (where.length > 0) {
        query += " AND " + where.join(" AND ");
    }

    // Executa a query
    db.all(query, params, (err, vagas) => {
        if (err) {
            console.error('Erro ao buscar vagas:', err);
            return res.render('filtro_vagas', {
                usuario: req.session.usuario,
                voltar,
                mensagem: 'Erro ao buscar vagas.',
                vagas: [],
                pesquisa,
                empresa,
                optn,
                contrato
            });
        }

        // Nenhuma vaga encontrada
        if (vagas.length === 0) {
            console.log('Nenhuma vaga encontrada com os critérios de pesquisa.');
            return res.render('filtro_vagas', {
                usuario: req.session.usuario,
                vagas: [],
                mensagem_vagas: 'Nenhuma vaga encontrada com os critérios de pesquisa.',
                voltar,
                pesquisa,
                empresa,
                optn,
                contrato
            });
        }

        // Vagas encontradas
        console.log(`Vagas encontradas: ${vagas.length}`);
        return res.render('filtro_vagas', {
            usuario: req.session.usuario,
            vagas,
            voltar,
            pesquisa,
            empresa,
            optn,
            contrato
        });
    });
});

module.exports = router;
