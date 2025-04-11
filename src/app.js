// Importando recursos
const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const PORT = process.env.PORT || 8080; // Corrigido para PORT (não BASE_URL)

// Configurando o servidor
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.urlencoded({ extended: true }));
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, '../Public')));
app.use(express.static(path.join(__dirname, '../Public/imagem')));
app.use(fileUpload());

// configurando sessão
app.use(session({
    secret: 'chave-secreta',
    resave: false,
    saveUninitialized: true
}));


// Configurando Rotas
const admRouter = require('./routers/adm.js');
const loginRouter = require('./routers/login.js');
app.use('/adm', admRouter);
app.use('/', loginRouter)

// Rodando servidor 
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});
