const sequelize = require('./config/database');
const User = require('./models/User');
const Event = require('./models/Event');

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco sincronizado com sucesso!');
    process.exit();
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco:', err);
    process.exit(1);
  });
