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

    console.log(vaga, empresa, email_usuario, Aprovado, Nome, Email, id, data);

    db.run(`UPDATE candidatos SET status = ? WHERE id = ?`, [Aprovado, id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar o status do candidato tente novamente mais tarde ou consulte ao desenvolvedor!.');
        }

        console.log(`Candidato ${Nome} está sendo analisado!.`);

        db.all(`SELECT * FROM candidatos`, (err, candidatos) => {
            if(err){
                console.log('Erro ao consultar candidatos: ' + err.message);
                res.status(500).send('Erro interno no servidor: ' + err.message);
            }
            
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
    subject: '📄 Sua candidatura está em análise - Informações necessárias',
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e0e0e0;">
        <h2 style="color: #3498db;">📄 Sua candidatura está em análise</h2>
        <p>Olá <strong>${Nome}</strong>,</p>

        <p>Agradecemos pelo seu interesse na vaga de <strong>${vagas.titulo_vaga}</strong> na empresa <strong>${empresa}</strong>.</p>

        <p>Informamos que sua candidatura está em fase de análise pelo nosso time de recrutamento. Para darmos continuidade ao processo seletivo, solicitamos que, por gentileza, envie as seguintes informações:</p>

        <ul>
            <li>📌 Currículo atualizado (PDF ou Word)</li>
            <li>📌 Disponibilidade de horário</li>
            <li>📌 Pretensão salarial (se aplicável)</li>
        </ul>

        <p>O envio pode ser feito diretamente por resposta a este e-mail.</p>

        <p>⏳ Assim que recebermos as informações, entraremos em contato com os próximos passos do processo.</p>

        <p>Agradecemos novamente pela sua candidatura e desejamos boa sorte!</p>

        <hr style="margin: 20px 0;">

        <p style="font-size: 12px; color: #777;">Este é um e-mail automático. Em caso de dúvidas, entre em contato com o setor de Recrutamento e Seleção da empresa.</p>
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
                        candidatos: candidatos,
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
});


module.exports = router;