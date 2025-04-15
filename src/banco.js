// Importando banco de dados e configurando
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('Database.sqlite', (err) => {
    if(!err) {
        console.log('Banco de dados conectado com sucesso!');
    } else {
        console.log('Erro ao conectar no banco de dados: ' + err.message);
    }
});

module.exports = db;