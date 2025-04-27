const btn = document.querySelector('.btn');
const btnRegister = document.getElementById('show-register'); 
const btnLogin = document.getElementById('show-login'); 
const formRegister = document.querySelector('.form-register');
const formLogin = document.querySelector('.login-inputs');
const eyes = document.querySelectorAll('.fa-eye');
const pass = document.querySelectorAll('.senha');
const passwordInput = document.getElementById('password');

btnRegister.addEventListener('click', () => {
  formRegister.classList.toggle('hidden');
  formRegister.classList.toggle('animation');
  formLogin.classList.remove('animation');
  document.querySelector('.login-inputs').classList.toggle('hidden');
  document.querySelector('main').classList.toggle('reverse');
})

btnLogin.addEventListener('click', () => {
  formRegister.classList.toggle('hidden');
  formRegister.classList.remove('animation');
  formLogin.classList.toggle('hidden');
  formLogin.classList.toggle('animation');

  document.querySelector('main').classList.toggle('reverse');
})

eyes.forEach(eye => {
  eye.addEventListener('click', () => {
    eye.classList.toggle('fa-eye');
    eye.classList.toggle('fa-eye-slash');

    pass.forEach(senha => {
      if (senha.getAttribute('type') === 'password') {
        senha.setAttribute('type', 'text');
      } else {
        senha.setAttribute('type', 'password');
      }
    })
  })
})

const requirements = {
  length: document.getElementById('length'),
  uppercase: document.getElementById('uppercase'),
  lowercase: document.getElementById('lowercase'),
  number: document.getElementById('number'),
  special: document.getElementById('special'),
  length: document.getElementById('length'),
}

function validatePassword(password) {
  const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /['"@$!%*?&#._|ç]/.test(password),
  }

  for (const [key, valid] of Object.entries(validations)) {
    if (valid) {
      requirements[key].classList.add('valid');
    } else {
      requirements[key].classList.remove('valid');
    }
  }
}

function passwordsCombine(senha1, senha2) {
  const passEqual = document.getElementById('passwordCoincide')

  if (senha1 === '' && senha2 === '') {
    passEqual.innerText = 'Por favor, digite uma senha';
    return
  }

  if (senha1 === senha2) {
    passEqual.innerText = 'Isso ai! As senhas são iguais';
    passEqual.style.color = 'green';
    pass.forEach(pass => {
      pass.style.border = '2px solid green'
    })
  } else {
    passEqual.innerText = 'Calma lá amigão, as senhas não conferem';
    passEqual.style.color = 'red';
    pass.forEach(pass => {
      pass.style.border = '2px solid red'
    })
  }
}

pass[1].addEventListener('input', () => {
  passwordsCombine(pass[1].value, pass[2].value)
})

pass[2].addEventListener('input', () => {
  passwordsCombine(pass[1].value, pass[2].value)
})

passwordInput.addEventListener('input', (e) => validatePassword(e.target.value));