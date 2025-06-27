const express = require('express');
const router = express.Router();
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');


router.post('/', middleware, permisao('Empresa'), (req, res) => {

    let pesquisa = req.body.pesquisa || '';
    let statusFiltros = [];

    if (req.body.aprovado) statusFiltros.push(req.body.aprovado);
    if (req.body.EmAnalise) statusFiltros.push(req.body.EmAnalise);
    if (req.body.reprovado) statusFiltros.push(req.body.reprovado);

    let sql = `SELECT * FROM candidatos WHERE  nome LIKE ?`;
    let params = [`%${pesquisa}%`];


    if (statusFiltros.length > 0) {
        let placeholders = statusFiltros.map(() => '?').join(', ');
        sql += ` AND status IN (${placeholders})`;
        params.push(...statusFiltros);
    }

    db.all(sql, params, (err, candidatos) => {
        if (err) {
            console.error('Erro ao filtrar candidatos:', err);
            return res.render('filtro_candidato', {
                usuario: req.session.usuario,
                mensagem_erro: 'Erro ao pesquisar, tente novamente mais tarde.',
                candidatos: [],
                total: 0
            });
        }

        if (candidatos.length === 0) {
            return res.render('filtro_candidato', {
                usuario: req.session.usuario,
                mensagem: 'Nenhum candidato encontrado com os critérios especificados.',
                candidatos: [],
                total: 0,
                aprovado: req.body.aprovado,
                EmAnalise: req.body.EmAnalise,
                reprovado: req.body.reprovado,
                pesquisa
            });
        }


        if (!statusFiltros.length > 0) {
          res.redirect('/listar-candidatos');
        return;
        }

        res.render('filtro_candidato', {
            usuario: req.session.usuario,
            candidatos: candidatos,
            total: candidatos.length,
            aprovado: req.body.aprovado,
            EmAnalise: req.body.EmAnalise,
            reprovado: req.body.reprovado,
            pesquisa
        });
        return;
    });
});


module.exports = router;