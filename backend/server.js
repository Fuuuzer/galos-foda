require('dotenv').config();
const express = require('express');
const cors = require('cors')


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send()
})

app.post('/register', (req, res) => {
  const { nome, email, password } = req.body;
  
  if (!nome || !email || !password) {
    return res.status(400).json({message: 'Você precisa preencher todos os campos'})
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)) {
    return res.status(400).json({message: 'Insira um Email válido'})
  }

  if(password.length < 8) {
    return res.status(400).json({message: 'A senha deve conter ao meno 8 caracteres'})
  }

})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🔥 Servidor rodando na porta ${PORT}`);
});