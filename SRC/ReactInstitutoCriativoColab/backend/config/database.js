// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,      // "iccolaboradores_db"
  process.env.DB_USER,      // "root"
  process.env.DB_PASSWORD,  // "Saulo@123"
  {
    host: process.env.DB_HOST, // "localhost"
    dialect: 'mysql',          // Usando MySQL
    logging: false,            // Desliga os logs SQL (opcional)
  }
);

// Testa a conexão com o banco de dados.
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = sequelize;
