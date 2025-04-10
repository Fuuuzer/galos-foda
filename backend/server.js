require('dotenv').config();
const express = require('express');
const cors = require('cors')


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(console.log('oi'))
})

app.post('/register', (req, res) => {
  const { nome, email, password } = req.body;
  
  res.json({ message: `${nome}, ${email}, ${password}`})
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🔥 Servidor rodando na porta ${PORT}`);
});