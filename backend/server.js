require('dotenv').config();
const express = require('express');
const cors = require('cors')


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🔥 Servidor rodando na porta ${PORT}`);
});