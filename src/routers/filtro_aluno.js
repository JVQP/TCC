const express = require('express');
const router = express.Router();
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');


router.post('/', middleware, permisao('Professor'), (req, res) => {
  let statusFiltros = [];

  if (req.body.matutino) statusFiltros.push(req.body.matutino);
  if (req.body.vespertino) statusFiltros.push(req.body.vespertino);
  if (req.body.noturno) statusFiltros.push(req.body.noturno);

  console.log('Status Filtros:', statusFiltros);

  let sql = `SELECT * FROM alunos`;
  let params = [];

  if (statusFiltros.length > 0) {
    let placeholders = statusFiltros.map(() => '?').join(', ');
    sql += ` WHERE turno IN (${placeholders})`;
    params = statusFiltros;
  }

  db.all(sql, params, (err, alunos) => {
    if (err) {
      console.error('Erro ao filtrar alunos:', err);
      return res.render('lista_alunos', {
        usuario: req.session.usuario,
        mensagem_erro: 'Erro ao pesquisar, tente novamente mais tarde.',
        alunos: [],
        total: 0
      });
    }

    if (alunos.length === 0) {
      return res.render('lista_alunos', {
        usuario: req.session.usuario,
        mensagem: 'Nenhum aluno encontrado com os critérios especificados.',
        alunos: [],
        total: 0,
        matutino: req.body.matutino,
        vespertino: req.body.vespertino,
        noturno: req.body.noturno
      });
    }

    if (!statusFiltros.length) {
      return res.redirect('/lista_alunos');
    }

    res.render('lista_alunos', {
      usuario: req.session.usuario,
      alunos: alunos,
      total: alunos.length,
      matutino: req.body.matutino,
      vespertino: req.body.vespertino,
      noturno: req.body.noturno
    });
  });
});

module.exports = router;