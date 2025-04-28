const buttonRegister = document.getElementById('botao-cadastrar');
const loginButton = document.getElementById('login-btn');
const googleLoginButton = document.getElementById('login-google');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const passwordGet = getPassword();

function validateInputs() {
  const getPassword = getPassword();
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const password = password.value.trim();

  if (nome === '' || email === '' || password === '') {
    buttonRegister.disabled = true;
  } else {
    buttonRegister.disabled = false;
  }
}

nomeInput.addEventListener('input', validateInputs);
emailInput.addEventListener('input', validateInputs);
password.addEventListener('input', validateInputs);

validateInputs();

buttonRegister.addEventListener('click', (e) => {
  e.preventDefault()
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const password = password.value.trim();

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
    if (json.message === 'Login realizado') {
      window.location.href = '../dashboard/dash.html'
    } else {
      alert('Não foi possivel fazer o o login')
    }
  } catch (error) {
    alert('Usuario nao encontrado')
  }
}

googleLoginButton.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/auth/google';
})
