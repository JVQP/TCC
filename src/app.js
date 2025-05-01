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
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, '../Public')));
app.use(fileUpload());

// configurando sessão
app.use(session({
    secret: 'chave-secreta',
    resave: false,
    saveUninitialized: true,
    cookie: {
        
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
const turmaRouter = require('./routers/turma.js');
const alunoRouter = require('./routers/aluno.js');

app.use('/turmas', turmaRouter);
app.use('/adm', admRouter);
app.use('/', homeRouter);
app.use('/login', loginRouter);;
app.use('/contato', contatoRouter);
app.use('/obrigado', obrigadoRouter);
app.use('/usuario', usuarioRouter);
app.use('/aluno', alunoRouter);



// Rodando servidor 
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});
