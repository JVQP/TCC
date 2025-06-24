const express = require('express');
const middleware = require('./middleware');
const db = require('../banco.js');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/', middleware, (req, res) => {
    const {
        inputEmpresa: empresa,
        inputData: data,
        inputTitulo: titulo,
        inputVagaId: vagasId,
        inputUsuarioId: usuario,
        inputNome: nome,
        inputEmail: email,
        inputEmailVagas: emailVagas,
        inputStatus: status
    } = req.body;

    const tipo = req.session.usuario.tipo;

    const rotas = {
        Aluno: '/painel-aluno',
        Professor: '/adm',
        Empresa: '/painel-empresa'
    };

    const voltar = rotas[tipo] || '/';

    if (tipo !== 'Aluno') {
        // Se não for aluno, bloqueia
        db.all('SELECT * FROM vagas', (err, vagas) => {
            if (err) {
                console.log('Erro de consulta de vagas:', err);
                return res.status(500).send('Erro de consulta de vagas');
            }

            return res.render('portal_vagas', {
                usuario: req.session.usuario,
                vagas: vagas,
                mensagem: 'Você não é aluno para se candidatar!',
                voltar
            });
        });
        return; // impede execução do restante
    }

    // Se for aluno, continua o processo
    db.all('SELECT * FROM vagas', (err, vagas) => {
        if (err) {
            console.log('Erro de consulta de vagas:', err);
            return res.status(500).send('Erro de consulta de vagas');
        }

        db.get('SELECT * FROM usuarios WHERE nome = ?', [empresa], (err, usuarios) => {
            if (err) {
                console.log('Erro de consulta de email:', err);
                return res.status(500).send('Erro de consulta de email');
            }

            if (!usuarios) {
                console.log('Usuário não encontrado!');
                return res.render('portal_vagas', { usuario: req.session.usuario, vagas, voltar });
            }

            // Verifica se já existe candidatura antes de inserir
            db.get('SELECT * FROM candidatos WHERE candidatos_id = ? AND vagas_id = ?', [usuario, vagasId], (err, candidatoExistente) => {
                if (err) {
                    console.log('Erro ao buscar candidato:', err);
                    return res.render('portal_vagas', {
                        usuario: req.session.usuario,
                        mensagem_erro: 'Erro ao verificar candidatura!',
                        vagas,
                        voltar
                    });
                }

                if (candidatoExistente) {
                    console.log('Você já se candidatou a esta vaga!');
                    return res.render('portal_vagas', {
                        usuario: req.session.usuario,
                        mensagem_erro: 'Você já se candidatou a esta vaga!',
                        vagas,
                        voltar
                    });
                }

                // Insere o candidato
                db.run(
                    'INSERT INTO candidatos (candidatos_id, vagas_id, vaga, empresa, nome, email, status, data) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [usuario, vagasId, titulo, empresa, nome, email, status, data],
                    (err) => {
                        if (err) {
                            console.log('Erro ao cadastrar candidato:', err);
                            return res.render('portal_vagas', {
                                usuario: req.session.usuario,
                                mensagem_erro: 'Erro ao se candidatar!',
                                vagas,
                                voltar
                            });
                        }

                        // Envia o e-mail
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
                            from: `"SenaiEmprega" <${process.env.EMAIL_USER}>`,
                            to: `${email}, ${process.env.EMAIL_USER}`,
                            subject: 'Recebemos sua candidatura! 👩‍💼👨‍💼',
                            html: `
                                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 8px; border: 1px solid #ddd;">
                                  <h2 style="color: #2c3e50;">✅ Candidatura Recebida</h2>
                                  <p>Olá <strong>${nome}</strong>,</p>
                                  <p>Agradecemos por se candidatar à vaga de <strong>${titulo}</strong> na empresa <strong>${empresa}</strong>.</p>
                                  <p>📅 Data da candidatura: <strong>${data}</strong></p>
                                  <hr style="margin: 20px 0;">
                                  <p style="font-size: 12px; color: #777;">Este é um e-mail automático. Por favor, não responda diretamente a esta mensagem.</p>
                                </div>
                            `
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log('Erro ao enviar e-mail:', error);
                                return res.render('portal_vagas', {
                                    usuario: req.session.usuario,
                                    mensagem_email: 'Falha ao enviar e-mail.',
                                    vagas,
                                    voltar
                                });
                            }

                            console.log('Email enviado:', info.response);
                            
                            

                            return res.render('portal_vagas', {
                                usuario: req.session.usuario,
                                vagas,
                                mensagem_sucesso: 'Candidatura realizada com sucesso!',
                                voltar
                            });
                        });
                    }
                );
            });
        });
    });
});

module.exports = router;
