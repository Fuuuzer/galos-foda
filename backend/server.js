require('dotenv').config();
const express = require('express');
const session = require ('express-session');
const cors = require('cors');
const e = require('express');
const passport = require('passport');
const GoogleStrategy = require ('passport-google-oauth20').Strategy;
const router = express.Router();
const path = require('path');
const Usuario = require('./database/models/Usuario');
const app = express();



const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}


app.options('*', cors(corsOptions))
app.use(cors(corsOptions));
app.use(express.json());
app.use('/', router)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.session());
app.use(passport.initialize())


app.get('/', (req, res) => {
  res.send()
})

const insertUser = async (nome, email, password, res) => {
  try {
    Usuario.create({ nome, email, password});
    console.log('Usuario inserido')
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error('Erro ao inserir');
    return res.status(500).json({ message: 'Erro ao encontrar usuario' });
  }
}


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const encontrarUsuarios = () => {
      const query = `SELECT * FROM usuarios WHERE email = ? and password = ?`;
      Usuario.find(query, [email, password], (err, row) => {
        if (err) {
          console.error('usuario nao econtrado', err)
          return res.status(500).json({message: 'Usuario nao encontrado'})
        }
        if (!row) {
          return res.status(401).json({ message: 'Email ou senha incorretos'});
        }
        return res.status(200).json({ message: 'Login bem-sucedido!'});
      })
    }
    encontrarUsuarios()
  }
)
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

  insertUser(nome, email, password, res);
})


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL : "http://localhost:5000/auth/google/callback",
  passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) =>  {
    console.log('perfil do usuario', profile);
    return done(null, profile)
}
))

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user)
});

app.get('/auth/google', (req, res, next) =>  {
  console.log('Inciaindo login google');
  next();
},
  passport.authenticate('google', { scope: ['email', 'profile'] }))


app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/auth/google/callback', 
  passport.authenticate( 'google', {
    successRedirect: '/dashboard/dash.html',
    failureRedirect: '/auth/google/failure',
  })
)

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend','dashboard','dash.html'))
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});