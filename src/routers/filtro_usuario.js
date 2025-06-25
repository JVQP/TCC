const express = require('express');
const router = express.Router();
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');


router.post('/', middleware, permisao('Professor'), (req, res) => {

  let pesquisa = req.body.pesquisa || '';
  let statusFiltros = [];

    if (req.body.aluno) statusFiltros.push(req.body.aluno);
    if (req.body.professor) statusFiltros.push(req.body.professor);
    if (req.body.empresa) statusFiltros.push(req.body.empresa);

    let sql = `SELECT * FROM usuarios WHERE nome LIKE ?`;
    let params = [`%${pesquisa}%`];

      if (statusFiltros.length > 0) {
        let placeholders = statusFiltros.map(() => '?').join(', ');
        sql += ` AND tipo IN (${placeholders})`;
        params.push(...statusFiltros);
    }

    db.all(sql, params, (err, usuarios) => {
        if (err) {
            console.error('Erro ao filtrar usuarios:', err);
            return res.render('lista_usuario', {
                usuario: req.session.usuario,
                mensagem_erro: 'Erro ao pesquisar, tente novamente mais tarde.',
                usuarios: [],
                total: 0
            });
        }

        if (usuarios.length === 0) {
            return res.render('lista_usuario', {
                usuario: req.session.usuario,
                mensagem: 'Nenhum aluno encontrado com os critérios especificados.',
                usuarios: [],
                total: 0,
                aluno: req.body.aluno,
                professor: req.body.professor,
                empresa: req.body.empresa,
                pesquisa
            });
        }

        if (!statusFiltros.length > 0) {
          res.redirect('/lista-usuario');
          return;
        }

        res.render('lista_usuario', {
            usuario: req.session.usuario,
            usuarios: usuarios,
            total: usuarios.length,
            aluno: req.body.aluno,
            professor: req.body.professor,
            empresa: req.body.empresa,
            pesquisa
        });
    });

});
module.exports = router;