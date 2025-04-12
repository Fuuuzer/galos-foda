require('dotenv').config();
const express = require('express');
const cors = require('cors')


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send()
})

const usuarios = [
  {email: 'fuzer@hotmail.com', password: '123456'},
  {email: 'fuzer123@hotmail.com', password: '123456'}
]

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const encontrarUsuario = usuarios.find((u) => u.email === email && u.password === password)

  if(!encontrarUsuario) {
    return res.status(400).json({ message: 'Não foi possível encontrar um usuário com esses dados'});
  }
  return res.status(200).json({ message: 'Login bem sucedido!'})
})

app.post('/register', (req, res) => {
  const { nome, email, password } = req.body;

  if (!nome || !email || !password) {
    return res.status(400).json({ message: 'Você precisa preencher todos os campos' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Insira um Email válido' })
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'A senha deve conter ao menos 8 caracteres' })
  }

});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});