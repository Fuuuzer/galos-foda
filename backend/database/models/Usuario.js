const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  password: String,
  googleId: String,
});

module.exports = mongoose.model('Usuario', usuarioSchema);