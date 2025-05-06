
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
function drop(){
    let query = `DROP TABLE IF EXISTS alunos;`

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

function mensagem(){

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

function imagem_perfil(){

    let query = `CREATE TABLE imagem_perfil (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INT NOT NULL,
    imagem TEXT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);`

    db.run(query, (err) => {
        if (err) {
            console.log('Erro ao criar tabela imagem_perfil: ' + err.message);
        } else {
            console.log('Tabela imagem_perfil criada com sucesso!');
        }

    });
    
}

module.exports = db;