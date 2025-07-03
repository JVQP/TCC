const express = require('express');
const middlewre = require('./middleware');
const permisao = require('./permisao.js');
const db = require('../banco.js');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', middlewre, permisao('Administrador'), (req, res) => {

  db.all(`SELECT * FROM mensagens`, (err, mensagens) => {
    if (err) {
      console.log('Erro ao exibir mensagem ' + err);
      res.status(500).send('Erro interno no servidor: ' + err);
      return;
    }

    db.all(`SELECT * FROM usuarios WHERE nome = ?`, [req.session.usuario.nome], (err, usuarios) => {
      if (err) {
        console.log('Erro ao exibir usuário ' + err);
        res.status(500).send('Erro interno no servidor: ' + err);
        return;
      }

         res.render('mensagem', {
            usuario: req.session.usuario,
            usuarios: usuarios,
            mensagens: mensagens,
            total: mensagens.length
        });

    });

  });

});

router.post('/:id/concluir', (req, res) => {


  let nome = req.body.nome;
  let email = req.body.email;

  const id = req.params.id;

  db.run(`DELETE FROM mensagens WHERE id = ?`, [id], (err) => {
    if (err) {
      console.error('Erro ao concluir mensagem:', err);
      return res.status(500).send('Erro interno');
    }
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: `jaumvit0r222@gmail.com`,
      to: `${email}, jaumvit0r222@gmail.com`,
      subject: '✅ Sua solicitação foi concluída com sucesso !',
      html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #ddd;">
                <h2 style="color: #27ae60;">🎉 Aprovado para a vaga</h2>
                <p>Olá <strong>${nome}</strong>,</p>
        
<p style="margin-top: 20px;">Esta mensagem confirma que sua solicitação foi concluída. Obrigado por utilizar nossa plataforma.</p>

<hr style="margin: 20px 0;">
<p style="font-size: 12px; color: #777;">Este é um e-mail automático. Caso tenha dúvidas, entre em contato com o setor responsável da empresa.</p>

        
                <hr style="margin: 20px 0;">
        
                <p style="font-size: 12px; color: #777;">Este é um e-mail automático. Caso tenha dúvidas, entre em contato com o setor responsável da empresa.</p>
            </div>
            `
    };


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Erro ao enviar e-mail:', error);

      }

      console.log('E-Mail de mensagem enviada com sucesso: ' , info);


      res.redirect('/mensagem');

    });
  });
});


module.exports = router;