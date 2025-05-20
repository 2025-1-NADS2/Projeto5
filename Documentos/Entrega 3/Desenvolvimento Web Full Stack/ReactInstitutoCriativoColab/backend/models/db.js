const mysql = require('mysql2');

// Cria a conexão ao banco de dados usando as variáveis de ambiente
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Testa a conexão ao banco de dados
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Banco de dados conectado com sucesso!');
    connection.release();
  }
});

module.exports = pool;
