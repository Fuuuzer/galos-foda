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
  res.send('POST request to')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🔥 Servidor rodando na porta ${PORT}`);
});