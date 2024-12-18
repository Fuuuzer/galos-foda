const btn = document.querySelector('.btn');
const btnRegister = document.getElementById('show-register'); 
const btnLogin = document.getElementById('show-login'); 
const formRegister = document.querySelector('.form-register');
const formLogin = document.querySelector('.login-inputs');
const eyes = document.querySelectorAll('.fa-eye');
const pass = document.getElementById('password');

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
    console.log('oi')

    if (pass.getAttribute('type') === 'password') {
      pass.setAttribute('type', 'text')
    } else {
      pass.setAttribute('type', 'password')
    }
  })
})
