const buttonRegister = document.getElementById('botao-cadastrar');  
const loginButton = document.getElementById('login-btn');  


buttonRegister.addEventListener('click', (e) => {
e.preventDefault()
const nome = document.getElementById('nome').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

  fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome, email, password})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(err => console.log('erro ao enviar requisição', err))
});

loginButton.addEventListener('click', (e) => {
  e.preventDefault()
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => console.log(data))
})