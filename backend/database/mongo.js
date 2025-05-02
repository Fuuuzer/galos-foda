const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  console.log('Iniciando conexão ccom o banco de dados')
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('conectado ao mongoDB');
  } catch (err) {
    console.error('Erro ao conectar ao mongoDB', err)
  }
};

module.exports = connectDB;