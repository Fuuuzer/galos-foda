require('dotenv').config();
const express = require('express');
const session = require ('express-session');
const cors = require('cors');
const e = require('express');
const db = require('./database/database');
const { Passport } = require('passport');
const passport = require('passport');
const GoogleStrategy = require ('passport-google-oauth20').Strategy;
const router = express.Router();
const path = require('path')

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

// const insertUser = (nome, email, password) => {
//   const query= `REMOVE FROM usuarios (nome, email, password) VALUES (?, ?, ?)`
//   db.run(query, [nome, email, password], (err) => {
//     if (err) {
//       console.error('Erro ao inserir usuario')
//     } else {
//       console.log('usuario inserido com sucesso')
//     }
//   })
// }

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

const deleteAllUsers = () => {
  const query = `DELETE FROM usuarios`;
  db.run(query, [], (err) => {
    if(err) {
      console.error('erro ao deletar os usuarios')
    } else {
      console.log('Usuarios deletados com sucesso')
    }
  })
}
// deleteAllUsers()
const app = express();

app.use(cors());
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


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const encontrarUsuarios = () => {
      const query = `SELECT * FROM usuarios WHERE email = ? and password = ?`;
      db.get(query, [email, password], (err, row) => {
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
// db.all(`SELECT * FROM usuarios`, [], (err, rows) => {
//   console.log(rows)
// });

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

  const insertUser = (nome, email, password) => {
      const query= `INSERT INTO usuarios (nome, email,password) VALUES (?, ?, ?)`
      db.run(query, [nome, email, password], (err) => {
        if (err) {
          console.error('Erro ao inserir usuario', err);
          return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        } else {
          console.log('Usuário inserido com sucesso!');
          return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        }
      })
    
  }
  insertUser(nome, email, password)

});

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