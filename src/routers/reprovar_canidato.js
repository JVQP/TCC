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
    subject: '❌ Processo seletivo finalizado - Agradecimento pela participação',
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e0e0e0;">
        <h2 style="color: #e74c3c;">❌ Processo seletivo finalizado</h2>
        <p>Olá <strong>${Nome}</strong>,</p>

        <p>Agradecemos sinceramente pela sua participação no processo seletivo para a vaga de <strong>${vagas.titulo_vaga}</strong> na empresa <strong>${empresa}</strong>.</p>

        <p>Após uma análise cuidadosa de todos os perfis, informamos que, neste momento, você <strong>não foi selecionado</strong> para prosseguir no processo.</p>

        <p>Ressaltamos que sua candidatura foi avaliada com atenção, e agradecemos o tempo dedicado e o interesse demonstrado em nossa empresa.</p>

        <p>Seus dados permanecerão em nosso banco de talentos e, caso surjam novas oportunidades compatíveis com seu perfil, poderemos entrar em contato futuramente.</p>

        <p>Desejamos sucesso em sua trajetória profissional e nos colocamos à disposição para futuras oportunidades.</p>

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