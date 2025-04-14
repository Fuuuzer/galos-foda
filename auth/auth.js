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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, email, password})
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message)
  })
});

loginButton.addEventListener('click', (e) => {
  e.preventDefault()

  fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: 'fuzeer@hotmail.com', password: '123456'})
  })
  .then(response => response.json())
  .then(data => console.log(data))
})