const path = require('path'); 
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const session = require ('express-session');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require ('passport-google-oauth20').Strategy;
const router = express.Router();
const Usuario = require('./database/models/Usuario');
const connectDB = require('./database/mongo');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 12;

connectDB();

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


//Inserir usuário no bando de dados
const insertUser = async (nome, email, password, res) => {
  try {
    await Usuario.create({ nome, email, password});
    console.log('Usuario inserido')
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error('Erro ao inserir');
    return res.status(500).json({ message: 'Erro ao encontrar usuario' });
  }
}

//Procurar usuário no banco de dados
const findUser = async (email, password, res) => {
  try {
    const user = await Usuario.findOne({ email });

    if (!user) {
      console.log('Email ou senha incorretos')
      return res.status(401).json({ message: 'Email ou senha incorretos'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Email ou senha incorretos');
      return res.status(401).json({ message: 'Email ou senha incorretos'});
    }

    console.log('Usuario encontrado')
    return res.status(200).json({ message: 'Login realizado'});
  } catch (err){
    console.log('Erro no servidor.')
    return res.status(500).json({ message: 'Erro no servidor', err});
  }
}

// Rota de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

    findUser(email, password, res)
  }
)

// Rota para registrar
app.post('/register', (req, res) => {
  const { nome, email, password } = req.body;
  console.log(password)

  if (!nome || !email || !password) {
    return res.status(400).json({ message: 'Você precisa preencher todos os campos' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Insira um Email válido' })
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'A senha deve conter ao menos 8 caracteres' })
  }

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err){
      return res.status(500).json({ message: 'erro ao criptografar senha' })
    }
    insertUser(nome, email, hash, res);
  })
})

//Configurações para login via google utilizando o passport
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL : "http://localhost:5000/auth/google/callback",
  passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) =>  {
    try {
      let user = await Usuario.findOne({ googleId: profile.id });

      if (!user) {
        user = await Usuario.create({
          googleId: profile.id,
          nome: profile.displayName,
          email: profile.emails[0].value,
         });
      }
      return done(null, user)
    } catch (err) {
      return done(err, null)
    }
}
))

// O que irá ser salvo na sessão quando o login der certo
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Quando o usuario voltar pega as informalções salvas no
// Serialize
passport.deserializeUser( async (id, done) => {
  try {
    const user = await Usuario.findById(id);
    done(null, user);
  } catch (err) {
    done(err)
  }
});

app.get('/auth/google', (req, res, next) =>  {
  console.log('Iniciando login google');
  next();
},
  passport.authenticate('google', { scope: ['email', 'profile'] }))

app.use(express.static(path.join(__dirname, '../frontend')));


//Rota login com o google
app.get('/auth/google/callback', 
  passport.authenticate( 'google', {
    successRedirect: '/dashboard/dash.html',
    failureRedirect: '/auth/google/failure',
  })
)

//Rota dashboard tela de perfil
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend','dashboard','dash.html'))
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});