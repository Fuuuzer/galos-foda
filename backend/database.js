const sqlite3 = require('sqlite3').verbose();

// Conectar ao banco de dados do SQLITE
const db = new sqlite3.Database('./meubanco.db', (err) => {
  if(err) {
    console.error('Erro ao conectar ao banco de dados')
  } else {
    console.log('Conectado ao banco de dados!')
  }
});

module.exports = db;