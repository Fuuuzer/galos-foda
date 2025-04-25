const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('conectado ao mongoDB');
  } catch (err) {
    console.error('Erro ao conectar ao mongoDB')
  }
};

module.exports = connectDB;