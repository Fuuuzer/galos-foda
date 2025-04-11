const button = document.getElementById('botao-cadastrar');  

button.addEventListener('click', (e) => {
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
})

