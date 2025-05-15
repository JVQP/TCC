// Importando recursos
const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const PORT = process.env.PORT || 8080; 
const db = require('./banco.js');
const fs = require('fs');

// Configurando o servidor
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.urlencoded({ extended: true }));
app.use('/bootstrap', express.static(path.join(__dirname,'../node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, '../Public')));
app.use(fileUpload());

// configurando sessão
app.use(session({
    secret: 'chave-secreta',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 dia
    }
}));


// Rota de Logout 
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao encerrar a sessão.');
        }
        res.redirect('/login');
    });
});


// Configurando Rotas
const admRouter = require('./routers/adm.js');
const loginRouter = require('./routers/login.js');
const homeRouter = require('./routers/home.js');
const contatoRouter = require('./routers/contato.js');
const obrigadoRouter = require('./routers/obrigado.js');
const usuarioRouter = require('./routers/usuario.js');
const alunoRouter = require('./routers/aluno.js');
const listaAlunosRouter = require('./routers/lista_alunos.js');
const excluirAlunoRouter = require('./routers/excluir_aluno.js');
const editarAlunoRouter = require('./routers/editar_aluno.js');
const avaliacaoRouter = require('./routers/avaliacao.js');
const portalRouter = require('./routers/portal_vagas.js');

app.use('/adm', admRouter);
app.use('/', homeRouter);
app.use('/login', loginRouter);;
app.use('/contato', contatoRouter);
app.use('/obrigado', obrigadoRouter);
app.use('/usuario', usuarioRouter);
app.use('/aluno', alunoRouter);
app.use('/lista_alunos', listaAlunosRouter);
app.use('/excluir', excluirAlunoRouter);
app.use('/editar', editarAlunoRouter);
app.use('/loginAva', avaliacaoRouter);
app.use('/portal-vagas', portalRouter);


// Rodando servidor 
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});
