// Importando banco de dados e configurando
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('Database.sqlite', (err) => {
    if (!err) {
        console.log('Banco de dados conectado com sucesso!');
    } else {
        console.log('Erro ao conectar no banco de dados: ' + err.message);
    }
});


/*  SCRIPT PARA MANIPULAR COM SQLITE*/

function usuario() {

    let query = `CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
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

function aluno() {

    let query = `CREATE TABLE alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INT NOT NULL,
    curso VARCHAR(100),
    turma VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
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




module.exports = db;