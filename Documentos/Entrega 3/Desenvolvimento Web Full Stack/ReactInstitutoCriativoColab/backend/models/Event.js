// models/Event.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
  nome_evento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  segmento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  local: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organizadores: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade_maxima: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  participantes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idade_18a25: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idade_26a49: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idade_50mais: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  quantidade_doacoes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  valor_arrecadado: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
}, {
  tableName: 'events',
  timestamps: false,
});

module.exports = Event;
