const express = require('express');
const router = express.Router();
const db = require('../banco.js');
const middleware = require('./middleware.js');
const permisao = require('./permisao.js');
const nodemailer = require('nodemailer');
const dayjs = require('dayjs');
require('dotenv').config();



router.post('/', middleware, permisao('Empresa'), (req, res) => {

    let vaga = req.body.vaga;
    let empresa = req.body.empresa;
    let email_usuario = req.body.email_usuario;
    let Aprovado = req.body.Aprovado;
    let Nome = req.body.Nome;
    let Email = req.body.Email;
    let id = req.body.id;

    let data = dayjs().format('DD/MM/YYYY');

    db.run(`UPDATE candidatos SET status = ? WHERE id = ?`, [Aprovado, id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar o status do candidato tente novamente mais tarde ou consulte ao desenvolvedor!.');
        }

        console.log(`Candidato ${Nome} foi aprovado.`);

        // Enviar e-mail de aprovação

        db.get('SELECT * FROM vagas WHERE id = ?', [vaga], (err, vagas) => {
            if (err) {
                console.log('Erro de consulta de vagas:', err);
                return res.status(500).send('Erro de consulta de vagas');
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
                from: `jaumvit0r222@gmail.com, ${email_usuario}`,
                to: `${Email}, jaumvit0r222@gmail.com`,
                subject: '🎉 Você foi aprovado para a vaga!',
                html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #ddd;">
        <h2 style="color: #27ae60;">🎉 Aprovado para a vaga</h2>
        <p>Olá <strong>${Nome}</strong>,</p>

        <p>É com grande satisfação que informamos que você foi <strong>aprovado</strong> para ocupar a vaga de <strong>${vagas.titulo_vaga}</strong> na empresa <strong>${empresa}</strong>.</p>

        <p>Parabenizamos você pela conquista e agradecemos o seu interesse em fazer parte da nossa equipe.</p>

        <p>📅 Data da aprovação: <strong>${data}</strong></p>

        <p>Em breve, entraremos em contato com as orientações necessárias para início das atividades e demais detalhes do processo de integração.</p>

        <hr style="margin: 20px 0;">

        <p style="font-size: 12px; color: #777;">Este é um e-mail automático. Caso tenha dúvidas, entre em contato com o setor responsável da empresa.</p>
    </div>
    `
            };


            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Erro ao enviar e-mail:', error);
                    let total = candidato.length

                    res.render('lista_candidatos', {
                        usuario: req.session.usuario,
                        mensagem_email: 'Falha ao enviar e-mail de aprovação.',
                        vagas: vagas,
                        candidatos: candidato,
                        total: total
                    });
                    return;

                }

                console.log('E-Mail de aprovação enviado:', info.response);

                res.redirect('/listar-candidatos');
                return;

            });
        });
    });
});


module.exports = router;