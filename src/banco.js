
// Importando banco de dados e configurando
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('Database.sqlite', (err) => {
    if (!err) {
        console.log('Banco de dados conectado com sucesso!');
    } else {
        console.log('Erro ao conectar no banco de dados: ' + err.message);
    }
});

// SCRIPT PARA CRIAR TABELAS E RELACIONAMENTOS
// Ativando o suporte a chaves estrangeiras

db.run('PRAGMA foreign_keys = ON;', (err) => {
    if (err) {
        console.log('Erro ao ativar chaves estrangeiras: ' + err.message);
    } else {
        console.log('Chaves estrangeiras ativadas com sucesso!');
    }
});

/*  SCRIPT PARA MANIPULAR COM SQLITE*/

function usuario() {

    let query = `CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    imagem VARHCAR(100),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    confirmar_senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(10) NOT NULL
);`

    db.run(query, (err) => {
        if (err) {
            console.log('Erro ao criar tabela usuarios: ' + err.message);
        } else {
            console.log('Tabela usuarios criada com sucesso!');
        }
    })

}

// SCRIPT PARA DELETAR TABELAS
function drop() {
    let query = `DELETE FROM candidatos;`

    db.run(query, (err) => {
        if (err) {
            console.log('Erro ao deletar tabela usuarios: ' + err.message);
        } else {
            console.log('Tabela usuarios deletada com sucesso!');
        }
    })
}

function aluno() {

    let query = `CREATE TABLE alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    matricula VARCHAR(100) NOT NULL,
    nome VARCHAR(100),
    curso VARCHAR(100),
    turno VARCHAR(100)
);`

    db.run(query, (err) => {
        if (err) {
            console.log('Erro ao criar tabela alunos: ' + err.message);
        } else {
            console.log('Tabela alunos criada com sucesso!');
        }

    });

}

function mensagem() {

    let query = `CREATE TABLE mensagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mensagem TEXT NOT NULL
);`

    db.run(query, (err) => {
        if (err) {
            console.log('Erro ao criar tabela mensagens: ' + err.message);
        } else {
            console.log('Tabela mensagens criada com sucesso!');
        }

    });


}

function soft_skills() {
    let query = `CREATE TABLE IF NOT EXISTS avaliacao(

        id INTEGER PRIMARY KEY AUTOINCREMENT,
        matricula VARCHAR(100),
        aluno VARCHAR(100),
        professor VARCHAR(100),
        periodo VARCHAR(100),
        trabalho_equipe INTEGER,
        comunicacao INTEGER,
        responsabilidade INTEGER,
        pensamento_critico INTEGER,
        proatividade INTEGER,
        lideranca INTEGER,
        adaptabilidade INTEGER,
        empatia INTEGER,
        media REAL,
        observacao VARCHAR(100)
        
      
    );`

    db.run(query, (err) => {
        if (err) {
            console.log('Erro ao criar tabela de Soft Skills: ' + err.message);
        } else {

            console.log('Tabela Soft Skills criada com sucesso!');

        }
    });

}

function vagas(){
    let query = `CREATE TABLE vagas(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    empresa VARCHAR(100),
    email VARCHAR(100),
    titulo_vaga VARCHAR(100),
    descricao VARCHAR(1000),
    requisitos VARCHAR(1000),
    ramo_empresarial VARCHAR(100),
    data DATA,
    situacao VARCHAR(100),
    tipo_contrato VARCHAR(100)
    );`

    db.run(query, (err) => {
        if(!err){
            console.log('Tabela de vagas criada com sucesso!');
        } else {
            console.log('Erro ao criar tabela de vagas: ' + err.message);
        }
    });

}

function candidatos(){

let query = `

CREATE TABLE candidatos(

id INTEGER PRIMARY KEY AUTOINCREMENT,
candidatos_id INTEGER,
vagas_id INTEGER,
vaga VARCHAR(100),
empresa VARCHAR(100),
nome VARCHAR(100),
email VARCHAR(100),
status VARCHAR(20),
data DATE,

FOREIGN KEY (candidatos_id) REFERENCES usuarios(id) ON DELETE CASCADE,
FOREIGN KEY (vagas_id) REFERENCES vagas(id) ON DELETE CASCADE

);

`

db.run(query, (err) => {
    if(!err){
        console.log('Tabela de candidatos criado com sucesso!');
    } else {
        console.log('Erro ao criar tabela candidatos' + err.message);
    }
})

}

function update(){
    let query = `UPDATE usuarios SET nome = 'JOAO VITOR QUIRINO PROCOPIO', email = 'jaumvit0r222@gmail.com' WHERE id = 1`;

    db.run(query, (err) => {
        if(!err){
            console.log('Usuário alterado com sucesso!');
        } else {
            console.log(err);
        }
    });
}


module.exports = db;