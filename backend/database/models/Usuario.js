const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  password: String,
});

module.exports = mongoose.model('Usuario', usuarioSchema);