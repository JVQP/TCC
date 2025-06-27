// Importando recursos
const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const PORT = process.env.PORT || 8080; 
const db = require('./banco.js');
const fs = require('fs');
const SQLiteStore = require('connect-sqlite3')(session);


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
    saveUninitialized: false,
    store: new SQLiteStore({
        db: 'sessao.sqlite',
        dir: path.join(__dirname, 'sessions'),
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 dia
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
const editarFotoRouter = require('./routers/editar_foto.js');
const painelAlunoRouter = require('./routers/painel_aluno.js');
const listaUsuarioRouter = require('./routers/lista_usuario.js');
const desempenhoRouter = require('./routers/desempenho_aluno.js');
const graficoRouter = require('./routers/chart.js');
const visualizarNotaRouter = require('./routers/visualizar_nota.js');
const editarNotaRouter = require('./routers/editar_nota.js');
const deletarNotaRouter = require('./routers/deletar_nota.js');
const editarUsuarioRouter = require('./routers/editar_usuario.js');
const painelEmpresaRouter = require('./routers/empresa.js');
const PublicarVagasRouter = require('./routers/vagas.js');
const CandidatarRouter = require('./routers/candidatar.js');
const ListaVagasRouter = require('./routers/lista_vagas.js');
const editarVagasRouter = require('./routers/editar_vagas.js');
const removerVagaRouter = require('./routers/remover_vaga.js');
const listaCandidatosRouter = require('./routers/lista_canidatos.js');
const aprovarCandidatoRouter = require('./routers/aprovar_candidato.js');
const desempenhoCandidatoRouter = require('./routers/desempenho_candidato.js');
const analisarCandidatoRouter = require('./routers/analisar_candidato.js');
const reprovarCandidatoRouter = require('./routers/reprovar_canidato.js');
const filtroCandidatosRouter = require('./routers/filtro_candidatos.js');
const filtroVagasRouter = require('./routers/filtro_vagas.js'); 
const excluirCandidatoRouter = require('./routers/excluir_candidato.js');
const filtroUsuarioRouter = require('./routers/filtro_usuario.js');
const filtroAlunoRouter = require('./routers/filtro_aluno.js');
const candidatosAprovadosRouter = require('./routers/candidatos_aprovados.js');
const filtrarVagasRouter = require('./routers/filtrar_vaga.js');

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
app.use('/editar-foto', editarFotoRouter);
app.use('/painel-aluno', painelAlunoRouter);
app.use('/lista-usuario', listaUsuarioRouter);
app.use('/desempenho-aluno', desempenhoRouter);
app.use('/grafico', graficoRouter);
app.use('/visualizar', visualizarNotaRouter);
app.use('/editar-nota', editarNotaRouter);
app.use('/deletar', deletarNotaRouter);
app.use('/editar-usuario', editarUsuarioRouter);
app.use('/painel-empresa',painelEmpresaRouter);
app.use('/publicar-vagas', PublicarVagasRouter);
app.use('/candidatar', CandidatarRouter);
app.use('/listar-vagas', ListaVagasRouter);
app.use('/editar-vagas', editarVagasRouter);
app.use('/excluir-vaga', removerVagaRouter);
app.use('/listar-candidatos', listaCandidatosRouter);
app.use('/aprovar', aprovarCandidatoRouter);
app.use('/desempenho-candidato', desempenhoCandidatoRouter);
app.use('/analisar-candidato', analisarCandidatoRouter);
app.use('/reprovar-candidato', reprovarCandidatoRouter);
app.use('/filtro-candidatos', filtroCandidatosRouter);
app.use('/filtrar-vagas', filtroVagasRouter);
app.use('/excluir-candidato', excluirCandidatoRouter);
app.use('/filtro-usuario', filtroUsuarioRouter);
app.use('/filtrar-aluno', filtroAlunoRouter);
app.use('/candidatos-aprovados', candidatosAprovadosRouter);
app.use('/filtrar-vaga', filtrarVagasRouter);


module.exports = app;

// Rodando servidor 
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});
