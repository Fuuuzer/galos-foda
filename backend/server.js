require('dotenv').config();
const express = require('express');
const cors = require('cors');
const e = require('express');
const db = require('./database/database')


//Parte do banco de dados
const createTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
  );`
  db.run(query, (err) => {
    if (err) {
      console.error('Erro ao criar a tabela', err.message)
    } else {
      console.log('tabela criada com sucesso!')
    }
  })
}
// createTable()

const insertUser = (nome, email, password) => {
  const query= `REMOVE FROM usuarios (nome, email, password) VALUES (?, ?, ?)`
  db.run(query, [nome, email, password], (err) => {
    if (err) {
      console.error('Erro ao inserir usuario')
    } else {
      console.log('usuario inserido com sucesso')
    }
  })
}
// insertUser('João','fuzer@hotmail.com', '123456')

const getUsers = () => {
  const query = `SELECT * FROM usuarios`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Erro ao consultar os dados')
    } else {
      console.log('usuarios encontrados', rows)
    }
  })
}
getUsers()
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

  const encontrarUsuarios = usuarios.find((u) => {
    return u.email === email && u.password === password
  });

  if(!encontrarUsuarios){
    return res.status(400).json({message: 'Usuario nao encontrado'})
  }
  return res.status(200).json({message: 'login bem sucedido!'})
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