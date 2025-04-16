const buttonRegister = document.getElementById('botao-cadastrar');
const loginButton = document.getElementById('login-btn');


// POST https://accounts.google.com/o/oauth2/token

{
  "client_secret" : "",
  "grant_type" : "",
  "refresh_token" : "",
  "client_secret" : "",
  "client_id" : "",
}

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
    body: JSON.stringify({ nome, email, password })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(err => console.log('erro ao enviar requisição', err))
});




loginButton.addEventListener('click', async (e) => {
  e.preventDefault()

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  await getData(email, password)

})

async function getData() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const url = 'http://localhost:5000/login';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`)
    }
    const json = await response.json();
    if (json.message === 'Login bem-sucedido!') {
      window.location.href = '../dashboard/dash.html'
    } else {
      alert('Não foi possivel fazer o o login')
    }
  } catch (error) {
    alert('Usuario nao encontrado')
  }
}